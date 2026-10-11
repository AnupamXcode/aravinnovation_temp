-- ==============================================================================
-- ARAV INNOVATIONS — Supabase Migration: Phase 1 (Persistent Leads & Admin Auth)
-- Migration ID: 20261011000000_create_submissions.sql
-- ==============================================================================

-- 1. Create public.admin_profiles table for verified RBAC admin access
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin profiles policies
CREATE POLICY "Admins can view their own profile"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Helper security function to verify whether current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid()
      AND role IN ('superadmin', 'admin')
  );
$$;

-- 2. Create public.submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  requirement TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT,
  industry TEXT,
  original_query TEXT,
  conversation_context JSONB,
  source TEXT NOT NULL DEFAULT 'website_form',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed', 'qualified', 'archived')),
  ip_address TEXT,
  company_email_status TEXT DEFAULT 'PENDING' CHECK (company_email_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')),
  user_email_status TEXT DEFAULT 'PENDING' CHECK (user_email_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for high-performance sorting, filtering and deduplication
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON public.submissions (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions (status);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON public.submissions (email);
CREATE INDEX IF NOT EXISTS idx_submissions_source ON public.submissions (source);

-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_submissions_updated_at ON public.submissions;
CREATE TRIGGER set_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Row Level Security (RLS) on public.submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Rule 1: STRICT PRIVACY — Public / Anonymous users CANNOT read submissions
-- (No SELECT policy for anon or public users)

-- Rule 2: Verified Administrators can SELECT submissions
CREATE POLICY "Admins can view all submissions"
  ON public.submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Rule 3: Verified Administrators can UPDATE submissions (e.g. change status)
CREATE POLICY "Admins can update submissions"
  ON public.submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Rule 4: Verified Administrators can DELETE submissions
CREATE POLICY "Admins can delete submissions"
  ON public.submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Note: Incoming public leads from /api/lead are inserted via Server Route Handler
-- using the privileged SUPABASE_SERVICE_ROLE_KEY, completely preventing client exposure
-- while safely enforcing server-side Zod validation, sanitization, and spam detection.
