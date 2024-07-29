import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="z-10 w-full items-center bg-zinc-800 py-5">
      <div className="mx-auto flex items-center justify-between self-center px-14">
        <Link href="/" className="flex items-center gap-5">
          <Image src="/images/logo.png" alt="app logo" width={60} height={60} />
          <p className="text-2xl font-bold text-secondary">IntelliCourse.AI</p>
        </Link>
        <div className="flex items-center gap-14 text-secondary">
          <Link href="/about" className="flex items-center gap-5">
            <p className="text-lg text-secondary">About</p>
          </Link>
          <p>Pricing</p>
          {/*  User is Signed in and there is an active session, display link to Dashboard & Profile*/}
          <SignedIn>
            <Link href="/dashboard">
              <p>Dashboard</p>
            </Link>
            <UserButton
              appearance={{
                elements: { avatarBox: "w-10 h-10" },
              }}
            />
          </SignedIn>
          {/* If user is not signed in we need to direct them to sign in*/}
          <SignedOut>
            <Link
              title="Sign In"
              href="/sign-in"
              className="rounded-xl bg-sky-600 px-4 py-2 hover:bg-sky-700"
            >
              <p>Sign In</p>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default Header;
