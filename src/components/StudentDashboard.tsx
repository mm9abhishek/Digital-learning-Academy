import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Sparkles,
  Sliders,
  FolderHeart,
  Coffee,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
  Zap,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Course, Lesson, Submission, SimulatorRunResult, User } from '../types';

interface StudentDashboardProps {
  currentUser: User | null;
  course: Course | null;
  lessons: Lesson[];
  submissions: Submission[];
  simulatorRuns: SimulatorRunResult[];
  onSelectLesson: (lessonId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAboutModal?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  course,
  lessons,
  submissions,
  simulatorRuns,
  onSelectLesson,
  onNavigateTab,
  onOpenAboutModal,
}) => {
  const completedCount = currentUser?.completedLessonIds.length || 0;
  const progressPercent = Math.min(100, Math.round((completedCount / (lessons.length || 1)) * 100));

  const latestSubmission = submissions.length > 0 ? submissions[0] : null;
  const latestRun = simulatorRuns.length > 0 ? simulatorRuns[0] : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* What We Do, Learn & Innovate - Top Scannable Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              <Zap className="w-4 h-4 text-amber-600" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                What We Do, Learn &amp; Innovate
              </h2>
              <p className="text-xs text-slate-500">
                A quick 30-second primer on the SkillSprint experiential learning architecture
              </p>
            </div>
          </div>

          {onOpenAboutModal && (
            <button
              onClick={onOpenAboutModal}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors shadow-xs"
            >
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Read Full Breakdown</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1: What We Do */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-800">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">
                1
              </span>
              <span className="uppercase tracking-wider">What We Do</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              Authentic Micro-Apprenticeships
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We replace passive video watching with active production. You act as Lead Marketer for a real Lucknow business (The Nawabi Bean Café) solving slow weekdays and weekend footfall.
            </p>
          </div>

          {/* Pillar 2: What You Learn */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-800">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-[10px]">
                2
              </span>
              <span className="uppercase tracking-wider">What You Learn</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              High-Converting Growth Marketing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hyper-local audience targeting (Hazratganj radius), cultural Hindi/English copywriting hooks, INR unit economics (CAC, CPL, AOV ₹850), and Meta ad structure.
            </p>
          </div>

          {/* Pillar 3: How We Innovate */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800">
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[10px]">
                3
              </span>
              <span className="uppercase tracking-wider">How We Innovate</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              Instant AI Mentor &amp; Simulator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-criteria Gemini rubric feedback in seconds, a risk-free Monte Carlo ad-budget simulator (ROAS &amp; CPL in ₹), and auto-compiled recruiter proof-of-work portfolios.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Welcome & Active Case Study Spotlight */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 border border-amber-200/90 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold">
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span>Active Case Study: Hazratganj Heritage Hospitality</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Welcome back, <span className="text-amber-700">{currentUser?.name || 'Marketer'}</span>
            </h1>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              You are the Lead Digital Strategist for <strong className="text-slate-950 font-bold">The Nawabi Bean Café &amp; Artisanal Roastery</strong> in Hazratganj, Lucknow. Turn slow weekday afternoons into packed seating and drive weekend table bookings using hyper-local Meta Ads and INR unit economics.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Hazratganj, Lucknow (UP)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                4-Hour Practice Sprint
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold shadow-xs">
                <Target className="w-3.5 h-3.5 text-emerald-700" />
                Target: 40+ Weekend Table Reservations
              </span>
            </div>
          </div>

          {/* Quick Progress Card */}
          <div className="w-full lg:w-72 p-5 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Sprint Completion</span>
                <span className="text-amber-700 font-display text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 mt-2 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Lessons Done</p>
                <p className="text-base font-bold text-slate-900 mt-0.5 font-display">{completedCount} / {lessons.length}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-[10px] text-emerald-700 uppercase font-bold">AI Evaluated</p>
                <p className="text-base font-bold text-emerald-800 mt-0.5 font-display">{submissions.length}</p>
              </div>
            </div>

            <button
              id="btn-resume-sprint"
              onClick={() => onNavigateTab('lessons')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition-all hover:translate-y-[-1px]"
            >
              <span>Resume Current Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4-Step Practical Flow Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div
          onClick={() => onNavigateTab('lessons')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center font-bold text-xs mb-2.5 font-display group-hover:scale-105 transition-transform">
            01
          </div>
          <p className="font-bold text-slate-900 text-xs font-display">1. Action Lessons</p>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">Short, concrete frameworks focused on Lucknow café unit economics.</p>
        </div>

        <div
          onClick={() => onNavigateTab('assignments')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-md cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 border border-orange-200 flex items-center justify-center font-bold text-xs mb-2.5 font-display group-hover:scale-105 transition-transform">
            02
          </div>
          <p className="font-bold text-slate-900 text-xs font-display">2. Practical Task</p>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">Submit ad copy, target audience, and local INR budget allocation.</p>
        </div>

        <div
          onClick={() => onNavigateTab('assignments')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 border border-blue-200 flex items-center justify-center font-bold text-xs mb-2.5 font-display group-hover:scale-105 transition-transform">
            03
          </div>
          <p className="font-bold text-slate-900 text-xs font-display">3. AI Mentor Rubric</p>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">Instant 4-criteria feedback, line-by-line strengths, and AI copy rewrite.</p>
        </div>

        <div
          onClick={() => onNavigateTab('simulator')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-xs mb-2.5 font-display group-hover:scale-105 transition-transform">
            04
          </div>
          <p className="font-bold text-slate-900 text-xs font-display">4. Campaign Sandbox</p>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">Test ad copy against Meta benchmarks, simulate ROAS, and save to portfolio.</p>
        </div>
      </div>

      {/* Featured Live Practice & Growth Engines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: SEO & Expected Traffic Planner */}
        <div
          onClick={() => onNavigateTab('seo')}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              New Growth Tool
            </span>
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
              Explore Tool →
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              SEO Planning &amp; Expected Traffic Estimator
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Research local high-intent keywords in Lucknow, simulate organic Google ranking curves to forecast monthly table bookings, and brainstorm viral content marketing angles.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ Keyword Difficulty (KD)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ Dynamic CTR Sliders
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ Content Marketing Briefs
            </span>
          </div>
        </div>

        {/* Card 2: Google Ads & GSC Live Practice Sandbox */}
        <div
          onClick={() => onNavigateTab('google-practice')}
          className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-white to-emerald-500/5 border border-blue-300 hover:border-blue-400 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
              Live Practice Sandbox
            </span>
            <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
              Start Practice →
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Google Ads &amp; Search Console Live Sandbox
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Live practice dummy account for <em>the-nawabi-bean.in</em>. Build Responsive Search Ads with real-time Google previews and test on-page keyword placements with AI Quality Scoring.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ Real SERP Previews
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ Quality Score Diagnostics
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ✓ On-Page Keyword Auditor
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Course Syllabus & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Syllabus */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 font-display">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Course Curriculum (Lucknow Café Case Study)
            </h2>
            <span className="text-xs text-slate-500 font-medium">6 Action Modules</span>
          </div>

          <div className="space-y-2.5">
            {lessons.map((lesson) => {
              const isCompleted = currentUser?.completedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  id={`lesson-card-${lesson.id}`}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70'
                      : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 font-display ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {lesson.order}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">{lesson.title}</span>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {lesson.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{lesson.shortDescription}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 hidden sm:flex">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {lesson.estimatedMinutes}m
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <button className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors">
                        Start
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Latest AI Evaluation & Recent Simulator Run */}
        <div className="space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 font-display">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Latest Proof of Work
          </h2>

          {/* Latest AI Feedback Preview */}
          {latestSubmission && latestSubmission.feedback ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  AI Mentor Feedback
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-display">
                  Score: {latestSubmission.feedback.overallScore}/100 ({latestSubmission.feedback.grade})
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{latestSubmission.feedback.summaryFeedback}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <p className="text-[11px] font-bold text-slate-800">Top Identified Strength:</p>
                <p className="text-emerald-700 text-[11px] leading-relaxed">
                  ✓ {latestSubmission.feedback.strengths[0] || 'Great local contextual understanding.'}
                </p>
              </div>

              <button
                id="btn-view-ai-feedback"
                onClick={() => onNavigateTab('assignments')}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center space-x-1.5 transition-colors border border-slate-300"
              >
                <span>View Full Rubric &amp; Resubmit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5 shadow-xs">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs font-bold text-slate-800">No Submissions Evaluated Yet</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">Submit Assignment 3 to receive automated AI mentor feedback.</p>
              <button
                onClick={() => onNavigateTab('assignments')}
                className="mt-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
              >
                Go to Assignment 3
              </button>
            </div>
          )}

          {/* Latest Simulator Run */}
          {latestRun ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  Last Campaign Simulation
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300 font-display">
                  {latestRun.roas}x ROAS
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 truncate">{latestRun.input.campaignName}</p>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-medium">Clicks / CTR</span>
                  <p className="font-bold text-slate-900 mt-0.5 font-display">{latestRun.clicks} ({latestRun.ctrPercent}%)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-medium">Bookings / CPL</span>
                  <p className="font-bold text-slate-900 mt-0.5 font-display">{latestRun.conversions} (₹{latestRun.cplINR})</p>
                </div>
              </div>

              <button
                id="btn-open-simulator-tab"
                onClick={() => onNavigateTab('simulator')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center space-x-1.5 transition-colors border border-slate-300"
              >
                <span>Run New Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5 shadow-xs">
              <Sliders className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">Sandbox Ready</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">Test your ad copy against Meta Ads benchmarks.</p>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="mt-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Launch Simulator
              </button>
            </div>
          )}

          {/* Recruiter Portfolio Link Quick Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-display">
                <FolderHeart className="w-3.5 h-3.5 text-blue-600" />
                Proof-of-Work Portfolio
              </p>
              <p className="text-[11px] text-slate-600">Auto-compiled with your evaluated work.</p>
            </div>
            <button
              onClick={() => onNavigateTab('portfolio')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
