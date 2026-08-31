import { streamTeamDesk } from "@/lib/team-chat";

export async function POST(request: Request) {
  return streamTeamDesk(request);
}
