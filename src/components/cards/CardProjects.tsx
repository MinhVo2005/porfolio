import type { PortfolioData } from "@/types";
import Tag from "./Tag";

type Props = { user: PortfolioData; onOpen: (name: string) => void };

export default function CardProjects({ user, onOpen }: Props) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">projects</div>
      <div className="text-muted text-[11px]">
        click a name or type <span className="text-magenta">open &lt;name&gt;</span>
      </div>
      <hr className="hr-dashed" />
      {user.projects.map((p) => (
        <div key={p.name} className="mb-2.5">
          <div className="flex items-baseline gap-2">
            <span
              className="text-accent cursor-pointer underline decoration-dotted underline-offset-[3px]"
              onClick={() => onOpen(p.name)}
            >
              {p.name}
            </span>
            {p.year && <span className="text-muted text-[11px]">({p.year})</span>}
          </div>
          <div className="text-dim text-xs mt-0.5">{p.description}</div>
          <div className="flex gap-1 flex-wrap mt-1">
            {p.tech.map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
