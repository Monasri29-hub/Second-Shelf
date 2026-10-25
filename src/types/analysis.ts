export type FragilityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type SeverityLevel = 'Fatal' | 'Major' | 'Nuance';
export type LikelihoodLevel = 'High' | 'Medium' | 'Low';
export type ImpactLevel = 'Catastrophic' | 'Severe' | 'Manageable';

export interface HiddenAssumption {
  id: string;
  assumption: string;
  category: 'Behavioral' | 'Market' | 'Technical' | 'Financial' | 'Operational' | 'Regulatory';
  fragility: FragilityLevel;
  rationale: string;
  invalidationTest: string;
}

export interface Counterargument {
  id: string;
  perspective: string;
  thesis: string;
  argument: string;
  severity: SeverityLevel;
}

export interface MissingEvidence {
  id: string;
  claim: string;
  gap: string;
  evidenceType: 'Quantitative Data' | 'Customer Intent' | 'Technical Feasibility' | 'Unit Economics' | 'Legal & Regulatory';
  verificationSource: string;
}

export interface RiskScenario {
  id: string;
  scenario: string;
  preMortemStory: string;
  likelihood: LikelihoodLevel;
  impact: ImpactLevel;
  earlyWarningSignal: string;
  mitigation: string;
}

export interface InvestigativeQuestion {
  id: string;
  question: string;
  targetAudience: 'Users & Customers' | 'Self & Founders' | 'Team & Operators' | 'Advisors & Investors';
  whyItMatters: string;
}

export interface PracticalNextStep {
  id: string;
  timeframe: 'Day 1–3' | 'Week 1' | 'Week 2–4';
  action: string;
  killCriteria: string;
  costEstimate: string;
}

export interface MapNode {
  id: string;
  label: string;
  type: 'central' | 'assumption' | 'counterargument' | 'evidence' | 'risk' | 'question';
  category?: string;
  severityOrFragility?: string;
  summary: string;
  details?: Record<string, any>;
  x?: number;
  y?: number;
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'relies_on' | 'opposes' | 'missing' | 'threatens' | 'inquires';
}

export interface SecondSelfAnalysis {
  id: string;
  timestamp: string;
  originalInput: string;
  context?: string;
  personaUsed?: string;
  isAiGenerated: boolean;
  modelUsed: string;
  limitationNotice?: {
    blocker: string;
    alternative: string;
  };
  verification?: {
    realModelCalled: boolean;
    provider: string;
    model?: string;
    reason?: string;
  };
  summary: {
    corePremise: string;
    verdict: string;
    readinessScore: number; // 0 - 100
    fragilityRating: 'Extremely Fragile' | 'Moderately Fragile' | 'Calculated Risk' | 'Well-Grounded';
    executiveCritique: string;
    primaryVulnerability: string;
  };
  hiddenAssumptions: HiddenAssumption[];
  counterarguments: Counterargument[];
  missingEvidence: MissingEvidence[];
  risksAndFailureScenarios: RiskScenario[];
  investigativeQuestions: InvestigativeQuestion[];
  practicalNextSteps: PracticalNextStep[];
  mapNodes: MapNode[];
  mapEdges: MapEdge[];
}

export interface RedTeamResponse {
  targetId: string;
  title: string;
  stressTestPoints: string[];
  cognitiveBiasesAtPlay: string[];
  fortyEightHourKillTest: string;
}
