import { notFound } from "next/navigation";
import { ChatThreadPreview } from "@/components/chat-thread-preview";
import { seatsFromPacks } from "@/lib/api-pack";
import { getFallbackPack } from "@/lib/fallback-catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Chat thread preview",
};

export default function ChatThreadPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const lauren = getFallbackPack("poteto", "lauren");
  const krista = getFallbackPack("kristaletz", "krista");
  const packs = [lauren, krista].flatMap((pack) => (pack ? [pack] : []));
  const seats = seatsFromPacks(packs);
  const messages = [
    {
      id: "user-lauren",
      role: "user",
      parts: [{ type: "text", text: "lauren" }],
    },
    {
      id: "agent-empty",
      role: "assistant",
      parts: [{ type: "text", text: "   " }],
    },
    {
      id: "agent-lauren",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Lauren Tan's desk plus Krista Letz for a second author. Install each seat in Grok. This is your mix, not a listed pack.",
        },
        {
          type: "tool-searchSeats",
          state: "output-available",
          output: { empty: false, seats },
        },
      ],
    },
  ];

  return <ChatThreadPreview messages={messages} draft={seats.slice(0, 2)} />;
}
