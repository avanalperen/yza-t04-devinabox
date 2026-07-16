import Link from "next/link";
import { FileQuestion, LayoutDashboard } from "lucide-react";
import { Brand } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="magical-canvas flex min-h-screen items-center justify-center p-6">
      <section className="app-card flex w-full max-w-lg flex-col items-center p-8 text-center md:p-12">
        <Brand className="mb-8" />
        <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <FileQuestion className="size-7" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-3xl font-semibold">This workspace was not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The link may be outdated, or the project may belong to another anonymous session.
        </p>
        <Link
          href="/dashboard"
          className="magic-button mt-8 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
        >
          <LayoutDashboard className="size-4" aria-hidden="true" />
          Return to projects
        </Link>
      </section>
    </main>
  );
}
