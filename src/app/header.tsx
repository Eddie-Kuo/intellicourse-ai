import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="z-10 w-full items-center bg-zinc-800 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between self-center">
        <div className="flex items-center gap-5">
          <Image src="/logo.png" alt="app logo" width={60} height={60} />
          <p className="text-2xl font-bold">IntelliCourse.AI</p>
        </div>
        <div className="flex gap-14">
          <p>About</p>
          <p>Pricing</p>
          <p>Sign In</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
