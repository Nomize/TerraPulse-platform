-- Create activities table for tracking user activities
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  quantity integer NOT NULL,
  location text,
  points_earned integer NOT NULL DEFAULT 0,
  details text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own activities
CREATE POLICY "Users can view own activities"
ON public.activities
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can insert their own activities
CREATE POLICY "Users can insert own activities"
ON public.activities
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_activities_user_created ON public.activities(user_id, created_at DESC);