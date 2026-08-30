const DEFAULT_XAI_MODEL = "xai/grok-4.20-0309-non-reasoning";

export function mastraModel(): string {
  const configured = process.env.MASTRA_MODEL?.trim();
  if (configured) return configured;
  return DEFAULT_XAI_MODEL;
}

export function agentRuntimeStatus() {
  const hasXai = Boolean(process.env.XAI_API_KEY?.trim());
  const hasProvider = Boolean(
    process.env.OPENAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY
  );
  return {
    modelReady: hasXai || hasProvider,
    githubReady: Boolean(process.env.ORGBOTS_GITHUB_TOKEN?.trim()),
  };
}
