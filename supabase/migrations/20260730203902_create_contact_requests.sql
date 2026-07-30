/*
# Create contact_requests table

1. New Tables
- `contact_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — name of the person submitting
  - `email` (text, not null) — email address for reply
  - `subject` (text, not null) — short description of the controller/problem
  - `message` (text, not null) — full message body
  - `created_at` (timestamptz, default now()) — when the inquiry was submitted
  - `handled` (boolean, default false) — lets the owner mark inquiries as processed

2. Security
- Enable RLS on `contact_requests`.
- Allow anyone (anon + authenticated) to INSERT new inquiries — this is a public contact form.
- All other operations (SELECT, UPDATE, DELETE) are blocked for anon/authenticated; only the service role (dashboard) can read/manage them.
*/

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_requests" ON contact_requests;
CREATE POLICY "anon_insert_contact_requests"
  ON contact_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
