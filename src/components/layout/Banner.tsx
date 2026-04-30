"use client";

import type { PortfolioData } from "@/types";
import { useKeybinds } from "@/lib/useKeybinds";

export default function Banner({ user }: { user: PortfolioData }) {
  const keybind = useKeybinds();
  return (
    <div className="mb-3.5">
      <pre
        className="text-accent m-0 text-[11px] leading-[1.15]"
        style={{ fontFamily: '"Courier New", Courier, monospace' }}
      >{user.banner}</pre>
      <div className="text-muted mt-1">
        ────────────────────────────────────────────────────
      </div>
      <div className="mt-1.5">
        <span className="text-yellow font-semibold">{user.name}</span>
        <span className="text-muted"> · </span>
        <span>{user.role}</span>
        <span className="text-muted"> · </span>
        <span className="text-dim">{user.location}</span>
      </div>
      <div className="mt-1">
        <span className="text-yellow">Welcome.</span>{" "}
        Type <kbd>help</kbd>, click a tab, or press <kbd>1</kbd>–<kbd>8</kbd>.
      </div>
      <div className="mt-0.75 text-muted text-[11px]">
        <kbd>{keybind.switchPane.label}</kbd> switch panes · <kbd>{keybind.navUp.label} | {keybind.navDown.label}</kbd> navigate sidebar · <kbd>{keybind.autocomplete.label}</kbd> autocomplete · <kbd>clear</kbd> wipes output
      </div>
    </div>
  );
}
