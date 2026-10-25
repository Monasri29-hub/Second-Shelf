import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateHeuristicAnalysis, generateHeuristicRedTeam } from './server/heuristics';
import { getOllamaStatus, callOllamaChat, getOllamaConfig } from './server/ollamaService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ACTIVE_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

app.use(express.json({ limit: '1mb' }));

// Helper to get GoogleGenAI client
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured or using placeholder in server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  const ollamaStatus = getOllamaStatus();

  res.json({
    status: 'ok',
    app: 'SecondSelf Critical Thinking Engine',
    gemini: {
      model: ACTIVE_GEMINI_MODEL,
      hasKey: hasGeminiKey,
      status: hasGeminiKey ? 'configured_needs_permission_check' : 'unconfigured',
    },
    ollamaCloud: {
      model: ollamaStatus.model,
      host: ollamaStatus.host,
      hasKey: ollamaStatus.hasApiKey,
      isConfigured: ollamaStatus.isConfigured,
      requirement: ollamaStatus.accountRequirementNotice,
    },
    activeLiveProvider: null, // Probed during request execution
    timestamp: new Date().toISOString(),
  });
});

// JSON Schema for structured analysis response (for Gemini)
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        corePremise: { type: Type.STRING, description: 'Concise summary of the user core proposal or thesis' },
        verdict: { type: Type.STRING, description: 'E.g. High Fragility, Premature Formulation, Asymmetric Downside, Nuanced Opportunity' },
        readinessScore: { type: Type.INTEGER, description: 'Decision readiness score from 0 (blind faith) to 100 (battle tested)' },
        fragilityRating: { type: Type.STRING, description: 'One of: Extremely Fragile, Moderately Fragile, Calculated Risk, Well-Grounded' },
        executiveCritique: { type: Type.STRING, description: 'Sharp, intellectual, 2-3 sentence executive evaluation exposing the primary blind spot' },
        primaryVulnerability: { type: Type.STRING, description: 'The single fatal flaw that could undo the entire endeavor' }
      },
      required: ['corePremise', 'verdict', 'readinessScore', 'fragilityRating', 'executiveCritique', 'primaryVulnerability']
    },
    hiddenAssumptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          assumption: { type: Type.STRING, description: 'The unstated premise taken for granted' },
          category: { type: Type.STRING, description: 'Behavioral, Market, Technical, Financial, Operational, or Regulatory' },
          fragility: { type: Type.STRING, description: 'Critical, High, Medium, or Low' },
          rationale: { type: Type.STRING, description: 'Why this assumption is fragile or likely untrue' },
          invalidationTest: { type: Type.STRING, description: 'A rapid empirical test to validate or invalidate in under 48 hours' }
        },
        required: ['id', 'assumption', 'category', 'fragility', 'rationale', 'invalidationTest']
      }
    },
    counterarguments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          perspective: { type: Type.STRING, description: 'E.g. The Skeptic, The Competitor, The Disgruntled User, The Operator' },
          thesis: { type: Type.STRING, description: 'Core counter-claim' },
          argument: { type: Type.STRING, description: 'A steelmanned, articulate counter-argument exposing systemic flaws' },
          severity: { type: Type.STRING, description: 'Fatal, Major, or Nuance' }
        },
        required: ['id', 'perspective', 'thesis', 'argument', 'severity']
      }
    },
    missingEvidence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          claim: { type: Type.STRING, description: 'The claim made or implied' },
          gap: { type: Type.STRING, description: 'What empirical proof, data, or behavioral validation is absent' },
          evidenceType: { type: Type.STRING, description: 'Quantitative Data, Customer Intent, Technical Feasibility, Unit Economics, or Legal & Regulatory' },
          verificationSource: { type: Type.STRING, description: 'Specific suggested data collection or test' }
        },
        required: ['id', 'claim', 'gap', 'evidenceType', 'verificationSource']
      }
    },
    risksAndFailureScenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          scenario: { type: Type.STRING, description: 'Name of the failure scenario' },
          preMortemStory: { type: Type.STRING, description: 'A vivid, realistic retrospective from 12 months in the future explaining why it failed' },
          likelihood: { type: Type.STRING, description: 'High, Medium, or Low' },
          impact: { type: Type.STRING, description: 'Catastrophic, Severe, or Manageable' },
          earlyWarningSignal: { type: Type.STRING, description: 'Observable leading indicator before failure cascades' },
          mitigation: { type: Type.STRING, description: 'Practical preventative constraint or safeguard' }
        },
        required: ['id', 'scenario', 'preMortemStory', 'likelihood', 'impact', 'earlyWarningSignal', 'mitigation']
      }
    },
    investigativeQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING, description: 'Uncomfortable, high-yield question the user must investigate' },
          targetAudience: { type: Type.STRING, description: 'Users & Customers, Self & Founders, Team & Operators, or Advisors & Investors' },
          whyItMatters: { type: Type.STRING, description: 'The psychological or strategic reason this is commonly avoided' }
        },
        required: ['id', 'question', 'targetAudience', 'whyItMatters']
      }
    },
    practicalNextSteps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          timeframe: { type: Type.STRING, description: 'Day 1–3, Week 1, or Week 2–4' },
          action: { type: Type.STRING, description: 'Concrete, low-cost de-risking micro-experiment' },
          killCriteria: { type: Type.STRING, description: 'Measurable metric where user should halt or pivot if failed' },
          costEstimate: { type: Type.STRING, description: 'Estimated time and dollar investment' }
        },
        required: ['id', 'timeframe', 'action', 'killCriteria', 'costEstimate']
      }
    },
    mapNodes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          label: { type: Type.STRING, description: 'Short 2-6 word node title' },
          type: { type: Type.STRING, description: 'central, assumption, counterargument, evidence, risk, or question' },
          category: { type: Type.STRING },
          severityOrFragility: { type: Type.STRING },
          summary: { type: Type.STRING, description: 'One-sentence essence of this node' }
        },
        required: ['id', 'label', 'type', 'summary']
      }
    },
    mapEdges: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          source: { type: Type.STRING, description: 'Source node id' },
          target: { type: Type.STRING, description: 'Target node id' },
          label: { type: Type.STRING, description: 'Relationship' },
          type: { type: Type.STRING, description: 'relies_on, opposes, missing, threatens, or inquires' }
        },
        required: ['id', 'source', 'target', 'label', 'type']
      }
    }
  },
  required: [
    'summary',
    'hiddenAssumptions',
    'counterarguments',
    'missingEvidence',
    'risksAndFailureScenarios',
    'investigativeQuestions',
    'practicalNextSteps',
    'mapNodes',
    'mapEdges'
  ]
};

