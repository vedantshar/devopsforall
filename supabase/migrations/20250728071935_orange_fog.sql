/*
  # Create users table and authentication system

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text, default 'user')
      - `work_title` (text, optional)
      - `mobile_number` (text, optional)
      - `company` (text, optional)
      - `experience_level` (text, optional)
      - `completed_labs` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  work_title text,
  mobile_number text,
  company text,
  experience_level text CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  completed_labs text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);