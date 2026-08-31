import { streamTeamDesk } from "@/lib/team-chat";

export const maxDuration = 60;

export async function POST(request: Request) {
  return streamTeamDesk(request);
}
