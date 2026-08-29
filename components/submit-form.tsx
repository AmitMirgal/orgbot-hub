"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitPack } from "@/lib/actions";
import { DEFAULT_ROUTING_RULE } from "@/lib/pack";

export function SubmitForm({ disabled = false }: { disabled?: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    if (disabled) return;
    setPending(true);
    setError(null);
    const result = await submitPack(formData);
    if (result?.error) setError(result.error);
    setPending(false);
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <fieldset
        disabled={disabled}
        className="flex min-w-0 flex-col gap-6 border-0 p-0 disabled:opacity-60"
      >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pack name" htmlFor="name">
          <Input id="name" name="name" required className="h-11" placeholder="Lauren" />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <Input id="slug" name="slug" required className="h-11 font-mono" placeholder="lauren" />
        </Field>
      </div>
      <Field label="One-line job" htmlFor="description">
        <Input
          id="description"
          name="description"
          required
          className="h-11"
          placeholder="Company of bots you can install"
        />
      </Field>
      <Field label="Routing rule" htmlFor="routingRule">
        <Textarea
          id="routingRule"
          name="routingRule"
          defaultValue={DEFAULT_ROUTING_RULE}
          className="min-h-20"
        />
      </Field>
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">Topics</p>
        <Badge variant="accent" className="w-fit rounded-md font-normal">
          Topics — Coming soon
        </Badge>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">Desk</p>
        <Field label="Desk name" htmlFor="deskName">
          <Input id="deskName" name="deskName" required className="h-11" placeholder="Chief of Staff" />
        </Field>
        <Field label="Desk job" htmlFor="deskJob">
          <Input id="deskJob" name="deskJob" required className="h-11" />
        </Field>
        <Field label="Official Grok URL" htmlFor="deskUrl">
          <Input
            id="deskUrl"
            name="deskUrl"
            className="h-11 font-mono"
            placeholder="https://x.ai/bot/…"
          />
        </Field>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">Named seat</p>
        <Field label="Seat name" htmlFor="seatName">
          <Input id="seatName" name="seatName" className="h-11" />
        </Field>
        <Field label="Seat job" htmlFor="seatJob">
          <Input id="seatJob" name="seatJob" className="h-11" />
        </Field>
        <Field label="Official Grok URL" htmlFor="seatUrl">
          <Input
            id="seatUrl"
            name="seatUrl"
            className="h-11 font-mono"
            placeholder="https://x.ai/bot/…"
          />
        </Field>
      </div>
      <Field label="Optional GitHub source" htmlFor="githubUrl">
        <Input
          id="githubUrl"
          name="githubUrl"
          className="h-11 font-mono"
          placeholder="https://github.com/owner/repo"
        />
      </Field>
      <Field label="Optional README" htmlFor="readme">
        <Textarea id="readme" name="readme" className="min-h-32 font-mono text-[13px]" />
      </Field>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button type="submit" disabled={disabled || pending} className="min-h-11 w-fit">
        {pending ? "Saving…" : "Submit pack"}
      </Button>
      </fieldset>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
