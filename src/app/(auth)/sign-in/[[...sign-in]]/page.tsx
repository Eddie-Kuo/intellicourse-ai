import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-slate-800 hover:bg-slate-600 text-sm normal-case h-10 border-0",
          formFieldInput: "h-10",
        },
      }}
      forceRedirectUrl="/dashboard"
    />
  );
}
