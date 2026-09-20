import React, { useState, useEffect } from 'react';
import {
  User,
  Course,
  Lesson,
  Assignment,
  Submission,
  SimulatorScenarioPreset,
  SimulatorRunResult,
  PortfolioProject,
  SimulatorRunInput,
} from './types';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { LessonViewer } from './components/LessonViewer';
import { AssignmentWorkspace } from './components/AssignmentWorkspace';
import { CampaignSimulator } from './components/CampaignSimulator';
import { PortfolioPage } from './components/PortfolioPage';
import { AdminDashboard } from './components/AdminDashboard';
import { SeoContentPlanner } from './components/SeoContentPlanner';
import { GooglePracticeHub } from './components/GooglePracticeHub';
import { AboutWhatWeDoModal } from './components/AboutWhatWeDoModal';
import { JuryDemoModal } from './components/JuryDemoModal';
import { DeliverablesModal } from './components/DeliverablesModal';
import { LoginModal } from './components/LoginModal';
import { SupabaseStudioModal } from './components/SupabaseStudioModal';
import {
  BookOpen,
  Coffee,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { UserRole } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [scenarios, setScenarios] = useState<SimulatorScenarioPreset[]>([]);
  const [simulatorRuns, setSimulatorRuns] = useState<SimulatorRunResult[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [adminSubmissions, setAdminSubmissions] = useState<any[]>([]);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  // Modals
  const [isJuryGuideOpen, setIsJuryGuideOpen] = useState(false);
  const [isDeliverablesOpen, setIsDeliverablesOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSupabaseStudioOpen, setIsSupabaseStudioOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [loginInitialRole, setLoginInitialRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(true);

  // Public Share view
  const [publicShareProject, setPublicShareProject] = useState<PortfolioProject | null>(null);
  const [publicShareStudent, setPublicShareStudent] = useState<User | null>(null);

  // Fetch initial data
  const loadAppData = async () => {
    try {
      // Check for share query parameter in URL
      const searchParams = new URLSearchParams(window.location.search);
      const shareToken = searchParams.get('share');
      if (shareToken) {
        try {
          const res = await fetch(`/api/portfolio/public/${shareToken}`);
          if (res.ok) {
            const data = await res.json();
            setPublicShareProject(data.project);
            setPublicShareStudent(data.student);
          }
        } catch (e) {
          console.error('Error fetching public portfolio:', e);
        }
      }

      const [
        userRes,
        coursesRes,
        lessonsRes,
        assignmentsRes,
        subsRes,
        scenariosRes,
        runsRes,
        portfolioRes,
      ] = await Promise.all([
        fetch('/api/users/current').then((r) => r.json()),
        fetch('/api/courses').then((r) => r.json()),
        fetch('/api/lessons').then((r) => r.json()),
        fetch('/api/assignments').then((r) => r.json()),
        fetch('/api/submissions').then((r) => r.json()),
        fetch('/api/simulator/scenarios').then((r) => r.json()),
        fetch('/api/simulator/runs').then((r) => r.json()),
        fetch('/api/portfolio').then((r) => r.json()),
      ]);

      setCurrentUser(userRes.user);
      setAllUsers(userRes.allUsers);
      setCourses(coursesRes);
      setLessons(lessonsRes);
      setAssignments(assignmentsRes);
      setSubmissions(subsRes);
      setScenarios(scenariosRes);
      setSimulatorRuns(runsRes);
      setPortfolioProjects(portfolioRes);

      if (userRes.user.role === 'admin') {
        const adminRes = await fetch('/api/admin/submissions').then((r) => r.json());
        setAdminSubmissions(adminRes);
      }
    } catch (err) {
      console.error('Failed to load initial app data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  // Handlers
  const handleSwitchUser = async (userId: string) => {
    try {
      const res = await fetch('/api/users/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        // Refresh submissions and runs for this user
        const [subsRes, runsRes, portRes] = await Promise.all([
          fetch('/api/submissions').then((r) => r.json()),
          fetch('/api/simulator/runs').then((r) => r.json()),
          fetch('/api/portfolio').then((r) => r.json()),
        ]);
        setSubmissions(subsRes);
        setSimulatorRuns(runsRes);
        setPortfolioProjects(portRes);

        if (data.user.role === 'admin') {
          const adminRes = await fetch('/api/admin/submissions').then((r) => r.json());
          setAdminSubmissions(adminRes);
        }
      }
    } catch (e) {
      console.error('Failed to switch user:', e);
    }
  };

  const handleOpenLogin = (role: UserRole = 'student') => {
    setLoginInitialRole(role);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = async (user: User) => {
    setCurrentUser(user);
    try {
      const [subsRes, runsRes, portRes, usersRes] = await Promise.all([
        fetch('/api/submissions').then((r) => r.json()),
        fetch('/api/simulator/runs').then((r) => r.json()),
        fetch('/api/portfolio').then((r) => r.json()),
        fetch('/api/users/current').then((r) => r.json()),
      ]);
      setSubmissions(subsRes);
      setSimulatorRuns(runsRes);
      setPortfolioProjects(portRes);
      if (usersRes?.allUsers) {
        setAllUsers(usersRes.allUsers);
      }

      if (user.role === 'admin') {
        const adminRes = await fetch('/api/admin/submissions').then((r) => r.json());
        setAdminSubmissions(adminRes);
        setCurrentTab('admin');
      } else {
        setCurrentTab('dashboard');
      }
    } catch (e) {
      console.error('Failed to sync state after login:', e);
    }
  };

  const handleToggleLessonComplete = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/lessons/${lessonId}/toggle-complete`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success && currentUser) {
        setCurrentUser({
          ...currentUser,
          completedLessonIds: data.completedLessonIds,
          xp: data.xp,
        });
      }
    } catch (e) {
      console.error('Failed to toggle completion:', e);
    }
  };

  const handleSubmitAssignment = async (assignmentId: string, submittedContent: string): Promise<Submission | null> => {
    const res = await fetch('/api/submissions/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId, submittedContent }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit assignment');
    }

    const data = await res.json();
    if (data.success) {
      // Update local submissions
      setSubmissions((prev) => {
        const filtered = prev.filter((s) => s.id !== data.submission.id && s.assignmentId !== assignmentId);
        return [data.submission, ...filtered];
      });

      // Update user XP & completed lessons
      const asg = assignments.find((a) => a.id === assignmentId);
      if (asg && currentUser) {
        if (!currentUser.completedLessonIds.includes(asg.lessonId)) {
          setCurrentUser({
            ...currentUser,
            completedLessonIds: [...currentUser.completedLessonIds, asg.lessonId],
            xp: currentUser.xp + 100,
          });
        } else {
          setCurrentUser({
            ...currentUser,
            xp: currentUser.xp + 25,
          });
        }
      }

      return data.submission;
    }
    return null;
  };

  const handleRunSimulation = async (input: SimulatorRunInput): Promise<SimulatorRunResult | null> => {
    const res = await fetch('/api/simulator/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to calculate simulation');
    }

    const data: SimulatorRunResult = await res.json();
    setSimulatorRuns((prev) => [data, ...prev]);

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        xp: currentUser.xp + 40,
      });
    }

    return data;
  };

  const handleSaveToPortfolio = async (submissionId: string) => {
    const activeSub = submissions.find((s) => s.id === submissionId);
    const latestRun = simulatorRuns.length > 0 ? simulatorRuns[0] : undefined;

    try {
      const res = await fetch('/api/portfolio/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'The Nawabi Bean: Local Hospitality Growth Campaign',
          businessName: 'The Nawabi Bean Café & Artisanal Roastery, Hazratganj, Lucknow',
          brief: 'Comprehensive digital strategy, localized ad copywriting, and Meta Ads campaign simulation for scaling weekend table bookings and evening footfall.',
          submissionId,
          simulatorRunId: latestRun?.id,
          skillsDemonstrated: [
            'Local Hospitality Marketing',
            'Meta Ads Campaign Architecture',
            'Culturally Grounded Ad Copywriting',
            'A/B Testing & Creative Strategy',
            'INR Budget Allocation & Unit Economics',
            'ROAS & CPL Optimization',
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPortfolioProjects((prev) => [data.project, ...prev]);
        if (currentUser) {
          setCurrentUser({
            ...currentUser,
            xp: currentUser.xp + 150,
          });
        }
        setCurrentTab('portfolio');
      }
    } catch (e) {
      console.error('Error saving portfolio:', e);
    }
  };

  const handleSaveRunToPortfolio = async (run: SimulatorRunResult) => {
    const activeSub = submissions.length > 0 ? submissions[0] : undefined;

    try {
      const res = await fetch('/api/portfolio/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${run.input.campaignName} — Simulated Case Study`,
          businessName: 'The Nawabi Bean Café & Artisanal Roastery, Hazratganj, Lucknow',
          brief: `Simulated ${run.conversions} table bookings with ${run.roas}x ROAS at ₹${run.cplINR} CPL on ${run.input.platform}.`,
          submissionId: activeSub?.id,
          simulatorRunId: run.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPortfolioProjects((prev) => [data.project, ...prev]);
        if (currentUser) {
          setCurrentUser({
            ...currentUser,
            xp: currentUser.xp + 150,
          });
        }
        setCurrentTab('portfolio');
      }
    } catch (e) {
      console.error('Error saving simulator run to portfolio:', e);
    }
  };

  const handleUpdateLesson = async (lessonId: string, title: string, shortDescription: string, contentMarkdown: string) => {
    try {
      const res = await fetch('/api/admin/update-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lessonId, title, shortDescription, contentMarkdown }),
      });
      const data = await res.json();
      if (data.success) {
        setLessons((prev) => prev.map((l) => (l.id === lessonId ? data.lesson : l)));
        return true;
      }
    } catch (e) {
      console.error('Failed to update lesson:', e);
    }
    return false;
  };

  const handleResetDatabase = async () => {
    try {
      const res = await fetch('/api/db/reset', { method: 'POST' });
      if (res.ok) {
        await loadAppData();
      }
    } catch (e) {
      console.error('Error resetting database:', e);
    }
  };

  // Public Share View (Rendered when URL has ?share=...)
  if (publicShareProject) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-slate-950 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 font-display">SkillSprint AI — Verified Portfolio</h1>
                <p className="text-xs text-slate-500">AI Day Noida Open Innovation Showcase 2026</p>
              </div>
            </div>

            <button
              onClick={() => {
                window.location.href = window.location.origin;
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white flex items-center gap-1 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Open SkillSprint App</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Student: {publicShareStudent?.name || 'Aarav Sharma'}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {publicShareStudent?.collegeOrCompany}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 font-display">{publicShareProject.title}</h2>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              {publicShareProject.businessName}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {publicShareProject.brief}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500">AI Mentor Score</span>
                <p className="text-lg font-bold text-amber-600 mt-0.5">{publicShareProject.aiScore || 88} / 100</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500">Simulated ROAS</span>
                <p className="text-lg font-bold text-emerald-700 mt-0.5">{publicShareProject.simulatedRoas || 4.24}x</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500">Table Bookings</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{publicShareProject.simulatedConversions || 64}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500">Pilot Budget</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">₹{(publicShareProject.simulatedSpendINR || 9800).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Demonstrated Marketing Competencies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {publicShareProject.skillsDemonstrated.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeLesson = lessons.find((l) => l.id === selectedLessonId);
  const activeLessonAssignment = activeLesson?.assignmentId
    ? assignments.find((a) => a.id === activeLesson.assignmentId) || null
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        allUsers={allUsers}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'lessons') {
            setSelectedLessonId(null);
          }
        }}
        onSwitchUser={handleSwitchUser}
        onOpenJuryGuide={() => setIsJuryGuideOpen(true)}
        onOpenDeliverables={() => setIsDeliverablesOpen(true)}
        onOpenLogin={handleOpenLogin}
        onOpenSupabaseStudio={() => setIsSupabaseStudioOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      {/* Main Container Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
            <Sparkles className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-xs text-slate-500 font-medium">Bootstrapping SkillSprint AI Sandbox &amp; Seed Data...</p>
          </div>
        ) : (
          <>
            {/* Tab: Dashboard */}
            {currentTab === 'dashboard' && (
              <StudentDashboard
                currentUser={currentUser}
                course={courses[0] || null}
                lessons={lessons}
                submissions={submissions}
                simulatorRuns={simulatorRuns}
                onSelectLesson={(lessonId) => {
                  setSelectedLessonId(lessonId);
                  setCurrentTab('lessons');
                }}
                onNavigateTab={(tab) => {
                  if (tab === 'lessons' && !selectedLessonId && lessons.length > 0) {
                    setSelectedLessonId(lessons[2]?.id || lessons[0].id);
                  }
                  setCurrentTab(tab);
                }}
              />
            )}

            {/* Tab: Course & Lessons */}
            {currentTab === 'lessons' && (
              <>
                {activeLesson ? (
                  <LessonViewer
                    lesson={activeLesson}
                    allLessons={lessons}
                    assignment={activeLessonAssignment}
                    isCompleted={Boolean(currentUser?.completedLessonIds.includes(activeLesson.id))}
                    onToggleComplete={handleToggleLessonComplete}
                    onSelectLesson={(lId) => setSelectedLessonId(lId)}
                    onOpenAssignment={(aId) => {
                      setSelectedAssignmentId(aId);
                      setCurrentTab('assignments');
                    }}
                    onBackToCourse={() => setSelectedLessonId(null)}
                  />
                ) : (
                  /* Lessons List Overview */
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        <span>The Nawabi Bean Café Case Study</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                        Performance Marketing for Local Hospitality (Lucknow)
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Every lesson ends with a practical assignment. Read the short strategic framework, craft your submission, and submit to the AI Mentor.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {lessons.map((lesson) => {
                        const isDone = currentUser?.completedLessonIds.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setSelectedLessonId(lesson.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                              isDone
                                ? 'bg-white border-emerald-300 hover:border-emerald-400 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                            }`}
                          >
                            <div className="flex items-start space-x-3.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                                  isDone
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {lesson.order}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-sm font-bold text-slate-900 truncate font-display">{lesson.title}</h3>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lesson.shortDescription}</p>
                              </div>
                            </div>

                            <button className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex-shrink-0 hover:bg-amber-600 transition-colors shadow-xs">
                              {isDone ? 'Review' : 'Open'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Tab: Assignments & AI Mentor */}
            {currentTab === 'assignments' && (
              <AssignmentWorkspace
                assignments={assignments}
                selectedAssignmentId={selectedAssignmentId}
                submissions={submissions}
                onSelectAssignment={(id) => setSelectedAssignmentId(id)}
                onSubmitAssignment={handleSubmitAssignment}
                onNavigateToSimulator={() => setCurrentTab('simulator')}
                onSaveToPortfolio={handleSaveToPortfolio}
              />
            )}

            {/* Tab: SEO Planning & Traffic Estimator */}
            {currentTab === 'seo' && <SeoContentPlanner />}

            {/* Tab: Google Ads & GSC Live Practice Sandbox */}
            {currentTab === 'google-practice' && <GooglePracticeHub />}

            {/* Tab: Campaign Simulator */}
            {currentTab === 'simulator' && (
              <CampaignSimulator
                scenarios={scenarios}
                runs={simulatorRuns}
                onRunSimulation={handleRunSimulation}
                onSaveRunToPortfolio={handleSaveRunToPortfolio}
              />
            )}

            {/* Tab: Portfolio */}
            {currentTab === 'portfolio' && (
              <PortfolioPage
                currentUser={currentUser}
                projects={portfolioProjects}
                onOpenSimulator={() => setCurrentTab('simulator')}
                onOpenAssignments={() => {
                  setSelectedAssignmentId('asg_03');
                  setCurrentTab('assignments');
                }}
              />
            )}

            {/* Tab: Admin Screen */}
            {currentTab === 'admin' && (
              <AdminDashboard
                currentUser={currentUser}
                lessons={lessons}
                submissions={adminSubmissions.length > 0 ? adminSubmissions : submissions}
                onUpdateLesson={handleUpdateLesson}
                onResetDatabase={handleResetDatabase}
                onOpenSupabaseStudio={() => setIsSupabaseStudioOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <p>
          SkillSprint AI • AI Day Noida Open Innovation 2026 Buildathon • Lucknow Hospitality Case Study
        </p>
      </footer>

      {/* Modals */}
      <AboutWhatWeDoModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      <JuryDemoModal
        isOpen={isJuryGuideOpen}
        onClose={() => setIsJuryGuideOpen(false)}
        onJumpToStep={(tab) => {
          setCurrentTab(tab);
          if (tab === 'lessons' && lessons.length > 2) {
            setSelectedLessonId(lessons[2].id); // Jump to Lesson 3 (Copywriting)
          }
          if (tab === 'assignments' && assignments.length > 2) {
            setSelectedAssignmentId('asg_03'); // Jump to Assignment 3
          }
        }}
        onResetData={handleResetDatabase}
      />

      <DeliverablesModal
        isOpen={isDeliverablesOpen}
        onClose={() => setIsDeliverablesOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        initialRole={loginInitialRole}
      />

      <SupabaseStudioModal
        isOpen={isSupabaseStudioOpen}
        onClose={() => setIsSupabaseStudioOpen(false)}
      />
    </div>
  );
}
