-- Run this in your Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste & run

ALTER TABLE groups ADD COLUMN IF NOT EXISTS icon_url TEXT DEFAULT NULL;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
