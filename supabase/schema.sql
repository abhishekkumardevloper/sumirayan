-- Supabase-ready SQL migration for Sumirayan Design
-- Run in Supabase SQL editor. This creates schema, tables, indexes, policies and seeds.

-- 1) Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------------------------------
-- 2) users_meta: additional profile info for users
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users_meta (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_usersmeta_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users (id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_meta_user_id ON public.users_meta(user_id);

--------------------------------------------------------------------------------
-- 3) subscriptions
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  plan text NOT NULL DEFAULT 'free', -- free | pro
  status text NOT NULL DEFAULT 'inactive', -- inactive | active | cancelled | expired
  started_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_subscriptions_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users (id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

--------------------------------------------------------------------------------
-- 4) posts (learn articles)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  tag text,
  is_premium boolean NOT NULL DEFAULT false,
  is_featured boolean DEFAULT false,
  image_url text,
  read_time text,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_posts_author
    FOREIGN KEY (author_id)
    REFERENCES auth.users (id)
    ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_is_premium ON public.posts(is_premium);
CREATE INDEX IF NOT EXISTS idx_posts_tag ON public.posts(tag);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

--------------------------------------------------------------------------------
-- 5) events
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  location text,
  status text DEFAULT 'upcoming', -- upcoming | completed
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);

--------------------------------------------------------------------------------
-- 6) portfolio_items
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('design', 'photography', 'art')), -- design | photography | art
  short_description text,
  image_url text,
  client_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_items(category);

--------------------------------------------------------------------------------
-- 7) testimonials
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  company text,
  role text,
  quote text NOT NULL,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

--------------------------------------------------------------------------------
-- 8) jobs
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  location text,
  type text, -- Full-time | Part-time | Internship | Remote
  status text DEFAULT 'open', -- open | closed
  created_at timestamptz NOT NULL DEFAULT now()
);

--------------------------------------------------------------------------------
-- 9) applications
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid NOT NULL,
  applicant_name text NOT NULL,
  email text NOT NULL,
  resume_url text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_applications_job
    FOREIGN KEY (job_id)
    REFERENCES public.jobs (id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_applications_job_id ON public.applications(job_id);

--------------------------------------------------------------------------------
-- 10) project_requests
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid, -- optional if user is logged in
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text, -- design | photography | art | other
  budget text,
  message text,
  attachments jsonb, -- optional array of file metadata
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_projectrequests_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users (id)
    ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_project_requests_user_id ON public.project_requests(user_id);

--------------------------------------------------------------------------------
-- 11) Enable Row Level Security (RLS) where appropriate and add sample policies
--------------------------------------------------------------------------------

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_meta ENABLE ROW LEVEL SECURITY;

-- Policy: public can SELECT posts only if not premium
CREATE POLICY "public_select_non_premium_posts" ON public.posts
  FOR SELECT
  USING (is_premium = false);

-- Policy: authenticated users can SELECT all posts
CREATE POLICY "authenticated_select_posts" ON public.posts
  FOR SELECT
  USING (auth.role() = 'authenticated_user');

-- Policy: allow INSERT on project_requests for authenticated users and anonymous
CREATE POLICY "project_requests_insert_authenticated_or_anon" ON public.project_requests
  FOR INSERT
  WITH CHECK (
    (user_id IS NULL) OR (user_id = auth.uid())
  );

-- Policy: allow users to SELECT their own project_requests
CREATE POLICY "project_requests_select_owner" ON public.project_requests
  FOR SELECT
  USING (user_id IS NULL OR user_id = auth.uid());

-- Applications: allow INSERT (anyone can apply)
CREATE POLICY "applications_insert_allow" ON public.applications
  FOR INSERT
  WITH CHECK (true);

-- Subscriptions: only owner can SELECT and modify their subscription
CREATE POLICY "subscriptions_owner_access" ON public.subscriptions
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users meta: users can read their own profile, anyone can insert one for new signup
CREATE POLICY "users_meta_owner_access" ON public.users_meta
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "users_meta_owner_insert" ON public.users_meta
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

