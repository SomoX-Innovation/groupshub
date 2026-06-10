-- Full-text search GIN index
CREATE INDEX IF NOT EXISTS idx_groups_search_vector ON groups USING GIN (search_vector);

-- Trigram index for autocomplete (LIKE queries on name)
CREATE INDEX IF NOT EXISTS idx_groups_name_trgm ON groups USING GIN (name gin_trgm_ops);

-- B-tree indexes for common filters
CREATE INDEX IF NOT EXISTS idx_groups_platform ON groups (platform) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_category_id ON groups (category_id) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_country_code ON groups (country_code) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_language_code ON groups (language_code) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_is_featured ON groups (is_featured, featured_until) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_created_at ON groups (created_at DESC) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_is_approved ON groups (is_approved, created_at DESC);

-- Composite for trending (most viewed + joined recently)
CREATE INDEX IF NOT EXISTS idx_groups_trending ON groups (views DESC, joins_count DESC, created_at DESC)
  WHERE is_approved = TRUE;

-- For admin: unapproved groups queue
CREATE INDEX IF NOT EXISTS idx_groups_pending ON groups (created_at ASC) WHERE is_approved = FALSE;

-- Rate limits cleanup
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits (window_start);

-- Reports lookup
CREATE INDEX IF NOT EXISTS idx_reports_group_id ON reports (group_id);
CREATE INDEX IF NOT EXISTS idx_featured_orders_session ON featured_orders (stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_featured_orders_group ON featured_orders (group_id);
