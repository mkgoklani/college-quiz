-- Run this query once in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Run

CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    team_name TEXT NOT NULL,
    college_name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 35,
    total_time_taken NUMERIC(6, 1) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone (participants) to submit their score
CREATE POLICY "Allow public insert to leaderboard"
ON public.leaderboard
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read leaderboard scores
CREATE POLICY "Allow public select on leaderboard"
ON public.leaderboard
FOR SELECT
USING (true);

-- Enable real-time broadcast for live updates on stage/projector
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;
