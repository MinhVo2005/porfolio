"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUserStore } from "@/store/userStore";
import { useCommands } from "@/lib/useCommands";
import { useTerminal } from "@/lib/useTerminal";
import { useKeyboard } from "@/lib/useKeyboard";
import { useTheme } from "@/lib/useTheme";
import TitleBar  from "@/components/layout/TitleBar";
import Sidebar   from "@/components/layout/Sidebar";
import Terminal  from "@/components/layout/Terminal";
import { SECTIONS } from "@/lib/sections";
import { KEYBIND_ACTIONS } from "@/lib/keybinds";
import { THEMES } from "@/store/themeStore";
import type { SectionId } from "@/types";

export default function Home() {
  const user      = useUserStore((s) => s.user);
  const fetchUser = useUserStore((s) => s.fetchUser);

  const [collapsed,    setCollapsed]    = useState(false);
  const [activeTab,    setActiveTab]    = useState<SectionId | null>(null);
  const [activePanel,  setActivePanel]  = useState(2);
  const [sidebarFocus, setSidebarFocus] = useState(0);

  const submitRef = useRef<(raw: string) => void>(() => {});

  useEffect(() => { fetchUser(); }, [fetchUser]);
  useTheme();

  const { cardFor } = useCommands({ user, setActiveTab, submitRef });

  const getArgCompletions = useCallback((cmd: string, argPrefix: string): string[] => {
    const p = argPrefix.toLowerCase();
    if (cmd === "open" || cmd === "cat") {
      return (user?.projects ?? []).map((proj) => proj.name.toLowerCase()).filter((n) => n.startsWith(p));
    }
    if (cmd === "setup") {
      return (KEYBIND_ACTIONS as string[]).filter((a) => a.startsWith(argPrefix));
    }
    if (cmd === "theme") {
      return (THEMES as string[]).filter((t) => t.startsWith(argPrefix));
    }
    return [];
  }, [user]);

  const terminal = useTerminal({ cardFor, submitRef, getArgCompletions });

  useKeyboard({
    activePanel,  setActivePanel,
    sidebarFocus, setSidebarFocus,
    activeTab,
    collapsed,    setCollapsed,
    submit:      terminal.submit,
    scrollerRef: terminal.scrollerRef,
    inputRef:    terminal.inputRef,
  });

  if (!user) return <div className="text-dim p-5">loading...</div>;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-base">
      <TitleBar user={user} />

      <div
        className="flex-1 grid gap-2 p-2 min-h-0"
        style={{
          gridTemplateColumns: collapsed ? "54px 1fr" : "240px 1fr",
          transition: "grid-template-columns 180ms ease",
        }}
      >
        <Sidebar
          user={user}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeTab={activeTab}
          activePanel={activePanel}
          onPanelClick={() => {
            const idx = sectionIdx(activeTab);
            setSidebarFocus(idx);
            setActivePanel(1);
            terminal.inputRef.current?.blur();
          }}
          sidebarFocus={sidebarFocus}
          setSidebarFocus={setSidebarFocus}
          submit={terminal.submit}
          inputRef={terminal.inputRef}
        />

        <Terminal
          user={user}
          history={terminal.history}
          value={terminal.value}
          setValue={terminal.setValue}
          onKey={terminal.onKey}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          scrollerRef={terminal.scrollerRef}
          inputRef={terminal.inputRef}
        />
      </div>
    </div>
  );
}

function sectionIdx(activeTab: SectionId | null) {
  const idx = SECTIONS.findIndex((s) => s.key === activeTab);
  return idx >= 0 ? idx : 0;
}
