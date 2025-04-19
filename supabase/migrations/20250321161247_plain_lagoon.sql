/*
  # Initial Schema Setup

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `date` (date)
      - `time` (time)
      - `service` (text)
      - `doctor` (text)
      - `notes` (text)
      - `user_id` (uuid, references auth.users)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  service text NOT NULL,
  doctor text,
  notes text,
  user_id uuid REFERENCES auth.users(id)
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for appointments
CREATE POLICY "Users can insert their own appointments"
  ON appointments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policies for contact messages
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Contact messages are readable by authenticated users"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);