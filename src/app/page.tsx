import { Button } from "@/components/ui/button";
import { Loader, StepForward } from "lucide-react";

export default function Home() {
  return (
    <main className="h-full min-h-screen bg-gradient-to-r from-zinc-200 to-slate-300">
      <div className="container relative m-0 mx-auto py-10 md:px-10">
        <div className="w-full px-4 pt-12 md:px-4 lg:px-8 xl:px-10 2xl:px-0">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span
              rel="noreferrer"
              className="mb-6 cursor-pointer rounded-2xl border border-black px-4 py-1 text-center text-xs text-slate-600 transition duration-300 ease-in-out hover:text-slate-700 sm:text-base"
            >
              Powered by{" "}
              <a
                className="font-bold"
                target="_blank"
                href="https://convex.dev/c/todovex"
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
            <h1 className="text-dark inline-block text-center text-4xl font-medium tracking-tighter lg:text-7xl">
              An Open Source AI-Powered{" "}
              <br className="hidden lg:inline-block" />
              Course Roadmap Generator
            </h1>
            <h2 className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
              Intellicourse seamlessly{" "}
              <span className="px-1 font-bold">
                generates you a custom course
              </span>{" "}
              with
              <br className="hidden lg:inline-block" />
              <span className="px-1 font-bold">detailed course material</span>
              using AI.
            </h2>
            <div className="mt-12 flex flex-col gap-4">
              <button
                type="submit"
                className="group mb-2 me-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-orange-600 px-8 py-4 text-xl font-medium text-gray-100 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:text-white dark:focus:ring-blue-800"
              >
                <span className="flex items-center gap-1">
                  Get Started
                  <StepForward />
                </span>
              </button>
              <div className="w-fit items-center">
                <Button
                  className="border-orange-500/50 bg-transparent px-4 py-7 text-center text-xl"
                  variant={"outline"}
                >
                  Star on Github ⭐️
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
