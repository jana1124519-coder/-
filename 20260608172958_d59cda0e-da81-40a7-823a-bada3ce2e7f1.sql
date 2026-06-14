CREATE TABLE public.symptom_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lang TEXT NOT NULL DEFAULT 'ar',
  symptoms TEXT[] NOT NULL DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.symptom_results TO authenticated;
GRANT ALL ON public.symptom_results TO service_role;
ALTER TABLE public.symptom_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own symptom results" ON public.symptom_results
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.voice_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'voice-chat',
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'ar',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.voice_memory TO authenticated;
GRANT ALL ON public.voice_memory TO service_role;
ALTER TABLE public.voice_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own voice memory" ON public.voice_memory
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX voice_memory_user_channel_idx ON public.voice_memory(user_id, channel, created_at);