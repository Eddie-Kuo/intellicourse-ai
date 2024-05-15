import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-slate-800 hover:bg-slate-600 text-sm normal-case h-10 border-0",
          formFieldInput: "h-10",
          alternativeMethodsBlockButton__github: "w-full",
        },
      }}
      // redirect url to dashboard
    />
  );
}
