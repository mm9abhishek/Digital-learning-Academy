import React, { useState } from 'react';
import {
  FolderHeart,
  Share2,
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Printer,
  Sparkles,
  TrendingUp,
  Sliders,
  MapPin,
  Coffee,
  Calendar,
  X,
} from 'lucide-react';
import { PortfolioProject, User } from '../types';

interface PortfolioPageProps {
  currentUser: User | null;
  projects: PortfolioProject[];
  onOpenSimulator: () => void;
  onOpenAssignments: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  currentUser,
  projects,
  onOpenSimulator,
  onOpenAssignments,
}) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    projects.length > 0 ? projects[0] : null
  );
  const [copiedToken, setCopiedToken] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}?share=${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Portfolio Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50/90 via-white to-indigo-50/80 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold">
            <FolderHeart className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Proof-of-Work Portfolio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            {currentUser?.name || 'Aarav Sharma'}&apos;s Marketing Showcase
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every project below represents completed assignments, evaluated ad copy by the AI Mentor, and verified unit economics tested in the SkillSprint campaign simulator.
          </p>
        </div>

        {selectedProject && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Shareable Portfolio</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors border border-slate-300"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <FolderHeart className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 font-display">No Portfolio Projects Saved Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete your ad copy assignment or run a winning campaign simulation, then click &quot;Save to Portfolio&quot; to compile your verified project showcase.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAssignments}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
            >
              Complete Assignment 3
            </button>
            <button
              onClick={onOpenSimulator}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs"
            >
              Run Campaign Simulator
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Project Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 font-display">
              Completed Case Studies ({projects.length})
            </h3>

            <div className="space-y-2.5">
              {projects.map((proj) => {
                const isSelected = selectedProject?.id === proj.id;
                return (
                  <div
                    key={proj.id}
                    id={`portfolio-item-${proj.id}`}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-400 shadow-sm ring-1 ring-amber-400/40'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-display">
                        {proj.aiScore ? `Score: ${proj.aiScore}/100` : 'Simulated'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-2 leading-snug font-display">{proj.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{proj.businessName}</p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {proj.skillsDemonstrated.slice(0, 3).map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Case Study Deep Dive (8 cols) */}
          {selectedProject && (
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Header Details */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 font-display">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    Local Hospitality Case Study
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Completed: {new Date(selectedProject.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
                  {selectedProject.title}
                </h2>

                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {selectedProject.businessName}
                </p>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {selectedProject.brief}
                </p>
              </div>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500">AI Mentor Score</span>
                  <p className="text-xl font-bold text-amber-800 mt-1 font-display">
                    {selectedProject.aiScore ? `${selectedProject.aiScore} / 100` : 'Pass'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Gemini 3.8 Flash</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Simulated ROAS</span>
                  <p className="text-xl font-bold text-emerald-800 mt-1 font-display">
                    {selectedProject.simulatedRoas ? `${selectedProject.simulatedRoas}x` : '4.24x'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Tier-2 Benchmark</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Bookings / Leads</span>
                  <p className="text-xl font-bold text-slate-900 mt-1 font-display">
                    {selectedProject.simulatedConversions || 64}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Table Reservations</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Simulated Spend</span>
                  <p className="text-xl font-bold text-slate-900 mt-1 font-display">
                    ₹{(selectedProject.simulatedSpendINR || 9800).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">7-Day Pilot</p>
                </div>
              </div>

              {/* Demonstrated Competencies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-display">
                  <Award className="w-4 h-4 text-amber-600" />
                  Verified Skills Demonstrated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skillsDemonstrated.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 border border-slate-200 text-slate-800 flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Artifacts Showcase */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
                  Key Project Artifacts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.keyArtifacts.map((art, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          {art.type}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 font-display">{art.title}</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{art.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excerpt of Student Work */}
              {selectedProject.submissionSnippet && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="text-xs font-bold text-slate-800">Student Copy Snippet:</p>
                  <p className="text-xs text-slate-700 font-mono italic leading-relaxed">
                    &ldquo;{selectedProject.submissionSnippet}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 text-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                <Share2 className="w-4 h-4 text-amber-600" />
                Shareable Portfolio Link
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Share this live verification link with internship recruiters, hiring managers, or jury evaluators to inspect your work and AI evaluation rubrics.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-800 overflow-x-auto">
              <span className="truncate">
                {window.location.origin}?share={selectedProject.shareToken}
              </span>
              <button
                onClick={() => handleCopyLink(selectedProject.shareToken)}
                className="ml-2 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 flex-shrink-0 transition-colors shadow-xs"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified by SkillSprint AI
              </p>
              <p className="text-slate-600">Includes student identity, AI score breakdown, and campaign simulation proof.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
