import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen justify-center bg-zinc-100 pt-52">
      {children}
    </div>
  );
}
