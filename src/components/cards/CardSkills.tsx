import type { PortfolioData, SkillGroup, SkillLang } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

function LangRow({ name, pct, level }: SkillLang) {
  const total = 22;
  const w = Math.round((pct / 100) * total);
  const levelColor =
    level === 'primary'    ? 'text-teal' :
    level === 'proficient' ? 'text-blue' :
                             'text-muted';
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)_auto] gap-x-3.5 items-center py-0.75">
      <span className="text-fg-bright truncate">{name}</span>
      <span className="min-w-0 overflow-hidden font-mono tracking-[1px]">
        <span className={levelColor}>{'━'.repeat(w)}</span>
        <span className="text-border-2">{'━'.repeat(total - w)}</span>
      </span>
      <span className={`whitespace-nowrap text-[10px] uppercase tracking-widest text-right ${levelColor}`}>
        {level}
      </span>
    </div>
  );
}

function SkillList({ items }: { items: string[] }) {
  return (
    <div className="text-[12.5px] text-fg-bright leading-[1.9] pl-0.5">
      {items.map((item, i) => (
        <span key={item}>
          <span>{item}</span>
          {i < items.length - 1 && <span className="text-muted mx-2.5">·</span>}
        </span>
      ))}
    </div>
  );
}


export default function CardSkills({ user }: { user: PortfolioData }) {
  return (
    <div className="font-mono text-fg">
      <div className="space-y-4.5">
        {user.skills.map((group) => (
          <div key={group.key}>
            <SectionLabel>{group.label}</SectionLabel>
            {'primary' in group ? (
              <>
                {group.primary.map((lang) => (
                  <LangRow key={lang.name} {...lang} />
                ))}
                {group.also.length > 0 && (
                  <div className="mt-2 text-[11.5px] text-muted pl-0.5">
                    <span className="text-dim mr-2">also</span>
                    {group.also.map((item, i) => (
                      <span key={item}>
                        <span>{item}</span>
                        {i < group.also.length - 1 && (
                          <span className="text-muted mx-2">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <SkillList items={group.items} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
