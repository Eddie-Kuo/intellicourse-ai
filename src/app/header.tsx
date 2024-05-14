import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="z-10 w-full items-center bg-zinc-800 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between self-center">
        <Link href="/" className="flex items-center gap-5">
          <Image src="/logo.png" alt="app logo" width={60} height={60} />
          <p className="text-2xl font-bold">IntelliCourse.AI</p>
        </Link>
        <div className="flex items-center gap-14">
          <p>About</p>
          <p>Pricing</p>
          <Link
            title="Sign In"
            href="/sign-in"
            className="rounded-xl bg-sky-700 px-4 py-2 hover:bg-sky-500"
          >
            <p>Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
