import { Loader2 } from "lucide-react";

interface loadingProps {}

export default function Loader({}: loadingProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-lg font-semibold text-darkText">
        Hang tight, generating your course!
      </p>
      <Loader2 className="w-72 animate-spin text-darkText" />
    </div>
  );
}
