import { streamAgent } from "@/lib/agent-http";
import { SUBMIT_STATUS } from "@/lib/submit-status";

export async function POST(request: Request) {
  if (SUBMIT_STATUS === "coming-soon") {
    return Response.json({ error: "Submit is coming soon." }, { status: 503 });
  }
  return streamAgent("orgbotsSubmit", request);
}