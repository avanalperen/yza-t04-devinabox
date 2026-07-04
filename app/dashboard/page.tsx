import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { projects } = await listProjects().then(
    (p) => ({ projects: p }),
    () => ({ projects: [] }),
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Your projects</h1>
            <p className="text-muted-foreground">
              Every idea you have summoned into a blueprint.
            </p>
          </div>
          <Button asChild className="pixie-glow">
            <Link href="/projects/new">New idea</Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-20 text-center">
            <span className="text-4xl">✨</span>
            <h2 className="font-heading text-xl font-semibold">
              No ideas yet
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Summon your first pixie team and turn a messy idea into a
              build-ready MVP blueprint.
            </p>
            <Button asChild className="pixie-glow">
              <Link href="/projects/new">Summon your first pixie team</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
