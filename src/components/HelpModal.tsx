import React from 'react';
import { X, BrainCircuit, ShieldAlert, Sparkles, GitBranch, CheckCircle2, Compass } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#DFD8CC] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1C201E] flex items-center justify-center text-white">
              <BrainCircuit className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1C201E]">About SecondSelf</h3>
              <p className="text-xs text-[#636C66]">The Epistemic Sparring Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#3C4440] leading-relaxed">
          <div>
            <h4 className="text-sm font-bold text-[#1C201E] mb-1">
              Why SecondSelf?
            </h4>
            <p>
              Most AI assistants act as uncritical yes-men, validating whatever strategy, pitch, or argument you give them. 
              <strong> SecondSelf takes the opposite stance:</strong> it assumes every human plan has unexamined dependencies, confirmation bias, and hidden assumptions that could lead to catastrophic failure if left unvetted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E1D8] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C201E] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>The 6-Pillar Evaluation Framework</span>
            </h4>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div><strong>Hidden Assumptions (Lavender):</strong> Unspoken premises taken for granted. If one is false, the foundation crumbles.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FFE4E6] text-[#E11D48] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div><strong>Counterarguments (Burgundy):</strong> Steelmanned objections from competitors, customers, and regulatory cynics.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div><strong>Missing Evidence (Muted Green):</strong> Assertions made without baseline empirical data or customer intent verification.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div><strong>Risks & Pre-Mortem (Orange):</strong> Concrete failure narratives from 12 months in the future, warning indicators, and mitigations.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">5</span>
                <div><strong>Investigative Questions (Blue):</strong> The sharp, uncomfortable questions you must ask users, advisors, and yourself.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">6</span>
                <div><strong>Practical Next Steps:</strong> Low-cost 48-hour falsification experiments with strict kill criteria.</div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#1C201E] mb-1">
              Interactive Assumption Map
            </h4>
            <p>
              The Assumption Map is a visual network diagram connecting your central idea to its surrounding vulnerabilities. 
              Click any node in the map to inspect its rationale, view 48-hour invalidation tests, or click <strong>&quot;Drill Down: Red-Team This Point&quot;</strong> to generate custom attack vectors and cognitive bias assessments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C201E]">
              Model Verification & Connectivity Guide
            </h4>
            <p>
              SecondSelf prioritizes transparent epistemic honesty. We never fabricate model responses or claim an AI model ran when it did not:
            </p>
            <ul className="space-y-1 list-disc pl-4 text-[11px] text-[#525B56]">
              <li><strong className="text-[#1C201E]">Google Gemini:</strong> Proxied server-side via official <code className="bg-stone-200 px-1 rounded font-mono">@google/genai</code>. If your GCP project lacks permissions (HTTP 403), the exact blocker is disclosed.</li>
              <li><strong className="text-[#1C201E]">Ollama Cloud (gemma4:31b-cloud):</strong> Supported via secure server-side proxy to <code className="bg-stone-200 px-1 rounded font-mono">https://ollama.com/api/chat</code>. Requires an Ollama account with cloud model access and an <code className="bg-stone-200 px-1 rounded font-mono">OLLAMA_API_KEY</code> environment variable on the server.</li>
              <li><strong className="text-[#1C201E]">How to Verify:</strong> Check the header and dossier badge. Live model runs carry a green <strong className="text-emerald-800">Real Model Verified</strong> badge with <code className="font-mono">realModelCalled: true</code>. Grounded fallback runs carry an amber <strong className="text-amber-800">Grounded Heuristic Fallback</strong> badge with a full limitation disclosure.</li>
            </ul>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
            <strong>Hackathon Demo Tip:</strong> You can demonstrate SecondSelf by entering any custom ambition, or by clicking any of the 3 Curated Benchmark Scenarios for an instant, zero-latency showcase.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E6E1D8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1C201E] hover:bg-[#323935] text-white text-xs font-semibold"
          >
            Got it, Let&apos;s Spar
          </button>
        </div>
      </div>
    </div>
  );
};
