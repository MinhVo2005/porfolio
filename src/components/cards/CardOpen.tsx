import type { PortfolioData } from "@/types";
import Tag from "./Tag";

type Props = { user: PortfolioData; name: string };

export default function CardOpen({ user, name }: Props) {
  const p = user.projects.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));

  if (!p) return (
    <div>
      <div className="text-red font-semibold">error</div>
      <hr className="hr-dashed" />
      <div>no project matching <span className="text-accent">&quot;{name}&quot;</span>. try <span className="text-magenta">projects</span>.</div>
    </div>
  );

  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">{p.name}</div>
      {p.year && <div className="text-dim text-[11px]">{p.year}</div>}
      <hr className="hr-dashed" />
      {p.tech.length > 0 && (
        <>
          <div className="text-muted text-[10px] uppercase tracking-[0.1em]">stack</div>
          <div className="flex gap-1.5 flex-wrap mt-1">
            {p.tech.map((t) => <Tag key={t} label={t} />)}
          </div>
          <hr className="hr-dashed" />
        </>
      )}
      <div className="text-muted text-[10px] uppercase tracking-[0.1em]">summary</div>
      <div className="mt-1">{p.description}</div>
      {p.url && (
        <div className="mt-2">
          <span className="text-muted">url: </span>
          <a className="text-blue" href={p.url} target="_blank" rel="noreferrer">{p.url}</a>
        </div>
      )}
    </div>
  );
}
