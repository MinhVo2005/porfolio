"use client";

import { Fragment } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { PortfolioData, SectionId } from "@/types";
import { SECTIONS } from "@/lib/sections";
import { useKeybinds } from "@/lib/useKeybinds";

type Props = {
  user:            PortfolioData;
  collapsed:       boolean;
  onToggle:        () => void;
  activeTab:       SectionId | null;
  activePanel:     number;
  onPanelClick:    () => void;
  sidebarFocus:    number;
  setSidebarFocus: Dispatch<SetStateAction<number>>;
  submit:          (raw: string) => void;
  inputRef:        RefObject<HTMLInputElement | null>;
};

export default function Sidebar({
  user, collapsed, onToggle,
  activeTab, activePanel, onPanelClick,
  sidebarFocus, setSidebarFocus,
  submit, inputRef,
}: Props) {
  const goToTerminal = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div
      onClick={onPanelClick}
      className={`border rounded-md bg-panel flex flex-col overflow-hidden min-w-0 ${activePanel === 1 ? "border-accent" : "border-border"}`}
    >
      <SidebarHeader collapsed={collapsed} activePanel={activePanel} onToggle={onToggle} />

      <div className={`flex-1 overflow-y-auto min-h-0 ${collapsed ? "py-1.5 px-1" : "px-3 py-2"}`}>
        {SECTIONS.map((s, i) => {
          const isActive  = activeTab === s.key;
          const isFocused = activePanel === 1 && sidebarFocus === i;
          return (
            <SidebarItem
              key={s.key}
              label={s.label}
              icon={s.icon}
              number={i + 1}
              collapsed={collapsed}
              isActive={isActive}
              isFocused={isFocused}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarFocus(i);
                submit(s.cmd);
                goToTerminal();
              }}
            />
          );
        })}
        {!collapsed && <SidebarMeta user={user} />}
      </div>
    </div>
  );
}

function SidebarHeader({ collapsed, activePanel, onToggle }: {
  collapsed: boolean; activePanel: number; onToggle: () => void;
}) {
  return (
    <div className={`py-1 px-2 border-b border-border flex items-center gap-1.5 text-[11px] shrink-0 ${activePanel === 1 ? "bg-surface" : "bg-transparent"} ${collapsed ? "justify-center" : "justify-between"}`}>
      {!collapsed && (
        <>
          <span className="text-muted">[1]</span>
          <span className={activePanel === 1 ? "text-accent font-semibold" : "text-dim"}>
            Sections
          </span>
        </>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="size-10 rounded border border-border bg-surface text-fg cursor-pointer p-0 grid place-items-center"
      >
        {collapsed ? "▸" : "◂"}
      </button>
    </div>
  );
}

function SidebarItem({ label, icon, number, collapsed, isActive, isFocused, onClick }: {
  label: string; icon: string; number: number;
  collapsed: boolean; isActive: boolean; isFocused: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const color = isActive || isFocused ? "text-accent" : "text-dim";

  if (collapsed) {
    return (
      <div
        onClick={onClick}
        title={`${number}. ${label}`}
        className={`cursor-pointer rounded mb-1 py-2 flex justify-center items-center ${isFocused ? "bg-accent/10 outline outline-1 outline-accent" : isActive ? "bg-surface" : ""} ${color}`}
        style={isFocused ? { outlineOffset: "-1px" } : undefined}
      >
        <span className={isActive || isFocused ? "opacity-100" : "opacity-60"}>{icon}</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded mb-1 py-1.5 px-2 grid grid-cols-[16px_1fr_auto_12px] items-center gap-x-2 ${isFocused ? "bg-accent/10 outline outline-1 outline-accent" : isActive ? "bg-surface" : ""} ${color}`}
      style={isFocused ? { outlineOffset: "-1px" } : undefined}
    >
      <span className={`text-center text-[13px] ${isActive || isFocused ? "opacity-100" : "opacity-60"}`}>{icon}</span>
      <span>{label}</span>
      <span className="text-muted text-[11px]">{number}</span>
      <span className={`text-accent text-center ${isFocused ? "opacity-100" : "opacity-0"}`}>↵</span>
    </div>
  );
}

function SidebarMeta({ user }: { user: PortfolioData }) {
  const keybind = useKeybinds();

  const macros: [string, string][] = [
    [keybind.navUp.label,   "move up"],
    [keybind.navDown.label, "move down"],
    [keybind.navBack.label, "terminal"],
    [keybind.navOpen.label, "open"],
    ["1–8",                 "jump to §"],
  ];

  return (
    <div className="mt-3 text-[11px] text-muted">
      {/* divider */}
      <div className="flex items-center gap-2 my-2">
        <span className="text-[9px] uppercase tracking-[0.16em] text-muted whitespace-nowrap">stats</span>
        <span className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-0.5">
        <div>projects <span className="text-accent">{user.stats.projects}</span></div>
        <div>awards <span className="text-yellow">{user.stats.awards}</span></div>
        {user.stats.gpa !== "—" && (
          <div>gpa <span className="text-green">{user.stats.gpa}</span></div>
        )}
      </div>

      <div className="flex items-center gap-2 my-2">
        <span className="text-[9px] uppercase tracking-[0.16em] text-muted whitespace-nowrap">macros</span>
        <span className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 items-center">
        {macros.map(([key, desc]) => (
          <Fragment key={key}>
            <kbd className="w-fit whitespace-nowrap">{key}</kbd>
            <span className="truncate text-muted">{desc}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
