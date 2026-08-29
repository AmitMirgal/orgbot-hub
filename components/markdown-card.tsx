import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";

export function MarkdownCard({ markdown }: { markdown: string }) {
  return (
    <Card className="rounded-lg py-0 ring-1 ring-border">
      <CardContent className="pack-readme px-6 py-6 text-[14px] leading-7">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-3 text-xl font-medium tracking-tight">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-6 mb-2 text-[15px] font-medium tracking-tight">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-4 mb-1 text-[13px] font-medium">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-3 text-muted-foreground last:mb-0">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-3 list-disc space-y-1 pl-5 text-muted-foreground">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-3 list-decimal space-y-1 pl-5 text-muted-foreground">{children}</ol>
            ),
            code: ({ children, className }) => {
              const block = className?.includes("language-") || String(children).includes("\n");
              if (block) {
                return (
                  <code className="block overflow-x-auto rounded-md border border-border bg-background p-3 font-mono text-[12px] text-foreground">
                    {children}
                  </code>
                );
              }
              return (
                <code className="rounded-sm border border-border bg-background px-1 py-0.5 font-mono text-[12px]">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <pre className="mb-3">{children}</pre>,
            a: ({ href, children }) => (
              <a href={href} className="underline underline-offset-4">
                {children}
              </a>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}
