"use client";

import type { PortfolioData } from "@/types";

interface TitleBarProps {
  data: PortfolioData;
  sidebarOpen: boolean;
}

export default function TitleBar({ data, sidebarOpen }: TitleBarProps) {
  return (
    <div className="title-bar">
      {/* Window controls (macOS-style dots) */}
      <div className="title-bar-dots">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
      </div>

      {/* Center title */}
      <div className="title-bar-center">
        {data.username}@{data.hostname}:&nbsp;~/portfolio &mdash; zsh + tui
      </div>

      {/* Right shortcuts */}
      <div className="title-bar-right">
        <kbd>^B</kbd>
        <span>toggle sidebar</span>
        <span className="separator">·</span>
        <kbd>Tab</kbd>
        <span>cycle panes</span>
        <span className="separator">·</span>
        <kbd>↑↓</kbd>
        <span>history</span>
      </div>
    </div>
  );
}
