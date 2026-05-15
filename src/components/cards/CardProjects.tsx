import React from "react";
import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = { user: PortfolioData; onOpen: (name: string) => void };

function statusDot(status: string) {
  if (status === "RUNNING")  return <span className="text-green text-[24px]!">•</span>;
  if (status === "SHIPPED")  return <span className="text-yellow text-[24px]!">•</span>;
  return <span className="text-dim text-[24px]!">•</span>;
}

export default function CardProjects({ user, onOpen }: Props) {
  return (
    <div>
      <div className="text-muted mb-2 text-[15px]!">
        click a row, or type <span className="text-magenta text-[15px]!">open &lt;id&gt;</span>
      </div>
      <SectionLabel>projects</SectionLabel>

      <div
        className="grid gap-x-4 gap-y-1"
        style={{ gridTemplateColumns: "max-content max-content 1fr" }}
      >
        {user.projects.map((p) => (
          <React.Fragment key={p.name}>
            <span className="flex items-center gap-1.5">
              {statusDot(p.status)}
              <span
                className="text-accent cursor-pointer underline decoration-dotted underline-offset-[3px]"
                onClick={() => onOpen(p.name)}
              >
                {p.name}
              </span>
            </span>
            <span className="text-magenta flex items-center">[{p.category}]</span>
            <span className="text-muted flex items-center">{p.description}</span>
          </React.Fragment>
        ))}
      </div>

      <SectionLabel>legend</SectionLabel>
      <div className="flex gap-4 text-dim">
        <span><span className="text-green">•</span> running</span>
        <span><span className="text-yellow">•</span> shipped</span>
        <span><span className="text-dim">•</span> archived</span>
      </div>
    </div>
  );
}
