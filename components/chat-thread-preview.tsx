"use client";

import { CatalogThreadMessage } from "@/components/catalog-chat";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatThreadPreview({
  messages,
}: {
  messages: Array<{ id: string; role: string; parts?: unknown[] }>;
}) {
  return (
    <section aria-label="Chat thread preview" className="flex min-h-0 flex-1">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
        <div className="min-h-0 flex-1">
          <ScrollArea type="always" className="h-full">
            <MessageScrollerProvider autoScroll defaultScrollPosition="end">
              <MessageScroller className="h-auto min-h-full overflow-visible">
                <MessageScrollerViewport
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                  className="h-auto max-h-none overflow-visible"
                >
                  <MessageScrollerContent className="gap-4 px-4 py-4">
                    {messages.map((message, index) => (
                      <CatalogThreadMessage
                        key={message.id}
                        message={message}
                        last={index === messages.length - 1}
                        mix
                        waiting={false}
                      />
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}
