import React from 'react';
import {
  X,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Coffee,
  Sliders,
  FolderHeart,
  RotateCcw,
} from 'lucide-react';

interface JuryDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStep: (stepId: string) => void;
  onResetData: () => void;
}

export const JuryDemoModal: React.FC<JuryDemoModalProps> = ({
  isOpen,
  onClose,
  onJumpToStep,
  onResetData,
}) => {
  if (!isOpen) return null;

  const demoSteps = [
    {
      step: '1',
      title: 'The Real-World Context: Lucknow Café Case Study',
      duration: '45s',
      tab: 'dashboard',
      description: 'Explore "The Nawabi Bean Café & Artisanal Roastery" in Hazratganj, Lucknow. See the student onboarding state, active progress, and unit economics constraints in INR.',
      actionLabel: 'View Dashboard & Case Study',
      icon: Coffee,
      highlight: 'Seeded with Lucknow local geography, pricing, and authentic hospitality challenges.',
    },
    {
      step: '2',
      title: 'Action-Oriented Lesson & Assignment Task',
      duration: '60s',
      tab: 'lessons',
      description: 'Open Lesson 3 ("High-Impact Ad Copywriting & The Nawabi Hook"). Examine the 4-part local ad framework, sensory hooks, and prompt requirements.',
      actionLabel: 'Open Lesson 3 & Task',
      icon: PlayCircle,
      highlight: 'Every lesson ends with an actionable assignment submission.',
    },
    {
      step: '3',
      title: 'AI Mentor Evaluation & Structured Rubric',
      duration: '75s',
      tab: 'assignments',
      description: 'Review Aarav\'s A/B ad creative submission. Trigger the AI Mentor (powered by Gemini 3.8 Flash with structured JSON rubric breakdown, strengths, issues, and rewritten copy revisions).',
      actionLabel: 'Inspect AI Feedback & Resubmit',
      icon: Sparkles,
      highlight: 'Returns overall score, 4-criterion rubric, constructive feedback, and example rewrite.',
    },
    {
      step: '4',
      title: 'Educational Campaign Simulator & Diagnostics',
      duration: '60s',
      tab: 'simulator',
      description: 'Run the rules-based sandbox simulating Meta Ads vs Google Search. Switch between failure presets ("Weak Creative", "Expensive Audience", "Poor Landing Friction") to observe simulated CTR, CPC, CPL, and ROAS.',
      actionLabel: 'Launch Campaign Simulator',
      icon: Sliders,
      highlight: 'Mathematical formula breakdown with real INR benchmarks and diagnostic tips.',
    },
    {
      step: '5',
      title: 'Proof-of-Work Portfolio Generation',
      duration: '45s',
      tab: 'portfolio',
      description: 'Examine the recruiter-ready portfolio project automatically compiling the student\'s verified ad copy, AI evaluation score, and simulated campaign ROAS.',
      actionLabel: 'View Shareable Portfolio',
      icon: FolderHeart,
      highlight: 'Includes shareable link and demonstrated competencies for employers.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 text-slate-900 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                AI Day Noida 2026
              </span>
              <span className="text-xs text-slate-500 font-medium">Jury Evaluation Guide</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1 font-display">
              SkillSprint AI: 4–5 Minute Demo Walkthrough
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tested end-to-end workflow for &quot;The Nawabi Bean Café, Hazratganj, Lucknow&quot;
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {demoSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center border border-amber-300">
                      {s.step}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-display">
                      <Icon className="w-4 h-4 text-amber-600" />
                      {s.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                    {s.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>

                <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {s.highlight}
                  </span>
                  <button
                    id={`demo-jump-step-${s.step}`}
                    onClick={() => {
                      onJumpToStep(s.tab);
                      onClose();
                    }}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 transition-colors shadow-xs"
                  >
                    <span>{s.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onResetData}
            className="flex items-center space-x-1.5 text-slate-500 hover:text-amber-800 font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Seed Data</span>
          </button>
          <button
            onClick={() => {
              onJumpToStep('dashboard');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            Start Interactive Demo Now
          </button>
        </div>
      </div>
    </div>
  );
};
