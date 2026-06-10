-- Enable RLS on all tables
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Public read: approved groups only
CREATE POLICY "public_read_approved_groups" ON groups
  FOR SELECT USING (is_approved = TRUE);

-- Public read: categories and countries (always visible)
CREATE POLICY "public_read_categories" ON categories
  FOR SELECT USING (TRUE);

CREATE POLICY "public_read_countries" ON countries
  FOR SELECT USING (TRUE);

-- Public insert: groups (rate limiting enforced in API layer)
CREATE POLICY "public_insert_groups" ON groups
  FOR INSERT WITH CHECK (TRUE);

-- Public insert: reports
CREATE POLICY "public_insert_reports" ON reports
  FOR INSERT WITH CHECK (TRUE);

-- Public read/write: rate_limits (managed by service role in API)
CREATE POLICY "service_manage_rate_limits" ON rate_limits
  FOR ALL USING (TRUE);

-- Public read: featured_orders (for webhook updates)
CREATE POLICY "public_read_featured_orders" ON featured_orders
  FOR SELECT USING (TRUE);

CREATE POLICY "public_insert_featured_orders" ON featured_orders
  FOR INSERT WITH CHECK (TRUE);
