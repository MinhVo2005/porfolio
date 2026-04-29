import { useState, useEffect } from "react";
import { keybindStore } from "@/store/keybindStore";
import type { KeybindAction, KeybindDef } from "@/lib/keybinds";

export function useKeybinds(): Record<KeybindAction, KeybindDef> {
  const [keybinds, setKeybinds] = useState(() => keybindStore.getState().keybind);

  useEffect(() => {
    return keybindStore.subscribe((state) => {
      setKeybinds(state.keybind);
    });
  }, []);

  return keybinds;
}
