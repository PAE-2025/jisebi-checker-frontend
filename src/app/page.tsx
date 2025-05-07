import MainButton from "@/components/buttons/MainButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-screen">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">JISEBI</span> Checker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The intelligent manuscript checking system for JISEBI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 text-base ">
          <Link href="/login" className="w-fit ">
            <MainButton className="flex items-center justify-center gap-1 text-base px-3 py-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </MainButton>
          </Link>
          <Link href="/about" className="px-3 py-2">
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
