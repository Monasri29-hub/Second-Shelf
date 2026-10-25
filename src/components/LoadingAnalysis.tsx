import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, ShieldAlert, GitBranch, CheckCircle2 } from 'lucide-react';

const REASONING_STEPS = [
  { label: 'Deconstructing thesis into implicit premises & dependencies...', icon: BrainCircuit },
  { label: 'Steelmanning adversary counterarguments & stakeholder objections...', icon: ShieldAlert },
  { label: 'Auditing empirical evidence deficits & unverified claims...', icon: Sparkles },
  { label: 'Simulating 12-month catastrophic pre-mortem failure scenarios...', icon: ShieldAlert },
  { label: 'Constructing Assumption Map topology & rapid falsification tests...', icon: GitBranch },
];

export const LoadingAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < REASONING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-16 p-8 rounded-2xl bg-white border border-[#DFD8CC] shadow-sm text-center animate-in fade-in duration-200">
      <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1C201E] text-white flex items-center justify-center animate-pulse">
          <BrainCircuit className="w-8 h-8 text-amber-300" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/40 animate-ping opacity-30" />
      </div>

      <h3 className="text-xl font-serif-title font-semibold text-[#1C201E]">
        SecondSelf is Challenging Your Thinking
      </h3>
      <p className="text-xs text-[#636C66] mt-1 max-w-md mx-auto">
        Running server-side epistemic evaluation and red-team pipeline.
      </p>

      {/* Steps List */}
      <div className="mt-8 space-y-3 text-left">
        {REASONING_STEPS.map((step, index) => {
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;
          const IconComponent = step.icon;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#FAF8F5] border-[#1C201E] text-[#1C201E] font-semibold shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : 'bg-transparent border-transparent text-[#9BA49E]'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-stone-300" />
                )}
              </div>
              <span className="leading-snug">{step.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#F0EBE2] text-[11px] text-[#86908A] font-mono">
        &ldquo;The first principle is that you must not fool yourself — and you are the easiest person to fool.&rdquo; — Richard Feynman
      </div>
    </div>
  );
};
