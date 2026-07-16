import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="magical-canvas flex min-h-screen items-center justify-center p-6">
      <div
        role="status"
        className="app-card flex max-w-sm flex-col items-center gap-4 p-8 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Sparkles className="size-5 animate-pulse" aria-hidden="true" />
        </span>
        <p className="font-heading text-lg font-semibold">Opening your workspace</p>
        <p className="text-sm text-muted-foreground">
          BuildPixies is loading the latest project state.
        </p>
      </div>
    </main>
  );
}
