-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- CATEGORIES
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  icon        TEXT NOT NULL DEFAULT '🔗',
  color       TEXT NOT NULL DEFAULT '#6366f1',
  group_count INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COUNTRIES
CREATE TABLE countries (
  code        CHAR(2) PRIMARY KEY,
  name        TEXT NOT NULL,
  flag_emoji  TEXT NOT NULL DEFAULT '🏳️',
  continent   TEXT NOT NULL,
  region      TEXT
);

-- GROUPS
CREATE TABLE groups (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  platform          TEXT NOT NULL CHECK (platform IN ('whatsapp', 'telegram', 'discord')),
  invite_link       TEXT NOT NULL UNIQUE,
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  country_code      CHAR(2) REFERENCES countries(code) ON DELETE SET NULL,
  language_code     CHAR(2) DEFAULT 'en',
  description       TEXT,
  member_count      INTEGER DEFAULT 0,
  tags              TEXT[] DEFAULT '{}',
  is_featured       BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified       BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved       BOOLEAN NOT NULL DEFAULT FALSE,
  reported_count    INTEGER NOT NULL DEFAULT 0,
  views             INTEGER NOT NULL DEFAULT 0,
  joins_count       INTEGER NOT NULL DEFAULT 0,
  featured_until    TIMESTAMPTZ,
  submitter_ip_hash TEXT,
  search_vector     TSVECTOR,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- REPORTS
CREATE TABLE reports (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id    UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  reason      TEXT NOT NULL CHECK (reason IN ('spam','inappropriate','broken_link','wrong_category','other')),
  description TEXT,
  ip_hash     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FEATURED ORDERS (Stripe payments)
CREATE TABLE featured_orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id          UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  plan              TEXT NOT NULL CHECK (plan IN ('7d','30d','90d','verified')),
  amount            INTEGER NOT NULL,
  payment_status    TEXT NOT NULL DEFAULT 'pending',
  starts_at         TIMESTAMPTZ,
  ends_at           TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RATE LIMITS (IP-based submission throttling)
CREATE TABLE rate_limits (
  ip_hash      TEXT NOT NULL,
  action       TEXT NOT NULL DEFAULT 'submit',
  window_start TIMESTAMPTZ NOT NULL DEFAULT date_trunc('hour', NOW()),
  count        INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (ip_hash, action, window_start)
);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger: auto-expire featured status when updated
CREATE OR REPLACE FUNCTION expire_featured()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.featured_until IS NOT NULL AND NEW.featured_until < NOW() THEN
    NEW.is_featured = FALSE;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_featured_expiry
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION expire_featured();

-- Trigger: auto-generate slug on insert
CREATE OR REPLACE FUNCTION generate_group_slug()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter   INTEGER := 0;
BEGIN
  base_slug := lower(
    regexp_replace(
      unaccent(NEW.name),
      '[^a-z0-9]+', '-', 'g'
    )
  );
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM groups WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter::TEXT;
  END LOOP;
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_group_slug
  BEFORE INSERT ON groups
  FOR EACH ROW
  WHEN (NEW.slug IS NULL OR NEW.slug = '')
  EXECUTE FUNCTION generate_group_slug();

-- Trigger: update search_vector on insert/update
CREATE OR REPLACE FUNCTION groups_search_vector_update()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'C');
  RETURN NEW;
END;
$$;

CREATE TRIGGER groups_search_vector_trigger
  BEFORE INSERT OR UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION groups_search_vector_update();

-- Trigger: update category group_count
CREATE OR REPLACE FUNCTION refresh_category_counts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Decrement old category count
  IF (TG_OP = 'UPDATE' OR TG_OP = 'DELETE') THEN
    IF OLD.category_id IS NOT NULL THEN
      UPDATE categories SET group_count = (
        SELECT COUNT(*) FROM groups
        WHERE category_id = OLD.category_id AND is_approved = TRUE
      ) WHERE id = OLD.category_id;
    END IF;
  END IF;
  -- Increment new category count
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    IF NEW.category_id IS NOT NULL THEN
      UPDATE categories SET group_count = (
        SELECT COUNT(*) FROM groups
        WHERE category_id = NEW.category_id AND is_approved = TRUE
      ) WHERE id = NEW.category_id;
    END IF;
    RETURN NEW;
  END IF;
  RETURN OLD;
END;
$$;

CREATE TRIGGER update_category_group_count
  AFTER INSERT OR UPDATE OF is_approved, category_id OR DELETE ON groups
  FOR EACH ROW EXECUTE FUNCTION refresh_category_counts();
