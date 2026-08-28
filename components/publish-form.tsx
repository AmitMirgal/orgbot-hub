"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { publishFromGithub, publishFromUpload } from "@/lib/actions";

export function PublishForm() {
  const [githubError, setGithubError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, setPending] = useState<"github" | "upload" | null>(null);

  async function onGithub(formData: FormData) {
    setPending("github");
    setGithubError(null);
    const result = await publishFromGithub(formData);
    if (result?.error) setGithubError(result.error);
    setPending(null);
  }

  async function onUpload(formData: FormData) {
    setPending("upload");
    setUploadError(null);
    const result = await publishFromUpload(formData);
    if (result?.error) setUploadError(result.error);
    setPending(null);
  }

  return (
    <Tabs defaultValue="github" className="gap-4">
      <TabsList variant="line">
        <TabsTrigger value="github">GitHub repo</TabsTrigger>
        <TabsTrigger value="upload">Paste files</TabsTrigger>
      </TabsList>
      <TabsContent value="github">
        <form action={onGithub} className="flex flex-col gap-3">
          <label className="text-[11px] tracking-wide text-muted-foreground uppercase">
            Repository URL
          </label>
          <Input
            name="githubUrl"
            placeholder="https://github.com/owner/repo"
            required
            className="h-10"
          />
          <p className="text-[12px] text-muted-foreground">
            The repo must have orgbots.yaml at the root. Git stays the source of truth.
            This catalog only caches the roster.
          </p>
          {githubError ? <p className="text-[13px] text-destructive">{githubError}</p> : null}
          <Button type="submit" disabled={pending !== null} className="w-fit">
            {pending === "github" ? "Fetching…" : "Publish pack"}
          </Button>
        </form>
      </TabsContent>
      <TabsContent value="upload">
        <form action={onUpload} className="flex flex-col gap-3">
          <label className="text-[11px] tracking-wide text-muted-foreground uppercase">
            orgbots.yaml
          </label>
          <Textarea
            name="yaml"
            required
            spellCheck={false}
            className="min-h-48 font-mono text-[12px]"
            placeholder={'name: my-desk\nslug: my-desk\ndescription: …'}
          />
          <label className="text-[11px] tracking-wide text-muted-foreground uppercase">
            README.md
          </label>
          <Textarea
            name="readme"
            spellCheck={false}
            className="min-h-32 font-mono text-[12px]"
            placeholder="Optional pack card markdown"
          />
          {uploadError ? <p className="text-[13px] text-destructive">{uploadError}</p> : null}
          <Button type="submit" disabled={pending !== null} className="w-fit">
            {pending === "upload" ? "Saving…" : "Publish from files"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