--------------------------------------------------------------------------------
-- 12) Seed data (sample)
--------------------------------------------------------------------------------
-- Posts
INSERT INTO public.posts (title, slug, excerpt, content, tag, is_premium, is_featured, image_url, read_time, author_id)
VALUES
('The Psychology of Color in Brand Design', 'psychology-of-color-brand-design', 'Understanding how color choices influence consumer perception and brand recognition.', 'Color is one of the most powerful tools in a designer''s arsenal. It can evoke emotions, create associations, and influence purchasing decisions. In this comprehensive guide, we explore the science behind color psychology and how to apply it effectively in brand design.

## The Science of Color Perception

Colors trigger specific psychological and emotional responses. Red stimulates excitement and urgency, while blue promotes trust and calm. Understanding these associations is crucial for effective branding.

## Practical Application

When designing a brand identity, consider your target audience, industry norms, and the emotions you want to evoke. A healthcare brand might lean towards blues and greens for their calming effect, while a sports brand might use bold reds and oranges for energy.

## Case Study: Rebranding Success

We recently helped a tech startup transition from a generic blue palette to a distinctive orange and navy combination, resulting in a 40% increase in brand recall.', 'Design', false, true, '/tech-startup-branding-dark.jpg', '8 min read', NULL),
('Mastering Natural Light Photography', 'mastering-natural-light-photography', 'Tips and techniques for capturing stunning photos using available light.', 'Natural light photography is an art form that requires understanding, patience, and practice. This guide will help you harness the power of available light to create stunning images.

## Golden Hour Magic

The hour after sunrise and before sunset provides the most flattering light for photography. The warm, diffused quality creates depth and dimension in your subjects.

## Working with Harsh Midday Sun

Don''t put your camera away at noon. Learn to use harsh shadows creatively or find open shade for softer, more even lighting.

## Indoor Natural Light

Position subjects near windows for beautiful, directional light. Use white surfaces as natural reflectors to fill in shadows.', 'Photography', false, false, '/elegant-wedding-photography-dark.jpg', '6 min read', NULL),
('The Renaissance of Digital Art', 'renaissance-of-digital-art', 'How technology is reshaping the art world and creating new possibilities.', 'Digital art has evolved from a niche medium to a dominant force in contemporary art. This article explores how technology is democratizing art creation and opening new frontiers for creative expression.

## The Tools Revolution

From Procreate to Photoshop, digital tools have made art creation more accessible than ever. Artists can experiment freely without the cost of traditional materials.

## NFTs and Digital Ownership

The rise of blockchain technology has created new ways for digital artists to monetize their work and prove authenticity.

## The Future of Art

As AI tools become more sophisticated, the definition of art itself is being questioned. What remains constant is the human vision and creativity that drives meaningful artistic expression.', 'Art History', true, false, '/abstract-digital-art-dark.jpg', '10 min read', NULL)
ON CONFLICT DO NOTHING;

-- Events
INSERT INTO public.events (title, description, date, location, status, image_url)
VALUES
('Creativity Conference 2025', 'Annual gathering of creative minds featuring workshops, talks, and networking opportunities. Join industry leaders as they share insights on the future of design, photography, and digital art.', '2025-03-15', 'Mumbai, India', 'upcoming', '/creative-team-working-together-in-modern-studio.jpg'),
('Photography Masterclass', 'Intensive workshop on advanced photography techniques and post-processing. Learn from professional photographers and take your skills to the next level.', '2025-02-28', 'Virtual Event', 'upcoming', '/professional-portrait-dark.jpg'),
('Art Exhibition: Visions', 'Showcase of our artists'' latest works exploring themes of identity and culture. Experience breathtaking pieces that challenge perception and inspire creativity.', '2025-01-10', 'Delhi Art Gallery', 'completed', '/abstract-digital-art-dark.jpg'),
('Brand Strategy Workshop', 'Interactive session on building memorable brand identities in the digital age. Perfect for entrepreneurs, marketers, and design enthusiasts.', '2024-12-05', 'Bangalore', 'completed', '/tech-startup-branding-dark.jpg')
ON CONFLICT DO NOTHING;

-- Portfolio items
INSERT INTO public.portfolio_items (title, category, short_description, image_url, client_name)
VALUES
('Tech Startup Rebrand', 'design', 'Complete brand identity transformation for a growing tech company', '/tech-startup-branding-dark.jpg', 'TechVista Inc.'),
('Food Festival Campaign', 'design', 'Vibrant campaign design for annual food festival', '/food-festival-campaign-dark.jpg', 'Mumbai Food Fest'),
('Luxury Watch Launch', 'design', 'Premium advertising campaign for luxury timepiece collection', '/luxury-watch-advertisement-dark.jpg', 'Chronos Watches'),
('Brand Evolution Project', 'design', 'Strategic rebranding initiative for established business', '/brand-evolution-project-dark.jpg', 'Heritage Corp'),
('Royal Wedding', 'photography', 'Elegant wedding photography capturing timeless moments', '/elegant-wedding-photography-dark.jpg', 'Private Client'),
('Corporate Gala', 'photography', 'Full event coverage for annual corporate celebration', '/corporate-event-photography-dark.jpg', 'Fortune 500 Company'),
('Jewelry Collection', 'photography', 'Product photography for exclusive jewelry line', '/jewelry-product-photography-dark.jpg', 'Gemstone Gallery'),
('CEO Portrait', 'photography', 'Executive portrait session for company leadership', '/professional-portrait-dark.jpg', 'Tech Innovators'),
('Fashion Film', 'photography', 'Cinematic advertising content for fashion brand', '/fashion-film-still-dark.jpg', 'Vogue Studios'),
('Cinematic Wedding', 'photography', 'Documentary-style wedding film production', '/cinematic-wedding-dark.jpg', 'Private Client'),
('Abstract Expressions', 'art', 'Contemporary digital artwork exploring abstract themes', '/abstract-digital-art-dark.jpg', 'Modern Art Gallery'),
('Landscape Oil', 'art', 'Traditional oil painting of scenic landscapes', '/oil-painting-landscape-dark.jpg', 'Private Collector'),
('Corporate Mural', 'art', 'Large-scale mural installation for office space', '/corporate-wall-mural-dark.jpg', 'Creative Agency HQ'),
('Character Study', 'art', 'Detailed pencil sketch series', '/detailed-pencil-sketch-dark.jpg', 'Art Institute')
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO public.testimonials (client_name, company, role, quote, avatar_url)
VALUES
('Priya Sharma', 'TechVista', 'Marketing Director', 'Sumirayan Design transformed our brand identity completely. Their creative approach and attention to detail exceeded all expectations. The campaign they designed increased our engagement by 300%.', '/placeholder-user.jpg'),
('Rajesh Kumar', 'EventMasters', 'Founder', 'The photography team captured our corporate event beautifully. Every moment was preserved with artistic precision. We''ve been working with them for 3 years now.', '/placeholder-user.jpg'),
('Ananya Patel', 'Interior Design Studio', 'Interior Designer', 'The custom mural they created for our client''s office is absolutely stunning. It became the centerpiece of the entire space. True artists with incredible vision.', '/placeholder-user.jpg'),
('Vikram Singh', 'Fashion Forward', 'Creative Director', 'Their fashion photography elevated our brand to international standards. The attention to lighting and composition is unmatched in the industry.', '/placeholder-user.jpg'),
('Meera Joshi', 'Startup Hub', 'CEO', 'From branding to digital marketing, Sumirayan has been our go-to creative partner. They understand business goals and translate them into visual excellence.', '/placeholder-user.jpg')
ON CONFLICT DO NOTHING;

-- Jobs
INSERT INTO public.jobs (title, description, location, type, status)
VALUES
('Senior Video Editor', 'Experienced with Premiere Pro/After Effects. Social content and commercial editing.', 'Remote', 'Full-time', 'open'),
('Graphic Designer', 'Strong portfolio in branding and digital design. Proficiency in Adobe Suite required.', 'Mumbai, India', 'Full-time', 'open'),
('Photographer (Freelance)', 'Product, portrait, and event photography. Flexible hours.', 'Bangalore, India', 'Freelance', 'open')
ON CONFLICT DO NOTHING;

-- Applications sample
INSERT INTO public.applications (job_id, applicant_name, email, resume_url, message)
VALUES
((SELECT id FROM public.jobs WHERE title = 'Senior Video Editor' LIMIT 1), 'Priya Sharma', 'priya@example.com', 'https://example.com/resume/priya.pdf', 'I am excited to apply with 5+ years of video editing experience.')
ON CONFLICT DO NOTHING;

-- Project request sample
INSERT INTO public.project_requests (name, email, phone, project_type, budget, message)
VALUES
('Sandeep Kumar', 'sandeep@example.com', '9876543210', 'design', '<₹50k', 'We want a complete brand refresh for our startup.')
ON CONFLICT DO NOTHING;
