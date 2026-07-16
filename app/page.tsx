import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "AI MVP planning workspace",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
