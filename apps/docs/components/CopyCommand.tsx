"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-1 inline-flex items-center gap-3 rounded-md border border-fd-border bg-fd-card px-4 py-2 text-sm">
      <span className="select-none text-fd-muted-foreground">$</span>
      <span className="text-fd-foreground">{command}</span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
