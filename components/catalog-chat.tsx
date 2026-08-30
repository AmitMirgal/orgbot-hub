"use client";

import { useState, type FormEvent } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CatalogChat({
  api,
  placeholder,
  disabled,
  disabledReason,
  eyebrow = "Ask the catalog",
}: {
  api: "/api/v1/agent/search" | "/api/v1/agent/submit";
  placeholder: string;
  disabled?: boolean;
  disabledReason?: string;
  eyebrow?: string;
}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api }),
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || disabled || status !== "ready") return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      {disabled ? (
        <p className="text-[13px] text-muted-foreground">
          {disabledReason ?? "Agent env is missing."}
        </p>
      ) : null}
      <div className="flex max-h-72 flex-col gap-2 overflow-auto text-[13px]">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-muted-foreground">{message.role}</p>
            {message.parts?.map((part, index) =>
              part.type === "text" ? (
                <p key={`${message.id}-${index}`} className="whitespace-pre-wrap">
                  {part.text}
                </p>
              ) : null
            )}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          disabled={disabled || status !== "ready"}
          className="h-11"
        />
        <Button type="submit" disabled={disabled || status !== "ready"} className="min-h-11">
          Send
        </Button>
      </form>
    </section>
  );
}