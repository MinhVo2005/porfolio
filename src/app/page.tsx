"use client";

import { useState, useEffect, useCallback } from "react";
import TitleBar from "@/components/TitleBar";
import Sidebar from "@/components/Sidebar";
import Terminal from "@/components/Terminal";
import { portfolio } from "@/lib/data";
import type { SectionId } from "@/types";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  // ^B toggles sidebar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSectionClick = useCallback((id: SectionId) => {
    setActiveSection(id);
  }, []);

  return (
    <div className="app">
      <TitleBar data={portfolio} sidebarOpen={sidebarOpen} />
      <div className="main-content">
        <Sidebar
          data={portfolio}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          className={sidebarOpen ? "" : "sidebar--hidden"}
        />
        <Terminal
          data={portfolio}
          onSectionChange={setActiveSection}
        />
      </div>
    </div>
  );
}
