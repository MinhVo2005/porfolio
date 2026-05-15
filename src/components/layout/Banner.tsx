"use client";

import type { PortfolioData } from "@/types";
import { useKeybinds } from "@/lib/useKeybinds";

export default function Banner({ user }: { user: PortfolioData }) {
  const keybind = useKeybinds();
  return (
    <div className="mb-3.5">
      <pre
        className="text-accent m-0 leading-[1.2]"
        style={{ fontFamily: '"Courier New", Courier, monospace' }}
      >{user.banner}</pre>
      <div className="text-muted mt-1">
        ────────────────────────────────────────────────────
      </div>
      <div className="mt-1.5 ">
        {/*Hard-coded, to be changed */}
        <span className="text-yellow text-[15px]!">{user.role} </span>
        <span className="text-[15px]!">@ {user.education[0].institution}</span>
        <span className="text-muted text-[15px]!"> · </span>
        <span className="text-dim text-[15px]!">{user.location}</span>
      </div>
      <div className="mt-1 text-[15px]!">
        <span className="text-yellow text-[15px]!">Welcome.</span>{" "}
        Press <kbd>i</kbd> to start typing.
      </div>
      <div className="mt-1 text-[15px]!">
        Type <kbd>help</kbd>, click a tab, or press <kbd>1</kbd>–<kbd>8</kbd>
      </div>
      <div className="mt-0.75 text-muted text-[15px]!">
        <kbd>{keybind.switchPane.label}</kbd> switch panes · <kbd>{keybind.navUp.label} | {keybind.navDown.label}</kbd> navigate sidebar · <kbd>{keybind.autocomplete.label}</kbd> autocomplete · <kbd>clear</kbd> wipes output
      </div>
    </div>
  );
}
