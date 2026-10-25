import React from 'react';
import { AlertCircle, RefreshCw, BookOpen, KeyRound, Sparkles } from 'lucide-react';

interface ErrorBannerProps {
  error: string;
  details?: string;
  suggestedAlternative?: string;
  onRetry: () => void;
  onLoadPreset: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  error,
  details,
  suggestedAlternative,
  onRetry,
  onLoadPreset,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 rounded-2xl bg-white border border-red-200 shadow-sm animate-in fade-in">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-red-950">
              {error || 'Evaluation Failed'}
            </h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold">
              Notice
            </span>
          </div>

          {details && (
            <p className="text-xs text-red-800 bg-red-50 p-3 rounded-xl border border-red-200/60 leading-relaxed font-mono">
              <strong>Exact Cause / Blocker:</strong> {details}
            </p>
          )}

          {suggestedAlternative && (
            <p className="text-xs text-[#525B56] leading-relaxed">
              <strong>Simplest Feasible Alternative:</strong> {suggestedAlternative}
            </p>
          )}

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C201E] hover:bg-[#323935] text-white text-xs font-semibold shadow-xs transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Evaluation</span>
            </button>

            <button
              onClick={onLoadPreset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Explore Interactive Benchmark Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
