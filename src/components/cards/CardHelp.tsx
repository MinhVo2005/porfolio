"use client";

import { Fragment } from "react";
import type { KeybindAction } from "@/lib/keybinds";
import { useKeybinds } from "@/lib/useKeybinds";
import SectionLabel from "@/components/ui/SectionLabel";

type CommandGroup = { label: string; commands: [string, string][] };

const COMMAND_GROUPS: CommandGroup[] = [
  {
    label: "about",
    commands: [
      ["about",    "who I am"],
      ["whoami",   "one-line identity"],
      ["neofetch", "system summary"],
    ],
  },
  {
    label: "projects",
    commands: [
      ["projects / ls",    "list all projects"],
      ["open <id>",        "view a project"],
      ["open <id> --show", "view project with image"],
    ],
  },
  {
    label: "sections",
    commands: [
      ["skills",     "languages & tools"],
      ["experience", "work history"],
      ["education",  "academic background"],
      ["awards",     "recognitions"],
      ["contact",    "how to reach me"],
      ["cv",         "view / download CV"],
    ],
  },
  {
    label: "system",
    commands: [
      ["help / man",    "this panel"],
      ["setup <a> <k>", "rebind a keybind"],
      ["theme <name>",  "switch color theme"],
      ["clear",         "clear output"],
    ],
  },
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
    <div className="flex gap-8 font-mono">
      <div className="flex-1 min-w-0 space-y-3">
        {COMMAND_GROUPS.map((group) => (
          <div key={group.label}>
            <SectionLabel>{group.label}</SectionLabel>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-0.5">
              {group.commands.map(([cmd, desc]) => (
                <Fragment key={cmd}>
                  <span className="text-accent whitespace-nowrap text-[12.5px]">{cmd}</span>
                  <span className="text-muted text-[12.5px]">{desc}</span>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0">
        <SectionLabel>keybindings</SectionLabel>
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-[3px] items-center">
          {KB_ACTIONS.map((action) => {
            const def = keybinds[action];
            return (
              <Fragment key={action}>
                <kbd className="w-fit whitespace-nowrap">{def.label}</kbd>
                <span className="text-muted whitespace-nowrap text-[12.5px]">{def.description}</span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
