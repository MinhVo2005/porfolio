import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";
import type { PortfolioData, HistoryEntry } from "@/types";
import Panel from "@/components/ui/Panel";
import Prompt from "@/components/ui/Prompt";
import Banner from "@/components/layout/Banner";
import { useKeybinds } from "@/lib/useKeybinds";

type Props = {
  user:           PortfolioData;
  history:        HistoryEntry[];
  value:          string;
  setValue:       (v: string) => void;
  onKey:          (e: KeyboardEvent<HTMLInputElement>) => void;
  activePanel:    number;
  setActivePanel: Dispatch<SetStateAction<number>>;
  scrollerRef:    RefObject<HTMLDivElement | null>;
  inputRef:       RefObject<HTMLInputElement | null>;
};

export default function Terminal({
  user, history, value, setValue, onKey,
  activePanel, setActivePanel,
  scrollerRef, inputRef,
}: Props) {
  return (
    <div
      onClick={() => { setActivePanel(2); inputRef.current?.focus(); }}
      className={`border rounded-md bg-panel flex flex-col overflow-hidden min-h-0 ${activePanel === 2 ? "border-accent" : "border-border"}`}
    >
      <TerminalHeader activePanel={activePanel} />

      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto p-3 cursor-text min-h-0"
      >
        <Banner user={user} />

        {history.map((entry, i) => (
          <HistoryItem key={i} entry={entry} user={user} />
        ))}

        <div className="flex items-center">
          <Prompt username={user.username} hostname={user.hostname} />
          <input
            ref={inputRef}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            onFocus={() => setActivePanel(2)}
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
            className="flex-1 bg-transparent border-none outline-none text-fg font-mono text-[13px] caret-accent"
          />
        </div>
      </div>
    </div>
  );
}

function TerminalHeader({ activePanel }: { activePanel: number }) {
  const keybind = useKeybinds();
  return (
    <div className={`py-1 px-2.5 border-b border-border flex items-center gap-2 text-[11px] shrink-0 ${activePanel === 2 ? "bg-surface" : "bg-transparent"}`}>
      <span className="text-muted">[2]</span>
      <span className={activePanel === 2 ? "text-accent font-semibold" : "text-dim"}>
        Terminal
      </span>
      {activePanel === 1 && (
        <span className="text-muted text-[10px] ml-1">
          — press <kbd>{keybind.scrollUp.label}</kbd> or <kbd>{keybind.navBack.label}</kbd> to type
        </span>
      )}
      <span className="ml-auto text-muted text-[10px]">zsh · utf-8</span>
    </div>
  );
}

function HistoryItem({ entry, user }: { entry: HistoryEntry; user: PortfolioData }) {
  return (
    <div className="mb-3">
      <div className="flex items-center mb-1.5">
        <Prompt username={user.username} hostname={user.hostname} />
        <span className="text-fg">{entry.input}</span>
      </div>
      <Panel title={entry.title}>{entry.card}</Panel>
    </div>
  );
}
