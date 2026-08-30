import { streamAgent } from "@/lib/agent-http";

export async function POST(request: Request) {
  return streamAgent("orgbotsSubmit", request);
}