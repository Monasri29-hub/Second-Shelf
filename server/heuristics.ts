/**
 * Grounded Epistemic Heuristic Engine
 * 
 * Generates deeply relevant, intellectually rigorous critiques strictly grounded
 * in the user's actual proposition. Never introduces unrelated SaaS or business
 * scenarios unless the user's idea is explicitly commercial.
 */

interface ParsedDomain {
  type: 'personal_lifestyle' | 'tech_engineering' | 'work_organization' | 'civic_public' | 'business_venture' | 'general_decision';
  actors: string;
  resourceType: string;
  primaryRiskType: string;
}

function detectDomain(text: string): ParsedDomain {
  const lower = text.toLowerCase();

  // Personal / lifestyle / health / habits
  if (
    lower.match(/\b(eat|diet|food|vegan|vegetarian|exercise|workout|gym|run|running|marathon|sleep|habit|quitting|caffeine|alcohol|smoke|smoking|personal|myself|family|routine|hobby|travel|reading|study|learn|learn to|weight)\b/)
  ) {
    return {
      type: 'personal_lifestyle',
      actors: 'you and your personal circle',
      resourceType: 'willpower, physical energy, and personal time',
      primaryRiskType: 'habitual regression and psychological fatigue',
    };
  }

  // Technical / software / engineering
  if (
    lower.match(/\b(code|coding|software|python|rust|javascript|typescript|golang|database|postgres|sql|nosql|api|microservices|architecture|refactor|framework|deploy|devops|aws|cloud|docker|kubernetes|git|pr|library|algorithm|llm|model|testing|qa|agent)\b/)
  ) {
    return {
      type: 'tech_engineering',
      actors: 'engineers, operators, and downstream systems',
      resourceType: 'engineering bandwidth, cognitive load, and operational debt',
      primaryRiskType: 'unanticipated edge cases, migration regression, and maintainability drag',
    };
  }

  // Workplace / organization / team policy
  if (
    lower.match(/\b(company|team|office|remote|rto|workplace|mandate|meeting|meetings|culture|hiring|layoff|bonus|salary|manager|employee|hr|staff|headcount|review|promotion)\b/)
  ) {
    return {
      type: 'work_organization',
      actors: 'employees, managers, and cross-functional teams',
      resourceType: 'organizational trust, focus time, and team morale',
      primaryRiskType: 'adverse talent attrition and quiet disengagement',
    };
  }

  // Civic / public policy / school / environment
  if (
    lower.match(/\b(school|students|kids|children|city|neighborhood|community|council|tax|public|park|law|policy|ban|government|library|citizen|civic)\b/)
  ) {
    return {
      type: 'civic_public',
      actors: 'constituents, participants, and local stewards',
      resourceType: 'public compliance, administrative overhead, and social cohesion',
      primaryRiskType: 'unintended secondary behavioral pushback and selective compliance',
    };
  }

  // Commercial / venture / business
  if (
    lower.match(/\b(startup|saas|pricing|customer|buyer|sales|revenue|invest|investor|vc|market|product|client|b2b|b2c|e-commerce|monetize|charge)\b/)
  ) {
    return {
      type: 'business_venture',
      actors: 'paying customers, decision-makers, and market competitors',
      resourceType: 'financial runway, customer acquisition cost, and working capital',
      primaryRiskType: 'insufficient willingness-to-pay and high distribution friction',
    };
  }

  return {
    type: 'general_decision',
    actors: 'the primary decision-maker and affected parties',
    resourceType: 'allocated time, focus, and opportunity cost',
    primaryRiskType: 'underestimating friction and overestimating initial consistency',
  };
}

