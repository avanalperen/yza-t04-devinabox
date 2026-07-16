import type { Metadata } from "next";
import { NewProjectForm } from "@/components/project/new-project-form";

export const metadata: Metadata = {
  title: "New project",
};

export default function NewProjectPage() {
  return (
    <main className="magical-canvas flex min-h-screen items-center justify-center p-4 md:p-10">
      <NewProjectForm />
    </main>
  );
}
