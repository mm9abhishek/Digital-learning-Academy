import React, { useState, useEffect } from 'react';
import {
  PenTool,
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  FolderHeart,
  ChevronRight,
  FileText,
  Lightbulb,
  Award,
  BookOpen,
} from 'lucide-react';
import { Assignment, Submission, AiFeedback } from '../types';

interface AssignmentWorkspaceProps {
  assignments: Assignment[];
  selectedAssignmentId: string | null;
  submissions: Submission[];
  onSelectAssignment: (assignmentId: string) => void;
  onSubmitAssignment: (assignmentId: string, content: string) => Promise<Submission | null>;
  onNavigateToSimulator: () => void;
  onSaveToPortfolio: (submissionId: string) => void;
}

export const AssignmentWorkspace: React.FC<AssignmentWorkspaceProps> = ({
  assignments,
  selectedAssignmentId,
  submissions,
  onSelectAssignment,
  onSubmitAssignment,
  onNavigateToSimulator,
  onSaveToPortfolio,
}) => {
  const activeAssignment = assignments.find((a) => a.id === selectedAssignmentId) || assignments[0];
  const activeSubmission = submissions.find((s) => s.assignmentId === activeAssignment?.id);

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showStarterConfirm, setShowStarterConfirm] = useState(false);

  // Sync draft or existing submission content
  useEffect(() => {
    if (activeSubmission) {
      setContent(activeSubmission.submittedContent);
    } else if (activeAssignment) {
      setContent(activeAssignment.starterTemplate);
    }
  }, [activeAssignment?.id, activeSubmission?.id]);

  if (!activeAssignment) {
    return <div className="p-8 text-center text-slate-500">No assignments found.</div>;
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const feedback = activeSubmission?.feedback;

  const handleSubmit = async () => {
    if (!content.trim() || content.trim().length < 40) {
      setErrorMessage('Please write a substantive response before submitting for AI review.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const res = await onSubmitAssignment(activeAssignment.id, content);
      if (res) {
        setSuccessMessage('AI Evaluation completed successfully! See your score and rubric below.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to evaluate submission. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadStarterTemplate = () => {
    setContent(activeAssignment.starterTemplate);
    setShowStarterConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Assignment Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
        {assignments.map((asg, idx) => {
          const isSelected = asg.id === activeAssignment.id;
          const sub = submissions.find((s) => s.assignmentId === asg.id);
          return (
            <button
              key={asg.id}
              id={`tab-assignment-${asg.id}`}
              onClick={() => onSelectAssignment(asg.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Task {idx + 1}</span>
              {sub && sub.feedback && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-slate-950 text-amber-300' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {sub.feedback.overallScore}/100
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Two Column Layout: Editor & Rubric / Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Client Brief & Task Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Brief Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-300">
                Client Case Brief: The Nawabi Bean Café
              </span>
              <span className="text-xs text-slate-500 font-medium">Target: Lucknow, UP</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-display">
              {activeAssignment.title}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              &ldquo;{activeAssignment.clientBrief}&rdquo;
            </p>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-800 mb-1">Required Deliverables:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                {activeAssignment.taskInstructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submission Text Editor */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PenTool className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Your Assignment Solution</h3>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-medium">{wordCount} words</span>
                <button
                  type="button"
                  onClick={() => setShowStarterConfirm(true)}
                  className="text-[11px] text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                  title="Reset to starter template"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Starter</span>
                </button>
              </div>
            </div>

            {showStarterConfirm && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-medium">Replace current draft with the original prompt template?</span>
                <div className="space-x-2">
                  <button
                    onClick={loadStarterTemplate}
                    className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold"
                  >
                    Yes, Replace
                  </button>
                  <button
                    onClick={() => setShowStarterConfirm(false)}
                    className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="relative">
              <textarea
                id="assignment-submission-textarea"
                rows={14}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type or paste your ad copy, audience targeting, or budget plan here..."
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-mono leading-relaxed focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-y"
              />
            </div>

            {/* Error or Success notification */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-500">
                {activeSubmission && (
                  <span>
                    Version {activeSubmission.version} • Last evaluated{' '}
                    {new Date(activeSubmission.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>

              <button
                id="btn-submit-to-ai"
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 hover:from-amber-600 hover:to-orange-500 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:translate-y-[-1px]"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Gemini AI Evaluating Rubric...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>{activeSubmission ? 'Resubmit to AI Mentor' : 'Submit for AI Evaluation'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Feedback or Rubric Criteria (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {feedback ? (
            /* Evaluated State */
            <div className="space-y-4">
              {/* Score & Attribution Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 border border-amber-300 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xl flex items-center justify-center font-display shadow-xs">
                      {feedback.grade}
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">AI Assessment Score</p>
                      <p className="text-2xl font-bold text-slate-900 font-display">
                        {feedback.overallScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-display">
                    Grade: {feedback.grade}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-amber-200">
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;{feedback.summaryFeedback}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-amber-800 font-bold">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Model: {feedback.modelUsed}
                  </span>
                  <span>Evaluated: {new Date(feedback.evalTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Rubric Breakdown Accordion / Cards */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-display">
                  <Award className="w-4 h-4 text-amber-600" />
                  Rubric Criteria Breakdown
                </h4>

                <div className="space-y-2.5">
                  {feedback.rubricBreakdown.map((item) => {
                    const pct = (item.score / item.maxScore) * 100;
                    const barColor = pct >= 88 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-orange-500';
                    return (
                      <div
                        key={item.criterionId}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800">{item.criterionName}</span>
                          <span className="font-mono font-bold text-amber-800">
                            {item.score} / {item.maxScore}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full ${barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{item.feedback}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Issues */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
                <div>
                  <p className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-2 font-display">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Key Strengths Identified
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {feedback.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-orange-800 flex items-center gap-1 mb-2 font-display">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                    Areas for Improvement
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {feedback.issues.map((iss, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-orange-600 font-bold">!</span>
                        <span>{iss}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Concrete Example Revision with One-Click Apply */}
              {feedback.exampleRevision && (
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-display">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      Mentor&apos;s Recommended Copy Revision
                    </p>
                    <button
                      type="button"
                      onClick={() => setContent(feedback.exampleRevision)}
                      className="text-[10px] font-bold px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
                      title="Load this revision into your solution textarea"
                    >
                      Apply to Editor
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-white border border-blue-200 text-[11px] text-slate-800 whitespace-pre-wrap font-mono leading-relaxed">
                    {feedback.exampleRevision}
                  </pre>
                </div>
              )}

              {/* Next Practice Step & Action Buttons */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <p className="text-xs font-bold text-slate-800 font-display">Recommended Next Step:</p>
                <p className="text-xs text-slate-600 leading-relaxed">{feedback.nextPracticeTask}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    id="btn-navigate-to-simulator-from-assignment"
                    onClick={onNavigateToSimulator}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Test in Simulator</span>
                  </button>

                  <button
                    id="btn-save-assignment-to-portfolio"
                    onClick={() => onSaveToPortfolio(activeSubmission.id)}
                    className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <FolderHeart className="w-3.5 h-3.5 text-blue-600" />
                    <span>Save to Portfolio</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Pre-Submission Rubric Explanation State */
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Evaluation Rubric Criteria</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Your submission will be scored automatically across 4 performance marketing dimensions. Each criterion is weighted equally at 25 points.
              </p>

              <div className="space-y-3">
                {activeAssignment.rubricCriteria.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{c.name}</span>
                      <span className="font-mono text-amber-800 font-bold">{c.maxScore} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Tip for Lucknow Hospitality:</strong> Mention Hazratganj or Gomti Nagar explicitly and test WhatsApp Business as your Call-To-Action to maximize your score.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
