"use client";

import {
  CatalogThreadMessage,
  ChatTranscript,
} from "@/components/catalog-chat";

export function ChatThreadPreview({
  messages,
}: {
  messages: Array<{ id: string; role: string; parts?: unknown[] }>;
}) {
  return (
    <section
      aria-label="Chat thread preview"
      className="flex h-[calc(100dvh-3.5rem)] min-h-0 min-w-0 flex-1 overflow-hidden"
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
    </section>
  );
}
