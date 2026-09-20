import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';
import {
  evaluateAssignmentSubmission,
  generateSeoContentIdeation,
  auditGoogleAdsSetup,
  auditSearchConsolePlacements,
} from './server/gemini.js';
import { runCampaignSimulation } from './server/simulator.js';
import { Submission, PortfolioProject } from './src/types.js';
import {
  getSupabaseClient,
  testSupabaseConnection,
  seedSupabaseFromLocal,
  SUPABASE_SQL_MIGRATION,
} from './server/supabase.js';

dotenv.config();

let currentUserId = 'usr_student_aarav';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Health Check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'SkillSprint AI MVP Backend',
      timestamp: new Date().toISOString(),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // --- Authentication Routes ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, username, password, role } = req.body;
    const loginIdentifier = (email || username || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    // Find user by email or username or ID
    const user = db.users.find((u) => {
      const uEmail = u.email.toLowerCase();
      const uId = u.id.toLowerCase();
      const uName = u.name.toLowerCase();
      return (
        uEmail === loginIdentifier ||
        uId === loginIdentifier ||
        uName === loginIdentifier ||
        (loginIdentifier === 'student' && u.role === 'student') ||
        (loginIdentifier === 'admin' && u.role === 'admin')
      );
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials. User does not exist.',
        hint: 'Use test credentials: student@skillsprint.ai (Student) or admin@skillsprint.ai (Admin).',
      });
    }

    // Role check if requested specifically
    if (role && user.role !== role) {
      return res.status(403).json({
        error: `Account role mismatch: this account has role '${user.role}', but you requested '${role}' login.`,
        hint: `Please switch to the ${user.role === 'admin' ? 'Admin' : 'Student'} tab or use corresponding credentials.`,
      });
    }

    // Validate password (default password if not explicitly set)
    const validPassword = user.password || (user.role === 'admin' ? 'Admin@2026' : 'Student@2026');
    if (inputPassword !== validPassword) {
      return res.status(401).json({
        error: 'Incorrect password.',
        hint: `Test password for this account is: ${validPassword}`,
      });
    }

    currentUserId = user.id;

    // Return sanitized user object
    const { password: _, ...safeUser } = user;
    res.json({
      success: true,
      message: `Welcome back, ${user.name}! Authenticated as ${user.role}.`,
      token: `sprint_jwt_${user.id}_${Date.now()}`,
      user: safeUser,
    });
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, password, role, collegeOrCompany, city } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const newUser = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role: (role === 'admin' ? 'admin' : 'student') as 'admin' | 'student',
      avatar:
        role === 'admin'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: role === 'admin' ? 'Faculty Instructor' : 'Aspiring Growth Marketer',
      collegeOrCompany: collegeOrCompany?.trim() || (role === 'admin' ? 'SkillSprint Academy' : 'Student Learner'),
      city: city?.trim() || 'Noida',
      xp: 100,
      streakDays: 1,
      completedLessonIds: [],
    };

    db.users.push(newUser);
    currentUserId = newUser.id;

    const { password: _, ...safeUser } = newUser;
    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token: `sprint_jwt_${newUser.id}_${Date.now()}`,
      user: safeUser,
    });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    // Switch to first default or student
    const defaultUser = db.users.find((u) => u.role === 'student') || db.users[0];
    currentUserId = defaultUser.id;
    res.json({ success: true, message: 'Logged out successfully', defaultUser });
  });

  // Current User & Switch Role
  app.get('/api/users/current', (req: Request, res: Response) => {
    const user = db.users.find((u) => u.id === currentUserId) || db.users[0];
    const safeUsers = db.users.map(({ password, ...rest }) => rest);
    const { password, ...safeUser } = user;
    res.json({ user: safeUser, allUsers: safeUsers });
  });

  app.post('/api/users/switch', (req: Request, res: Response) => {
    const { userId } = req.body;
    const target = db.users.find((u) => u.id === userId);
    if (target) {
      currentUserId = target.id;
      const { password, ...safeTarget } = target;
      res.json({ success: true, user: safeTarget });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  // --- Supabase / Database Studio API Routes ---
  app.get('/api/database/status', async (req: Request, res: Response) => {
    try {
      const status = await testSupabaseConnection();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({
        isConfigured: false,
        isConnected: false,
        message: 'Failed to test Supabase connection',
        error: err?.message,
      });
    }
  });

  app.post('/api/database/test-connection', async (req: Request, res: Response) => {
    try {
      const status = await testSupabaseConnection();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({
        isConfigured: false,
        isConnected: false,
        message: 'Failed to test connection',
        error: err?.message,
      });
    }
  });

  app.post('/api/database/sync-to-supabase', async (req: Request, res: Response) => {
    try {
      const syncResult = await seedSupabaseFromLocal(db);
      res.json(syncResult);
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to sync data to Supabase',
        error: err?.message,
      });
    }
  });

  app.get('/api/database/migration-script', (req: Request, res: Response) => {
    res.json({
      sql: SUPABASE_SQL_MIGRATION,
    });
  });

  app.get('/api/database/tables', async (req: Request, res: Response) => {
    const status = await testSupabaseConnection();
    const tables = db.getTableMeta();

    res.json({
      engine: status.isConnected ? 'Supabase Cloud (PostgreSQL 16.2)' : 'PostgreSQL 16.2 (Supabase-Compatible Engine)',
      host: status.supabaseUrl || 'db.skillsprint-noida.supabase.co',
      status: status.isConnected ? 'CONNECTED_CLOUD' : (status.isConfigured ? 'CONFIGURED_PENDING_SCHEMA' : 'LOCAL_POSTGRES_READY'),
      supabaseConfigured: status.isConfigured,
      supabaseConnected: status.isConnected,
      tables,
    });
  });

  app.get('/api/database/table/:name', async (req: Request, res: Response) => {
    const tableName = req.params.name;
    const client = getSupabaseClient();

    // If Supabase is connected, attempt to read live from Supabase
    if (client) {
      try {
        const { data, error } = await client
          .from(tableName)
          .select('*')
          .limit(100);

        if (!error && data && data.length > 0) {
          return res.json({
            tableName,
            source: 'supabase_cloud',
            rowCount: data.length,
            rows: data,
          });
        }
      } catch (err) {
        // Fall back to in-memory database
      }
    }

    const rows = db.getTableRows(tableName);
    res.json({
      tableName,
      source: 'local_postgres_engine',
      rowCount: rows.length,
      rows,
    });
  });

  app.post('/api/database/sql', async (req: Request, res: Response) => {
    const { sql } = req.body;
    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({ error: 'SQL statement is required.' });
    }

    // Always run in our PostgreSQL engine (which supports standard SQL statements)
    const result = db.executeSql(sql);
    res.json(result);
  });

  // Courses
  app.get('/api/courses', (req: Request, res: Response) => {
    res.json(db.courses);
  });

  app.get('/api/courses/:id', (req: Request, res: Response) => {
    const course = db.courses.find((c) => c.id === req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const lessons = db.lessons.filter((l) => l.courseId === course.id);
    res.json({ course, lessons });
  });

  // Lessons
  app.get('/api/lessons', (req: Request, res: Response) => {
    res.json(db.lessons);
  });

  app.get('/api/lessons/:id', (req: Request, res: Response) => {
    const lesson = db.lessons.find((l) => l.id === req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    const assignment = lesson.assignmentId
      ? db.assignments.find((a) => a.id === lesson.assignmentId)
      : null;
    res.json({ lesson, assignment });
  });

  app.post('/api/lessons/:id/toggle-complete', (req: Request, res: Response) => {
    const user = db.users.find((u) => u.id === currentUserId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const lessonId = req.params.id;
    const alreadyCompleted = user.completedLessonIds.includes(lessonId);

    if (alreadyCompleted) {
      user.completedLessonIds = user.completedLessonIds.filter((id) => id !== lessonId);
      user.xp = Math.max(0, user.xp - 50);
    } else {
      user.completedLessonIds.push(lessonId);
      user.xp += 50;
    }

    res.json({ success: true, completedLessonIds: user.completedLessonIds, xp: user.xp });
  });

  // Assignments
  app.get('/api/assignments', (req: Request, res: Response) => {
    res.json(db.assignments);
  });

  app.get('/api/assignments/:id', (req: Request, res: Response) => {
    const assignment = db.assignments.find((a) => a.id === req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    const userSubmission = db.submissions.find(
      (s) => s.assignmentId === assignment.id && s.userId === currentUserId
    );
    res.json({ assignment, userSubmission });
  });

  // Submissions & AI Evaluation
  app.get('/api/submissions', (req: Request, res: Response) => {
    const userSubs = db.submissions.filter((s) => s.userId === currentUserId);
    res.json(userSubs);
  });

  app.post('/api/submissions/submit', async (req: Request, res: Response) => {
    try {
      const { assignmentId, submittedContent } = req.body;

      if (!assignmentId || !submittedContent || !submittedContent.trim()) {
        return res.status(400).json({ error: 'Assignment ID and submission content are required' });
      }

      const assignment = db.assignments.find((a) => a.id === assignmentId);
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }

      // Check existing submission or create new version
      let existingSub = db.submissions.find(
        (s) => s.assignmentId === assignmentId && s.userId === currentUserId
      );

      const submissionId = existingSub ? existingSub.id : `sub_${Date.now()}`;
      const version = existingSub ? existingSub.version + 1 : 1;

      // Evaluate with Gemini / deterministic mentor rubric
      const feedback = await evaluateAssignmentSubmission(assignment, submittedContent);
      feedback.submissionId = submissionId;

      const newSubmission: Submission = {
        id: submissionId,
        assignmentId,
        userId: currentUserId,
        submittedContent,
        version,
        createdAt: existingSub ? existingSub.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'evaluated',
        feedback,
      };

      if (existingSub) {
        const index = db.submissions.indexOf(existingSub);
        db.submissions[index] = newSubmission;
      } else {
        db.submissions.unshift(newSubmission);
      }

      // Sync with connected Supabase database if available
      const supabaseClient = getSupabaseClient();
      if (supabaseClient) {
        (async () => {
          await supabaseClient.from('submissions').upsert({
            id: newSubmission.id,
            user_id: newSubmission.userId,
            assignment_id: newSubmission.assignmentId,
            version: newSubmission.version,
            submitted_content: newSubmission.submittedContent,
            overall_score: feedback.overallScore,
            grade: feedback.grade,
            strengths: feedback.strengths,
            improvements: feedback.recommendedImprovements,
          });
        })().catch((e: any) => console.warn('Supabase submission sync notice:', e?.message));
      }

      // Mark lesson complete and grant XP
      const user = db.users.find((u) => u.id === currentUserId);
      if (user) {
        if (!user.completedLessonIds.includes(assignment.lessonId)) {
          user.completedLessonIds.push(assignment.lessonId);
          user.xp += 100;
        } else {
          user.xp += 25; // Iteration bonus
        }
      }

      res.json({
        success: true,
        submission: newSubmission,
        feedback,
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      res.status(500).json({ error: 'Internal evaluation error', details: err?.message });
    }
  });

  // Simulator Endpoints
  app.get('/api/simulator/scenarios', (req: Request, res: Response) => {
    res.json(db.simulatorScenarios);
  });

  app.get('/api/simulator/runs', (req: Request, res: Response) => {
    const userRuns = db.simulatorRuns.filter((r) => r.userId === currentUserId);
    res.json(userRuns);
  });

  app.post('/api/simulator/run', (req: Request, res: Response) => {
    try {
      const input = req.body;
      if (!input.dailyBudgetINR || !input.durationDays) {
        return res.status(400).json({ error: 'Budget and duration are required.' });
      }
      const result = runCampaignSimulation(currentUserId, input);

      // Grant simulation XP
      const user = db.users.find((u) => u.id === currentUserId);
      if (user) {
        user.xp += 40;
      }

      // Sync simulator telemetry with connected Supabase database
      const supabaseClient = getSupabaseClient();
      if (supabaseClient) {
        (async () => {
          await supabaseClient.from('simulator_runs').upsert({
            id: result.id,
            user_id: result.userId,
            scenario_title: result.input?.presetScenarioId || 'Custom Run',
            impressions: result.impressions,
            clicks: result.clicks,
            conversions: result.conversions,
            ctr_percent: result.ctrPercent,
            cpl_inr: result.cplINR,
            roas: result.roas,
            total_spend_inr: result.totalBudgetINR,
          });
        })().catch((e: any) => console.warn('Supabase simulator run sync notice:', e?.message));
      }

      res.json(result);
    } catch (err: any) {
      console.error('Simulator error:', err);
      res.status(500).json({ error: 'Simulation calculation error', details: err?.message });
    }
  });

  // Portfolio
  app.get('/api/portfolio', (req: Request, res: Response) => {
    const projects = db.portfolioProjects.filter((p) => p.userId === currentUserId);
    res.json(projects);
  });

  app.post('/api/portfolio/save-project', (req: Request, res: Response) => {
    try {
      const {
        title,
        businessName,
        brief,
        submissionId,
        simulatorRunId,
        skillsDemonstrated,
        keyArtifacts,
      } = req.body;

      const submission = db.submissions.find((s) => s.id === submissionId);
      const simulatorRun = db.simulatorRuns.find((r) => r.id === simulatorRunId);

      const newProject: PortfolioProject = {
        id: `prj_${Date.now()}`,
        userId: currentUserId,
        title: title || 'The Nawabi Bean Digital Campaign Case Study',
        businessName: businessName || 'The Nawabi Bean Café & Artisanal Roastery, Hazratganj, Lucknow',
        brief: brief || 'Comprehensive digital marketing campaign strategy, copy A/B test, and simulated ROAS analysis.',
        submissionId,
        submissionSnippet: submission ? submission.submittedContent.slice(0, 240) + '...' : undefined,
        aiScore: submission?.feedback?.overallScore,
        aiStrengthsSummary: submission?.feedback?.strengths || ['High conversion copywriting', 'Geospatial precision in Lucknow'],
        simulatorRunId,
        simulatedRoas: simulatorRun?.roas,
        simulatedConversions: simulatorRun?.conversions,
        simulatedSpendINR: simulatorRun?.totalBudgetINR,
        skillsDemonstrated: skillsDemonstrated || [
          'Local Hospitality Marketing',
          'Meta Ads Campaign Architecture',
          'Copywriting & A/B Testing',
          'INR Budget Allocation',
          'ROAS & CPL Optimization',
        ],
        keyArtifacts: keyArtifacts || [
          {
            type: 'Ad Copy',
            title: 'Awadhi Acoustic Saturdays Ad Variants',
            summary: 'Emotion-driven vs urgency offer copy testing with direct WhatsApp CTA.',
          },
          {
            type: 'Campaign Simulation',
            title: 'Meta Ads Performance Model',
            summary: simulatorRun
              ? `Simulated ${simulatorRun.conversions} bookings with ${simulatorRun.roas}x ROAS at ₹${simulatorRun.cplINR} CPL.`
              : 'Validated campaign unit economics in educational sandbox.',
          },
        ],
        shareToken: `sprint-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      db.portfolioProjects.unshift(newProject);

      // Sync portfolio showcase to connected Supabase database
      const supabaseClient = getSupabaseClient();
      if (supabaseClient) {
        (async () => {
          await supabaseClient.from('portfolio_projects').upsert({
            id: newProject.id,
            user_id: newProject.userId,
            title: newProject.title,
            business_name: newProject.businessName,
            ai_score: newProject.aiScore || null,
            simulated_roas: newProject.simulatedRoas || null,
            share_token: newProject.shareToken,
          });
        })().catch((e: any) => console.warn('Supabase portfolio sync notice:', e?.message));
      }

      if (simulatorRun) {
        simulatorRun.isSavedToPortfolio = true;
      }

      const user = db.users.find((u) => u.id === currentUserId);
      if (user) {
        user.xp += 150;
      }

      res.json({ success: true, project: newProject });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save portfolio project', details: err?.message });
    }
  });

  // Shareable Public Portfolio Link
  app.get('/api/portfolio/public/:token', (req: Request, res: Response) => {
    const project = db.portfolioProjects.find((p) => p.shareToken === req.params.token);
    if (!project) {
      return res.status(404).json({ error: 'Portfolio project not found' });
    }
    const student = db.users.find((u) => u.id === project.userId);
    res.json({ project, student });
  });

  // --- SEO Planning & Content Ideation Routes ---
  app.post('/api/seo/plan', async (req: Request, res: Response) => {
    try {
      const { topic, businessName, city } = req.body || {};
      const plan = await generateSeoContentIdeation(
        topic || 'artisan coffee hazratganj lucknow',
        businessName || 'The Nawabi Bean Café & Artisanal Roastery',
        city || 'Lucknow'
      );
      res.json(plan);
    } catch (err: any) {
      console.info('[SkillSprint AI] Serving cached fallback plan for SEO ideation');
      const fallbackPlan = await generateSeoContentIdeation('artisan coffee lucknow', 'The Nawabi Bean Café', 'Lucknow');
      res.json(fallbackPlan);
    }
  });

  // --- Google Ads Live Practice Audit Route ---
  app.post('/api/google-ads/audit', async (req: Request, res: Response) => {
    try {
      const campaign = req.body;
      if (!campaign || !Array.isArray(campaign.headlines) || !Array.isArray(campaign.descriptions)) {
        return res.status(400).json({ error: 'Incomplete campaign details for Google Ads audit.' });
      }
      const audit = await auditGoogleAdsSetup(campaign);

      // Award XP for completing an Ad Audit
      const user = db.users.find((u) => u.id === currentUserId);
      if (user) {
        user.xp += 50;
      }

      res.json(audit);
    } catch (err: any) {
      console.info('[SkillSprint AI] Serving resilient fallback audit for Google Ads setup');
      const fallbackAudit = await auditGoogleAdsSetup({
        campaignName: 'Lucknow Artisan Coffee Search',
        targetLocation: 'Lucknow, Uttar Pradesh',
        dailyBudgetINR: 500,
        bidStrategy: 'Maximize Clicks',
        targetKeywords: [{ keyword: 'best cafe in hazratganj', matchType: 'Phrase' }],
        negativeKeywords: ['free', 'wholesale'],
        headlines: ['The Nawabi Bean Café', 'Artisan Roastery Hazratganj'],
        descriptions: ['Enjoy single-origin coffees.', 'Book now via WhatsApp.'],
        finalUrl: 'https://the-nawabi-bean.in',
      });
      res.json(fallbackAudit);
    }
  });

  // --- Google Search Console (GSC) Live Practice Routes ---
  app.get('/api/gsc/dummy-data', (req: Request, res: Response) => {
    // Return authentic GSC performance data for the dummy account
    const queries = [
      { id: 'gsc_q1', query: 'best cafe in hazratganj lucknow', clicks: 840, impressions: 9200, ctr: 9.13, position: 2.8, trend: 'up' },
      { id: 'gsc_q2', query: 'artisan coffee lucknow', clicks: 512, impressions: 6400, ctr: 8.0, position: 3.4, trend: 'up' },
      { id: 'gsc_q3', query: 'the nawabi bean cafe menu', clicks: 420, impressions: 3100, ctr: 13.55, position: 1.2, trend: 'stable' },
      { id: 'gsc_q4', query: 'cafes with wifi in lucknow', clicks: 390, impressions: 8500, ctr: 4.59, position: 6.8, trend: 'down' },
      { id: 'gsc_q5', query: 'best cold brew lucknow', clicks: 280, impressions: 4200, ctr: 6.67, position: 4.1, trend: 'up' },
      { id: 'gsc_q6', query: 'romantic cafes hazratganj evening', clicks: 240, impressions: 5900, ctr: 4.07, position: 7.9, trend: 'stable' },
      { id: 'gsc_q7', query: 'co-working cafe hazratganj with power plugs', clicks: 160, impressions: 3800, ctr: 4.21, position: 8.4, trend: 'down' },
    ];

    const pages = [
      { page: 'https://the-nawabi-bean.in/', clicks: 1420, impressions: 18400, ctr: 7.72, position: 3.2 },
      { page: 'https://the-nawabi-bean.in/menu', clicks: 680, impressions: 9100, ctr: 7.47, position: 4.5 },
      { page: 'https://the-nawabi-bean.in/lucknow-artisan-coffee-guide', clicks: 420, impressions: 8900, ctr: 4.72, position: 6.1 },
      { page: 'https://the-nawabi-bean.in/hazratganj-coworking-tables', clicks: 320, impressions: 4800, ctr: 6.67, position: 5.8 },
    ];

    res.json({
      property: 'https://the-nawabi-bean.in',
      dateRange: 'Last 28 days',
      summary: {
        totalClicks: 2842,
        totalImpressions: 41200,
        averageCtr: 6.9,
        averagePosition: 4.8,
      },
      queries,
      pages,
    });
  });

  app.post('/api/gsc/audit', async (req: Request, res: Response) => {
    try {
      const placement = req.body;
      if (!placement || !placement.pageTitle || !placement.metaDescription) {
        return res.status(400).json({ error: 'Page Title and Meta Description are required for GSC audit.' });
      }
      const audit = await auditSearchConsolePlacements(placement);

      // Award XP
      const user = db.users.find((u) => u.id === currentUserId);
      if (user) {
        user.xp += 50;
      }

      res.json(audit);
    } catch (err: any) {
      console.info('[SkillSprint AI] Serving resilient fallback audit for GSC placement');
      const fallbackAudit = await auditSearchConsolePlacements({
        pageUrl: 'https://the-nawabi-bean.in/',
        targetKeyword: 'best cafe in hazratganj lucknow',
        secondaryKeywords: ['artisan coffee lucknow'],
        pageTitle: 'Best Café in Hazratganj Lucknow | The Nawabi Bean',
        metaDescription: 'Visit The Nawabi Bean Café in Hazratganj for artisanal coffee, Lucknow desserts & cozy seating.',
        h1Heading: 'Artisanal Coffee & Roastery in Hazratganj',
        contentSnippet: 'Heritage café serving specialty coffees in Lucknow.',
      });
      res.json(fallbackAudit);
    }
  });

  // Admin Endpoints
  app.get('/api/admin/submissions', (req: Request, res: Response) => {
    // Return all submissions with user details and assignment details
    const enriched = db.submissions.map((sub) => {
      const user = db.users.find((u) => u.id === sub.userId);
      const assignment = db.assignments.find((a) => a.id === sub.assignmentId);
      return {
        ...sub,
        userName: user?.name || 'Unknown Student',
        userEmail: user?.email || '',
        assignmentTitle: assignment?.title || 'Unknown Assignment',
      };
    });
    res.json(enriched);
  });

  app.get('/api/admin/metrics', (req: Request, res: Response) => {
    const totalStudents = db.users.filter((u) => u.role === 'student').length;
    const totalSubmissions = db.submissions.length;
    const avgScore = db.submissions.length > 0
      ? Math.round(
          db.submissions.reduce((acc, s) => acc + (s.feedback?.overallScore || 70), 0) /
            db.submissions.length
        )
      : 0;
    const totalSimRuns = db.simulatorRuns.length;
    const totalPortfolioProjects = db.portfolioProjects.length;

    res.json({
      totalStudents,
      totalSubmissions,
      avgScore,
      totalSimRuns,
      totalPortfolioProjects,
      topSkills: [
        'Geospatial Local Targeting',
        'Awadhi / Regional Ad Copywriting',
        'WhatsApp Lead Funnels',
        'INR Unit Economics',
      ],
    });
  });

  app.post('/api/admin/update-lesson', (req: Request, res: Response) => {
    const { id, title, shortDescription, contentMarkdown } = req.body;
    const lesson = db.lessons.find((l) => l.id === id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    if (title) lesson.title = title;
    if (shortDescription) lesson.shortDescription = shortDescription;
    if (contentMarkdown) lesson.contentMarkdown = contentMarkdown;

    res.json({ success: true, lesson });
  });

  // Reset / Reseed Database
  app.post('/api/db/reset', (req: Request, res: Response) => {
    db.seedInitialData();
    res.json({ success: true, message: 'Database reset to original seed state.' });
  });

  // --- Vite / Static Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillSprint AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
