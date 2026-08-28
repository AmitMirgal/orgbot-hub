import Link from "next/link";
import { CatalogOffline } from "@/components/catalog-offline";
import { listTopics, readCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const result = await readCatalog(() => listTopics());
  if (result.status === "offline") {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <Header />
        <CatalogOffline message={result.message} />
      </main>
    );
  }
  const topics = result.data;
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <Header />
      {topics.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">No topics yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {topics.map(({ topic, count }) => (
            <li key={topic}>
              <Link
                href={`/?topic=${encodeURIComponent(topic)}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[13px] hover:bg-card"
              >
                {topic}
                <span className="font-mono text-[11px] text-muted-foreground">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function Header() {
  return (
    <section className="flex max-w-2xl flex-col gap-2">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        Topics
      </p>
      <h1 className="text-2xl font-medium tracking-tight">Browse by job</h1>
    </section>
  );
}
