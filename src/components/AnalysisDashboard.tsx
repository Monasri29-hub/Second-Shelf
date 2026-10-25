import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  ChevronRight,
  Target,
  Compass,
  ArrowUpRight,
  TrendingDown,
  Eye,
  GitBranch,
  Filter
} from 'lucide-react';
import { SecondSelfAnalysis, MapNode } from '../types/analysis';
import { AssumptionMap } from './AssumptionMap';
import { RedTeamModal } from './RedTeamModal';

interface AnalysisDashboardProps {
  analysis: SecondSelfAnalysis;
  onNewAnalysis: () => void;
  onReAnalyzeWithPersona?: (persona: string) => void;
}

type TabType = 'all' | 'map' | 'assumptions' | 'counterarguments' | 'evidence' | 'risks' | 'questions' | 'nextsteps';

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  onNewAnalysis,
  onReAnalyzeWithPersona,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [selectedRedTeamNode, setSelectedRedTeamNode] = useState<MapNode | null>(null);
  const [copied, setCopied] = useState(false);

  // Fragility styling helper
  const getFragilityBadge = (level: string) => {
    switch (level) {
      case 'Critical':
      case 'Fatal':
      case 'Catastrophic':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
      case 'Major':
      case 'Severe':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownDossier(analysis);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownDossier(analysis);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SecondSelf-Dossier-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const launchRedTeamForCustom = (title: string, type: 'assumption' | 'risk' | 'counterargument', summary: string) => {
    setSelectedRedTeamNode({
      id: `custom-${Date.now()}`,
      label: title,
      type,
      summary,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Verification & Source Distinction */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#DDD6C9] flex items-center justify-center text-[#1C201E]">
            <Compass className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#636C66]">
                Critical Assessment Dossier
              </span>
              {analysis.isAiGenerated ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  {analysis.modelUsed} (Real Model Verified)
                </span>
              ) : analysis.limitationNotice ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  Grounded Heuristic Fallback (No Live Model)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-900 border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Curated Benchmark Demo
                </span>
              )}
            </div>
            <p className="text-xs text-[#525B56] mt-0.5">
              Evaluated with persona: <strong className="text-[#1C201E]">{analysis.personaUsed || 'Objective Red-Teamer'}</strong> • Engine: <span className="font-mono text-[11px] font-medium text-[#1C201E]">{analysis.modelUsed}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D5CEC2] hover:bg-[#FAF8F5] text-xs font-medium text-[#1C201E] transition-colors shadow-xs"
            title="Copy as Markdown report"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#525B56]" />}
            <span>{copied ? 'Copied' : 'Copy Dossier'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D5CEC2] hover:bg-[#FAF8F5] text-xs font-medium text-[#1C201E] transition-colors shadow-xs"
            title="Download report file"
          >
            <Download className="w-3.5 h-3.5 text-[#525B56]" />
            <span className="hidden sm:inline">Export .md</span>
          </button>
        </div>
      </div>



      {/* Proposition Card & Executive Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Proposition Callout */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#636C66] mb-1.5 flex items-center gap-2">
              <span>Examined Proposition</span>
              {analysis.context && (
                <span className="text-[10px] lowercase font-normal bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E6E1D8]">
                  with context constraints
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-title font-normal text-[#1C201E] leading-snug">
              &ldquo;{analysis.originalInput}&rdquo;
            </h2>

            {analysis.context && (
              <p className="mt-2 text-xs text-[#636C66] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DD] leading-relaxed">
                <strong className="text-[#1C201E]">Context:</strong> {analysis.context}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-[#F0EBE2]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#636C66] mb-1">
                Executive Critique
              </div>
              <p className="text-sm text-[#2C332F] leading-relaxed">
                {analysis.summary.executiveCritique}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#F0EBE2] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-[#636C66]">
              Core Premise: <span className="text-[#1C201E] font-medium">{analysis.summary.corePremise}</span>
            </div>
            <div className="text-red-800 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 text-[11px] font-medium">
              Primary Vulnerability: {analysis.summary.primaryVulnerability}
            </div>
          </div>
        </div>

        {/* Readiness Score & Verdict Gauge */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#1C201E] text-[#FAF8F5] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                Decision Readiness
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-stone-200">
                {analysis.summary.fragilityRating}
              </span>
            </div>

            {/* Score Number and Radial Indicator */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-serif-title font-bold tracking-tight text-white">
                {analysis.summary.readinessScore}
              </span>
              <span className="text-stone-400 text-lg font-mono">/ 100</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-3">
              <div
                style={{ width: `${analysis.summary.readinessScore}%` }}
                className={`h-full rounded-full transition-all duration-1000 ${
                  analysis.summary.readinessScore < 40 
                    ? 'bg-amber-400' 
                    : analysis.summary.readinessScore < 70 
                    ? 'bg-blue-400' 
                    : 'bg-emerald-400'
                }`}
              />
            </div>

            <div className="mt-4">
              <div className="text-xs uppercase font-mono tracking-wider text-stone-400">Verdict</div>
              <div className="text-base font-bold text-stone-100 mt-0.5">
                {analysis.summary.verdict}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 text-[11px] text-stone-300 flex items-center justify-between">
            <span>Epistemic Stress Test</span>
            <span className="text-amber-300 font-mono">
              {analysis.hiddenAssumptions.length} assumptions • {analysis.risksAndFailureScenarios.length} risks
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E6E1D8]">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'map'
              ? 'bg-[#1C201E] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#1C201E] hover:bg-[#EFEAE1]'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Assumption Map</span>
        </button>

        <button
          onClick={() => setActiveTab('assumptions')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'assumptions'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#7C3AED] hover:bg-[#F3E8FF]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
          <span>1. Hidden Assumptions ({analysis.hiddenAssumptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('counterarguments')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'counterarguments'
              ? 'bg-[#9F1239] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#9F1239] hover:bg-[#FFE4E6]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
          <span>2. Counterarguments ({analysis.counterarguments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'evidence'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#15803D] hover:bg-[#DCFCE7]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
          <span>3. Missing Evidence ({analysis.missingEvidence.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'risks'
              ? 'bg-[#C2410C] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#C2410C] hover:bg-[#FFEDD5]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
          <span>4. Risks & Pre-Mortem ({analysis.risksAndFailureScenarios.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'questions'
              ? 'bg-[#1D4ED8] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#1D4ED8] hover:bg-[#DBEAFE]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
          <span>5. Open Questions ({analysis.investigativeQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('nextsteps')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'nextsteps'
              ? 'bg-[#1C201E] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#1C201E] hover:bg-[#EFEAE1]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>6. Practical Next Steps ({analysis.practicalNextSteps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'all'
              ? 'bg-[#374151] text-white shadow-xs'
              : 'text-[#525B56] hover:text-[#1C201E] hover:bg-[#EFEAE1]'
          }`}
        >
          <span>View All Cards</span>
        </button>
      </div>

      {/* Main Tab Content Display */}
      <div className="space-y-8">
        {/* TAB: ASSUMPTION MAP */}
        {(activeTab === 'map' || activeTab === 'all') && (
          <div className="space-y-4">
            <AssumptionMap
              analysis={analysis}
              onRedTeamNode={(node) => setSelectedRedTeamNode(node)}
            />
          </div>
        )}

        {/* TAB 1: HIDDEN ASSUMPTIONS */}
        {(activeTab === 'assumptions' || activeTab === 'all') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8B5CF6]"></span>
                  1. Hidden Assumptions & Vulnerabilities
                </h3>
                <p className="text-xs text-[#636C66] mt-0.5">
                  Implicit premises taken for granted. If one collapses, does the thesis survive?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.hiddenAssumptions.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs hover:border-[#7C3AED] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FAF5FF] text-[#6B21A8] border border-[#DDD6FE]">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getFragilityBadge(item.fragility)}`}>
                        Fragility: {item.fragility}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1C201E] leading-snug">
                      &ldquo;{item.assumption}&rdquo;
                    </h4>

                    <div className="mt-3 text-xs text-[#525B56] leading-relaxed">
                      <strong className="text-[#1C201E]">Why It&apos;s Fragile:</strong> {item.rationale}
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-xs">
                      <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Rapid Invalidation Test (&lt; 48h):</span>
                      </div>
                      <p className="mt-1 text-[#3C4440] leading-relaxed">
                        {item.invalidationTest}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                    <span className="text-[11px] text-[#86908A]">Unstated premise</span>
                    <button
                      onClick={() => launchRedTeamForCustom(item.assumption, 'assumption', item.rationale)}
                      className="text-xs font-semibold text-[#6B21A8] hover:text-[#581C87] flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Red-Team Point</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COUNTERARGUMENTS & ALTERNATIVE PERSPECTIVES */}
        {(activeTab === 'counterarguments' || activeTab === 'all') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E11D48]"></span>
                2. Counterarguments & Steelmanned Perspectives
              </h3>
              <p className="text-xs text-[#636C66] mt-0.5">
                Strongest possible objections from competitors, customers, and cynical stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.counterarguments.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs hover:border-[#E11D48] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                        {item.perspective}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getFragilityBadge(item.severity)}`}>
                        {item.severity} Objection
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1C201E] leading-snug">
                      {item.thesis}
                    </h4>

                    <p className="mt-2.5 text-xs text-[#525B56] leading-relaxed">
                      {item.argument}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                    <span className="text-[11px] text-[#86908A]">Adversary POV</span>
                    <button
                      onClick={() => launchRedTeamForCustom(item.thesis, 'counterargument', item.argument)}
                      className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Stress-Test Objection</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MISSING EVIDENCE */}
        {(activeTab === 'evidence' || activeTab === 'all') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
                3. Missing Empirical Evidence & Validation Gaps
              </h3>
              <p className="text-xs text-[#636C66] mt-0.5">
                Claims treated as truth without supporting data, benchmarks, or customer actions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.missingEvidence.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs hover:border-[#16A34A] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.evidenceType}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#1C201E] leading-snug">
                      Claim: &ldquo;{item.claim}&rdquo;
                    </h4>

                    <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
                      <div className="font-semibold text-amber-900 mb-0.5">Evidence Deficit:</div>
                      {item.gap}
                    </div>

                    <div className="mt-3 text-xs text-[#525B56] leading-relaxed">
                      <strong className="text-[#1C201E]">Verification Path:</strong> {item.verificationSource}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE2] text-[11px] text-[#86908A]">
                    Falsifiable empirical check
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RISKS & PRE-MORTEM */}
        {(activeTab === 'risks' || activeTab === 'all') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EA580C]"></span>
                4. Potential Risks & Pre-Mortem Scenarios
              </h3>
              <p className="text-xs text-[#636C66] mt-0.5">
                Imagine it is 12 months in the future and this failed catastrophically. Here is why.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.risksAndFailureScenarios.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs hover:border-[#EA580C] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#1C201E]">
                        {item.scenario}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-700">
                          Prob: {item.likelihood}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getFragilityBadge(item.impact)}`}>
                          Impact: {item.impact}
                        </span>
                      </div>
                    </div>

                    {/* Pre-Mortem Flashback */}
                    <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-xs text-[#9A3412] leading-relaxed">
                      <div className="font-semibold text-[#C2410C] flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Pre-Mortem Failure Narrative (12 Months Out):</span>
                      </div>
                      &ldquo;{item.preMortemStory}&rdquo;
                    </div>

                    <div className="mt-3 text-xs text-[#525B56] space-y-1.5">
                      <div>
                        <strong className="text-[#1C201E]">Early Warning Signal:</strong> {item.earlyWarningSignal}
                      </div>
                      <div>
                        <strong className="text-[#1C201E]">Preventative Mitigation:</strong> {item.mitigation}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                    <span className="text-[11px] text-[#86908A]">Failure mode</span>
                    <button
                      onClick={() => launchRedTeamForCustom(item.scenario, 'risk', item.preMortemStory)}
                      className="text-xs font-semibold text-[#C2410C] hover:text-[#9A3412] flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Stress-Test Risk</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INVESTIGATIVE QUESTIONS */}
        {(activeTab === 'questions' || activeTab === 'all') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                5. High-Yield Questions You Should Investigate
              </h3>
              <p className="text-xs text-[#636C66] mt-0.5">
                Uncomfortable questions to ask yourself, prospective buyers, and advisors before committing capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.investigativeQuestions.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs hover:border-[#2563EB] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      Ask: {item.targetAudience}
                    </span>

                    <h4 className="mt-3 text-sm font-bold text-[#1C201E] leading-snug">
                      &ldquo;{item.question}&rdquo;
                    </h4>

                    <p className="mt-2.5 text-xs text-[#525B56] leading-relaxed">
                      <strong className="text-[#1C201E]">Why this is avoided:</strong> {item.whyItMatters}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE2] text-[11px] text-[#86908A]">
                    Targeted inquiry
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PRACTICAL NEXT STEPS */}
        {(activeTab === 'nextsteps' || activeTab === 'all') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif-title font-semibold text-[#1C201E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                6. Practical Next Steps & Falsification Experiments
              </h3>
              <p className="text-xs text-[#636C66] mt-0.5">
                Low-cost micro-experiments to de-risk before burning significant time or capital.
              </p>
            </div>

            <div className="space-y-3">
              {analysis.practicalNextSteps.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 rounded-2xl bg-white border border-[#DFD8CC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {item.timeframe}
                      </span>
                      <span className="text-[11px] font-mono text-[#636C66]">
                        Cost: {item.costEstimate}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1C201E] leading-snug">
                      {item.action}
                    </h4>

                    <div className="text-xs text-red-900 bg-red-50 p-2 rounded-lg border border-red-200 w-fit">
                      <strong>Kill Criteria:</strong> {item.killCriteria}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#D5CEC2] bg-[#FAF8F5] text-[#2C332F]">
                      Ready to Run
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Red Team Drill Modal */}
      {selectedRedTeamNode && (
        <RedTeamModal
          node={selectedRedTeamNode}
          coreIdea={analysis.originalInput}
          onClose={() => setSelectedRedTeamNode(null)}
        />
      )}
    </div>
  );
};

// Helper to format analysis as clean Markdown
function generateMarkdownDossier(analysis: SecondSelfAnalysis): string {
  return `# SecondSelf Critical Thinking Dossier: "${analysis.originalInput}"
Generated: ${new Date(analysis.timestamp).toLocaleDateString()}
Evaluator Model: ${analysis.modelUsed} (${analysis.isAiGenerated ? 'Live Gemini AI' : 'Benchmark Archetype'})
Persona: ${analysis.personaUsed || 'Objective Red-Teamer'}

## Executive Summary
- **Verdict**: ${analysis.summary.verdict}
- **Decision Readiness Score**: ${analysis.summary.readinessScore}/100 (${analysis.summary.fragilityRating})
- **Core Premise**: ${analysis.summary.corePremise}
- **Primary Vulnerability**: ${analysis.summary.primaryVulnerability}

> "${analysis.summary.executiveCritique}"

---

## 1. Hidden Assumptions
${analysis.hiddenAssumptions.map((a, i) => `### ${i + 1}. ${a.assumption} [Category: ${a.category} | Fragility: ${a.fragility}]
- **Rationale**: ${a.rationale}
- **48h Invalidation Test**: ${a.invalidationTest}
`).join('\n')}

---

## 2. Counterarguments & Alternative Perspectives
${analysis.counterarguments.map((c, i) => `### ${i + 1}. ${c.thesis} (POV: ${c.perspective} | Severity: ${c.severity})
${c.argument}
`).join('\n')}

---

## 3. Missing Evidence
${analysis.missingEvidence.map((e, i) => `### ${i + 1}. Claim: "${e.claim}" [Type: ${e.evidenceType}]
- **Empirical Gap**: ${e.gap}
- **Verification Source**: ${e.verificationSource}
`).join('\n')}

---

## 4. Potential Risks & Pre-Mortem Scenarios
${analysis.risksAndFailureScenarios.map((r, i) => `### ${i + 1}. Scenario: ${r.scenario} [Likelihood: ${r.likelihood} | Impact: ${r.impact}]
- **Pre-Mortem Failure Narrative**: "${r.preMortemStory}"
- **Early Warning Signal**: ${r.earlyWarningSignal}
- **Mitigation**: ${r.mitigation}
`).join('\n')}

---

## 5. Investigative Questions
${analysis.investigativeQuestions.map((q, i) => `- **[To ${q.targetAudience}]** "${q.question}"  
  *Why it matters*: ${q.whyItMatters}
`).join('\n')}

---

## 6. Practical Next Steps & Kill Criteria
${analysis.practicalNextSteps.map((s, i) => `### ${i + 1}. [${s.timeframe}] ${s.action} (Cost: ${s.costEstimate})
- **Kill Criteria**: ${s.killCriteria}
`).join('\n')}
`;
}
