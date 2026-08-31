const DEFAULT_SARVAM_MODEL = "sarvam/sarvam-105b";

export function mastraModel(): string {
  const configured = process.env.MASTRA_MODEL?.trim();
  if (configured) return configured;
  return DEFAULT_SARVAM_MODEL;
}

function providerReady(model: string): boolean {
  if (model.startsWith("sarvam/")) {
    return Boolean(process.env.SARVAM_API_KEY?.trim());
  }
  if (model.startsWith("xai/")) {
    return Boolean(process.env.XAI_API_KEY?.trim());
  }
  return Boolean(
    process.env.OPENAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY
  );
}

export function agentRuntimeStatus() {
  return {
    modelReady: providerReady(mastraModel()),
    githubReady: Boolean(process.env.ORGBOTS_GITHUB_TOKEN?.trim()),
  };
}
