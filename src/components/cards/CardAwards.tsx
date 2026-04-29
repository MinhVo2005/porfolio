import type { PortfolioData } from "@/types";

export default function CardAwards({ user }: { user: PortfolioData }) {
  if (!user.awards.length) return (
    <div>
      <div className="text-accent font-semibold text-[15px]">awards</div>
      <hr className="hr-dashed" />
      <div className="text-muted">No awards listed yet.</div>
    </div>
  );

  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">awards</div>
      <hr className="hr-dashed" />
      {user.awards.map((a, i) => (
        <div key={i} className="mb-2">
          <div><span className="text-yellow">★</span> <span className="text-fg font-semibold">{a.name}</span></div>
          <div className="text-muted text-[11px] ml-4">{a.issuer} · {a.year}</div>
          {a.description && <div className="ml-4 mt-0.5">{a.description}</div>}
        </div>
      ))}
    </div>
  );
}
