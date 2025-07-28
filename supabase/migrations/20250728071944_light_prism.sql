/*
  # Create daily challenges system

  1. New Tables
    - `daily_challenges`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `date` (date)
      - `completed_by` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `daily_challenges` table
    - Allow all authenticated users to read challenges
    - Only admins can create/update challenges
*/

CREATE TABLE IF NOT EXISTS daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  completed_by text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all challenges"
  ON daily_challenges
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage challenges"
  ON daily_challenges
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );