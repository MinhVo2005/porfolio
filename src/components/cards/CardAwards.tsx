import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardAwards({ user }: { user: PortfolioData }) {
  return (
    <div className="font-mono text-fg">
      <div className="space-y-[18px]">
        {user.awards.length === 0 ? (
          <div className="text-muted">No awards listed yet.</div>
        ) : (
          user.awards.map((a, i) => (
            <div key={i}>
              <SectionLabel>{a.issuer} · {a.year}</SectionLabel>
              <div><span className="text-yellow">★</span> <span className="text-fg-bright font-semibold">{a.name}</span></div>
              {a.description && <div className="text-muted text-[12px] mt-0.5">{a.description}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
