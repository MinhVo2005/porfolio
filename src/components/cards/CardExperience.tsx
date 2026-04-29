import type { PortfolioData } from "@/types";

export default function CardExperience({ user }: { user: PortfolioData }) {
  if (!user.experience.length) return (
    <div>
      <div className="text-accent font-semibold text-[15px]">work experience</div>
      <hr className="hr-dashed" />
      <div className="text-muted">No experience entries yet.</div>
    </div>
  );

  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">work experience</div>
      <hr className="hr-dashed" />
      {user.experience.map((e, i) => (
        <div key={i} className="mb-3">
          <div>
            <span className="text-accent font-semibold">{e.role}</span>
            <span className="text-muted"> @ </span>
            <span className="text-magenta">{e.company}</span>
          </div>
          <div className="text-muted text-[11px]">{e.period}</div>
          <div className="mt-1">{e.description}</div>
        </div>
      ))}
    </div>
  );
}
