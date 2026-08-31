"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon, CheckIcon, CopyIcon, MessageCircleIcon, PlusIcon, XIcon } from "lucide-react";
import { AuthorMarquee } from "@/components/author-marquee";
import { AuthorProfileCard } from "@/components/author-profile-card";
import { ChatMarkdown } from "@/components/chat-markdown";
import { TeamMix } from "@/components/team-mix";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageContent, MessageHeader } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { recordVisit } from "@/lib/actions";
import { parseCatalogSeat, publicXHandle, type CatalogSeat } from "@/lib/api-pack";
import {
  authorsFromSeats,
  hasToolActivity,
  messageText,
  seatsFromChatParts,
} from "@/lib/chat-seats";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import type { TopAuthor } from "@/lib/top-authors";
import {
  emptyTeamChatQuota,
  quotaMeterText,
  type TeamChatQuota,
} from "@/lib/team-quota";
import { cn } from "@/lib/utils";
import { captureVisit } from "@/lib/visits-client";

const pageChatShellClassName =
  "flex h-full min-h-0 min-w-0 flex-1 overflow-hidden";

export function ChatTranscript({
  children,
  contentClassName,
}: {
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="min-h-0 flex-1">
        <MessageScrollerViewport
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="overflow-x-hidden"
        >
          <MessageScrollerContent className={cn("gap-4 px-4 py-4", contentClassName)}>
            {children}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

export function CatalogChat({
  api,
  placeholder,
  disabled,
  disabledReason,
  title = "Chat",
  description,
  prompts,
  compact = false,
  badge,
  mix = false,
  surface = "card",
  authors = [],
  quota: initialQuota,
  signedIn = true,
}: {
  api: "/api/v1/agent/search" | "/api/v1/agent/submit";
  placeholder: string;
  disabled?: boolean;
  disabledReason?: string;
  title?: string;
  description: string;
  prompts?: string[];
  compact?: boolean;
  badge?: string;
  mix?: boolean;
  surface?: "card" | "page";
  authors?: TopAuthor[];
  quota?: TeamChatQuota;
  signedIn?: boolean;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [draft, setDraft] = useState<CatalogSeat[]>([]);
  const [quota, setQuota] = useState<TeamChatQuota>(
    initialQuota ?? emptyTeamChatQuota()
  );
  const needsLogin = surface === "page" && !signedIn;
  const loginHref = "/login?next=/team";
  const quotaLocked =
    surface === "page" &&
    signedIn &&
    (!quota.allowed || quota.remaining_messages <= 0);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api,
      fetch: async (input, init) => {
        const response = await fetch(input, init);
        if (surface === "page" && response.status === 429) {
          const body = (await response
            .clone()
            .json()
            .catch(() => null)) as {
            error?: string;
            reset_at?: string;
            token_blocked?: boolean;
          } | null;
          if (body?.error === "quota") {
            setQuota((current) => ({
              ...current,
              allowed: false,
              remaining_messages: 0,
              reset_at: body.reset_at ?? current.reset_at,
              token_blocked: Boolean(body.token_blocked),
            }));
          }
        }
        if (surface === "page" && response.status === 401) {
          router.push(loginHref);
        }
        if (surface === "page" && response.ok) {
          setQuota((current) => {
            const remaining = Math.max(current.remaining_messages - 1, 0);
            return {
              ...current,
              messages: current.messages + 1,
              remaining_messages: remaining,
              allowed: remaining > 0 && !current.token_blocked,
            };
          });
        }
        return response;
      },
    }),
  });

  const waiting = status === "submitted" || status === "streaming";
  const busy = disabled || waiting || quotaLocked;

  function send(text: string) {
    const next = text.trim();
    if (!next || busy) return;
    if (needsLogin) {
      router.push(loginHref);
      return;
    }
    sendMessage({ text: next });
    setInput("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    send(input);
  }

  function addToDraft(seat: CatalogSeat) {
    const url = parseGrokTemplateUrl(seat.grokTemplateUrl);
    const parsed = parseCatalogSeat({ ...seat, grokTemplateUrl: url ?? "" });
    if (!parsed) return;
    setDraft((current) =>
      current.some((item) => item.grokTemplateUrl === parsed.grokTemplateUrl)
        ? current
        : [...current, parsed]
    );
  }

  function removeFromDraft(url: string) {
    setDraft((current) => current.filter((seat) => seat.grokTemplateUrl !== url));
  }

  const thread = (
    <ChatTranscript
      contentClassName={
        surface === "page" && messages.length === 0 ? "justify-center" : undefined
      }
    >
      {messages.length === 0 ? (
        <MessageScrollerItem>
          <div
            className={
              surface === "page"
                ? "mx-auto flex w-full max-w-[22rem] min-w-0 flex-col items-center gap-4 text-center sm:max-w-lg md:max-w-xl"
                : undefined
            }
          >
            <p className="text-[13px] text-muted-foreground">
              {surface === "page"
                ? "What should this team do?"
                : mix
                  ? "Describe the jobs you need. The desk mixes seats that already exist."
                  : "Messages show up here. Ask a question to start the conversation."}
            </p>
            {surface === "page" ? <AuthorMarquee authors={authors} /> : null}
            {needsLogin ? (
              <Button asChild>
                <Link href={loginHref}>Sign in to mix a team</Link>
              </Button>
            ) : null}
            {prompts && prompts.length > 0 ? (
              <div
                className={cn(
                  "flex flex-wrap gap-2",
                  surface === "page" && "justify-center"
                )}
              >
                {prompts.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="outline"
                    disabled={busy}
                    className="h-auto min-h-9 max-w-full whitespace-normal px-3 py-1.5 text-left text-[13px] font-normal"
                    onClick={() => send(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </MessageScrollerItem>
      ) : null}
      {messages.map((message, index) => (
        <CatalogThreadMessage
          key={message.id}
          message={message}
          last={index === messages.length - 1}
          mix={mix}
          waiting={waiting}
          onAddToDraft={mix ? addToDraft : undefined}
        />
      ))}
      {waiting ? (
        <MessageScrollerItem>
          <Marker>
            <MarkerContent className="animate-pulse bg-gradient-to-r from-muted-foreground/50 via-foreground to-muted-foreground/50 bg-[length:200%_100%] bg-clip-text text-transparent">
              Searching the catalog…
            </MarkerContent>
          </Marker>
        </MessageScrollerItem>
      ) : null}
      {status === "error" ? (
        <MessageScrollerItem>
          <Message align="start">
            <MessageContent>
              <MessageHeader>Agent</MessageHeader>
              <Bubble variant="destructive">
                <BubbleContent>
                  The mix did not go through. Try again.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ) : null}
    </ChatTranscript>
  );

  const composer = (
    <div
      className={cn(
        "shrink-0 border-t border-border bg-background px-4 pt-3",
        surface === "page"
          ? "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          : "py-3"
      )}
    >
      {surface === "page" && signedIn ? (
        <p className="pb-2 text-[12px] text-muted-foreground">{quotaMeterText(quota)}</p>
      ) : null}
      {needsLogin ? (
        <p className="pb-2 text-[12px] text-muted-foreground">Sign in to send a mix.</p>
      ) : null}
      <form onSubmit={onSubmit} className="min-w-0">
        <InputGroup className="h-auto min-h-11 w-full min-w-0">
          <InputGroupTextarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onComposerKeyDown}
            placeholder={placeholder}
            disabled={busy || needsLogin}
            aria-label="Message"
            rows={1}
            className="min-h-11 max-h-36 py-2.5"
          />
          <InputGroupAddon align="inline-end" className="self-end pr-1.5">
            {needsLogin ? (
              <InputGroupButton asChild size="sm" variant="default">
                <Link href={loginHref}>Sign in</Link>
              </InputGroupButton>
            ) : (
              <InputGroupButton
                type="submit"
                size="sm"
                variant="default"
                disabled={busy || !input.trim()}
                aria-label="Send message"
              >
                <ArrowUpIcon />
                Send
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );

  if (surface === "page") {
    return (
      <section aria-label={title} className={pageChatShellClassName}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2 md:hidden">
            <p className="text-sm font-medium">{title}</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  Mix ({draft.length})
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetHeader>
                  <SheetTitle>Your mix</SheetTitle>
                </SheetHeader>
                <TeamMix draft={draft} onRemove={removeFromDraft} heading={false} />
              </SheetContent>
            </Sheet>
          </div>
          {disabled ? (
            <p className="shrink-0 px-4 py-3 text-[13px] text-muted-foreground">
              {disabledReason ?? "Chat is not configured."}
            </p>
          ) : null}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{thread}</div>
          {composer}
        </div>
        {draft.length > 0 ? (
          <aside className="hidden min-h-0 min-w-0 w-72 shrink-0 overflow-hidden border-l border-border md:flex md:w-80">
            <TeamMix draft={draft} onRemove={removeFromDraft} />
          </aside>
        ) : null}
      </section>
    );
  }

  return (
    <section
      aria-label={title}
      className={mix ? "grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]" : undefined}
    >
      <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-1 border-b border-border px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <MessageCircleIcon className="size-4 text-muted-foreground" aria-hidden />
            <h2 className="text-base font-medium tracking-tight">{title}</h2>
            {badge ? <Badge variant="secondary">{badge}</Badge> : null}
          </div>
          <p className="text-[13px] text-muted-foreground">{description}</p>
        </div>
        {disabled ? (
          <p className="px-4 py-3 text-[13px] text-muted-foreground">
            {disabledReason ?? "Chat is not configured."}
          </p>
        ) : null}
        <div className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden", compact ? "h-56" : "h-80")}>
          {thread}
        </div>
        {composer}
      </div>
      {mix ? <DraftRoster draft={draft} onRemove={removeFromDraft} /> : null}
    </section>
  );
}

export function CatalogThreadMessage({
  message,
  last,
  mix,
  waiting,
  onAddToDraft,
}: {
  message: { id: string; role: string; parts?: unknown[] };
  last: boolean;
  mix: boolean;
  waiting: boolean;
  onAddToDraft?: (seat: CatalogSeat) => void;
}) {
  const isUser = message.role === "user";
  const parts = message.parts ?? [];
  const text = messageText(parts);
  const seats = mix ? seatsFromChatParts(parts) : [];
  const authors = authorsFromSeats(seats);
  const searching = !isUser && last && hasToolActivity(parts);
  const emptyReply =
    !isUser && last && !waiting && !searching && !text && seats.length === 0;

  if (isUser && !text) return null;
  if (!isUser && !text && seats.length === 0 && !searching && !emptyReply) {
    return null;
  }

  return (
    <MessageScrollerItem messageId={message.id} scrollAnchor={isUser}>
      <Message align={isUser ? "end" : "start"}>
        <MessageContent>
          <MessageHeader>{isUser ? "You" : "Agent"}</MessageHeader>
          {isUser && text ? (
            <Bubble variant="default">
              <BubbleContent className="whitespace-pre-wrap">{text}</BubbleContent>
            </Bubble>
          ) : null}
          {!isUser && text ? (
            <Bubble
              variant="secondary"
              className="min-w-0 *:data-[slot=bubble-content]:border-border dark:*:data-[slot=bubble-content]:border-white/20"
            >
              <BubbleContent className="overflow-x-auto">
                <ChatMarkdown streaming={last && waiting}>{text}</ChatMarkdown>
              </BubbleContent>
            </Bubble>
          ) : null}
          {authors.map((author) => (
            <AuthorProfileCard key={author.githubLogin} author={author} />
          ))}
          {seats.map((seat) => (
            <SeatBubble key={seat.id} seat={seat} onAddToDraft={onAddToDraft} />
          ))}
          {searching ? (
            <Marker>
              <MarkerContent className="animate-pulse">Searching the catalog…</MarkerContent>
            </Marker>
          ) : null}
          {emptyReply ? (
            <Bubble
              variant="secondary"
              className="*:data-[slot=bubble-content]:border-border dark:*:data-[slot=bubble-content]:border-white/20"
            >
              <BubbleContent>Nothing matched in the catalog.</BubbleContent>
            </Bubble>
          ) : null}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

function SeatBubble({
  seat,
  onAddToDraft,
}: {
  seat: CatalogSeat;
  onAddToDraft?: (seat: CatalogSeat) => void;
}) {
  const href = parseGrokTemplateUrl(seat.grokTemplateUrl);
  return (
    <Bubble variant="outline" className="max-w-full min-w-0">
      <BubbleContent className="flex w-full max-w-full min-w-0 flex-col gap-2">
        <p className="font-medium">{seat.name}</p>
        <p className="text-[13px] text-muted-foreground">{seat.job}</p>
        <p className="text-[12px] text-muted-foreground">
          Shared by @{publicXHandle(seat.author.xHandle) ?? seat.pack.owner} · {seat.pack.href}
        </p>
        <div className="flex flex-wrap gap-2">
          {href ? (
            <Button asChild size="sm">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  void recordVisit(
                    seat.packId,
                    seat.pack.owner,
                    seat.pack.slug,
                    "desk_mix",
                    seat.name
                  );
                  captureVisit({
                    packId: seat.packId,
                    identity: { owner: seat.pack.owner, slug: seat.pack.slug },
                    source: "desk_mix",
                    seatName: seat.name,
                  });
                }}
              >
                Add to Grok
              </a>
            </Button>
          ) : null}
          {href ? <CopyUrlButton url={href} /> : null}
          {onAddToDraft ? (
            <Button type="button" size="sm" variant="outline" onClick={() => onAddToDraft(seat)}>
              <PlusIcon className="size-3.5" />
              Add to mix
            </Button>
          ) : null}
        </div>
      </BubbleContent>
    </Bubble>
  );
}

function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      Copy URL
    </Button>
  );
}

function DraftRoster({
  draft,
  onRemove,
}: {
  draft: CatalogSeat[];
  onRemove: (url: string) => void;
}) {
  return (
    <aside className="flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <div>
        <h3 className="text-sm font-medium">Draft mix</h3>
        <p className="text-[12px] text-muted-foreground">
          Session only. Not a listed pack.
        </p>
      </div>
      {draft.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">Add seats from the thread.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {draft.map((seat) => {
            const href = parseGrokTemplateUrl(seat.grokTemplateUrl);
            return (
              <li key={seat.id} className="flex items-start justify-between gap-2 text-[13px]">
                <div className="min-w-0">
                  <p className="truncate font-medium">{seat.name}</p>
                  <p className="truncate text-muted-foreground">@{seat.pack.owner}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  {href ? (
                    <Button asChild size="icon-sm" variant="ghost">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Add ${seat.name} to Grok`}
                        onClick={() => {
                          void recordVisit(
                            seat.packId,
                            seat.pack.owner,
                            seat.pack.slug,
                            "desk_mix",
                            seat.name
                          );
                          captureVisit({
                            packId: seat.packId,
                            identity: { owner: seat.pack.owner, slug: seat.pack.slug },
                            source: "desk_mix",
                            seatName: seat.name,
                          });
                        }}
                      >
                        <PlusIcon className="size-3.5" />
                      </a>
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Remove ${seat.name}`}
                    onClick={() => onRemove(seat.grokTemplateUrl)}
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
