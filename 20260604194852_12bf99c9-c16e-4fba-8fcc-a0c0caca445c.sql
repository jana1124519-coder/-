CREATE TABLE public.psych_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL,
  score NUMERIC,
  level TEXT,
  result_type TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.psych_results TO authenticated;
GRANT ALL ON public.psych_results TO service_role;
ALTER TABLE public.psych_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own results" ON public.psych_results FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX psych_results_user_idx ON public.psych_results(user_id, created_at DESC);