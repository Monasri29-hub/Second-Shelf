# SecondSelf — Think Beyond Your First Thought 🧠

**An AI-powered critical-thinking workspace that challenges your ideas, uncovers hidden assumptions, and helps you make better-informed decisions.**

SecondSelf is designed to be more than a conventional AI chatbot. Instead of simply agreeing with a user's reasoning, it examines ideas from multiple perspectives, identifies potential weaknesses, highlights missing evidence, and recommends practical ways to validate assumptions.

## 💡 The Problem

People often make important decisions based on incomplete information, untested assumptions, and confirmation bias.

Traditional AI assistants can sometimes reinforce a user's existing beliefs rather than critically examining them.

SecondSelf addresses this challenge by providing a structured environment for stress-testing decisions, arguments, business ideas, and personal plans.

## 🎯 Our Solution

SecondSelf transforms a user's proposition into a structured critical assessment.

Users submit an idea, decision, or plan and receive an organized evaluation covering its strengths, weaknesses, assumptions, counterarguments, risks, and unanswered questions.

The application also visualizes relationships between these reasoning components through an interactive **Assumption Map**.

## ✨ Key Features

### 1. Critical Assessment Dossier
Generates a structured assessment of a user's submitted proposition, helping them examine its reasoning and potential weaknesses.

### 2. Decision Readiness Score
Presents a score intended to summarize the perceived robustness of the submitted proposition.

> The score is a heuristic assessment, not a statistically validated probability of success.

### 3. Interactive Assumption Map
Visualizes connections between the central proposition and related reasoning components.

The map supports exploration of:
- **Hidden Assumptions:** Beliefs that need further examination.
- **Counterarguments:** Alternative perspectives that challenge the proposition.
- **Missing Evidence:** Information needed to evaluate the idea.
- **Risks & Pre-Mortem:** Potential failure scenarios and vulnerabilities.

### 4. Structured Critical Analysis
Organizes findings into understandable sections so users can identify what deserves further investigation.

### 5. Exportable Reports
Includes options to copy the assessment dossier or export it as a Markdown file.

### 6. Demo Presets
Allows users to explore example scenarios and demonstrate the application's workflow.

## 🖥️ User Workflow

1. Enter a proposition, decision, business idea, or plan.
2. Optionally provide additional constraints and stakes.
3. Submit the proposition for analysis.
4. Review the critical assessment and decision readiness score.
5. Explore the interactive Assumption Map.
6. Examine assumptions, counterarguments, missing evidence, and risks.
7. Export the report for future reference.

## 🛠️ Technology and Architecture

The application currently includes a web-based interface and a server-side model integration path.

| Component | Technology / Status |
|---|---|
| User interface | Existing web application |
| AI integration target | Gemini 3.8 Flash |
| Model access | Currently blocked by an HTTP 403 permission error |
| Fallback analysis | SecondSelf Cognitive Heuristic Engine |
| Visualization | Interactive Assumption Map |
| Report export | Markdown export and copy functionality |

*The exact frontend framework, backend framework, and visualization libraries should be documented after inspecting the complete source code.*

## ⚠️ Current Implementation Status

SecondSelf has a functioning interface with an assessment dashboard and an interactive reasoning map.

However, the intended Gemini integration currently encounters:

`HTTP 403 PERMISSION_DENIED`

As a result, the application reports that it switches to the SecondSelf Cognitive Heuristic Engine.

The current implementation should therefore be considered a **working prototype with an unresolved live AI integration issue**.

The following distinctions are important:

- The interface and assessment workflow are available.
- The application displays structured assessment results.
- The Gemini integration has not been confirmed to work successfully.
- The fallback engine should not be described as a live LLM unless its implementation demonstrates that it actually calls one.
- The quality and relevance of the fallback analysis require further testing.

## 🔧 Roadmap

### Phase 1 — Prototype
- [x] Build the SecondSelf interface.
- [x] Implement the assessment dashboard.
- [x] Add the Assumption Map.
- [x] Add report export options.
- [x] Display model integration status and the current access limitation.

### Phase 2 — Reliable AI Integration
- [ ] Resolve the Gemini API permission issue.
- [ ] Investigate compatible model providers, including Ollama cloud models.
- [ ] Confirm free-tier access and authentication requirements.
- [ ] Connect the application to a real AI model.
- [ ] Keep API keys and credentials out of client-side code.
- [ ] Clearly distinguish model-generated analysis from fallback results.

### Phase 3 — Analysis Quality
- [ ] Ensure every analysis is grounded in the submitted proposition.
- [ ] Improve the identification of assumptions and missing evidence.
- [ ] Test multiple unrelated propositions.
- [ ] Reduce irrelevant or repetitive findings.
- [ ] Improve the reliability and interpretability of the readiness score.

### Phase 4 — Demonstration Readiness
- [ ] Test the complete user journey.
- [ ] Validate the export functionality.
- [ ] Improve error handling and recovery.
- [ ] Document the verified model architecture.
- [ ] Prepare a reproducible hackathon demonstration.

## 🧪 Testing Strategy

SecondSelf should be tested with propositions from different domains.

**Test 1 — Career Decision**

"I want to focus on three advanced AI projects instead of building many smaller projects to improve my chances of securing an AI engineering internship."

Expected outcome: Relevant assumptions about project depth, hiring criteria, technical skills, and internship preparation.

**Test 2 — Business Decision**

"I want to leave my job and start a specialty coffee business."

Expected outcome: Relevant discussion of financial runway, market demand, customer validation, and business risks.

**Test 3 — Technology Prediction**

"Online education will completely replace traditional universities within five years."

Expected outcome: Relevant counterarguments, uncertainties, evidence requirements, and alternative scenarios.

The analysis should change meaningfully with each proposition. Results must be checked for relevance rather than judged solely by their length or confidence score.

## 🔒 Responsible AI Principles

SecondSelf is intended to support critical thinking, not replace independent judgment.

The project aims to:
- Challenge reasoning respectfully.
- Avoid automatic agreement or disagreement.
- Distinguish user-provided information from assumptions.
- Acknowledge uncertainty.
- Avoid presenting unsupported claims as verified facts.
- Encourage independent verification of consequential decisions.

## 🚀 Future Vision

SecondSelf aims to become a personal reasoning workspace where people can examine important decisions, test assumptions, compare alternative perspectives, and track how their thinking evolves.

Potential future enhancements include:
- Follow-up questions and iterative refinement.
- Evidence-backed analysis with source attribution.
- Assumption dependency graphs.
- Scenario analysis and pre-mortem exercises.
- Comparison of multiple possible decisions.
- History and comparison of previous assessments.

## 🏁 Hackathon Project

**Project:** SecondSelf — Think Beyond Your First Thought

**Category:** AI / Critical Thinking / Decision Support

**Core Idea:** Help people challenge their own reasoning before committing to important decisions.

**Current Status:** Interactive prototype; live Gemini integration requires troubleshooting.

---

*SecondSelf does not decide what you should think. It helps you examine why you think it.*
