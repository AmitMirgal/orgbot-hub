import Link from "next/link";
import { CatalogOffline } from "@/components/catalog-offline";
import { Badge } from "@/components/ui/badge";
import { listTopics, readCatalog } from "@/lib/catalog";
import { TOPICS } from "@/lib/topics";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const result = await readCatalog(() => listTopics());
  const counts = new Map(
    result.status === "ok" ? result.data.map((item) => [item.topic, item.count]) : []
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <section className="flex max-w-2xl flex-col gap-2">
        <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Topics
        </p>
        <h1 className="text-2xl font-medium tracking-tight">Browse by job</h1>
      </section>
      {result.status === "offline" ? <CatalogOffline message={result.message} /> : null}
      <ul className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <li key={topic}>
            <Link href={`/topics/${topic}`} className="inline-flex min-h-11 items-center">
              <Badge variant="outline" className="rounded-md px-3 py-1.5 font-normal">
                {topic}
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  {counts.get(topic) ?? 0}
                </span>
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
