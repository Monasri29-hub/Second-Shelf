/**
 * Ollama Cloud & Self-Hosted Integration Service
 * 
 * Supports server-side connectivity to Ollama Cloud models (such as gemma4:31b-cloud)
 * or local/remote Ollama instances without exposing any credentials to the browser.
 */

export interface OllamaConfig {
  host: string;
  apiKey?: string;
  model: string;
}

export function getOllamaConfig(): OllamaConfig {
  const host = process.env.OLLAMA_HOST || 'https://ollama.com';
  const apiKey = process.env.OLLAMA_API_KEY;
  // Use gemma4:31b-cloud as requested, or custom model from env
  const model = process.env.OLLAMA_MODEL || 'gemma4:31b-cloud';

  return {
    host,
    apiKey,
    model,
  };
}

export interface OllamaStatus {
  isConfigured: boolean;
  model: string;
  host: string;
  hasApiKey: boolean;
  accountRequirementNotice: string;
}

export function getOllamaStatus(): OllamaStatus {
  const config = getOllamaConfig();
  const hasApiKey = Boolean(config.apiKey && config.apiKey.trim().length > 0);
  const isCloud = config.host.includes('ollama.com');

  return {
    isConfigured: hasApiKey || (!isCloud && Boolean(process.env.OLLAMA_HOST)),
    model: config.model,
    host: config.host,
    hasApiKey,
    accountRequirementNotice: isCloud
      ? 'Ollama Cloud models (e.g. gemma4:31b-cloud) require an active Ollama account with Cloud access and an OLLAMA_API_KEY environment variable set on the server.'
      : `Ollama host configured at ${config.host}.`,
  };
}

/**
 * Calls Ollama API server-side with structured prompt and returns JSON.
 * Throws structured error if credentials or connectivity are missing.
 */
export async function callOllamaChat(prompt: string, systemPrompt: string): Promise<any> {
  const config = getOllamaConfig();
  const isCloud = config.host.includes('ollama.com');

  if (isCloud && !config.apiKey) {
    throw new Error(
      `Ollama Cloud model (${config.model}) requires authentication. Set OLLAMA_API_KEY in server environment variables to enable this model.`
    );
  }

  const endpoint = `${config.host.replace(/\/+$/, '')}/api/chat`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey.trim()}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      stream: false,
      format: 'json',
      options: {
        temperature: 0.4,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Ollama API responded with HTTP ${response.status} ${response.statusText}: ${errorText}`
    );
  }

  const result = await response.json();
  const content = result?.message?.content;
  if (!content) {
    throw new Error('Received an empty response from Ollama API.');
  }

  return JSON.parse(content);
}
