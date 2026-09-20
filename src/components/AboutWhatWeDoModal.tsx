import React from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Target,
  Search,
  Sliders,
  Award,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Database,
} from 'lucide-react';

interface AboutWhatWeDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AboutWhatWeDoModal: React.FC<AboutWhatWeDoModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Platform Architecture &amp; Mission Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                What We Do, Learn &amp; Innovate
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SkillSprint AI bridges the gap between passive digital marketing theory and hands-on execution. Built around an authentic case study of <strong>The Nawabi Bean Café in Hazratganj, Lucknow</strong>, users master high-impact skills with live practice tools.
          </p>
        </div>

        {/* 3 Pillars: Do, Learn, Innovate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1: What We Do */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">1. What We Do</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We provide a full-fledged simulation platform for students and marketers to build real campaigns, write ad copy, structure keyword plans, and optimize on-page SEO without risking real ad spend.
            </p>
          </div>

          {/* Pillar 2: What You Learn */}
          <div className="p-4.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">2. What You Learn</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Master local SEO keyword planning, Google Ads Quality Score diagnostics, Search Console on-page keyword placement, Awadhi regional copywriting, and unit economics in Indian Rupees (INR).
            </p>
          </div>

          {/* Pillar 3: What We Innovate */}
          <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">3. What We Innovate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI-driven instant evaluation using Gemini 3.8 Flash, expected traffic forecasting curves, live Google SERP ad preview engines, and Supabase PostgreSQL persistence for public student portfolios.
            </p>
          </div>
        </div>

        {/* Feature Map */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Interactive Tools Available in This App:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div
              onClick={() => {
                onNavigateTab('seo');
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/20 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-amber-600" />
                  SEO &amp; Traffic Estimator
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">Try Now →</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Keyword research pool, dynamic rank-to-traffic curves, and content marketing briefs.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigateTab('google-practice');
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/20 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" />
                  Google Ads &amp; GSC Sandbox
                </span>
                <span className="text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">Try Now →</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Dummy Google Ads campaign builder &amp; Search Console placement auditor with AI scoring.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigateTab('simulator');
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/20 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  Campaign ROAS Simulator
                </span>
                <span className="text-[10px] text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded font-bold">Try Now →</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Simulate clicks, conversions, CPL and revenue with presets for Awadhi events.
              </p>
            </div>

            <div
              onClick={() => {
                onNavigateTab('portfolio');
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/20 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Verified Portfolio Showcase
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">Try Now →</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Generate shareable public links proving digital marketing competency to employers.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-600">
            Backed by <strong>Supabase PostgreSQL</strong> and powered by <strong>Gemini 3.8 Flash</strong>.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            Got it, Let&apos;s Start Learning!
          </button>
        </div>
      </div>
    </div>
  );
};
