import { useCallback } from "react";
import type { RefObject } from "react";
import type { PortfolioData, SectionId } from "@/types";
import {
  CardAbout, CardWhoami, CardProjects, CardOpen, CardSkills,
  CardExperience, CardEducation, CardAwards, CardContact,
  CardCV, CardNeofetch, CardHelp, CardError, CardSetup, CardTheme,
} from "@/components/cards";
import { keybindStore } from "@/store/keybindStore";
import { KEYBIND_ACTIONS } from "@/lib/keybinds";
import { themeStore, THEMES, type ThemeName } from "@/store/themeStore";
import type { KeybindAction, KeybindDef, KeyCombo } from "@/lib/keybinds";

type CommandResult = { title: string; card: React.ReactNode } | null;

type Options = {
  user: PortfolioData | null;
  setActiveTab: (id: SectionId) => void;
  submitRef: RefObject<(raw: string) => void>;
};

function parseCombo(comboStr: string): KeyCombo | null {
  const parts = comboStr.toLowerCase().split("+");
  if (parts.length === 0) return null;
  const key = parts[parts.length - 1];
  if (!key) return null;
  const ctrl  = parts.includes("ctrl");
  const meta  = parts.includes("meta") || parts.includes("cmd");
  const alt   = parts.includes("alt");
  const shift = parts.includes("shift");
  return { key, ctrl: ctrl || undefined, meta: meta || undefined, alt: alt || undefined, shift: shift || undefined };
}

function comboLabel(combo: KeyCombo): string {
  const parts: string[] = [];
  if (combo.ctrl)  parts.push("^");
  if (combo.meta)  parts.push("⌘");
  if (combo.alt)   parts.push("⌥");
  if (combo.shift) parts.push("⇧");
  parts.push(combo.key.toUpperCase());
  return parts.join("");
}

function comboMatches(a: KeyCombo, b: KeyCombo): boolean {
  return (
    a.key === b.key &&
    !!a.ctrl  === !!b.ctrl  &&
    !!a.meta  === !!b.meta  &&
    !!a.alt   === !!b.alt   &&
    !!a.shift === !!b.shift
  );
}

export function useCommands({ user, setActiveTab, submitRef }: Options) {
  const cardFor = useCallback((raw: string): CommandResult => {
    if (!user) return null;
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");
    const onOpen = (n: string) => submitRef.current("open " + n);

    switch (cmd.toLowerCase()) {
      case "":
        return null;

      case "help": case "man":
        return { title: "help", card: <CardHelp /> };

      case "about":
        setActiveTab("about");
        return { title: "about", card: <CardAbout user={user} /> };

      case "whoami":
        return { title: "whoami", card: <CardWhoami user={user} /> };

      case "neofetch":
        return { title: "neofetch", card: <CardNeofetch user={user} /> };

      case "projects": case "ls":
        setActiveTab("projects");
        return { title: "projects", card: <CardProjects user={user} onOpen={onOpen} /> };

      case "open": case "cat":
        if (!arg) return { title: "error", card: <div><span className="c-red">usage:</span> {cmd} &lt;project name&gt;</div> };
        return { title: `${cmd} ${arg}`, card: <CardOpen user={user} name={arg} /> };

      case "skills":
        setActiveTab("skills");
        return { title: "skills", card: <CardSkills user={user} /> };

      case "experience":
        setActiveTab("experience");
        return { title: "experience", card: <CardExperience user={user} /> };

      case "education":
        setActiveTab("education");
        return { title: "education", card: <CardEducation user={user} /> };

      case "awards":
        setActiveTab("awards");
        return { title: "awards", card: <CardAwards user={user} /> };

      case "contact":
        setActiveTab("contact");
        return { title: "contact", card: <CardContact user={user} /> };

      case "cv":
        setActiveTab("cv");
        return { title: "cv", card: <CardCV user={user} /> };

      case "pwd":
        return { title: "pwd", card: <div className="c-dim">/home/{user.username}/portfolio</div> };

      case "echo":
        return { title: "echo", card: <div>{arg || ""}</div> };

      case "setup": {
        const err = (msg: string) => ({ title: "setup", card: <CardSetup success={false} message={msg} /> });

        const [actionName, comboStr] = arg.split(/\s+/, 2);
        if (!actionName || !comboStr)
          return err("usage: setup <action> <combo>  e.g. setup toggleSidebar ctrl+p");

        if (!(KEYBIND_ACTIONS as string[]).includes(actionName))
          return err(`unknown action: ${actionName}`);

        const combo = parseCombo(comboStr);
        if (!combo)
          return err(`invalid combo: ${comboStr}`);

        const currentKeybinds = keybindStore.getState().keybind;
        for (const action of KEYBIND_ACTIONS) {
          if (action === actionName) continue;
          if (currentKeybinds[action].combos.some((c) => comboMatches(c, combo)))
            return err(`conflict: ${comboStr} is already bound to ${action}`);
        }

        const label = comboLabel(combo);
        const existing = currentKeybinds[actionName as KeybindAction];
        const newDef: KeybindDef = {
          combos: [combo],
          label,
          description: existing.description,
        };
        keybindStore.getState().setKeybind(actionName as KeybindAction, newDef);
        return { title: "setup", card: <CardSetup success={true} message={`bound ${actionName} to ${comboStr}`} /> };
      }

      case "theme": {
        const name = arg.toLowerCase() as ThemeName;
        if (!arg) {
          const current = themeStore.getState().theme;
          return { title: "theme", card: <CardTheme current={current} /> };
        }
        if (!(THEMES as string[]).includes(name))
          return { title: "theme", card: <CardSetup success={false} message={`unknown theme: ${arg}. available: ${THEMES.join(", ")}`} /> };
        themeStore.getState().setTheme(name);
        return { title: "theme", card: <CardTheme current={name} switched={name} /> };
      }

      case "vim": case "nvim":
        return { title: cmd, card: (
          <div>
            <div className="c-red bold">you&apos;ve opened {cmd}.</div>
            <div className="c-dim" style={{ marginTop: 4 }}>good luck getting out.</div>
            <div style={{ marginTop: 4 }}>hint: type <span className="c-teal">:q</span> to escape.</div>
          </div>
        )};

      case ":q": case ":wq": case ":x": case ":qa": case ":qa!":
        return { title: "vim", card: <div className="c-green">successfully exited vim. welcome back.</div> };

      case "sudo":
        return { title: "sudo", card: <div><span className="c-red">permission denied.</span> nice try.</div> };

      case "exit":
        return { title: "exit", card: <div className="c-dim">you can&apos;t exit a portfolio. type <span className="c-magenta">help</span>.</div> };

      default:
        return { title: "error", card: <CardError cmd={cmd} /> };
    }
  }, [user, setActiveTab, submitRef]);

  return { cardFor };
}
