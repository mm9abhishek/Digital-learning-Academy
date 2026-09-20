import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Sliders,
  FolderHeart,
  Database,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Target,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AboutInnovationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCourse?: () => void;
  onExploreSimulator?: () => void;
  onExploreAiMentor?: () => void;
}

export const AboutInnovationsModal: React.FC<AboutInnovationsModalProps> = ({
  isOpen,
  onClose,
  onExploreCourse,
  onExploreSimulator,
  onExploreAiMentor,
}) => {
  const [activePillar, setActivePillar] = useState<'what-we-do' | 'what-you-learn' | 'innovations'>('what-we-do');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        id="about-innovations-modal"
        className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-amber-50/70 via-white to-blue-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  SkillSprint AI • Platform Guide
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  AI Day Noida 2026
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Understand what we do, what you learn, and how our AI technology innovates experiential education.
              </p>
            </div>
          </div>

          <button
            id="btn-close-about-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/80">
          <button
            id="tab-pillar-what-we-do"
            onClick={() => setActivePillar('what-we-do')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activePillar === 'what-we-do'
                ? 'border-amber-500 text-amber-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-amber-500" />
            <span>1. What We Do</span>
          </button>

          <button
            id="tab-pillar-what-you-learn"
            onClick={() => setActivePillar('what-you-learn')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activePillar === 'what-you-learn'
                ? 'border-blue-500 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>2. What You Learn</span>
          </button>

          <button
            id="tab-pillar-innovations"
            onClick={() => setActivePillar('innovations')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activePillar === 'innovations'
                ? 'border-emerald-500 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>3. How We Innovate</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* PILLAR 1: WHAT WE DO */}
          {activePillar === 'what-we-do' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Mission Statement
                </span>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Transforming Passive Video Watching into Real-World Experiential Execution
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Traditional courses teach digital marketing by having students watch 40 hours of static video slides with zero accountability. 
                  <strong> SkillSprint AI flips this completely:</strong> students step into the role of a Lead Growth Marketer for real businesses across Tier-2/Tier-3 India, solving authentic business bottlenecks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Authentic Client Scenarios</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learners tackle actual client briefs (such as <em>The Nawabi Bean Café</em> in Hazratganj, Lucknow) rather than vague hypothetical case studies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Active Production Tasks</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instead of multiple-choice quizzes, students write live ad copy, calculate unit economics in INR, structure A/B splits, and allocate budgets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Immediate AI Mentorship</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero waiting for human TAs. Students get instant line-by-line critique, score breakdowns, and rewrite suggestions powered by Gemini.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">Want to see the active Lucknow client case study?</p>
                  <p className="text-xs text-slate-600">Explore the 6 action modules built around Hazratganj hospitality growth.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCourse?.();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Open Course Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PILLAR 2: WHAT YOU LEARN */}
          {activePillar === 'what-you-learn' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Practical Competencies
                </span>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Industry-Grade Performance Marketing & Unit Economics
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every lesson and assignment is engineered around competencies that senior marketing leads and agencies test during hiring interviews.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h5 className="text-xs font-bold text-slate-900">Hyper-Local Audience Segmentation</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Master radius targeting (Hazratganj, Gomti Nagar), age-band filtering, dining-out intent triggers, and competitor conquesting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h5 className="text-xs font-bold text-slate-900">High-Converting Ad Copywriting</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crafting scroll-stopping 3-second visual hooks, cultural resonance (Lucknowi Tehzeeb + artisanal coffee), and friction-free CTAs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h5 className="text-xs font-bold text-slate-900">INR Financials & Unit Economics</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculating Cost Per Lead (CPL), Customer Acquisition Cost (CAC), Average Order Value (AOV ₹850), and target ROAS thresholds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h5 className="text-xs font-bold text-slate-900">Algorithmic Campaign Simulation</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Predicting impressions, click-through rates, table reservations, and budget yield before committing actual capital on Meta or Google.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">Ready to test your copywriting against our AI Rubric?</p>
                  <p className="text-xs text-slate-600">Submit a campaign copy for The Nawabi Bean and get instant feedback.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreAiMentor?.();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Go to AI Mentor & Assignments</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PILLAR 3: HOW WE INNOVATE */}
          {activePillar === 'innovations' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Technology Breakthroughs
                </span>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Four Proprietary Innovations Powering SkillSprint AI
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We built custom software systems that eliminate the standard hurdles in digital marketing education.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Innovation 1 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      Gemini 2.5 Rubric
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">1. Instant Multi-Criteria AI Evaluator</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluates student submissions across 4 dimensions: Context & Relevance, Hook & Emotional Resonance, Clarity & Call-to-Action, and Feasibility & Unit Economics, with actionable rewrite recommendations.
                  </p>
                </div>

                {/* Innovation 2 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      Monte Carlo Engine
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">2. Risk-Free Campaign Simulator</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Students can’t afford to burn ₹10,000 on real ad spend. Our simulator benchmarks copy quality against historical Meta Indian hospitality campaign data to calculate real-world CTR, conversions, and ROAS.
                  </p>
                </div>

                {/* Innovation 3 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                      <Database className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      PostgreSQL & Cloud
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">3. Supabase Cloud Studio & Telemetry</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full-stack relational persistence with interactive SQL Studio, table editor, and live syncing to Supabase Cloud for institutional scale and cohort analytics.
                  </p>
                </div>

                {/* Innovation 4 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                      <FolderHeart className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                      Verifiable Proof
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">4. Live Recruiter Proof-of-Work Portfolios</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Replaces worthless attendance certificates with verifiable case study links. Employers inspect the actual copy, AI scores, and simulated ROAS metrics directly.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">Want to test the ad budget and ROAS simulator?</p>
                  <p className="text-xs text-slate-600">Run simulations with different ad copy and audience parameters.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreSimulator?.();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Launch Campaign Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>SkillSprint AI • Designed for Indian Tier-2/Tier-3 Regional Growth & Experiential Education</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
