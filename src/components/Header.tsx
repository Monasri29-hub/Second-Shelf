import React from 'react';
import { ShieldAlert, Sparkles, BrainCircuit, RefreshCw, HelpCircle, Layers } from 'lucide-react';

interface HeaderProps {
  onNewAnalysis: () => void;
  onSelectPreset: () => void;
  onOpenHelp: () => void;
  isAiGenerated?: boolean;
  modelUsed?: string;
  hasActiveAnalysis: boolean;
  serverOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewAnalysis,
  onSelectPreset,
  onOpenHelp,
  isAiGenerated,
  modelUsed,
  hasActiveAnalysis,
  serverOnline
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E6E1D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group"
          title="SecondSelf Home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1C201E] flex items-center justify-center text-[#FAF8F5] shadow-sm group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-[#1C201E]">SecondSelf</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#EAE5DC] text-[#4A534E] font-semibold tracking-wider">
                Red-Team AI
              </span>
            </div>
            <p className="text-[11px] text-[#636C66] hidden sm:block">An AI That Challenges Your Thinking</p>
          </div>
        </div>

        {/* Center / Model Status Badge */}
        <div className="flex items-center gap-2">
          {hasActiveAnalysis ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DCD5C9] bg-[#F3EFE8] text-xs font-medium">
              {isAiGenerated ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[#1C201E] font-semibold">{modelUsed || 'Live Cloud Model'}</span>
                  <span className="text-emerald-800 text-[11px] bg-emerald-100 px-1.5 py-0.2 rounded font-mono">Real AI Verified</span>
                </>
              ) : modelUsed?.includes('Heuristic') ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-[#1C201E] font-medium">Grounded Heuristic Fallback</span>
                  <span className="text-amber-800 text-[11px] bg-amber-100 px-1.5 py-0.2 rounded font-mono">No Model Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-[#1C201E]">Benchmark Dossier</span>
                  <span className="text-blue-800 text-[11px] bg-blue-100 px-1.5 py-0.2 rounded font-mono">Curated Demo</span>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E1D8] bg-[#F7F4EE] text-xs text-[#525B56]">
              <span className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
              <span>Architecture: <strong className="text-[#1C201E] font-semibold">Gemini / Ollama Cloud Ready</strong></span>
              <span className="text-[10px] text-[#7A837E] font-mono">Server Proxy</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectPreset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D5CEC2] hover:border-[#B5ACA0] bg-white hover:bg-[#F3EFE8] text-[#2C332F] transition-all shadow-xs"
            title="Browse pre-analyzed benchmark scenarios"
          >
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Demo</span> Presets
          </button>

          {hasActiveAnalysis && (
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#D5CEC2] hover:border-[#1C201E] bg-white text-[#2C332F] hover:text-[#1C201E] transition-all shadow-xs"
              title="Start a new evaluation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          )}

          <button
            onClick={onOpenHelp}
            className="p-2 rounded-lg text-[#636C66] hover:text-[#1C201E] hover:bg-[#EFEAE1] transition-all"
            title="How SecondSelf works & Methodology"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
