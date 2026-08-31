export function openApiDocument() {
  return {
    openapi: "3.0.3",
    info: {
      title: "orgbots catalog",
      version: "1.0.0",
      description: "Public JSON catalog of Grok Bot packs. Agents should call these routes, not scrape HTML.",
    },
    paths: {
      "/api/v1": {
        get: {
          summary: "API index",
          responses: { "200": { description: "Link document" } },
        },
      },
      "/api/v1/packs": {
        get: {
          summary: "List packs",
          parameters: [
            { name: "q", in: "query", schema: { type: "string" } },
            { name: "owner", in: "query", schema: { type: "string" } },
            { name: "featured", in: "query", schema: { type: "string", enum: ["true"] } },
          ],
          responses: { "200": { description: "{ packs: PublicPack[] }" } },
        },
      },
      "/api/v1/seats": {
        get: {
          summary: "List installable seats",
          description:
            "Flattened seats with official https://x.ai/bot URLs. Seats whose grokTemplateUrl does not parse are omitted.",
          parameters: [{ name: "q", in: "query", schema: { type: "string" } }],
          responses: { "200": { description: "{ seats: CatalogSeat[] }" } },
        },
      },
      "/api/v1/packs/{owner}/{slug}": {
        get: {
          summary: "Get one pack",
          parameters: [
            { name: "owner", in: "path", required: true, schema: { type: "string" } },
            { name: "slug", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "PublicPack" },
            "404": { description: "Missing pack" },
          },
        },
      },
    },
  };
}