import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-100">
      {children}
    </div>
  );
}
