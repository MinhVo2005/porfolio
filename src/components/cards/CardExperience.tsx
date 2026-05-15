import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardExperience({ user }: { user: PortfolioData }) {
  if (!user.experience.length) return (
    <div className="text-muted">No experience entries yet.</div>
  );

  return (
    <div className="font-mono text-fg">
      <div className="space-y-[18px]">
        {user.experience.map((e, i) => (
          <div key={i}>
            <SectionLabel>{e.company}</SectionLabel>
            <div className="flex items-baseline gap-2">
              <span className="text-fg-bright font-semibold">{e.role}</span>
              <span className="text-dim">@</span>
              <span className="text-magenta">{e.company}</span>
              <span className="text-dim text-[11px] ml-auto">{e.period}</span>
            </div>
            <div className="text-muted text-[12px] mt-0.5">{e.description}</div>
            {e.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-0.5">
                {e.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-[12.5px]">
                    <span className="shrink-0">· </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