// Analyze endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { idea, context, persona } = req.body;

  if (!idea || typeof idea !== 'string' || idea.trim().length < 4) {
    return res.status(400).json({
      error: 'Please enter a substantive idea, decision, or plan (at least 4 characters).',
    });
  }

  const systemInstruction = `You are SecondSelf, a world-class cognitive adversary, strategic red-teamer, and intellectual sparring partner.
Your mission is to rigorously deconstruct ideas, decisions, strategies, and plans by exposing cognitive blind spots, fragile assumptions, missing empirical data, lethal risks, and unexamined counterarguments.
You are NOT a generic cheerleading assistant. You are deeply incisive, respectful, empathetic, yet intellectually ruthless.
Respond strictly in JSON matching the provided schema.
Adopt the following sparring persona: ${persona || 'The Objective Red-Teamer & Epistemic Auditor'}.`;

  const userPrompt = `Critically evaluate and stress-test the following proposition:

PROPOSITION:
"${idea.trim()}"

ADDITIONAL CONTEXT & CONSTRAINTS:
${context && typeof context === 'string' && context.trim().length > 0 ? context.trim() : 'No additional context provided.'}

REQUIREMENTS:
1. Identify 3 to 5 Hidden Assumptions directly tied to the proposition.
2. Present 2 to 3 Counterarguments & Alternative Perspectives steelmanning opposing angles.
3. Identify 2 to 3 Missing Evidence points (untested empirical claims).
4. Outline 2 to 3 Potential Risks & Pre-Mortem Scenarios (looking back from 12 months out).
5. Craft 2 to 4 Sharp Investigative Questions the user must ask.
6. Propose 2 to 3 Practical Next Steps (rapid falsification micro-experiments with kill criteria).
7. Construct an Assumption Map: 1 central node ('node-central') and connected peripheral nodes with descriptive edge labels.
`;

  let geminiBlocker: string | null = null;
  let ollamaBlocker: string | null = null;

  // 1. Attempt Google Gemini
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({
      model: ACTIVE_GEMINI_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });

    const responseText = response.text;
    if (responseText) {
      const parsedData = JSON.parse(responseText);
      return res.json({
        id: `analysis-${Date.now()}`,
        timestamp: new Date().toISOString(),
        originalInput: idea.trim(),
        context: context?.trim() || undefined,
        personaUsed: persona || 'Objective Red-Teamer',
        isAiGenerated: true,
        modelUsed: ACTIVE_GEMINI_MODEL,
        verification: {
          realModelCalled: true,
          provider: 'google_gemini',
          model: ACTIVE_GEMINI_MODEL,
        },
        ...parsedData,
      });
    }
  } catch (geminiError: any) {
    console.warn('[SecondSelf] Gemini API call did not succeed:', geminiError?.message || geminiError);
    if (geminiError?.status === 403 || geminiError?.message?.includes('PERMISSION_DENIED')) {
      geminiBlocker = 'Google Cloud Gemini API returned HTTP 403 PERMISSION_DENIED: "Your project has been denied access. Please contact support."';
    } else if (geminiError?.status === 429 || geminiError?.message?.includes('RESOURCE_EXHAUSTED')) {
      geminiBlocker = 'Google Cloud Gemini free-tier rate-limit was reached.';
    } else {
      geminiBlocker = geminiError?.message || 'Gemini API authentication/connection error.';
    }
  }

  // 2. Attempt Ollama Cloud (gemma4:31b-cloud) if credentials or host configured
  const ollamaConfig = getOllamaConfig();
  if (ollamaConfig.apiKey || (process.env.OLLAMA_HOST && !ollamaConfig.host.includes('ollama.com'))) {
    try {
      const ollamaData = await callOllamaChat(userPrompt, systemInstruction);
      if (ollamaData && ollamaData.summary) {
        return res.json({
          id: `analysis-ollama-${Date.now()}`,
          timestamp: new Date().toISOString(),
          originalInput: idea.trim(),
          context: context?.trim() || undefined,
          personaUsed: persona || 'Objective Red-Teamer',
          isAiGenerated: true,
          modelUsed: `${ollamaConfig.model} (via Ollama Cloud)`,
          verification: {
            realModelCalled: true,
            provider: 'ollama_cloud',
            model: ollamaConfig.model,
          },
          ...ollamaData,
        });
      }
    } catch (ollamaError: any) {
      console.warn('[SecondSelf] Ollama API call did not succeed:', ollamaError?.message || ollamaError);
      ollamaBlocker = ollamaError?.message || 'Ollama connection error.';
    }
  } else {
    ollamaBlocker = `Ollama Cloud (${ollamaConfig.model}) requires an active Ollama account and an OLLAMA_API_KEY environment variable on the server. No OLLAMA_API_KEY was found in environment.`;
  }

  // 3. Fallback to Grounded Heuristic Analysis
  const combinedBlocker = `1. Gemini API: ${geminiBlocker}\n2. Ollama Cloud (${ollamaConfig.model}): ${ollamaBlocker}`;
  const alternativeDesc = 'Running grounded heuristic analysis tailored strictly to your submitted proposition. To activate live models, attach an authorized GEMINI_API_KEY or OLLAMA_API_KEY in server secrets.';

  const dynamicAnalysis = generateHeuristicAnalysis(
    idea,
    context,
    persona,
    combinedBlocker,
    alternativeDesc
  );

  return res.json(dynamicAnalysis);
});

