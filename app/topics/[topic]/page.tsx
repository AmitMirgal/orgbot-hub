import { notFound } from "next/navigation";
import { CatalogBrowse } from "@/components/catalog-browse";
import { isTopic } from "@/lib/topics";

export const dynamic = "force-dynamic";

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ q?: string; featured?: string; seats?: string }>;
}) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();
  const extra = await searchParams;
  return (
    <CatalogBrowse
      pathname={`/topics/${topic}`}
      searchParams={{ ...extra, topic }}
      eyebrow="Topic"
      title={topic}
    />
  );
}
