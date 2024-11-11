import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader, StepForward } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full min-h-screen ">
      <div className="container relative m-0 mx-auto py-10 md:px-10">
        <div className="w-full px-4 pt-12 md:px-4 lg:px-8 xl:px-10 2xl:px-0">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span
              rel="noreferrer"
              className="mb-6 cursor-pointer rounded-2xl border px-4 py-1 text-center text-xs transition duration-300 ease-in-out hover:text-slate-700 sm:text-base"
            >
              Powered by{" "}
              <a
                className="font-bold"
                target="_blank"
                href="https://turso.tech/"
              >
                Turso{" "}
              </a>
              and{" "}
              <a
                className="font-bold"
                target="_blank"
                href="https://www.openai.com/"
              >
                OpenAI ✨
              </a>
            </span>

            <div className="flex flex-col space-y-6 text-center">
              <div className="mx-auto text-center text-2xl font-bold md:text-6xl">
                <h1>Transform your learning journey,</h1>
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text px-2 text-transparent">
                  with custom AI-generated roadmaps.
                </span>
              </div>

              <p className="mx-auto max-w-2xl text-xs text-muted-foreground md:text-xl">
                Type any topic and watch the transformation. Our AI will create
                a personalized roadmap with detailed units and chapters just for
                you.
              </p>
            </div>
            <div className="mt-12 flex flex-col justify-center gap-4">
              <SignedIn>
                <Link
                  href={"/dashboard"}
                  className="mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-orange-600 px-8 py-4 text-xl font-medium text-gray-200 hover:text-white"
                >
                  <span className="flex items-center gap-1">
                    Get Started
                    <StepForward />
                  </span>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  href={"/sign-in"}
                  className="mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-orange-600 px-8 py-4 text-xl font-medium text-gray-200 hover:text-white"
                >
                  <span className="flex items-center gap-1">
                    Get Started
                    <StepForward />
                  </span>
                </Link>
              </SignedOut>
              <div className="items-center">
                <Link
                  target="_blank"
                  href="https://github.com/Eddie-Kuo/intellicourse-ai"
                >
                  <Button
                    className="border-orange-500/50 px-4 py-7 text-center text-xl"
                    variant="default"
                  >
                    Star on Github ⭐️
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