// Deep Red-Team Stress-Test endpoint for specific nodes/points
app.post('/api/red-team', async (req: Request, res: Response) => {
  const { itemTitle, itemType, rationale, coreIdea } = req.body;

  if (!itemTitle || typeof itemTitle !== 'string') {
    return res.status(400).json({ error: 'Missing item title to stress-test.' });
  }

  const prompt = `Perform an aggressive red-team stress test on the following specific element from an idea:

CORE IDEA: "${coreIdea || 'Not specified'}"
ELEMENT TO STRESS-TEST: [${itemType || 'Assumption'}] "${itemTitle}"
CONTEXT / RATIONALE: "${rationale || 'None'}"

Deliver 3 brutal, precise attack vectors or stress-test scenarios, name 2 specific cognitive biases at play, and provide 1 rapid 48-hour kill test.`;

  // 1. Try Gemini
  try {
    const ai = getGenAIClient();
    const redTeamSchema = {
      type: Type.OBJECT,
      properties: {
        targetTitle: { type: Type.STRING },
        stressTestPoints: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        cognitiveBiasesAtPlay: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        fortyEightHourKillTest: {
          type: Type.STRING,
        }
      },
      required: ['targetTitle', 'stressTestPoints', 'cognitiveBiasesAtPlay', 'fortyEightHourKillTest']
    };

    const response = await ai.models.generateContent({
      model: ACTIVE_GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: 'You are an aggressive corporate red-teamer. You do not soften blows; you dissect weaknesses with scientific precision.',
        responseMimeType: 'application/json',
        responseSchema: redTeamSchema,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      isAiGenerated: true,
      modelUsed: ACTIVE_GEMINI_MODEL,
    });
  } catch (err: any) {
    // 2. Try Ollama Cloud if configured
    const ollamaConfig = getOllamaConfig();
    if (ollamaConfig.apiKey) {
      try {
        const ollamaRes = await callOllamaChat(
          prompt,
          'You are an aggressive red-teamer. Output strictly JSON with targetTitle, stressTestPoints array, cognitiveBiasesAtPlay array, and fortyEightHourKillTest string.'
        );
        return res.json({
          ...ollamaRes,
          isAiGenerated: true,
          modelUsed: `${ollamaConfig.model} (via Ollama Cloud)`,
        });
      } catch (ollamaErr) {
        console.warn('[SecondSelf] Red-team Ollama fallback failed:', ollamaErr);
      }
    }

    // 3. Fallback to Grounded Heuristic Red-Team
    const fallback = generateHeuristicRedTeam(itemTitle, itemType, rationale, coreIdea);
    return res.json({
      ...fallback,
      isAiGenerated: false,
      modelUsed: 'SecondSelf Grounded Red-Team Heuristic',
    });
  }
});

// Setup Vite dev server or static serve in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SecondSelf Server] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[SecondSelf Server] Primary Model: ${ACTIVE_GEMINI_MODEL}`);
    const ollamaInfo = getOllamaStatus();
    console.log(`[SecondSelf Server] Ollama Cloud Model: ${ollamaInfo.model} (Configured: ${ollamaInfo.isConfigured})`);
  });
}

startServer().catch((err) => {
  console.error('[SecondSelf Server] Failed to start:', err);
  process.exit(1);
});
