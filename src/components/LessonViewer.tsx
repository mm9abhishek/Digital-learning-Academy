import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  PenTool,
  RotateCcw,
} from 'lucide-react';
import { Lesson, Assignment } from '../types';

interface LessonViewerProps {
  lesson: Lesson;
  allLessons: Lesson[];
  assignment: Assignment | null;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenAssignment: (assignmentId: string) => void;
  onBackToCourse: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  allLessons,
  assignment,
  isCompleted,
  onToggleComplete,
  onSelectLesson,
  onOpenAssignment,
  onBackToCourse,
}) => {
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Simple Markdown paragraph formatter
  const renderMarkdown = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-amber-900 mt-5 mb-2 flex items-center gap-2">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-slate-900 mt-4 mb-2">
            {block.replace('#### ', '')}
          </h4>
        );
      }
      if (block.startsWith('- ') || block.startsWith('* ')) {
        const items = block.split('\n');
        return (
          <ul key={idx} className="list-disc pl-5 space-y-1.5 my-2 text-slate-700 text-xs sm:text-sm">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {item.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(block)) {
        const items = block.split('\n');
        return (
          <ol key={idx} className="list-decimal pl-5 space-y-1.5 my-2 text-slate-700 text-xs sm:text-sm">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {item.replace(/^\d+\.\s+/, '')}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-slate-700 text-xs sm:text-sm leading-relaxed my-2.5">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCourse}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Lessons</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            id={`toggle-complete-${lesson.id}`}
            onClick={() => onToggleComplete(lesson.id)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed (+50 XP)' : 'Mark as Read'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 font-display">
            Module {lesson.order} of {allLessons.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {lesson.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {lesson.estimatedMinutes} mins read
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
          {lesson.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          {lesson.shortDescription}
        </p>
      </div>

      {/* Main Lesson Content Body */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-800">
        {renderMarkdown(lesson.contentMarkdown)}
      </div>

      {/* Key Takeaways Card */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border border-amber-300 shadow-sm space-y-3.5">
          <h3 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2 font-display">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Core Marketer Takeaways
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lesson.keyTakeaways.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-xs space-y-1">
                <p className="font-bold text-xs text-slate-900 font-display">{item.title}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action-Oriented Task / Assignment Callout */}
      {assignment ? (
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-300">
              End-of-Lesson Practical Task
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {assignment.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {assignment.subtitle}
            </p>
          </div>

          <button
            id={`btn-open-assignment-${assignment.id}`}
            onClick={() => onOpenAssignment(assignment.id)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition-all flex-shrink-0 cursor-pointer hover:translate-y-[-1px]"
          >
            <PenTool className="w-4 h-4" />
            <span>Complete Task &amp; AI Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500">
          Lesson completed. Proceed to the next module or explore the Campaign Simulator.
        </div>
      )}

      {/* Bottom Pager Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous:</span>
            <span className="truncate max-w-[160px] sm:max-w-xs">{prevLesson.title}</span>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
          >
            <span className="hidden sm:inline">Next:</span>
            <span className="truncate max-w-[160px] sm:max-w-xs">{nextLesson.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToCourse}
            className="flex items-center space-x-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Finish Course Sprint</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
