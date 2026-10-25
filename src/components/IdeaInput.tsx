import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, SlidersHorizontal, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';
import { SAMPLE_PRESETS, PresetIdea } from '../data/samplePresets';

interface IdeaInputProps {
  onAnalyze: (idea: string, context?: string, persona?: string) => void;
  onSelectPreset: (preset: PresetIdea) => void;
  isLoading: boolean;
}

const PERSONAS = [
  { id: 'Objective Red-Teamer', label: 'Objective Red-Teamer', desc: 'Cold, systematic epistemic dissection' },
  { id: 'Skeptical CFO & Investor', label: 'Skeptical CFO & Investor', desc: 'Focus on budget cuts, CAC, and ROI' },
  { id: 'Paranoid Operations Engineer', label: 'Paranoid Operator / SRE', desc: 'Focus on failure points, friction & debt' },
  { id: 'Disgruntled User / Customer', label: 'Resistant Customer', desc: 'Focus on switching costs & inertia' },
];

export const IdeaInput: React.FC<IdeaInputProps> = ({
  onAnalyze,
  onSelectPreset,
  isLoading,
}) => {
  const [ideaText, setIdeaText] = useState('');
  const [contextText, setContextText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('Objective Red-Teamer');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ideaText.trim() || isLoading) return;
    onAnalyze(ideaText.trim(), contextText.trim() || undefined, selectedPersona);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleApplyPreset = (preset: PresetIdea) => {
    setIdeaText(preset.title);
    setContextText(preset.context);
    onSelectPreset(preset);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-6 pb-12 px-4 sm:px-6">
      {/* Hero Headline */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEAE1] border border-[#DDD6C9] text-xs font-semibold text-[#48524C] mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          Epistemic Stress-Testing Engine
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-title tracking-tight text-[#161B18] font-normal leading-tight">
          What idea are you ready to <span className="italic font-normal underline decoration-amber-500/40 underline-offset-6">stress-test?</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#525B56] max-w-2xl mx-auto leading-relaxed">
          Enter an ambitious decision, business pivot, product strategy, or argument.
          SecondSelf uncovers hidden assumptions, missing evidence, failure cascades, and maps your cognitive blind spots.
        </p>
      </div>

      {/* Main Input Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#DFD8CC] shadow-sm overflow-hidden transition-all focus-within:border-[#1C201E] focus-within:shadow-md">
        <div className="p-4 sm:p-6">
          <label htmlFor="idea-input" className="block text-xs font-bold uppercase tracking-wider text-[#68726C] mb-2">
            Your Proposition, Decision, or Plan
          </label>
          <textarea
            id="idea-input"
            rows={4}
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="e.g. Quitting my tech job to build a niche SaaS for remote team culture, with 9 months of personal runway..."
            className="w-full text-base sm:text-lg text-[#1C201E] placeholder:text-[#9BA49E] bg-transparent resize-none focus:outline-none leading-relaxed"
          />

          {/* Context toggle */}
          <div className="pt-3 border-t border-[#F0EBE2] flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-[#525B56] hover:text-[#1C201E] font-medium py-1 px-2 rounded-md hover:bg-[#F5F2EC] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span>{showAdvanced ? 'Hide Additional Context' : '+ Add Constraints & Stakes (Optional)'}</span>
            </button>

            <span className="text-[11px] text-[#86908A] font-mono">
              {ideaText.length} chars • <kbd className="px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#4A534E] text-[10px] font-sans">⌘ + Enter</kbd> to analyze
            </span>
          </div>

          {/* Expandable Advanced Options */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-[#F0EBE2] space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-[#525B56] mb-1.5">
                  Context, Stakes, Runway, or Key Constraints:
                </label>
                <textarea
                  rows={2}
                  value={contextText}
                  onChange={(e) => setContextText(e.target.value)}
                  placeholder="e.g. Budget: $50k. Timeline: 6 months. Key audience: Fortune 500 HR directors. Solo founder."
                  className="w-full text-sm text-[#1C201E] placeholder:text-[#9BA49E] bg-[#FAF8F5] border border-[#E5E0D5] rounded-xl p-3 focus:outline-none focus:border-[#1C201E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#525B56] mb-1.5">
                  Select Red-Team Sparring Persona:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PERSONAS.map((persona) => (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={() => setSelectedPersona(persona.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedPersona === persona.id
                          ? 'border-[#1C201E] bg-[#F5F2EC] text-[#1C201E] font-semibold'
                          : 'border-[#EAE5DC] bg-white text-[#525B56] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="font-medium text-[#1C201E]">{persona.label}</div>
                      <div className="text-[11px] text-[#717A74] mt-0.5">{persona.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Submit Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#FAF8F5] border-t border-[#DFD8CC] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#68726C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>Epistemic sparring engine • Secure server model proxy with grounded fallback</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading || !ideaText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#1C201E] hover:bg-[#323935] text-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? 'Critiquing...' : 'Challenge My Thinking'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Benchmark Presets Bar (Great for Hackathon Demos) */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#636C66]">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Or Explore Curated Benchmark Scenarios (Instant Demo)</span>
          </div>
          <span className="text-[11px] text-[#86908A]">Ready for one-click testing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="group cursor-pointer p-4 rounded-xl border border-[#E2DBD0] bg-white hover:border-[#1C201E] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded w-fit mb-2">
                  <span>{preset.badge}</span>
                </div>
                <h2 className="text-xs font-bold text-[#1C201E] line-clamp-2 group-hover:text-amber-900 transition-colors font-sans">
                  {preset.title}
                </h2>
                <p className="mt-1 text-[11px] text-[#636C66] line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#F0EBE2] flex items-center justify-between text-[11px] text-[#4A534E] font-medium group-hover:text-[#1C201E]">
                <span>Load Benchmark Dossier</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
