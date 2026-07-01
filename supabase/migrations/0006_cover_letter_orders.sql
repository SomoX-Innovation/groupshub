-- COVER LETTER ORDERS (pay-per-letter via Dodo Payments)
CREATE TABLE cover_letter_orders (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier               TEXT NOT NULL CHECK (tier IN ('basic','standard','premium')),
  amount_cents       INTEGER NOT NULL,
  currency           TEXT NOT NULL DEFAULT 'USD',
  dodo_checkout_id   TEXT UNIQUE,
  dodo_payment_id    TEXT UNIQUE,
  status             TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','used','failed')),
  used_at            TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cover_letter_orders_user_status ON cover_letter_orders (user_id, status);

CREATE TRIGGER cover_letter_orders_updated_at
  BEFORE UPDATE ON cover_letter_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE cover_letter_orders ENABLE ROW LEVEL SECURITY;

-- Users can see their own orders (e.g. to render "you have a paid letter waiting")
CREATE POLICY "user_read_own_cover_letter_orders" ON cover_letter_orders
  FOR SELECT USING (auth.uid() = user_id);

-- All writes (creating a pending order, marking paid/used via webhook or API) go through
-- the service-role client server-side — no direct client insert/update policy.
