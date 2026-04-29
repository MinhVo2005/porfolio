import type { PortfolioData } from "@/types";

export default function CardEducation({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">education</div>
      <hr className="hr-dashed" />
      {user.education.map((e, i) => (
        <div key={i} className="mb-2.5">
          <div><span className="text-accent font-semibold">{e.institution}</span></div>
          <div>{e.degree}</div>
          <div className="text-muted text-[11px]">{e.period}</div>
          {e.gpa && <div className="mt-1">GPA <span className="text-green font-semibold">{e.gpa}</span></div>}
        </div>
      ))}
    </div>
  );
}
