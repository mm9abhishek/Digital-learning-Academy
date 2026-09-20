import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export interface SupabaseStatus {
  isConfigured: boolean;
  isConnected: boolean;
  supabaseUrl: string | null;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  message: string;
  error?: string;
  tablesStatus?: Record<string, { exists: boolean; rowCount: number }>;
}

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client if SUPABASE_URL and key are provided.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL?.trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim());

  if (!url || !key || url.includes('your-project-id') || key.includes('your-anon-key')) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return cachedClient;
}

/**
 * Test connectivity to the configured Supabase database.
 */
export async function testSupabaseConnection(): Promise<SupabaseStatus> {
  const url = process.env.SUPABASE_URL?.trim() || null;
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim() || null;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;

  const isConfigured = Boolean(
    url &&
    !url.includes('your-project-id') &&
    (anonKey || serviceKey) &&
    !anonKey?.includes('your-anon-key')
  );

  if (!isConfigured) {
    return {
      isConfigured: false,
      isConnected: false,
      supabaseUrl: url,
      hasAnonKey: Boolean(anonKey && !anonKey.includes('your-anon-key')),
      hasServiceRoleKey: Boolean(serviceKey),
      message: 'Supabase credentials not yet provided in environment. Operating with local PostgreSQL engine.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      isConfigured: true,
      isConnected: false,
      supabaseUrl: url,
      hasAnonKey: Boolean(anonKey),
      hasServiceRoleKey: Boolean(serviceKey),
      message: 'Failed to initialize Supabase client from provided credentials.',
      error: 'Invalid Supabase URL or API Key format.',
    };
  }

  // Probe known tables in Supabase
  const tablesToCheck = ['users', 'courses', 'lessons', 'assignments', 'submissions', 'simulator_runs', 'portfolio_projects'];
  const tablesStatus: Record<string, { exists: boolean; rowCount: number }> = {};
  let anyTableFound = false;
  let connectionError: string | undefined;

  for (const tbl of tablesToCheck) {
    try {
      const { count, error } = await client
        .from(tbl)
        .select('*', { count: 'exact', head: true });

      if (error) {
        // Table might not exist yet in Supabase schema
        tablesStatus[tbl] = { exists: false, rowCount: 0 };
      } else {
        tablesStatus[tbl] = { exists: true, rowCount: count || 0 };
        anyTableFound = true;
      }
    } catch (e: any) {
      tablesStatus[tbl] = { exists: false, rowCount: 0 };
      connectionError = e?.message;
    }
  }

  return {
    isConfigured: true,
    isConnected: anyTableFound || !connectionError,
    supabaseUrl: url,
    hasAnonKey: Boolean(anonKey),
    hasServiceRoleKey: Boolean(serviceKey),
    message: anyTableFound
      ? `Successfully connected to live Supabase database at ${url}.`
      : `Connected to Supabase project at ${url}, but database tables need to be created using the SQL script.`,
    error: connectionError,
    tablesStatus,
  };
}

/**
 * Seed data from local in-memory DB into connected Supabase project.
 */
export async function seedSupabaseFromLocal(localDb: any): Promise<{
  success: boolean;
  message: string;
  seededCounts: Record<string, number>;
  error?: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase client is not configured.',
      seededCounts: {},
      error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY.',
    };
  }

  const seededCounts: Record<string, number> = {};

  try {
    // 1. Users
    if (localDb.users && localDb.users.length > 0) {
      const usersPayload = localDb.users.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password || 'Student@2026',
        role: u.role,
        title: u.title || '',
        college_or_company: u.collegeOrCompany || '',
        city: u.city || '',
        xp: u.xp || 0,
        streak_days: u.streakDays || 1,
      }));

      const { error } = await client.from('users').upsert(usersPayload, { onConflict: 'id' });
      if (!error) seededCounts['users'] = usersPayload.length;
    }

    // 2. Courses
    if (localDb.courses && localDb.courses.length > 0) {
      const coursesPayload = localDb.courses.map((c: any) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        business_name: c.businessName,
        business_location: c.businessLocation,
        category: c.category,
        difficulty: c.difficulty,
        total_lessons: c.totalLessons,
        total_assignments: c.totalAssignments,
      }));

      const { error } = await client.from('courses').upsert(coursesPayload, { onConflict: 'id' });
      if (!error) seededCounts['courses'] = coursesPayload.length;
    }

    // 3. Lessons
    if (localDb.lessons && localDb.lessons.length > 0) {
      const lessonsPayload = localDb.lessons.map((l: any) => ({
        id: l.id,
        course_id: l.courseId,
        order: l.order,
        title: l.title,
        category: l.category,
        estimated_minutes: l.estimatedMinutes,
        assignment_id: l.assignmentId,
      }));

      const { error } = await client.from('lessons').upsert(lessonsPayload, { onConflict: 'id' });
      if (!error) seededCounts['lessons'] = lessonsPayload.length;
    }

    // 4. Assignments
    if (localDb.assignments && localDb.assignments.length > 0) {
      const assignmentsPayload = localDb.assignments.map((a: any) => ({
        id: a.id,
        lesson_id: a.lessonId,
        title: a.title,
        client_brief: a.clientBrief,
        target_objective: a.targetObjective,
      }));

      const { error } = await client.from('assignments').upsert(assignmentsPayload, { onConflict: 'id' });
      if (!error) seededCounts['assignments'] = assignmentsPayload.length;
    }

    return {
      success: true,
      message: `Successfully synchronized seed records to Supabase tables.`,
      seededCounts,
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Failed to sync seed data to Supabase.',
      seededCounts,
      error: err?.message,
    };
  }
}

/**
 * The standard Supabase SQL migration string that creates all required tables and indexes.
 */
export const SUPABASE_SQL_MIGRATION = `-- SkillSprint AI: Complete Supabase PostgreSQL Schema & Bootstrap
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'student',
  title VARCHAR(255),
  college_or_company VARCHAR(255),
  city VARCHAR(128),
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_location VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  difficulty VARCHAR(32) NOT NULL,
  total_lessons INTEGER DEFAULT 6,
  total_assignments INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) REFERENCES public.courses(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  assignment_id VARCHAR(64)
);

-- 4. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
  id VARCHAR(64) PRIMARY KEY,
  lesson_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_brief TEXT NOT NULL,
  target_objective TEXT NOT NULL
);

-- 5. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  assignment_id VARCHAR(64) NOT NULL,
  version INTEGER DEFAULT 1,
  submitted_content TEXT,
  overall_score INTEGER,
  grade VARCHAR(16),
  strengths TEXT[],
  improvements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Simulator Runs Table
CREATE TABLE IF NOT EXISTS public.simulator_runs (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  scenario_title VARCHAR(255) NOT NULL,
  impressions INTEGER NOT NULL,
  clicks INTEGER NOT NULL,
  conversions INTEGER NOT NULL,
  ctr_percent NUMERIC(5,2),
  cpl_inr NUMERIC(10,2),
  roas NUMERIC(6,2) NOT NULL,
  total_spend_inr INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  ai_score INTEGER,
  simulated_roas NUMERIC(6,2),
  share_token VARCHAR(64) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulator_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Permissive read policies for educational demo
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Allow public read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Allow public read simulator_runs" ON public.simulator_runs FOR SELECT USING (true);
CREATE POLICY "Allow public read portfolio_projects" ON public.portfolio_projects FOR SELECT USING (true);

-- Permissive insert/update policies for demo
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert simulator_runs" ON public.simulator_runs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert portfolio_projects" ON public.portfolio_projects FOR INSERT WITH CHECK (true);
`;