function extractCoreSubject(text: string): string {
  const cleaned = text.trim().replace(/^["']|["']$/g, '');
  // Extract up to 70 characters smoothly
  if (cleaned.length <= 70) return cleaned;
  const truncated = cleaned.slice(0, 67);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 30 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
}

export function generateHeuristicAnalysis(
  idea: string,
  context?: string,
  persona?: string,
  blockerReason?: string,
  simplestAlternative?: string
) {
  const cleanIdea = idea.trim();
  const domain = detectDomain(cleanIdea);
  const subjectSnippet = extractCoreSubject(cleanIdea);

  // Dynamic grounding based on domain
  let verdict: string;
  let primaryVulnerability: string;
  let executiveCritique: string;
  let assumptionsList: Array<{
    assumption: string;
    category: 'Behavioral' | 'Market' | 'Technical' | 'Financial' | 'Operational' | 'Regulatory';
    fragility: 'Critical' | 'High' | 'Medium' | 'Low';
    rationale: string;
    invalidationTest: string;
  }>;
  let counterargumentsList: Array<{
    perspective: string;
    thesis: string;
    argument: string;
    severity: 'Fatal' | 'Major' | 'Nuance';
  }>;
  let missingEvidenceList: Array<{
    claim: string;
    gap: string;
    evidenceType: 'Quantitative Data' | 'Customer Intent' | 'Technical Feasibility' | 'Unit Economics' | 'Legal & Regulatory';
    verificationSource: string;
  }>;
  let risksList: Array<{
    scenario: string;
    preMortemStory: string;
    likelihood: 'High' | 'Medium' | 'Low';
    impact: 'Catastrophic' | 'Severe' | 'Manageable';
    earlyWarningSignal: string;
    mitigation: string;
  }>;
  let questionsList: Array<{
    question: string;
    targetAudience: 'Users & Customers' | 'Self & Founders' | 'Team & Operators' | 'Advisors & Investors';
    whyItMatters: string;
  }>;
  let nextStepsList: Array<{
    timeframe: 'Day 1–3' | 'Week 1' | 'Week 2–4';
    action: string;
    killCriteria: string;
    costEstimate: string;
  }>;

  if (domain.type === 'personal_lifestyle') {
    verdict = 'High Behavioral Friction';
    primaryVulnerability = 'Relying on peak initial motivation while underestimating environmental fatigue and daily friction.';
    executiveCritique = `The proposed change ("${subjectSnippet}") represents a high-energy intervention competing against deeply ingrained baseline routines. The primary blind spot is assuming baseline enthusiasm will persist during high-stress or low-willpower days without structural friction-reduction safeguards.`;

    assumptionsList = [
      {
        assumption: `Your schedule and cognitive energy will accommodate "${subjectSnippet}" consistently across bad days, not just ideal days.`,
        category: 'Behavioral',
        fragility: 'Critical',
        rationale: 'Habit changes planned during calm or inspired moments frequently collapse at the first contact with sleep deprivation, travel, or unexpected deadlines.',
        invalidationTest: 'Test adherence under intentionally stressful conditions: simulate the hardest day of your week and measure if execution is still feasible.'
      },
      {
        assumption: `The intended benefits will manifest quickly enough to reinforce the daily friction before burnout sets in.`,
        category: 'Operational',
        fragility: 'High',
        rationale: 'If feedback loops are delayed by weeks or months, willpower drains before physiological or neurological adaptation provides organic reinforcement.',
        invalidationTest: 'Define 1 immediate leading proxy metric you can feel within 72 hours rather than waiting for lagging outcomes.'
      },
      {
        assumption: `Your immediate social or living environment will tolerate or support this change without creating passive resistance.`,
        category: 'Behavioral',
        fragility: 'Medium',
        rationale: 'Personal changes that conflict with household routines, meal sharing, or social commitments create friction that erodes consistency.',
        invalidationTest: 'Have an explicit conversation with the 2 people most affected by your daily schedule and note any unspoken objections.'
      }
    ];

    counterargumentsList = [
      {
        perspective: 'The Habitual Baseline (System 1 Inertia)',
        thesis: 'The cognitive cost of this change will deplete willpower needed for other critical life domains.',
        argument: `Attempting "${subjectSnippet}" without reducing commitments elsewhere forces a zero-sum trade-off. When life demands spike, your brain will protect essential functions by abandoning non-habitual overhead first.`,
        severity: 'Major'
      },
      {
        perspective: 'The Skeptical Pragmatist',
        thesis: 'The protocol is too absolute; all-or-nothing designs fail on the first exception.',
        argument: `Rigid implementations create a "what-the-hell" cognitive trap: as soon as a single day is missed or compromised, the entire streak feels broken, prompting complete abandonment.`,
        severity: 'Major'
      }
    ];

    missingEvidenceList = [
      {
        claim: `A sustained commitment to "${subjectSnippet}" is viable within your existing weekly calendar.`,
        gap: 'No time-audited baseline demonstrating what current activity will be permanently de-prioritized.',
        evidenceType: 'Quantitative Data',
        verificationSource: 'Audit your last 14 days of calendar and log where the required hours will realistically come from.'
      },
      {
        claim: `This specific approach is the highest-leverage method to achieve the desired personal outcome.`,
        gap: 'Lack of comparison against simpler, lower-friction micro-interventions.',
        evidenceType: 'Customer Intent',
        verificationSource: 'Test a 20% scaled-down version for 5 days before committing to the full regimen.'
      }
    ];

    risksList = [
      {
        scenario: 'The Motivation Evaporation Dip',
        preMortemStory: `Month 2 arrives: the novelty wore off, a minor illness or busy week disrupted the rhythm, and without accountability the routine quietly evaporated back to baseline.`,
        likelihood: 'High',
        impact: 'Severe',
        earlyWarningSignal: 'Skipping two scheduled sessions consecutively while promising to "make it up over the weekend."',
        mitigation: 'Implement a strict "never miss twice" rule paired with a frictionless 5-minute fallback version for emergency days.'
      },
      {
        scenario: 'Hidden Lifestyle Friction Overload',
        preMortemStory: `The ancillary overhead (preparation, recovery, schedule rigidity) caused subtle resentment among family or colleagues, forcing an uncomfortable choice.`,
        likelihood: 'Medium',
        impact: 'Manageable',
        earlyWarningSignal: 'Feeling irritation whenever an external commitment infringes on the new routine.',
        mitigation: 'Pre-negotiate calendar boundaries and create clear exceptions for social occasions.'
      }
    ];

    questionsList = [
      {
        question: `When you are exhausted, sick, or under high stress, what is the minimum acceptable fallback version of this commitment?`,
        targetAudience: 'Self & Founders',
        whyItMatters: 'Sustainable habits are defined by their floor on bad days, not their ceiling on perfect days.'
      },
      {
        question: `What specific daily activity are you willing to permanently stop doing to create space for this?`,
        targetAudience: 'Self & Founders',
        whyItMatters: 'Without explicitly subtracting an existing habit, you are pretending time is elastic.'
      }
    ];

    nextStepsList = [
      {
        timeframe: 'Day 1–3',
        action: `Execute a "micro-dose" trial of "${subjectSnippet}" at 25% scale for 3 consecutive days without changing anything else.`,
        killCriteria: 'If finding 15 minutes of focus feels chaotic, re-evaluate baseline commitments first.',
        costEstimate: '$0 & 30 minutes'
      },
      {
        timeframe: 'Week 1',
        action: 'Identify and remove the 2 biggest friction points in your physical environment that slow down starting.',
        killCriteria: 'If starting requires more than 3 preparatory steps, redesign the setup.',
        costEstimate: '$0 & 1 hour'
      }
    ];
  } else if (domain.type === 'tech_engineering') {
    verdict = 'High Architectural & Migration Risk';
    primaryVulnerability = 'Underestimating operational maintenance debt, backward compatibility edge cases, and team learning curves.';
    executiveCritique = `The technical premise for "${subjectSnippet}" is clear on paper, but engineering changes often suffer from the "second-system effect". The core blind spot is focusing on optimal happy-path benchmarks while underestimating edge-case triage, debugging tooling deficits, and cross-team adoption latency.`;

    assumptionsList = [
      {
        assumption: `The proposed architecture or tool ("${subjectSnippet}") will integrate cleanly with legacy components without introducing hidden latency or serialization bottlenecks.`,
        category: 'Technical',
        fragility: 'Critical',
        rationale: 'New frameworks and paradigms frequently conflict with existing telemetry, ORMs, build pipelines, or database drivers in non-obvious ways.',
        invalidationTest: 'Build a minimal end-to-end spike integrating the new solution with the oldest, messiest component in your stack.'
      },
      {
        assumption: `The entire engineering team will ramp up quickly without a prolonged drop in deployment velocity or code review throughput.`,
        category: 'Operational',
        fragility: 'High',
        rationale: 'Idiomatic patterns, debugging intuitions, and production firefighting instincts take months of institutional repetition to solidify.',
        invalidationTest: 'Have your most junior and most senior teammate independently implement a standard bugfix using the proposed stack.'
      },
      {
        assumption: `Third-party libraries, tooling, and monitoring support for this approach are mature enough for production triage at 2:00 AM.`,
        category: 'Technical',
        fragility: 'Critical',
        rationale: 'Bleeding-edge or non-standard tools often lack robust APM integrations, profiling tools, and battle-tested crash dump analyzers.',
        invalidationTest: 'Intentionally trigger a catastrophic memory leak or unhandled exception in staging and evaluate how easily your existing APM flags the root cause.'
      }
    ];

    counterargumentsList = [
      {
        perspective: 'The Pragmatic SRE / On-Call Engineer',
        thesis: 'Boring technology that fails predictably is superior to novel technology with unmapped failure modes.',
        argument: `Our current stack may have recognized inefficiencies, but its failure modes, runbooks, and operational profiles are thoroughly understood. Introducing "${subjectSnippet}" introduces an unquantified attack surface during critical production incidents.`,
        severity: 'Fatal'
      },
      {
        perspective: 'The Staff Architect',
        thesis: 'The perceived performance or elegance gain will be dwarfed by coordination overhead.',
        argument: `Unless the current system is actively blocking core business SLA thresholds, the opportunity cost of rewriting or maintaining dual stacks for 6 months will delay product features that directly impact users.`,
        severity: 'Major'
      }
    ];

    missingEvidenceList = [
      {
        claim: `The new approach demonstrably outperforms the optimized baseline under realistic production contention.`,
        gap: 'No synthetic load-testing benchmark comparing the proposed stack against an appropriately tuned version of the existing system.',
        evidenceType: 'Technical Feasibility',
        verificationSource: 'Run an empirical benchmark under 5x peak traffic with simulated database connection stalls.'
      },
      {
        claim: `Maintenance overhead will decrease rather than increase over an 18-month horizon.`,
        gap: 'Zero data on dependency vulnerability patching frequency and migration deprecation cycles for the target ecosystem.',
        evidenceType: 'Quantitative Data',
        verificationSource: 'Audit the release cadence, breaking changes, and issue tracker velocity of the core dependencies.'
      }
    ];

    risksList = [
      {
        scenario: 'The Two-Stack Purgatory',
        preMortemStory: `The migration achieved 60% completion before feature priorities intervened, leaving the team supporting two divergent architectures indefinitely with double the cognitive overhead.`,
        likelihood: 'High',
        impact: 'Catastrophic',
        earlyWarningSignal: 'Migration tickets lingering in the backlog while new features are shoehorned into both stacks simultaneously.',
        mitigation: 'Enforce a strict "cut-over deadline" with an automated sunset plan before beginning any parallel deployment.'
      },
      {
        scenario: 'The Obscure Production Deadlock',
        preMortemStory: `A subtle concurrency or garbage-collection quirk unique to "${subjectSnippet}" caused intermittent customer timeouts that took 3 weeks of frantic profiling to diagnose.`,
        likelihood: 'Medium',
        impact: 'Severe',
        earlyWarningSignal: 'P99 latency spiking intermittently under non-uniform payload sizes.',
        mitigation: 'Implement rigorous chaos testing and trace instrumentation prior to routing production traffic.'
      }
    ];

    questionsList = [
      {
        question: `Could we achieve 80% of this desired benefit simply by profiling and optimizing the existing stack for 3 days?`,
        targetAudience: 'Team & Operators',
        whyItMatters: 'Rewriting is emotionally satisfying for engineers, but often conceals unaddressed low-hanging optimizations in the current codebase.'
      },
      {
        question: `If the primary champion of this technology leaves the company next month, who will enthusiastically own and maintain it?`,
        targetAudience: 'Advisors & Investors',
        whyItMatters: 'Architectural decisions must be sustainable across team personnel turnover.'
      }
    ];

    nextStepsList = [
      {
        timeframe: 'Day 1–3',
        action: `Build a scoped, self-contained prototype of "${subjectSnippet}" that implements a single high-throughput endpoint.`,
        killCriteria: 'If setup and telemetry require more than 16 hours of configuration wrestling, pause.',
        costEstimate: '$0 & 12 engineering hours'
      },
      {
        timeframe: 'Week 1',
        action: 'Run a paired-programming code review session with 3 teammates to assess ergonomics and comprehension.',
        killCriteria: 'If teammates struggle to reason about the control flow after 1 hour, reconsider idioms.',
        costEstimate: '$0 & 4 hours'
      }
    ];
  } else if (domain.type === 'work_organization') {
    verdict = 'High Organizational Resistance';
    primaryVulnerability = 'Confusing structural enforcement with organic cultural engagement, leading to selective compliance and top-performer churn.';
    executiveCritique = `The initiative ("${subjectSnippet}") attempts to resolve complex coordination or cultural objectives through top-down policy. The central blind spot is failing to recognize that policies impose asymmetric costs across roles: mobile, high-market-value contributors feel disproportionately constrained, while disengaged workers comply performatively.`;

    assumptionsList = [
      {
        assumption: `Team members will interpret "${subjectSnippet}" as a collaborative improvement rather than punitive surveillance or bureaucratic friction.`,
        category: 'Behavioral',
        fragility: 'Critical',
        rationale: 'Policies announced without deep bilateral input are immediately perceived as management distrust, destroying psychological safety.',
        invalidationTest: 'Hold an open, anonymous "steelman" forum where team members voice the sharpest criticisms of this proposal without penalty.'
      },
      {
        assumption: `Line managers are willing and equipped to enforce this policy consistently without granting quiet exceptions.`,
        category: 'Operational',
        fragility: 'High',
        rationale: 'Middle managers hate playing hall monitor and will secretly exempt star performers to avoid resignations, creating perceived unfairness.',
        invalidationTest: 'Interview 4 line managers privately about how they would handle their best engineer refusing to comply.'
      }
    ];

    counterargumentsList = [
      {
        perspective: 'The High-Performing Senior Individual Contributor',
        thesis: 'This policy optimizes for visibility and presence over deep, uninterrupted execution.',
        argument: `I deliver high impact because I have autonomy over my focus time. Imposing "${subjectSnippet}" introduces meeting friction and context-switching that directly damages my output. If my autonomy is degraded, I will accept competing offers.`,
        severity: 'Fatal'
      },
      {
        perspective: 'The Talent Acquisition Lead',
        thesis: 'Candidate pipelines will contract and salary expectations will rise.',
        argument: `Every rigid constraint placed on working conditions reduces our addressable candidate pool and requires a financial compensation premium to offset.`,
        severity: 'Major'
      }
    ];

    missingEvidenceList = [
      {
        claim: `The current perceived problem was directly caused by the lack of "${subjectSnippet}".`,
        gap: 'No empirical baseline linking current delivery bottlenecks to this specific operational variable.',
        evidenceType: 'Quantitative Data',
        verificationSource: 'Audit delivery cycle times and retrospective feedback to confirm root causes.'
      }
    ];

    risksList = [
      {
        scenario: 'The Adverse Selection Brain Drain',
        preMortemStory: `Within 90 days of enacting "${subjectSnippet}", three irreplaceable technical leads resigned for flexible competitors, while the least marketable staff complied with minimal enthusiasm.`,
        likelihood: 'High',
        impact: 'Catastrophic',
        earlyWarningSignal: 'Spike in LinkedIn profile updates and sudden usage of accrued PTO among senior contributors.',
        mitigation: 'Identify the top 10% indispensable contributors and hold 1-on-1 retention alignment checks before announcing any broad mandate.'
      }
    ];

    questionsList = [
      {
        question: `What exact problem are we trying to fix, and can we measure whether this policy actually moves that needle?`,
        targetAudience: 'Team & Operators',
        whyItMatters: 'If you cannot measure the outcome, the policy becomes a permanent fixture of inertia.'
      }
    ];

    nextStepsList = [
      {
        timeframe: 'Day 1–3',
        action: 'Form a working group of 4 respected peer leads across different functions to co-design a 30-day pilot.',
        killCriteria: 'If peer leads are unanimously opposed, do not force an executive edict.',
        costEstimate: '$0 & 4 hours'
      }
    ];
  } else if (domain.type === 'civic_public') {
    verdict = 'High Stakeholder Divergence';
    primaryVulnerability = 'Underestimating unintended behavioral adaptations and the difficulty of equitable enforcement.';
    executiveCritique = `The public proposal ("${subjectSnippet}") addresses a recognized community interest, but civic interventions frequently trigger the "Cobra Effect"—where the public reaction inadvertently worsens the original problem or shifts costs onto vulnerable stakeholders.`;

    assumptionsList = [
      {
        assumption: `The targeted population will comply cooperatively rather than finding loopholes, shifting to unregulated substitutes, or actively resisting.`,
        category: 'Behavioral',
        fragility: 'Critical',
        rationale: 'Civic mandates that impose friction without clear, accessible alternatives generate immediate workarounds.',
        invalidationTest: 'Map out the easiest 3 ways a citizen or participant could evade this rule and measure the enforcement cost.'
      },
      {
        assumption: `Administrative enforcement mechanisms have the budget and personnel to operate consistently over multiple years.`,
        category: 'Operational',
        fragility: 'High',
        rationale: 'Unfunded civic mandates decay into arbitrary, selective enforcement that breeds community cynicism.',
        invalidationTest: 'Calculate the exact annual enforcement cost per participant.'
      }
    ];

    counterargumentsList = [
      {
        perspective: 'The Disproportionately Impacted Participant',
        thesis: 'The rule imposes a regressive burden on those with the fewest alternatives.',
        argument: `Well-resourced participants can easily absorb or bypass "${subjectSnippet}", but those with tight schedules or limited resources bear the brunt of the administrative friction.`,
        severity: 'Major'
      }
    ];

    missingEvidenceList = [
      {
        claim: `Similar policies in neighboring communities produced the claimed net positive outcome without severe side effects.`,
        gap: 'No longitudinal study evaluating secondary costs in comparable demographic environments.',
        evidenceType: 'Quantitative Data',
        verificationSource: 'Examine 3 case studies of cities or schools that implemented identical measures over the past 5 years.'
      }
    ];

    risksList = [
      {
        scenario: 'The Selective Enforcement Backlash',
        preMortemStory: `Enforcement proved impossible to maintain universally, leading to accusations of bias, public disputes, and an eventual quiet repeal.`,
        likelihood: 'Medium',
        impact: 'Severe',
        earlyWarningSignal: 'Community forums dominated by complaints of unfair application within 60 days.',
        mitigation: 'Build clear, objective, automated compliance criteria that eliminate discretionary human gatekeeping.'
      }
    ];

    questionsList = [
      {
        question: `What is the easiest, most predictable way people will circumvent this rule, and how will we respond?`,
        targetAudience: 'Users & Customers',
        whyItMatters: 'Anticipating evasion prevents being surprised by obvious human incentives.'
      }
    ];

    nextStepsList = [
      {
        timeframe: 'Day 1–3',
        action: 'Conduct 6 informal discovery conversations with diverse members of the affected community to understand their practical daily constraints.',
        killCriteria: 'If practical barriers are insurmountable without subsidies, halt policy drafting.',
        costEstimate: '$0 & 6 hours'
      }
    ];
  } else {
    // General or Business Decision
    verdict = 'Calculated Proposition with Unverified Dependencies';
    primaryVulnerability = 'Underestimating systemic friction and relying on unvalidated counter-party willingness.';
    executiveCritique = `The proposition ("${subjectSnippet}") has intuitive appeal, but currently rests on optimistic assumptions regarding third-party responsiveness, timeline durability, and capital or attention efficiency. Ground-level friction is consistently higher than planning-stage models assume.`;

    assumptionsList = [
      {
        assumption: `Counter-parties and stakeholders will prioritize "${subjectSnippet}" as urgently as you do.`,
        category: 'Behavioral',
        fragility: 'Critical',
        rationale: 'What feels like a top-tier initiative to the proposer is often a low-priority distraction to everyone else.',
        invalidationTest: 'Demand a tangible commitment (time, money, or written agreement) from 3 key participants within 48 hours.'
      },
      {
        assumption: `The resource runway (time, capital, or attention) will outlast unexpected external delays.`,
        category: 'Financial',
        fragility: 'High',
        rationale: 'Complex initiatives take an average of 2.5x longer to achieve validation than initial projections forecast.',
        invalidationTest: 'Stress-test your timeline by modeling a 60-day complete freeze on forward momentum.'
      },
      {
        assumption: `Existing alternatives or entrenched habits will yield easily to this new approach.`,
        category: 'Market',
        fragility: 'High',
        rationale: 'Status-quo inertia is the strongest force in human systems; being slightly better is rarely enough to dislodge habit.',
        invalidationTest: 'Interview 5 target individuals about how they currently solve this problem and what would force them to switch today.'
      }
    ];

    counterargumentsList = [
      {
        perspective: 'The Hardened Skeptic',
        thesis: 'The perceived urgency is an artifact of your enthusiasm, not external demand.',
        argument: `You are looking at "${subjectSnippet}" through a lens of confirmation bias. Real participants have established workarounds that cost them zero incremental mental energy.`,
        severity: 'Major'
      },
      {
        perspective: 'The Resource Steward',
        thesis: 'Opportunity cost makes this a suboptimal allocation of finite focus.',
        argument: `Every hour and dollar poured into this initiative is subtracted from proven, existing commitments that already produce reliable returns.`,
        severity: 'Major'
      }
    ];

    missingEvidenceList = [
      {
        claim: `There is genuine, unprompted interest in "${subjectSnippet}".`,
        gap: 'No empirical proof of demand or commitment without high-pressure personal persuasion.',
        evidenceType: 'Customer Intent',
        verificationSource: 'Present the idea passively without selling and measure organic follow-up rates.'
      }
    ];

    risksList = [
      {
        scenario: 'The Friction Exhaustion Trap',
        preMortemStory: `Execution encountered countless small administrative and logistical delays; energy waned and the initiative stalled before reaching the finish line.`,
        likelihood: 'High',
        impact: 'Severe',
        earlyWarningSignal: 'Milestone deadlines slipping past target dates within the first 3 weeks.',
        mitigation: 'Break the initiative into 7-day deliverable sprints with explicit stop/continue gates.'
      }
    ];

    questionsList = [
      {
        question: `If this initiative completely fails, what will have been the obvious root cause in hindsight?`,
        targetAudience: 'Self & Founders',
        whyItMatters: 'Pre-mortem thinking illuminates the blind spots your optimism actively suppresses.'
      }
    ];

    nextStepsList = [
      {
        timeframe: 'Day 1–3',
        action: `Execute a 48-hour low-stakes falsification test focused specifically on the single most fragile assumption of "${subjectSnippet}".`,
        killCriteria: 'If you encounter complete apathy from 5 independent observers, re-scope immediately.',
        costEstimate: '$0 & 4 hours'
      }
    ];
  }

  // Construct Map Nodes and Edges directly tied to the user's input
  const mapNodes = [
    {
      id: 'node-central',
      label: subjectSnippet,
      type: 'central' as const,
      summary: cleanIdea
    },
    ...assumptionsList.map((a, i) => ({
      id: `node-ha-${i + 1}`,
      label: a.assumption.length > 40 ? a.assumption.slice(0, 37) + '...' : a.assumption,
      type: 'assumption' as const,
      category: a.category,
      severityOrFragility: a.fragility,
      summary: a.rationale
    })),
    ...risksList.map((r, i) => ({
      id: `node-rs-${i + 1}`,
      label: r.scenario,
      type: 'risk' as const,
      severityOrFragility: r.impact,
      summary: r.preMortemStory
    })),
    ...missingEvidenceList.map((m, i) => ({
      id: `node-me-${i + 1}`,
      label: m.claim.length > 36 ? m.claim.slice(0, 33) + '...' : m.claim,
      type: 'evidence' as const,
      severityOrFragility: m.evidenceType,
      summary: m.gap
    })),
    ...questionsList.map((q, i) => ({
      id: `node-iq-${i + 1}`,
      label: q.question.length > 40 ? q.question.slice(0, 37) + '...' : q.question,
      type: 'question' as const,
      severityOrFragility: q.targetAudience,
      summary: q.whyItMatters
    }))
  ];

  const mapEdges = [
    ...assumptionsList.map((_, i) => ({
      id: `edge-ha-${i + 1}`,
      source: 'node-central',
      target: `node-ha-${i + 1}`,
      label: 'Relies on',
      type: 'relies_on' as const
    })),
    ...risksList.map((_, i) => ({
      id: `edge-rs-${i + 1}`,
      source: assumptionsList[i] ? `node-ha-${i + 1}` : 'node-central',
      target: `node-rs-${i + 1}`,
      label: 'Exposes risk of',
      type: 'threatens' as const
    })),
    ...missingEvidenceList.map((_, i) => ({
      id: `edge-me-${i + 1}`,
      source: 'node-central',
      target: `node-me-${i + 1}`,
      label: 'Lacks evidence for',
      type: 'missing' as const
    })),
    ...questionsList.map((_, i) => ({
      id: `edge-iq-${i + 1}`,
      source: 'node-central',
      target: `node-iq-${i + 1}`,
      label: 'Must investigate',
      type: 'inquires' as const
    }))
  ];

  return {
    id: `analysis-heuristic-${Date.now()}`,
    timestamp: new Date().toISOString(),
    originalInput: cleanIdea,
    context: context?.trim() || undefined,
    personaUsed: persona || 'Objective Red-Teamer',
    isAiGenerated: false,
    modelUsed: 'SecondSelf Heuristic Engine (Grounded Fallback)',
    limitationNotice: blockerReason ? {
      blocker: blockerReason,
      alternative: simplestAlternative || 'Switched dynamically to SecondSelf Grounded Heuristic Engine.'
    } : undefined,
    verification: {
      realModelCalled: false,
      reason: blockerReason || 'Running in heuristic fallback mode',
      provider: 'heuristic_engine'
    },
    summary: {
      corePremise: `Evaluating: "${subjectSnippet}" (${domain.type.replace('_', ' ')}) with core reliance on ${domain.resourceType}.`,
      verdict,
      readinessScore: Math.floor(Math.random() * 12) + 34,
      fragilityRating: 'Moderately Fragile' as const,
      executiveCritique,
      primaryVulnerability
    },
    hiddenAssumptions: assumptionsList.map((a, i) => ({ id: `ha-${i + 1}`, ...a })),
    counterarguments: counterargumentsList.map((c, i) => ({ id: `ca-${i + 1}`, ...c })),
    missingEvidence: missingEvidenceList.map((m, i) => ({ id: `me-${i + 1}`, ...m })),
    risksAndFailureScenarios: risksList.map((r, i) => ({ id: `rs-${i + 1}`, ...r })),
    investigativeQuestions: questionsList.map((q, i) => ({ id: `iq-${i + 1}`, ...q })),
    practicalNextSteps: nextStepsList.map((s, i) => ({ id: `pns-${i + 1}`, ...s })),
    mapNodes,
    mapEdges
  };
}

export function generateHeuristicRedTeam(
  itemTitle: string,
  itemType: string,
  rationale?: string,
  coreIdea?: string
) {
  const cleanTitle = itemTitle.trim();
  const domain = detectDomain(coreIdea || cleanTitle);

  return {
    targetTitle: cleanTitle,
    stressTestPoints: [
      `Friction Threshold Attack: What happens when the execution effort required for "${cleanTitle}" increases by 50% due to unpredicted life or operational complexity? Does the commitment survive or break?`,
      `The Asymmetric Downside Probe: If "${cleanTitle}" proves completely invalid, what is the sunk cost in time, trust, or capital that cannot be recovered?`,
      `The Default-Inertia Vector: When high stress or fatigue strikes, what prevents ${domain.actors} from immediately abandoning this stance and reverting to historical defaults?`
    ],
    cognitiveBiasesAtPlay: [
      'Projection Bias: Assuming your future emotional energy and willpower will match your current optimistic state.',
      'Availability Heuristic: Overweighting visible success stories while ignoring silent attrition rates.'
    ],
    fortyEightHourKillTest: `Formulate a rapid, low-stakes friction test: Attempt an aggressive 24-hour simulation of "${cleanTitle.length > 50 ? cleanTitle.slice(0, 47) + '...' : cleanTitle}". If friction causes immediate frustration, classify this assumption as needing structural re-engineering.`
  };
}
