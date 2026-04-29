import type { PortfolioData } from "@/types";
import { useKeybinds } from "@/lib/useKeybinds";
const Dot = ({ color }: { color: string }) => (
  <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }} />
);

export default function TitleBar({ user }: { user: PortfolioData }) {
  const keybind = useKeybinds();
  return (
    <div className="flex items-center justify-between bg-titlebar border-b border-border h-9 px-3 shrink-0">
      <div className="flex gap-1.5 items-center">
        <Dot color="#ff5f57" />
        <Dot color="#febc2e" />
        <Dot color="#28c840" />
      </div>

      <div className="text-dim text-xs">
        {user.username}@{user.hostname}: ~
      </div>

      <div className="flex items-center gap-1.5 text-muted text-[11px]">
        <kbd>{keybind.toggleSidebar.label}</kbd> toggle sidebar
        <span className="text-border">·</span>
        <kbd>{keybind.switchPane.label}</kbd> cycle panes
        <span className="text-border">·</span>
        <kbd>↑↓</kbd> history
      </div>
    </div>
  );
}
