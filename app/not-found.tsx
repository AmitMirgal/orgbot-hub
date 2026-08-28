import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-20">
      <h1 className="text-2xl font-medium tracking-tight">Not found</h1>
      <p className="text-[14px] text-muted-foreground">
        That pack or author is not in the catalog.
      </p>
      <Link href="/" className="text-[13px] underline underline-offset-4">
        Back to the directory
      </Link>
    </main>
  );
}
