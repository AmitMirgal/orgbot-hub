"use client";

import {
  CatalogThreadMessage,
  ChatTranscript,
} from "@/components/catalog-chat";
import { TeamMix } from "@/components/team-mix";
import type { CatalogSeat } from "@/lib/api-pack";

export function ChatThreadPreview({
  messages,
  draft = [],
}: {
  messages: Array<{ id: string; role: string; parts?: unknown[] }>;
  draft?: CatalogSeat[];
}) {
  return (
    <section
      aria-label="Chat thread preview"
      className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden"
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
        <ChatTranscript>
          {messages.map((message, index) => (
            <CatalogThreadMessage
              key={message.id}
              message={message}
              last={index === messages.length - 1}
              mix
              waiting={false}
            />
          ))}
        </ChatTranscript>
      </div>
      {draft.length > 0 ? (
        <aside className="hidden min-h-0 min-w-0 w-72 shrink-0 overflow-hidden border-l border-border md:flex md:w-80 md:min-w-80">
          <TeamMix draft={draft} onRemove={() => undefined} />
        </aside>
      ) : null}
    </section>
  );
}
