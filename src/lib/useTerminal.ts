import { useState, useEffect, useRef, useCallback } from "react";
import type { RefObject, ReactNode, KeyboardEvent } from "react";
import { CMD_LIST } from "@/lib/constants";
import type { HistoryEntry } from "@/types";

type CommandResult = { title: string; card: ReactNode } | null;

type TabState = { prefix: string | null; matches: string[]; idx: number };

type Options = {
  cardFor: (raw: string) => CommandResult;
  submitRef: RefObject<(raw: string) => void>;
  getArgCompletions: (cmd: string, argPrefix: string) => string[];
};

type TerminalState = {
  history:  HistoryEntry[];
  value:    string;
  setValue: (v: string) => void;
  submit:   (raw: string) => void;
  onKey:    (e: KeyboardEvent<HTMLInputElement>) => void;
  scrollerRef: RefObject<HTMLDivElement | null>;
  inputRef:    RefObject<HTMLInputElement | null>;
};

export function useTerminal({ cardFor, submitRef, getArgCompletions }: Options): TerminalState {
  const [history,  setHistory]  = useState<HistoryEntry[]>([]);
  const [value,    setValue]    = useState("");
  const [cmdHist,  setCmdHist]  = useState<string[]>([]);
  const [hIdx,     setHIdx]     = useState(-1);
  const [tab,      setTab]      = useState<TabState>({ prefix: null, matches: [], idx: 0 });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [history]);

  const submit = useCallback((raw: string) => {
    const trimmed = raw.trim();
    setValue("");
    if (trimmed === "clear") { setHistory([]); return; }
    if (trimmed) setCmdHist((h) => [trimmed, ...h.slice(0, 49)]);
    setHIdx(-1);
    const result = cardFor(trimmed);
    if (result) setHistory((prev) => [...prev, { input: trimmed, ...result }]);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [cardFor]);

  useEffect(() => { submitRef.current = submit; }, [submit, submitRef]);

  const onKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // Reset tab cycling on any non-Tab keypress (covers chars, backspace, arrows, Enter, etc.)
    if (e.key !== "Tab" && tab.prefix !== null) {
      setTab({ prefix: null, matches: [], idx: 0 });
    }

    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    } else if (e.key === "Tab") {
      e.preventDefault();

      if (tab.prefix === null) {
        // First Tab press — compute candidates
        const spaceIdx = value.indexOf(" ");
        let prefix: string;
        let candidates: string[];

        if (spaceIdx === -1) {
          // Completing a command name
          prefix = "";
          const lower = value.toLowerCase();
          candidates = CMD_LIST.filter((c) => c.startsWith(lower) && c !== lower);
        } else {
          // Completing an argument
          prefix = value.slice(0, spaceIdx + 1);
          const cmd = value.slice(0, spaceIdx).toLowerCase();
          const argPrefix = value.slice(spaceIdx + 1);
          candidates = getArgCompletions(cmd, argPrefix);
        }

        if (candidates.length === 0) return;

        const isCmd = prefix === "";
        setTab({ prefix, matches: candidates, idx: 0 });
        setValue(prefix + candidates[0] + (isCmd ? " " : ""));
      } else {
        // Subsequent Tab presses — cycle forward
        const next = (tab.idx + 1) % tab.matches.length;
        const isCmd = tab.prefix === "";
        setTab((t) => ({ ...t, idx: next }));
        setValue(tab.prefix + tab.matches[next] + (isCmd ? " " : ""));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHist.length) return;
      const ni = hIdx === -1 ? cmdHist.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setValue(cmdHist[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const ni = hIdx + 1;
      if (ni >= cmdHist.length) { setHIdx(-1); setValue(""); }
      else { setHIdx(ni); setValue(cmdHist[ni]); }
    }
  }, [value, tab, cmdHist, hIdx, submit, getArgCompletions]);

  return { history, value, setValue, submit, onKey, scrollerRef, inputRef };
}
