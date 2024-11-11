import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader, StepForward } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full min-h-screen bg-gradient-to-r from-zinc-200 to-slate-300">
      <div className="container relative m-0 mx-auto py-10 md:px-10">
        <div className="w-full px-4 pt-12 md:px-4 lg:px-8 xl:px-10 2xl:px-0">
          <div className="flex h-full w-full flex-col items-center justify-center">
            {/* <div className="my-10 flex-col text-center">
              <span className="text-3xl font-bold text-red-500">
                Apologies for the inconvenience:
              </span>
              <h2>
                Currently working through some bugs within the site and will be
                fixed momentarily. Thank you for your patience!
              </h2>
              <p className="mb-2">
                In the mean time, feel free to test out a preview of what a
                course looks like!
              </p>
              <Link
                className="rounded-full bg-orange-600/80 px-3 py-2 font-semibold text-white"
                href={"/course/1/1/1"}
              >
                JavaScript Course
              </Link>
            </div> */}
            <span
              rel="noreferrer"
              className="mb-6 cursor-pointer rounded-2xl border border-black px-4 py-1 text-center text-xs text-slate-600 transition duration-300 ease-in-out hover:text-slate-700 sm:text-base"
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
            <h1 className="inline-block text-center text-4xl font-medium tracking-tighter text-darkText lg:text-7xl">
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
