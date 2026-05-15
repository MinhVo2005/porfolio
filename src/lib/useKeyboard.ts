import { useEffect } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { SECTIONS } from "@/lib/sections";
import { matchesKeybind } from "@/lib/keybinds";
import type { KeybindAction } from "@/lib/keybinds";
import { keybindStore } from "@/store/keybindStore";
import type { SectionId } from "@/types";

type Options = {
  activePanel:     number;
  setActivePanel:  Dispatch<SetStateAction<number>>;
  sidebarFocus:    number;
  setSidebarFocus: Dispatch<SetStateAction<number>>;
  activeTab:       SectionId | null;
  collapsed:       boolean;
  setCollapsed:    Dispatch<SetStateAction<boolean>>;
  submit:          (raw: string) => void;
  scrollerRef:     RefObject<HTMLDivElement | null>;
  inputRef:        RefObject<HTMLInputElement | null>;
};

export function useKeyboard({
  activePanel, setActivePanel,
  sidebarFocus, setSidebarFocus,
  activeTab, setCollapsed,
  submit, scrollerRef, inputRef,
}: Options) {
  useEffect(() => {
    const goToTerminal = () => {
      setActivePanel(2);
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    const goToSidebar = () => {
      const idx = SECTIONS.findIndex((s) => s.key === activeTab);
      setSidebarFocus(idx >= 0 ? idx : 0);
      setActivePanel(1);
      inputRef.current?.blur();
    };

    // Read fresh keybinds on every keydown — no hook subscription needed
    const matches = (e: KeyboardEvent, action: KeybindAction) =>
      matchesKeybind(e, action, keybindStore.getState().keybind);

    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey) return;
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

      if (matches(e, "toggleSidebar")) {
        e.preventDefault();
        setCollapsed((c) => !c);
        return;
      }

      if (matches(e, "switchPane")) {
        e.preventDefault();
        activePanel === 2 ? goToSidebar() : goToTerminal();
        return;
      }

      if (matches(e, "scrollUp") || matches(e, "scrollDown")) {
        e.preventDefault();
        if (scrollerRef.current)
          scrollerRef.current.scrollTop += matches(e, "scrollDown") ? 180 : -180;
        return;
      }

      if (isInput) return;

      if (matches(e, "navBack")) {
          e.preventDefault();
          goToTerminal();
          return;
      }

      // ── Sidebar navigation ──────────────────────────────────────
      if (activePanel === 1) {
        if (matches(e, "navDown")) {
          e.preventDefault();
          setSidebarFocus((f) => Math.min(f + 1, SECTIONS.length - 1));
          return;
        }
        if (matches(e, "navUp")) {
          e.preventDefault();
          setSidebarFocus((f) => Math.max(f - 1, 0));
          return;
        }
        if (matches(e, "navOpen")) {
          e.preventDefault();
          const s = SECTIONS[sidebarFocus];
          if (s) { submit(s.cmd); goToTerminal(); }
          return;
        }
      }

      // 1–8 — jump to section from either pane
      const n = parseInt(e.key);
      if (n >= 1 && n <= 8 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const s = SECTIONS[n - 1];
        if (s) {
          setSidebarFocus(n - 1);
          submit(s.cmd);
          goToTerminal();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activePanel, sidebarFocus, activeTab, submit, setActivePanel, setSidebarFocus, setCollapsed, scrollerRef, inputRef]);
}
