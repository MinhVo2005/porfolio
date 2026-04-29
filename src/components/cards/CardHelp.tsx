"use client";

import { Fragment } from "react";
import type { KeybindAction } from "@/lib/keybinds";
import { useKeybinds } from "@/lib/useKeybinds";

const COMMANDS: [string, string][] = [
  ["help / man",     "this panel"],
  ["about",          "who I am"],
  ["whoami",         "one-line identity"],
  ["neofetch",       "system summary"],
  ["projects / ls",  "list all projects"],
  ["open / cat <n>", "view a project"],
  ["skills",         "languages & tools"],
  ["experience",     "work history"],
  ["education",      "academic background"],
  ["awards",         "recognitions"],
  ["contact",        "how to reach me"],
  ["cv",             "view / download CV"],
  ["pwd",            "current path"],
  ["echo <text>",    "print text"],
  ["setup <a> <k>",  "rebind a keybind action"],
  ["theme <name>",   "switch color theme"],
  ["vim",            "open vim (good luck)"],
  ["clear",          "clear output"],
];

const KB_ACTIONS: KeybindAction[] = [
  "switchPane",
  "toggleSidebar",
  "sectionJump",
  "navDown",
  "navUp",
  "navOpen",
  "navBack",
  "scrollUp",
  "scrollDown",
  "autocomplete",
  "historyPrev",
  "historyNext",
];

export default function CardHelp() {
  const keybinds = useKeybinds();

  return (
    <div className="grid grid-cols-2 gap-x-6">
      <div>
        <div className="text-accent font-semibold text-[13px] mb-1.5">commands</div>
        <div className="grid gap-y-0.5 grid-cols-[148px_1fr]">
          {COMMANDS.map(([c, d]) => (
            <Fragment key={c}>
              <span className="text-accent">{c}</span>
              <span className="text-muted">{d}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div>
        <div className="text-accent font-semibold text-[13px] mb-1.5">keybindings</div>
        <div className="grid gap-y-[3px] gap-x-2 items-center grid-cols-[100px_1fr]">
          {KB_ACTIONS.map((action) => {
            const def = keybinds[action];
            return (
              <Fragment key={action}>
                <kbd className="w-fit">{def.label}</kbd>
                <span className="text-muted">{def.description}</span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
