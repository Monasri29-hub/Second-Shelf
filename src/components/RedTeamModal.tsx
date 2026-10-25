import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Sparkles, AlertCircle, CheckCircle2, Copy, Check, Zap } from 'lucide-react';
import { MapNode, RedTeamResponse } from '../types/analysis';

interface RedTeamModalProps {
  node: MapNode | null;
  coreIdea: string;
  onClose: () => void;
}

export const RedTeamModal: React.FC<RedTeamModalProps> = ({ node, coreIdea, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RedTeamResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!node) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    async function runRedTeam() {
      try {
        const response = await fetch('/api/red-team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemTitle: node?.label,
            itemType: node?.type,
            rationale: node?.summary,
            coreIdea,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.error || errBody.details || `Failed to red-team node (HTTP ${response.status})`);
        }

        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Red team error:', err);
          setError(err.message || 'Targeted red-team drill failed.');
          setLoading(false);
        }
      }
    }

    runRedTeam();

    return () => {
      isMounted = false;
    };
  }, [node, coreIdea]);

  if (!node) return null;

  const handleCopy = () => {
    if (!data) return;
    const text = `RED-TEAM STRESS TEST FOR: "${node.label}"\n\nAttack Vectors:\n${data.stressTestPoints.map(p => `• ${p}`).join('\n')}\n\nCognitive Biases:\n${data.cognitiveBiasesAtPlay.map(b => `• ${b}`).join('\n')}\n\n48-Hour Kill Test:\n${data.fortyEightHourKillTest}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#DFD8CC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-900/10 flex items-center justify-center text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#1C201E]">Deep Red-Team Stress Test</h3>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                  Targeted Drill
                </span>
              </div>
              <p className="text-xs text-[#636C66] line-clamp-1 mt-0.5">
                Stress-testing: &quot;{node.label}&quot;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-stone-200 border-t-[#1C201E] animate-spin"></div>
                <Zap className="w-5 h-5 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h4 className="font-semibold text-sm text-[#1C201E]">Steelmanning Opposing Angles...</h4>
              <p className="text-xs text-[#636C66] mt-1 max-w-sm">
                Generating rigorous attack vectors and cognitive bias audits via Gemini.
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Drill Encountered an Issue</span>
              </div>
              <p className="text-red-700">{error}</p>
              <button
                onClick={onClose}
                className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-md font-medium"
              >
                Close & Return
              </button>
            </div>
          ) : data ? (
            <>
              {/* 3 Brutal Attack Vectors */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#636C66] mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>3 Lethal Attack Vectors</span>
                </h4>
                <div className="space-y-2.5">
                  {data.stressTestPoints.map((point, i) => (
                    <div key={i} className="p-3 bg-[#FAF8F5] border border-[#E6E1D8] rounded-xl flex items-start gap-2.5 text-xs text-[#1C201E] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognitive Biases at Play */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#636C66] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Cognitive Biases Distorting Judgment</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.cognitiveBiasesAtPlay.map((bias, i) => (
                    <div key={i} className="p-3 bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl text-xs text-[#581C87]">
                      <div className="font-semibold">{bias}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 48-Hour Kill Test */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#636C66] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rapid 48-Hour Falsification / Kill Test</span>
                </h4>
                <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-xs text-[#14532D] leading-relaxed">
                  {data.fortyEightHourKillTest}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        {data && (
          <div className="p-4 bg-[#FAF8F5] border-t border-[#E6E1D8] flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[#D5CEC2] hover:bg-white text-xs font-medium text-[#1C201E] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Drill Summary'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#1C201E] hover:bg-[#323935] text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
