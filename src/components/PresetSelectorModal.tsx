import React from 'react';
import { X, BookOpen, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { SAMPLE_PRESETS, PresetIdea } from '../data/samplePresets';

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetIdea) => void;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-2xl border border-[#DFD8CC] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-900/10 flex items-center justify-center text-amber-800">
              <Layers className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1C201E]">Benchmark Scenario Presets</h3>
              <p className="text-xs text-[#636C66]">Carefully curated high-stakes strategic dilemmas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-[#525B56]">
            Select any scenario below to explore a complete pre-evaluated dossier and interactive Assumption Map, or to see how SecondSelf deconstructs common cognitive traps.
          </p>

          <div className="space-y-3">
            {SAMPLE_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="group cursor-pointer p-4 rounded-xl border border-[#DFD8CC] bg-white hover:border-[#1C201E] hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      {preset.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#86908A]">
                      Readiness: {preset.analysis.summary.readinessScore}/100
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1C201E] group-hover:text-amber-900 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-[#636C66] line-clamp-2">
                    {preset.tagline}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#D5CEC2] group-hover:bg-[#1C201E] group-hover:text-white transition-all">
                  <span>Load Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] border-t border-[#E6E1D8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#D5CEC2] text-xs font-medium text-[#1C201E] hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
