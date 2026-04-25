"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import type { PortfolioData, SectionId, TerminalLine } from "@/types";
import { runCommand } from "@/lib/commands";

const ASCII_BANNER = `
 ██╗   ██╗ ██████╗ ██╗   ██╗██████╗
 ╚██╗ ██╔╝██╔═══██╗██║   ██║██╔══██╗
  ╚████╔╝ ██║   ██║██║   ██║██████╔╝
   ╚██╔╝  ██║   ██║██║   ██║██╔══██╗
    ██║   ╚██████╔╝╚██████╔╝██║  ██║
    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
 ███╗   ██╗ █████╗ ███╗   ███╗███████╗
 ████╗  ██║██╔══██╗████╗ ████║██╔════╝
 ██╔██╗ ██║███████║██╔████╔██║█████╗
 ██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝
 ██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗
 ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
`.trim();

function makeId() {
  return Math.random().toString(36).slice(2);
}

function makeLine(
  content: string,
  type: TerminalLine["type"] = "output"
): TerminalLine {
  return { id: makeId(), type, content };
}

function buildWelcome(data: PortfolioData): TerminalLine[] {
  return [
    makeLine(ASCII_BANNER, "banner"),
    makeLine(""),
    makeLine(
      `${data.name} · ${data.role} · ${data.location}`
    ),
    makeLine(
      `Welcome. Type help , or click a tab on the left. Try about, projects, skills, open github.`
    ),
    makeLine(
      `  Tab  autocomplete  ·  ↑↓  history  ·  ^B  toggle sidebar  ·  clear  wipes output (banner stays).`
    ),
    makeLine(""),
  ];
}

interface TerminalProps {
  data: PortfolioData;
  onSectionChange: (id: SectionId) => void;
}

export default function Terminal({ data, onSectionChange }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(() => buildWelcome(data));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const sectionCommandMap: Record<string, SectionId> = {
    about: "about",
    projects: "projects",
    skills: "skills",
    experience: "experience",
    education: "education",
    awards: "awards",
    contact: "contact",
    cv: "cv",
  };

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const inputLine = makeLine(
        `${data.username}@${data.hostname}:~/portfolio$ ${trimmed}`,
        "input"
      );

      if (trimmed === "clear") {
        setLines(buildWelcome(data));
        setInput("");
        return;
      }

      const result = runCommand(trimmed, data);
      const outputLines = result
        ? result.map((l) => ({ ...l, id: makeId() }))
        : [];

      setLines((prev) => [...prev, inputLine, ...outputLines]);

      // Update history
      if (trimmed) {
        setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);
      }

      // Sync sidebar active section
      const cmd = trimmed.split(/\s+/)[0].toLowerCase();
      if (sectionCommandMap[cmd]) {
        onSectionChange(sectionCommandMap[cmd] as SectionId);
      }

      setInput("");
    },
    [data, onSectionChange] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        submit(input);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(next);
        setInput(history[next] ?? "");
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = historyIndex - 1;
        if (next < 0) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(next);
          setInput(history[next] ?? "");
        }
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const commands = [
          "about",
          "projects",
          "skills",
          "experience",
          "education",
          "awards",
          "contact",
          "open",
          "clear",
          "help",
        ];
        const match = commands.find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    },
    [input, history, historyIndex, submit]
  );

  return (
    <div className="terminal" onClick={handleTerminalClick}>
      {/* Output area */}
      <div className="terminal-output">
        {lines.map((line) => (
          <TerminalLineView key={line.id} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="terminal-input-row">
        <span className="terminal-prompt">
          {data.username}@{data.hostname}:~/portfolio$
        </span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          aria-label="terminal input"
        />
      </div>
    </div>
  );
}

function TerminalLineView({ line }: { line: TerminalLine }) {
  if (line.type === "banner") {
    return <pre className="terminal-banner">{line.content}</pre>;
  }

  if (line.type === "input") {
    return (
      <div className="terminal-line terminal-line--input">{line.content}</div>
    );
  }

  if (line.type === "error") {
    return (
      <div className="terminal-line terminal-line--error">{line.content}</div>
    );
  }

  if (line.type === "welcome") {
    return (
      <div className="terminal-line terminal-line--welcome">{line.content}</div>
    );
  }

  return <div className="terminal-line">{line.content}</div>;
}
