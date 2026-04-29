export type KeyCombo = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  shift?: boolean;
};

export type KeybindDef = {
  combos: KeyCombo[];
  label: string;
  description: string;
};

export type KeybindAction =
  | "toggleSidebar"
  | "switchPane"
  | "scrollUp"
  | "scrollDown"
  | "navDown"
  | "navUp"
  | "navOpen"
  | "navBack"
  | "autocomplete"
  | "historyPrev"
  | "historyNext"
  | "sectionJump";

export const KEYBINDS: Record<KeybindAction, KeybindDef> = {
  toggleSidebar: {
    combos: [{ key: "b", ctrl: true }, { key: "b", meta: true },
      { key: "B", ctrl: true }, { key: "B", meta: true }
    ],
    label: "^B",
    description: "toggle sidebar",
  },
  switchPane: {
    combos: [{ key: "m", ctrl: true }, { key: "m", meta: true },
      { key: "M", ctrl: true }, { key: "M", meta: true }
    ],
    label: "^M",
    description: "switch pane",
  },
  scrollUp: {
    combos: [{ key: "u", ctrl: true },{ key: "U", ctrl: true }],
    label: "^U",
    description: "scroll up",
  },
  scrollDown: {
    combos: [{ key: "d", ctrl: true },{ key: "D", ctrl: true }],
    label: "^D",
    description: "scroll down",
  },
  navDown: {
    combos: [{ key: "j" },{ key: "J" }, { key: "ArrowDown" }],
    label: "j / ↓",
    description: "navigate down",
  },
  navUp: {
    combos: [{ key: "k" },{ key: "K" }, { key: "ArrowUp" }],
    label: "k / ↑",
    description: "navigate up",
  },
  navOpen: {
    combos: [{ key: "Enter" }, { key: "l" }],
    label: "Enter / l",
    description: "open in sidebar",
  },
  navBack: {
    combos: [{ key: "i" }, { key: "Escape" }],
    label: "i / Esc",
    description: "back to terminal",
  },
  autocomplete: {
    combos: [{ key: "Tab" }],
    label: "Tab",
    description: "autocomplete",
  },
  historyPrev: {
    combos: [{ key: "ArrowUp" }],
    label: "↑",
    description: "previous command",
  },
  historyNext: {
    combos: [{ key: "ArrowDown" }],
    label: "↓",
    description: "next command",
  },
  sectionJump: {
    combos: [],
    label: "1–8",
    description: "jump to section",
  },
};

export function matchesKeybind(
  e: KeyboardEvent,
  action: KeybindAction,
  keybinds: Record<KeybindAction, KeybindDef> = KEYBINDS,
): boolean {
  return keybinds[action].combos.some(
    (c) =>
      e.key === c.key &&
      !!e.ctrlKey  === !!c.ctrl  &&
      !!e.metaKey  === !!c.meta  &&
      !!e.altKey   === !!c.alt   &&
      !!e.shiftKey === !!c.shift,
  );
}

export const KEYBIND_ACTIONS = Object.keys(KEYBINDS) as KeybindAction[];
