"use client";

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
    <div className={`py-1 px-2 border-b border-border flex items-center gap-1.5 text-[11px] shrink-0 ${activePanel === 1 ? "bg-surface" : "bg-transparent"}`}>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className=" size-10 rounded border border-border bg-surface text-fg cursor-pointer p-0 grid place-items-center text-center"
      >
        {collapsed ? "▸" : "◂"}
      </button>
      {!collapsed && (
        <>
          <span className="text-muted">[1]</span>
          <span className={activePanel === 1 ? "text-accent font-semibold" : "text-dim"}>
            Sections
          </span>
        </>
      )}
    </div>
  );
}

function SidebarItem({ label, icon, number, collapsed, isActive, isFocused, onClick }: {
  label: string; icon: string; number: number;
  collapsed: boolean; isActive: boolean; isFocused: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      title={collapsed ? `${number}. ${label}` : undefined}
      className={[
        "cursor-pointer rounded mb-1 flex items-center space-x-2",
        collapsed ? "py-2 px-0 gap-0 justify-center" : "py-1.5 px-2 gap-2 justify-start",
        isFocused ? "bg-accent/10 outline outline-1 outline-accent" : isActive ? "bg-surface" : "",
        isActive || isFocused ? "text-accent" : "text-dim",
      ].join(" ")}
      style={isFocused ? { outlineOffset: "-1px" } : undefined}
    >
      {!collapsed && (
        <span className={`w-2 text-accent ${isFocused ? "opacity-100" : "opacity-0"}`}>▶</span>
      )}
      <span className={`${collapsed ? "w-auto" : "w-3.5"} text-center ${isActive || isFocused ? "opacity-100" : "opacity-60"}`}>
        {icon}
      </span>
      {!collapsed && (
        <>
          <span>{label}</span>
          <span className="ml-auto text-muted">{number}</span>
        </>
      )}
    </div>
  );
}

function SidebarMeta({ user }: { user: PortfolioData }) {
  const keybind = useKeybinds();
  return (
    <>
      <div className="mt-3.5 text-muted text-[11px]">
        <div className="text-[10px] uppercase tracking-[0.1em]">stats</div>
        <div className="mt-1">
          projects <span className="text-accent">{user.stats.projects}</span>
        </div>
        <div>awards <span className="text-yellow">{user.stats.awards}</span></div>
        {user.stats.gpa !== "—" && (
          <div>gpa <span className="text-green">{user.stats.gpa}</span></div>
        )}
      </div>

      <div className="mt-3.5 text-muted text-[11px]">
        <div className="text-[10px] uppercase tracking-widest">macros</div>
        <div className="mt-1 flex flex-col gap-x-2 gap-y-0.5">
          <div>
            <kbd>{keybind.navUp.label}</kbd> <span>{keybind.navUp.description}</span>
          </div>
          <div>
            <kbd>{keybind.navDown.label}</kbd> <span>{keybind.navDown.description}</span>
          </div>
          <div>
            <kbd>{keybind.navBack.label}</kbd> <span>{keybind.navBack.description}</span>
          </div>
          <div>
            <kbd>{keybind.navOpen.label}</kbd> <span>{keybind.navOpen.description}</span>
          </div>
          <div>
            <kbd>1</kbd>-<kbd>8</kbd> <span>Select an item</span>
          </div>
          
        </div>
      </div>
    </>
  );
}
