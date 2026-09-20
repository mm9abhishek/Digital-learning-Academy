import React from 'react';
import {
  X,
  Layers,
  Cpu,
  AlertTriangle,
  Compass,
  Trophy,
  CheckCircle,
  Database,
  Lock,
} from 'lucide-react';

interface DeliverablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliverablesModal: React.FC<DeliverablesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'ai' | 'limits' | 'roadmap' | 'pitch'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 text-slate-900 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                AI Day Noida Open Innovation
              </span>
              <span className="text-xs text-slate-500 font-medium">September 20, 2026</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1 font-display">
              SkillSprint AI — MVP Technical &amp; Jury Deliverables
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Architecture specs, AI Mentor framework, simulation math, and evaluation brief
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pt-3 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Architecture Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'ai'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Components &amp; Rubric</span>
          </button>
          <button
            onClick={() => setActiveTab('limits')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'limits'
                ? 'bg-red-100 text-red-900 border border-red-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Scope &amp; Limitations</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'roadmap'
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-600" />
            <span>Future Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'pitch'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Jury Pitch Presentation</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 text-xs space-y-4 pr-1">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Database className="w-4 h-4 text-blue-600" />
                  Full-Stack Architecture Stack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-slate-700">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <p className="text-slate-500 font-bold uppercase text-[10px]">Client Tier</p>
                    <p className="text-slate-900 font-bold mt-1">React 19 + TypeScript + Tailwind v4</p>
                    <p className="text-slate-600 mt-1">Recharts for conversion funnel &amp; ROAS analytics, Lucide icons, responsive mobile/desktop layout.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <p className="text-slate-500 font-bold uppercase text-[10px]">Application Server</p>
                    <p className="text-slate-900 font-bold mt-1">Node.js Express + TSX Engine</p>
                    <p className="text-slate-600 mt-1">Server-side proxy on port 3000 protecting API keys, handling submission rubrics and rules-based campaign simulation.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <p className="text-slate-500 font-bold uppercase text-[10px]">Persistence &amp; Database</p>
                    <p className="text-slate-900 font-bold mt-1">Structured Relational Database</p>
                    <p className="text-slate-600 mt-1">9 normalized schemas (users, courses, lessons, assignments, submissions, feedback, scenarios, runs, projects) with role-based switching.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Database Schema Entities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 font-mono text-[11px] text-slate-700">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">1. users</span>: id, role, xp, streak
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">2. courses</span>: case study metadata
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">3. lessons</span>: 6 short modules
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">4. assignments</span>: client briefs &amp; rubrics
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">5. submissions</span>: versioned student work
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">6. ai_feedback</span>: structured rubric scores
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">7. simulator_scenarios</span>: 5 preset archetypes
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">8. simulator_runs</span>: CTR, CPC, CPL, ROAS
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">9. portfolio_projects</span>: proof-of-work
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Cpu className="w-4 h-4 text-amber-600" />
                  AI Mentor Engine Architecture
                </h3>
                <p className="text-slate-700 mt-2 leading-relaxed">
                  The AI Mentor is powered by <strong>Google Gemini 3.8 Flash</strong> via the server-side <code className="text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-bold">@google/genai</code> SDK, enforcing a strict JSON schema output.
                </p>
                <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">Standardized Evaluation Rubric Criteria:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li><strong>Objective Clarity (25%):</strong> SMART goal formulation avoiding vanity likes.</li>
                    <li><strong>Audience Relevance (25%):</strong> Geospatial precision in Lucknow (Hazratganj, Gomti Nagar, Aliganj) and negative exclusions.</li>
                    <li><strong>Messaging &amp; Hooks (25%):</strong> Cultural Awadhi relevance, thumb-stopping first 60 characters, and sensory details.</li>
                    <li><strong>Frictionless CTA (25%):</strong> Clear, low-friction next step (WhatsApp table reservation vs long forms).</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Fail-Safe Deterministic Fallback
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-800">
                    If GEMINI_API_KEY is not configured or an API network timeout occurs, SkillSprint automatically falls back to an intelligent heuristic evaluation engine that inspects word count, Lucknow local tokens, WhatsApp CTAs, and unit economics, ensuring uninterrupted jury demo execution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'limits' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Deliberate Architectural Boundaries &amp; Transparency
                </h3>
                <p className="text-slate-700 mt-2 leading-relaxed">
                  In accordance with buildathon mandates, we intentionally prioritized end-to-end learning loops over unrequested production advertising complexity:
                </p>
                <ul className="list-disc pl-4 space-y-2 mt-2 text-slate-600">
                  <li>
                    <strong>No Live Ad Network Connections:</strong> We do not connect to Meta Marketing API or Google Ads API accounts. All simulated runs are labeled as <em>educational and fictional</em> with deterministic formulas based on real Indian F&amp;B industry benchmarks.
                  </li>
                  <li>
                    <strong>Zero Private Ad Account Claims:</strong> The AI Mentor never claims to access private user ad accounts or invent synthetic live telemetry without authorization.
                  </li>
                  <li>
                    <strong>Focus on Practical Learning:</strong> Left out payment gateways, live credit card billing, job portals, and speculative blockchain/RAG features to ensure the core learning, submission, AI feedback, simulation, and portfolio loop is 100% polished and functional.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Compass className="w-4 h-4 text-purple-600" />
                  Post-Buildathon Product Roadmap (Q4 2026 - Q2 2027)
                </h3>
                <div className="space-y-3 mt-3">
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <p className="font-bold text-purple-900">Phase 1: Multi-City Case Study Library</p>
                    <p className="text-slate-600 mt-0.5">Expand beyond Lucknow café to D2C apparel in Surat, B2B SaaS in Bengaluru, and coaching institutes in Kota.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <p className="font-bold text-purple-900">Phase 2: Meta Ads Sandbox API Integration</p>
                    <p className="text-slate-600 mt-0.5">Optional OAuth connection with Meta Ads Sandbox test accounts so students can experience the native Ads Manager interface without real credit cards.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <p className="font-bold text-purple-900">Phase 3: Automated Recruiter Verification &amp; Credentialing</p>
                    <p className="text-slate-600 mt-0.5">Cryptographically verifiable portfolio tokens for hiring agencies in Delhi-NCR, Mumbai, and Bengaluru.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <h3 className="text-base font-bold text-amber-900 flex items-center gap-2 font-display">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  Jury Elevator Pitch (AI Day Noida Open Innovation 2026)
                </h3>
                <p className="text-slate-800 mt-3 text-sm leading-relaxed italic">
                  &ldquo;Over 200,000 Indian college students take digital marketing certifications every year. Yet when they graduate, 85% of agencies say they don&apos;t even know how to write a high-converting ad hook, understand real INR cost-per-lead economics, or troubleshoot a failing campaign in Tier-2 cities.&rdquo;
                </p>
                <p className="text-slate-700 mt-2 text-xs leading-relaxed">
                  <strong>SkillSprint AI bridges the gap between passive video watching and real-world execution.</strong> Instead of endless slides, students take on a real business challenge—&ldquo;The Nawabi Bean Café&rdquo; in Hazratganj, Lucknow. They write localized ad copy, formulate INR budget allocation, and receive instant, structured rubric feedback from an AI Mentor. Then, they run their strategy through our deterministic campaign sandbox to diagnose real bottlenecks like weak creatives or audience fatigue—and leave with a proof-of-work portfolio employers can actually trust.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close Deliverables
          </button>
        </div>
      </div>
    </div>
  );
};
