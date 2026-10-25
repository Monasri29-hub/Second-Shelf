import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaInput } from './components/IdeaInput';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { ErrorBanner } from './components/ErrorBanner';
import { HelpModal } from './components/HelpModal';
import { PresetSelectorModal } from './components/PresetSelectorModal';
import { SecondSelfAnalysis } from './types/analysis';
import { SAMPLE_PRESETS, PresetIdea } from './data/samplePresets';
import { BrainCircuit, ShieldAlert, Sparkles, GitBranch, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<SecondSelfAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<{
    error: string;
    details?: string;
    suggestedAlternative?: string;
  } | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);
  const [lastInput, setLastInput] = useState<{ idea: string; context?: string; persona?: string } | null>(null);

  // Check health and server availability on mount
  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          setServerOnline(true);
        } else {
          setServerOnline(false);
        }
      } catch (err) {
        console.warn('Backend health check warning:', err);
        setServerOnline(false);
      }
    }
    checkHealth();
  }, []);

  const handleAnalyze = async (idea: string, context?: string, persona?: string) => {
    setIsLoading(true);
    setErrorState(null);
    setLastInput({ idea, context, persona });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, context, persona }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(JSON.stringify({
          error: errorData.error || `Server responded with status ${response.status}`,
          details: errorData.details || 'Check terminal server logs or environment configurations.',
          suggestedAlternative: errorData.suggestedAlternative || 'You can instantly explore with the curated benchmark presets below.'
        }));
      }

      const data: SecondSelfAnalysis = await response.json();
      setAnalysis(data);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis failed:', err);
      let parsed = {
        error: 'Analysis could not be completed.',
        details: err?.message || 'Network error communicating with the server.',
        suggestedAlternative: 'Try retrying or load one of our interactive demo scenarios.'
      };
      try {
        parsed = JSON.parse(err.message);
      } catch (_) {}

      setErrorState(parsed);
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: PresetIdea) => {
    setAnalysis(preset.analysis);
    setErrorState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (lastInput) {
      handleAnalyze(lastInput.idea, lastInput.context, lastInput.persona);
    } else {
      setErrorState(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C201E] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Header */}
      <Header
        onNewAnalysis={() => setAnalysis(null)}
        onSelectPreset={() => setIsPresetModalOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        isAiGenerated={analysis?.isAiGenerated}
        modelUsed={analysis?.modelUsed}
        hasActiveAnalysis={Boolean(analysis)}
        serverOnline={serverOnline}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {/* Error Notification */}
        {errorState && (
          <div className="px-4">
            <ErrorBanner
              error={errorState.error}
              details={errorState.details}
              suggestedAlternative={errorState.suggestedAlternative}
              onRetry={handleRetry}
              onLoadPreset={() => {
                setErrorState(null);
                handleSelectPreset(SAMPLE_PRESETS[0]);
              }}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingAnalysis />}

        {/* Active Analysis Dashboard */}
        {!isLoading && analysis && (
          <AnalysisDashboard
            analysis={analysis}
            onNewAnalysis={() => setAnalysis(null)}
          />
        )}

        {/* Empty State / Input Form */}
        {!isLoading && !analysis && (
          <div className="space-y-12">
            <IdeaInput
              onAnalyze={handleAnalyze}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
            />

            {/* How It Works Explainer Grid */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-serif-title text-[#1C201E]">
                  How SecondSelf Red-Teams Your Thinking
                </h3>
                <p className="text-xs text-[#636C66] mt-1">
                  Moving from confirmation bias to intellectual resilience in 6 steps
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF5FF] text-[#7C3AED] flex items-center justify-center mb-3">
                    <span className="font-bold text-xs">1</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Uncovers Hidden Assumptions</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    Surfaces unstated premises, behavioral dependencies, and single points of epistemic failure.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                    <span className="font-bold text-xs">2</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Steelmans Counterarguments</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    Simulates the toughest, most articulate objections from buyers, incumbents, and cynics.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <span className="font-bold text-xs">3</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Identifies Evidence Deficits</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    Flags where belief is substituted for data, recommending specific metrics and validation tests.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <span className="font-bold text-xs">4</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Pre-Mortem Failure Scenarios</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    Looks back from 12 months in the future to map catastrophic failure cascades before they happen.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <span className="font-bold text-xs">5</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Sharp Investigative Inquiries</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    Uncomfortable, high-yield questions you need to ask users, your team, and yourself.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#1C201E] flex items-center justify-center mb-3">
                    <GitBranch className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-xs text-[#1C201E]">Visual Assumption Map</h4>
                  <p className="text-[11px] text-[#525B56] mt-1 leading-relaxed">
                    An interactive topological graph connecting your core proposition to its fragile foundations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A837E]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1C201E]">SecondSelf</span>
            <span>•</span>
            <span>AI Critical Thinking Challenger</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Multi-Provider Architecture & Grounded Heuristics</span>
            <span>•</span>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="text-[#525B56] hover:text-[#1C201E] underline underline-offset-2"
            >
              Methodology & Framework
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPresetModalOpen(true)}
              className="text-[#525B56] hover:text-[#1C201E] underline underline-offset-2"
            >
              Demo Presets
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <PresetSelectorModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
