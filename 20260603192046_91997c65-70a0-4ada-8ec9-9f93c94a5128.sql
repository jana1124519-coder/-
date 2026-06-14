
-- Anonymous forum tables

CREATE TABLE public.forum_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  alias TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.forum_aliases TO authenticated;
GRANT SELECT ON public.forum_aliases TO anon;
GRANT ALL ON public.forum_aliases TO service_role;

ALTER TABLE public.forum_aliases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aliases public read" ON public.forum_aliases FOR SELECT USING (true);
CREATE POLICY "Users insert own alias" ON public.forum_aliases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own alias" ON public.forum_aliases FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_posts TO authenticated;
GRANT SELECT ON public.forum_posts TO anon;
GRANT ALL ON public.forum_posts TO service_role;

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts public read visible" ON public.forum_posts FOR SELECT USING (hidden = false OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Users delete own posts" ON public.forum_posts FOR DELETE USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE TRIGGER forum_posts_set_updated BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_comments TO authenticated;
GRANT SELECT ON public.forum_comments TO anon;
GRANT ALL ON public.forum_comments TO service_role;

ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments public read visible" ON public.forum_comments FOR SELECT USING (hidden = false OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert comments" ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own comments" ON public.forum_comments FOR UPDATE USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Users delete own comments" ON public.forum_comments FOR DELETE USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE TABLE public.forum_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.forum_comments(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_reports TO authenticated;
GRANT ALL ON public.forum_reports TO service_role;

ALTER TABLE public.forum_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view reports" ON public.forum_reports FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert reports" ON public.forum_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins update reports" ON public.forum_reports FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE INDEX idx_forum_posts_created ON public.forum_posts(created_at DESC);
CREATE INDEX idx_forum_comments_post ON public.forum_comments(post_id, created_at);
