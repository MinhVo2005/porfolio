import type { PortfolioData } from "@/types";
import Tag from "./Tag";

export default function CardSkills({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">skills</div>
      <hr className="hr-dashed" />
      {user.skills.map((s) => (
        <div key={s.category} className="mb-2.5">
          <div className="text-muted text-[10px] uppercase tracking-[0.1em]">{s.category}</div>
          <div className="flex gap-1.5 flex-wrap mt-1">
            {s.items.map((item) => <Tag key={item} label={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
