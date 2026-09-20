import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  FileCheck,
  TrendingUp,
  BookOpen,
  Edit3,
  Check,
  RotateCcw,
  Sparkles,
  Eye,
  X,
  Database,
} from 'lucide-react';
import { Lesson, Submission, User } from '../types';

interface AdminDashboardProps {
  currentUser: User | null;
  lessons: Lesson[];
  submissions: any[];
  onUpdateLesson: (lessonId: string, title: string, shortDescription: string, contentMarkdown: string) => Promise<boolean>;
  onResetDatabase: () => Promise<void>;
  onOpenSupabaseStudio?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  lessons,
  submissions,
  onUpdateLesson,
  onResetDatabase,
  onOpenSupabaseStudio,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0] || null);
  const [editTitle, setEditTitle] = useState(lessons[0]?.title || '');
  const [editDesc, setEditDesc] = useState(lessons[0]?.shortDescription || '');
  const [editContent, setEditContent] = useState(lessons[0]?.contentMarkdown || '');
  const [isSavingLesson, setIsSavingLesson] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [inspectSubmission, setInspectSubmission] = useState<any | null>(null);

  const handleSelectLessonToEdit = (l: Lesson) => {
    setSelectedLesson(l);
    setEditTitle(l.title);
    setEditDesc(l.shortDescription);
    setEditContent(l.contentMarkdown);
    setSaveSuccess(false);
  };

  const handleSaveLesson = async () => {
    if (!selectedLesson) return;
    setIsSavingLesson(true);
    try {
      const ok = await onUpdateLesson(selectedLesson.id, editTitle, editDesc, editContent);
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } finally {
      setIsSavingLesson(false);
    }
  };

  const avgScore = submissions.length > 0
    ? Math.round(
        submissions.reduce((acc, s) => acc + (s.feedback?.overallScore || 70), 0) /
          submissions.length
      )
    : 88;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Admin Screen Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/80 border border-purple-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Administrator &amp; Evaluator Control Center</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Academic &amp; Cohort Analytics
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Logged in as <strong className="text-slate-900">{currentUser?.name || 'Prof. Neha Verma'}</strong>. Manage the Lucknow café curriculum, inspect student submissions, and review AI Mentor evaluation accuracy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenSupabaseStudio && (
            <button
              id="btn-admin-launch-supabase-studio"
              onClick={onOpenSupabaseStudio}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Supabase Studio &amp; SQL</span>
            </button>
          )}

          <button
            onClick={onResetDatabase}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Total Marketers
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-display">128</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Noida &amp; Lucknow Cohorts</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            Evaluations Logged
          </span>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-display">{submissions.length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Auto-Evaluated via AI</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            Cohort Average Score
          </span>
          <p className="text-2xl font-bold text-amber-800 mt-1 font-display">{avgScore} / 100</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Grade A- Benchmark</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Curriculum Modules
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-display">{lessons.length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Active Lessons</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Recent Student Submissions &amp; AI Mentor Scores
          </h3>
          <span className="text-xs text-slate-500 font-medium">{submissions.length} Recorded Submissions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Assignment Title</th>
                <th className="p-3">Score &amp; Grade</th>
                <th className="p-3">Submitted Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">
                    {sub.userName || 'Aarav Sharma'}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {sub.userEmail || 'aarav.sharma@student.edu.in'}
                    </span>
                  </td>
                  <td className="p-3">
                    {sub.assignmentTitle || 'Assignment 3: Creative Copy Variants'}
                    <span className="block text-[10px] text-slate-400">Version {sub.version}</span>
                  </td>
                  <td className="p-3">
                    {sub.feedback ? (
                      <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-amber-100 text-amber-900 border border-amber-300">
                        {sub.feedback.overallScore}/100 ({sub.feedback.grade})
                      </span>
                    ) : (
                      <span className="text-slate-400">Pending</span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    {new Date(sub.updatedAt || sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setInspectSubmission(sub)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1 transition-colors border border-slate-300"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curriculum Management Panel */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
            <BookOpen className="w-4 h-4 text-purple-600" />
            Curriculum Editor (Lucknow Café Course)
          </h3>
          <span className="text-xs text-slate-500">Select a lesson to modify content</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Lesson selector */}
          <div className="lg:col-span-4 space-y-1.5">
            {lessons.map((l) => (
              <button
                key={l.id}
                onClick={() => handleSelectLessonToEdit(l)}
                className={`w-full p-3 rounded-xl text-left text-xs transition-all border ${
                  selectedLesson?.id === l.id
                    ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-bold block">Lesson {l.order}</span>
                <span className="font-semibold text-slate-900 block mt-0.5 truncate">{l.title}</span>
              </button>
            ))}
          </div>

          {/* Edit Form */}
          {selectedLesson && (
            <div className="lg:col-span-8 space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Lesson Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Short Description</label>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Markdown Content Body</label>
                <textarea
                  rows={8}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 font-mono text-[11px] leading-relaxed focus:bg-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {saveSuccess ? (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Lesson content updated in database!
                  </span>
                ) : (
                  <span />
                )}

                <button
                  id="btn-save-lesson-admin"
                  onClick={handleSaveLesson}
                  disabled={isSavingLesson}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isSavingLesson ? 'Saving...' : 'Save Lesson Updates'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inspect Submission Modal */}
      {inspectSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 text-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Submission from {inspectSubmission.userName || 'Student'}
                </h3>
                <p className="text-xs text-slate-500">{inspectSubmission.assignmentTitle}</p>
              </div>
              <button
                onClick={() => setInspectSubmission(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inspectSubmission.feedback && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">AI Mentor Score:</p>
                  <p className="text-xl font-bold text-amber-800 font-display">
                    {inspectSubmission.feedback.overallScore} / 100 ({inspectSubmission.feedback.grade})
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <p className="font-bold">Model: {inspectSubmission.feedback.modelUsed}</p>
                  <p>{new Date(inspectSubmission.feedback.evalTimestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-800">Submitted Content:</p>
              <pre className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {inspectSubmission.submittedContent}
              </pre>
            </div>

            {inspectSubmission.feedback && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">AI Evaluation Feedback:</p>
                <p className="text-xs text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200 italic">
                  &ldquo;{inspectSubmission.feedback.summaryFeedback}&rdquo;
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
