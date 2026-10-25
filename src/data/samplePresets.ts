import { SecondSelfAnalysis } from '../types/analysis';

export interface PresetIdea {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  context: string;
  analysis: SecondSelfAnalysis;
}

export const SAMPLE_PRESETS: PresetIdea[] = [
  {
    id: 'startup-quit-job',
    badge: 'Career & Founder',
    title: 'Quitting $185k SWE job to build a "virtual watercooler" B2B SaaS for remote teams',
    tagline: 'High personal runway risk, unvalidated willingness-to-pay, crowded post-pandemic market.',
    context: 'Personal savings: 9 months runway. Solo developer. Hypothesizing companies will pay $6/user/month to cure remote isolation.',
    analysis: {
      id: 'demo-preset-1',
      timestamp: new Date().toISOString(),
      originalInput: 'Quitting $185k SWE job to build a "virtual watercooler" B2B SaaS for remote teams',
      context: 'Personal savings: 9 months runway. Solo developer. Hypothesizing companies will pay $6/user/month to cure remote isolation.',
      personaUsed: 'The Ruthless Operator',
      isAiGenerated: false,
      modelUsed: 'Curated Benchmark Archetype',
      summary: {
        corePremise: 'Trading stable tech compensation for an unvalidated B2B workplace socialization tool funded by finite personal savings.',
        verdict: 'Dangerous Asymmetry',
        readinessScore: 34,
        fragilityRating: 'Extremely Fragile',
        executiveCritique: 'The core flaw is confusing a real pain point (loneliness) with an enterprise budget line item. Companies do not pay software seats to make workers socialize unless it provably curbs measurable attrition or compliance violations.',
        primaryVulnerability: 'Assuming HR or team leads have discretionary budget for informal social software during macroeconomic cost-cutting.'
      },
      hiddenAssumptions: [
        {
          id: 'ha-1',
          assumption: 'Engineering & ops managers have purchasing authority for cultural/social tools.',
          category: 'Financial',
          fragility: 'Critical',
          rationale: 'In downturns, non-essential SaaS is slashed. Buying approval usually requires VP HR or Procurement who demand rigorous ROI calculations.',
          invalidationTest: 'Cold message 20 engineering managers asking for their software procurement process for non-essential tooling.'
        },
        {
          id: 'ha-2',
          assumption: 'Workers actually want scheduled or automated spontaneous social interaction during work hours.',
          category: 'Behavioral',
          fragility: 'Critical',
          rationale: 'Many remote workers prefer asynchronous isolation and resent forced camaraderie ("forced fun") which feels like unpaid emotional labor.',
          invalidationTest: 'Run a pilot with 3 friend companies using free Discord/Slack channels and measure 14-day voluntary retention.'
        },
        {
          id: 'ha-3',
          assumption: 'Slack / Microsoft Teams won’t easily replicate the feature set with a simple free bot or native canvas.',
          category: 'Market',
          fragility: 'High',
          rationale: 'Slack Huddles, Donut, and Gather already saturate this space and have near-zero friction distribution.',
          invalidationTest: 'Map out Donut’s churn rate and why past competitors (e.g., Branch, WaterCooler) stalled or pivoted.'
        },
        {
          id: 'ha-4',
          assumption: 'Solo developer can build, market, close B2B enterprise sales, and support security audits in 9 months.',
          category: 'Operational',
          fragility: 'High',
          rationale: 'B2B sales cycles commonly stretch 60–120 days alone, burning 40% of the 9-month runway in waiting for contracts.',
          invalidationTest: 'Calculate exact CAC and conversion cycle time by attempting to pre-sell 3 annual letter of intents before quitting.'
        }
      ],
      counterarguments: [
        {
          id: 'ca-1',
          perspective: 'The CFO / Procurement Officer',
          thesis: 'This is a "Vitamin" masquerading as a "Painkiller" in a budget freeze.',
          argument: 'When I look at SaaS renewals, anything without a direct revenue correlation or hard compliance requirement gets purged. A virtual watercooler is the very first line item killed.',
          severity: 'Fatal'
        },
        {
          id: 'ca-2',
          perspective: 'The Introverted Remote Engineer',
          thesis: 'Forced socialization increases meeting fatigue and deep-work fragmentation.',
          argument: 'I specifically work remotely to avoid small talk and context switching. If my employer forces me into a randomized virtual room, I will find a way to script my absence.',
          severity: 'Major'
        },
        {
          id: 'ca-3',
          perspective: 'The Incumbent Competitor (e.g. Donut/Slack)',
          thesis: 'Distribution eats standalone features for breakfast.',
          argument: 'You are building a feature, not a company. A single engineer at Slack can deploy an integrated bot that matches your core utility for zero extra dollars to the client.',
          severity: 'Fatal'
        }
      ],
      missingEvidence: [
        {
          id: 'me-1',
          claim: 'Companies will pay $6/user/month for virtual socialization.',
          gap: 'Zero documented pricing tests or paid pilot commitments.',
          evidenceType: 'Customer Intent',
          verificationSource: 'Demand 3 letters of intent (LOI) with dollar commitments before leaving your salary.'
        },
        {
          id: 'me-2',
          claim: 'Isolation reduces retention enough for HR to fund preventative tooling.',
          gap: 'No empirical cohort data linking virtual social hours to reduced employee churn.',
          evidenceType: 'Quantitative Data',
          verificationSource: 'Analyze academic and HR industry research on voluntary turnover drivers in remote workforces.'
        },
        {
          id: 'me-3',
          claim: 'Users will sustain daily engagement past week 3.',
          gap: 'Novelty effect masking long-term retention decay curve.',
          evidenceType: 'Customer Intent',
          verificationSource: 'Track 30-day DAU/MAU ratios of similar apps.'
        }
      ],
      risksAndFailureScenarios: [
        {
          id: 'rs-1',
          scenario: 'The Runway Evaporation Trap',
          preMortemStory: 'Month 7 arrives: product looks slick, but sales cycles took 4 months instead of 2 weeks; you are down to $6k in the bank and forced to panic-interview.',
          likelihood: 'High',
          impact: 'Catastrophic',
          earlyWarningSignal: 'Zero signed LOIs by Month 2 of full-time development.',
          mitigation: 'Set a rigid pre-sale threshold: do not quit until 5 companies sign a refundable pre-order deposit.'
        },
        {
          id: 'rs-2',
          scenario: 'The "Ghost Town" Platform Dynamic',
          preMortemStory: 'Companies deploy it, enthusiasm peaks on Day 1, but by Day 10 only 2 extroverts show up, creating an awkward vacuum that drives everyone away.',
          likelihood: 'High',
          impact: 'Severe',
          earlyWarningSignal: 'Participation dropping >50% between session 1 and session 3.',
          mitigation: 'Pivot from open-ended socialization to structured, asynchronous knowledge-sharing.'
        },
        {
          id: 'rs-3',
          scenario: 'Enterprise Security Gatekeeping',
          preMortemStory: 'A 500-person company loves the demo, but their IT department requires SOC 2 Type II, SSO, and HIPAA/GDPR addendums that cost $25k and 4 months to satisfy.',
          likelihood: 'Medium',
          impact: 'Catastrophic',
          earlyWarningSignal: 'Prospect asking for vendor risk assessment spreadsheet in the first discovery call.',
          mitigation: 'Target only 10-50 person startups who do not have rigid security procurement barriers.'
        }
      ],
      investigativeQuestions: [
        {
          id: 'iq-1',
          question: 'If you charged $0, would teams still use this every single day for 6 months?',
          targetAudience: 'Self & Founders',
          whyItMatters: 'If the habit doesn’t form for free, pricing is not your bottleneck—intrinsic human utility is.'
        },
        {
          id: 'iq-2',
          question: 'Who writes the check, what budget does it pull from, and what metric are they held accountable for at their annual review?',
          targetAudience: 'Advisors & Investors',
          whyItMatters: 'B2B purchases require someone whose career is helped by buying your software.'
        },
        {
          id: 'iq-3',
          question: 'Why haven’t existing Slack apps with $50M in funding solved this satisfactorily?',
          targetAudience: 'Users & Customers',
          whyItMatters: 'You must identify whether this is an unsolved problem or an insoluble human preference.'
        }
      ],
      practicalNextSteps: [
        {
          id: 'pns-1',
          timeframe: 'Day 1–3',
          action: 'Build a fake-door landing page with pricing tier ($6/mo) and a "Book Pilot Demo" button. Run $100 of targeted LinkedIn ads to remote Engineering Managers.',
          killCriteria: 'If CTR is under 1.5% or zero demo requests occur, do NOT leave your day job.',
          costEstimate: '$100 & 6 hours'
        },
        {
          id: 'pns-2',
          timeframe: 'Week 1',
          action: 'Manually moderate a prototype virtual watercooler for 2 companies using existing tools (Zoom + Google Sheets icebreakers).',
          killCriteria: 'If attendance drops by >40% by session 2, conclude that live video socializing has friction.',
          costEstimate: '$0 & 8 hours'
        },
        {
          id: 'pns-3',
          timeframe: 'Week 2–4',
          action: 'Negotiate part-time or 4-day workweek with current employer instead of a hard resignation to extend runway to 24 months.',
          killCriteria: 'If employer refuses and you lack 3 committed pilots, preserve job and build nights/weekends.',
          costEstimate: '$0 & 1 negotiation'
        }
      ],
      mapNodes: [
        { id: 'node-core', label: 'Quit $185k SWE Job to Build Virtual Watercooler B2B SaaS', type: 'central', summary: 'Core proposition with high personal opportunity cost.' },
        { id: 'node-ha-1', label: 'Managers Have Budget for Culture', type: 'assumption', category: 'Financial', severityOrFragility: 'Critical', summary: 'Unproven line item in tightening macroeconomic climate.' },
        { id: 'node-ha-2', label: 'Workers Crave Forced Social Time', type: 'assumption', category: 'Behavioral', severityOrFragility: 'Critical', summary: 'Many introverts resent mandated social interactions.' },
        { id: 'node-ha-3', label: 'Incumbents Won\'t Build Simple Clone', type: 'assumption', category: 'Market', severityOrFragility: 'High', summary: 'Slack and Teams dominate distribution.' },
        { id: 'node-rs-1', label: 'Runway Evaporation Before First Close', type: 'risk', severityOrFragility: 'Catastrophic', summary: 'B2B enterprise sales cycles exceed remaining savings.' },
        { id: 'node-rs-2', label: 'Ghost Town Participation Collapse', type: 'risk', severityOrFragility: 'Severe', summary: 'High Day-1 excitement followed by rapid engagement drop.' },
        { id: 'node-me-1', label: 'Zero Paid Letters of Intent', type: 'evidence', severityOrFragility: 'Fatal Gap', summary: 'No buyer has agreed to wire money yet.' },
        { id: 'node-iq-1', label: 'Would Anyone Use This for Free for 6 Months?', type: 'question', severityOrFragility: 'Crucial', summary: 'Testing fundamental habit formation.' }
      ],
      mapEdges: [
        { id: 'edge-1', source: 'node-core', target: 'node-ha-1', label: 'Presumes Budget', type: 'relies_on' },
        { id: 'edge-2', source: 'node-core', target: 'node-ha-2', label: 'Presumes Desire', type: 'relies_on' },
        { id: 'edge-3', source: 'node-core', target: 'node-ha-3', label: 'Presumes Moat', type: 'relies_on' },
        { id: 'edge-4', source: 'node-ha-1', target: 'node-me-1', label: 'Lacks Evidence', type: 'missing' },
        { id: 'edge-5', source: 'node-ha-1', target: 'node-rs-1', label: 'Directly Causes', type: 'threatens' },
        { id: 'edge-6', source: 'node-ha-2', target: 'node-rs-2', label: 'Sparks Risk', type: 'threatens' },
        { id: 'edge-7', source: 'node-core', target: 'node-iq-1', label: 'Must Answer', type: 'inquires' }
      ]
    }
  },
  {
    id: 'return-to-office-mandate',
    badge: 'Enterprise Leadership',
    title: 'Mandating a 4-day in-office policy to restore team culture and cross-functional velocity',
    tagline: 'Risk of top-performer attrition, silent protest, real-estate bloat, and selective enforcement.',
    context: 'Tech company of 220 employees. Remote for 4 years. Executive leadership perceives a decline in creative synergy.',
    analysis: {
      id: 'demo-preset-2',
      timestamp: new Date().toISOString(),
      originalInput: 'Mandating a 4-day in-office policy to restore team culture and cross-functional velocity',
      context: 'Tech company of 220 employees. Remote for 4 years. Executive leadership perceives a decline in creative synergy.',
      personaUsed: 'The Cynical HR Strategist',
      isAiGenerated: false,
      modelUsed: 'Curated Benchmark Archetype',
      summary: {
        corePremise: 'Attempting to solve an organizational coordination and measurement problem through physical co-location enforcement.',
        verdict: 'High Disruption / Adverse Selection',
        readinessScore: 41,
        fragilityRating: 'Moderately Fragile',
        executiveCritique: 'Physical presence is a blunt proxy for organizational clarity. A sudden mandate without revamping compensation, commuting subsidies, or quiet focus spaces will disproportionately drive out senior individual contributors with portable market value.',
        primaryVulnerability: 'Adverse selection: your highest performers will leave for flexible competitors, while your least marketable staff will comply quietly.'
      },
      hiddenAssumptions: [
        {
          id: 'ha-rto-1',
          assumption: 'Physical co-location was the actual root cause of past creative breakthroughs.',
          category: 'Behavioral',
          fragility: 'Critical',
          rationale: 'Nostalgia often credits "hallway conversations" for outcomes that were actually driven by early market tailwinds or smaller team sizes.',
          invalidationTest: 'Audit the last 5 major product features and trace whether their ideation happened at watercoolers or in written docs.'
        },
        {
          id: 'ha-rto-2',
          assumption: 'Staff will accept a 4-day commute without demanding salary adjustments or quietly disengaging.',
          category: 'Operational',
          fragility: 'Critical',
          rationale: 'Commuting represents 8–15 unpaid hours per week plus vehicle/transit costs. Many relocated outside commuting distance during the remote era.',
          invalidationTest: 'Conduct an anonymous compensation and relocation survey before issuing an ultimatum.'
        },
        {
          id: 'ha-rto-3',
          assumption: 'Managers will consistently enforce badge-swipes without breeding resentment or creating toxic exceptions.',
          category: 'Operational',
          fragility: 'High',
          rationale: 'Line managers dislike playing hall monitors and often grant informal carve-outs to their favorite engineers, fracturing morale.',
          invalidationTest: 'Roleplay enforcement protocols with middle management to see their willingness to discipline high performers.'
        }
      ],
      counterarguments: [
        {
          id: 'ca-rto-1',
          perspective: 'Senior Principal Engineer (Top Performer)',
          thesis: 'Office open floor plans destroy 40% of deep coding productivity.',
          argument: 'I get interrupted every 18 minutes in the office. If forced to commute 90 minutes a day just to put on noise-cancelling headphones and attend Zoom calls from my desk, I will take the recruiter calls currently sitting in my LinkedIn inbox.',
          severity: 'Fatal'
        },
        {
          id: 'ca-rto-2',
          perspective: 'Director of Talent Acquisition',
          thesis: 'Candidate pipeline shrinks by 70% while wage expectations rise 20%.',
          argument: 'We hired people across 14 states. Limiting recruitment to a 30-mile metro radius will double our time-to-hire and force higher compensation premiums.',
          severity: 'Major'
        }
      ],
      missingEvidence: [
        {
          id: 'me-rto-1',
          claim: 'Remote work caused the current velocity slump.',
          gap: 'No objective metric differentiating remote coordination friction from product-market changes or technical debt.',
          evidenceType: 'Quantitative Data',
          verificationSource: 'Analyze commit frequency, PR review turnaround, and ticket cycle times against previous in-office historical baselines.'
        },
        {
          id: 'me-rto-2',
          claim: 'Offices are properly configured for collaborative work rather than loud open desks.',
          gap: 'Zero acoustic or desk layout audit for 220 people.',
          evidenceType: 'Technical Feasibility',
          verificationSource: 'Floor plan capacity test for private meeting booths and phone pods.'
        }
      ],
      risksAndFailureScenarios: [
        {
          id: 'rs-rto-1',
          scenario: 'The "Brain Drain" Asymmetry',
          preMortemStory: 'Within 90 days of the announcement, 4 staff engineers responsible for core legacy architecture resign; replacements take 7 months to onboard.',
          likelihood: 'High',
          impact: 'Catastrophic',
          earlyWarningSignal: 'Spike in LinkedIn profile updates and sudden PTO usage among key leads.',
          mitigation: 'Identify the top 15% indispensable contributors and secure retention contracts before announcing any policy.'
        },
        {
          id: 'rs-rto-2',
          scenario: 'Coffee-Badging & Passive Resistance',
          preMortemStory: 'Employees swipe their badges at 9:30 AM, drink a coffee, sit quietly on laptops, and leave at 1:00 PM to do actual work from home.',
          likelihood: 'High',
          impact: 'Manageable',
          earlyWarningSignal: 'Badge logs show short durations with zero increase in cross-team collaborative output.',
          mitigation: 'Base evaluation on milestone deliverables, not surveillance badge timestamps.'
        }
      ],
      investigativeQuestions: [
        {
          id: 'iq-rto-1',
          question: 'Are you using Return to Office as a quiet tool for headcount reduction (stealth layoffs)?',
          targetAudience: 'Self & Founders',
          whyItMatters: 'If yes, recognize that you cannot control who takes the severance or resigns—you lose your best, not your worst.'
        },
        {
          id: 'iq-rto-2',
          question: 'What specific creative collaboration cannot occur asynchronously with proper documentation and periodic summits?',
          targetAudience: 'Team & Operators',
          whyItMatters: 'Forces leadership to define what real collaboration looks like beyond mere physical proximity.'
        }
      ],
      practicalNextSteps: [
        {
          id: 'pns-rto-1',
          timeframe: 'Day 1–3',
          action: 'Test a 2-day "Anchor Day" trial (Tuesday/Thursday) focused exclusively on design sprints and social lunches, keeping Monday/Friday remote.',
          killCriteria: 'If satisfaction and collaboration do not noticeably improve in 30 days, abort expanding to 4 days.',
          costEstimate: '$500 in catered lunches'
        },
        {
          id: 'pns-rto-2',
          timeframe: 'Week 1',
          action: 'Map current employee residence zip codes against office commute times to calculate hardship clusters.',
          killCriteria: 'If >25% live over 60 minutes away due to past remote policy permissions, grandfather them or provide remote agreements.',
          costEstimate: '$0 & 4 hours'
        }
      ],
      mapNodes: [
        { id: 'node-rto-core', label: 'Mandate 4-Day In-Office Policy', type: 'central', summary: 'Executive policy intended to revive synergy.' },
        { id: 'node-rto-ha1', label: 'Physical Proximity Drives Innovation', type: 'assumption', category: 'Behavioral', severityOrFragility: 'Critical', summary: 'Confusing past correlation with causation.' },
        { id: 'node-rto-ha2', label: 'Key Talent Will Not Resign', type: 'assumption', category: 'Operational', severityOrFragility: 'Critical', summary: 'Assuming portable top performers won’t jump ship.' },
        { id: 'node-rto-rs1', label: 'Top-Performer Brain Drain', type: 'risk', severityOrFragility: 'Catastrophic', summary: 'Senior engineers with market power leave first.' },
        { id: 'node-rto-me1', label: 'Lack of Velocity vs Distance Correlation', type: 'evidence', severityOrFragility: 'Fatal Gap', summary: 'No empirical proof remote work caused recent slowdown.' },
        { id: 'node-rto-iq1', label: 'Is this Stealth Layoffs in Disguise?', type: 'question', severityOrFragility: 'Crucial', summary: 'Unveiling latent executive motivations.' }
      ],
      mapEdges: [
        { id: 'e-rto-1', source: 'node-rto-core', target: 'node-rto-ha1', label: 'Assumes Synergy', type: 'relies_on' },
        { id: 'e-rto-2', source: 'node-rto-core', target: 'node-rto-ha2', label: 'Assumes Compliance', type: 'relies_on' },
        { id: 'e-rto-3', source: 'node-rto-ha2', target: 'node-rto-rs1', label: 'Catalyzes Risk', type: 'threatens' },
        { id: 'e-rto-4', source: 'node-rto-core', target: 'node-rto-me1', label: 'Unverified Claim', type: 'missing' },
        { id: 'e-rto-5', source: 'node-rto-core', target: 'node-rto-iq1', label: 'Underlying Motive', type: 'inquires' }
      ]
    }
  },
  {
    id: 'ai-qa-replacement',
    badge: 'AI & Automation Strategy',
    title: 'Replacing our entire 6-person manual QA team with autonomous AI test agents',
    tagline: 'High regression blindness risk, edge case drift, and deceptive green-check illusions.',
    context: 'Fintech startup. Currently spending $42k/month on manual QA. CTO wants to deploy agentic browser loops to save $450k/year.',
    analysis: {
      id: 'demo-preset-3',
      timestamp: new Date().toISOString(),
      originalInput: 'Replacing our entire 6-person manual QA team with autonomous AI test agents',
      context: 'Fintech startup. Currently spending $42k/month on manual QA. CTO wants to deploy agentic browser loops to save $450k/year.',
      personaUsed: 'The Paranoid Site Reliability Engineer',
      isAiGenerated: false,
      modelUsed: 'Curated Benchmark Archetype',
      summary: {
        corePremise: 'Subsituting human exploratory testing with probabilistic generative agents in a high-compliance fintech environment.',
        verdict: 'High Systemic Hazard',
        readinessScore: 28,
        fragilityRating: 'Extremely Fragile',
        executiveCritique: 'AI agents excel at deterministic assertions and synthetically traversing happy paths, but fail catastrophically at nuanced perceptual testing, multi-system latency race conditions, and compliance auditing.',
        primaryVulnerability: 'Hallucinatory testing: AI agents passing broken workflows because their prompt context accepted plausible-looking error screens as valid.'
      },
      hiddenAssumptions: [
        {
          id: 'ha-ai-1',
          assumption: 'Autonomous agents can reliably identify subtle transactional edge cases and visual regressions without human supervision.',
          category: 'Technical',
          fragility: 'Critical',
          rationale: 'Generative agents suffer from confirmation drift and non-deterministic behavior that can mark subtle ledger rounding bugs as successful checks.',
          invalidationTest: 'Run a 30-day shadow bakeoff where AI agents run alongside human QA on intentional mutant bug injections.'
        },
        {
          id: 'ha-ai-2',
          assumption: 'The engineering team will save time rather than spend equal hours debugging flaky agent test scripts and prompt regressions.',
          category: 'Operational',
          fragility: 'High',
          rationale: 'Flaky AI test runners often produce so much noise that engineers begin blindly ignoring test suite alerts.',
          invalidationTest: 'Measure time spent maintaining automated end-to-end Cypress/Playwright suites currently.'
        }
      ],
      counterarguments: [
        {
          id: 'ca-ai-1',
          perspective: 'Chief Risk Officer & Compliance Auditor',
          thesis: 'Regulatory audits require reproducible, deterministic audit trails—not probabilistic model hallucinations.',
          argument: 'In a financial transfer workflow, if an agent passes a release that drops transactions on European banking holidays, the regulatory fine from BaFin/SEC will dwarf the $450k annual QA salary savings.',
          severity: 'Fatal'
        }
      ],
      missingEvidence: [
        {
          id: 'me-ai-1',
          claim: 'Autonomous test agents match human bug discovery rates in production staging.',
          gap: 'Zero documented peer-reviewed benchmarks on generative agent bug catch rates in complex multi-tenant state apps.',
          evidenceType: 'Technical Feasibility',
          verificationSource: 'Run an empirical benchmark with known historical defect datasets.'
        }
      ],
      risksAndFailureScenarios: [
        {
          id: 'rs-ai-1',
          scenario: 'The Multi-Million Dollar Ledger Leak',
          preMortemStory: 'An agent fails to catch a double-refund loop because the UI displayed a generic success toast; $120,000 is erroneously drained before a customer alerts support.',
          likelihood: 'Medium',
          impact: 'Catastrophic',
          earlyWarningSignal: 'Production incident rate creeping up within 45 days of QA elimination.',
          mitigation: 'Keep a blended model: use AI agents as high-speed regression assistants, but retain senior QA leads for exploratory testing.'
        }
      ],
      investigativeQuestions: [
        {
          id: 'iq-ai-1',
          question: 'What is the exact financial and legal liability if a silent defect passes into production financial rails?',
          targetAudience: 'Advisors & Investors',
          whyItMatters: 'Quantifying the downside risk determines whether saving $42k/month is an irresponsible gamble.'
        }
      ],
      practicalNextSteps: [
        {
          id: 'pns-ai-1',
          timeframe: 'Day 1–3',
          action: 'Implement a "Shadow Agent" experiment: have agents test pull requests in parallel with human QA without granting deployment veto power.',
          killCriteria: 'If agents miss >15% of bugs caught by humans or introduce >20% false alarm rate, cancel full replacement.',
          costEstimate: '$300 API credits & 12 hours'
        }
      ],
      mapNodes: [
        { id: 'node-ai-core', label: 'Replace 6-Person QA with AI Agents', type: 'central', summary: 'Fintech plan to eliminate human test team.' },
        { id: 'node-ai-ha1', label: 'Agents Catch Subtle Financial Glitches', type: 'assumption', category: 'Technical', severityOrFragility: 'Critical', summary: 'Generative agents are non-deterministic.' },
        { id: 'node-ai-rs1', label: 'Silent Ledger Accounting Leak', type: 'risk', severityOrFragility: 'Catastrophic', summary: 'Uncaught financial race condition in production.' },
        { id: 'node-ai-me1', label: 'Missing Empirical Agent Accuracy Benchmark', type: 'evidence', severityOrFragility: 'Major', summary: 'No validated testing proof in staging.' },
        { id: 'node-ai-iq1', label: 'What is Cost of Single Financial Incident?', type: 'question', severityOrFragility: 'Critical', summary: 'Assessing asymmetric downside liability.' }
      ],
      mapEdges: [
        { id: 'e-ai-1', source: 'node-ai-core', target: 'node-ai-ha1', label: 'Relies on Reliability', type: 'relies_on' },
        { id: 'e-ai-2', source: 'node-ai-ha1', target: 'node-ai-rs1', label: 'Exposes to Disaster', type: 'threatens' },
        { id: 'e-ai-3', source: 'node-ai-core', target: 'node-ai-me1', label: 'Lacks Evidence', type: 'missing' },
        { id: 'e-ai-4', source: 'node-ai-core', target: 'node-ai-iq1', label: 'Financial Guardrail', type: 'inquires' }
      ]
    }
  }
];
