"use client";

import type { PortfolioData, SectionId, SidebarSection } from "@/types";

const SECTIONS: SidebarSection[] = [
  { id: "about",      label: "About",      number: 1, icon: "✦" },
  { id: "projects",   label: "Projects",   number: 2, icon: "›" },
  { id: "skills",     label: "Skills",     number: 3, icon: "✦" },
  { id: "experience", label: "Experience", number: 4, icon: "⊞" },
  { id: "education",  label: "Education",  number: 5, icon: "✦" },
  { id: "awards",     label: "Awards",     number: 6, icon: "★" },
  { id: "contact",    label: "Contact",    number: 7, icon: "✉" },
  { id: "cv",         label: "CV",         number: 8, icon: "≡" },
];

interface SidebarProps {
  data: PortfolioData;
  activeSection: SectionId | null;
  onSectionClick: (id: SectionId) => void;
  className?: string;
}

export default function Sidebar({
  data,
  activeSection,
  onSectionClick,
  className = "",
}: SidebarProps) {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      {/* Sections header */}
      <div className="sidebar-header">
        <span className="sidebar-header-icon">✦</span>
        <span className="sidebar-header-label">[1] Sections</span>
        <kbd className="sidebar-header-kbd">^B</kbd>
      </div>

      {/* Section list */}
      <nav className="sidebar-nav">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`sidebar-item ${activeSection === section.id ? "sidebar-item--active" : ""}`}
            onClick={() => onSectionClick(section.id)}
          >
            <span className="sidebar-item-icon">{section.icon}</span>
            <span className="sidebar-item-label">{section.label}</span>
            <span className="sidebar-item-number">{section.number}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="sidebar-section-divider">STATS</div>
      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <span className="sidebar-stat-key">projects</span>
          <span className="sidebar-stat-value">{data.stats.projects}</span>
        </div>
        <div className="sidebar-stat">
          <span className="sidebar-stat-key">awards</span>
          <span className="sidebar-stat-value">{data.stats.awards}</span>
        </div>
        <div className="sidebar-stat">
          <span className="sidebar-stat-key">gpa</span>
          <span className="sidebar-stat-value sidebar-stat-value--accent">
            {data.stats.gpa}
          </span>
        </div>
      </div>

      {/* Macros */}
      <div className="sidebar-section-divider">MACROS</div>
      <div className="sidebar-macros">
        <div className="sidebar-macro">
          <kbd>^B</kbd>
          <span>toggle sidebar</span>
        </div>
        <div className="sidebar-macro">
          <kbd>Tab</kbd>
          <span>cycle pane</span>
        </div>
      </div>
    </aside>
  );
}
