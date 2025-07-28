/*
  # Create lab comments and feedback system

  1. New Tables
    - `lab_comments`
      - `id` (uuid, primary key)
      - `lab_id` (text)
      - `user_id` (uuid, foreign key)
      - `comment` (text)
      - `rating` (integer, 1-5)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `lab_comments` table
    - Add policies for authenticated users to manage their own comments
    - Allow all authenticated users to read comments
*/

CREATE TABLE IF NOT EXISTS lab_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comment text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lab_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all comments"
  ON lab_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own comments"
  ON lab_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON lab_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON lab_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);