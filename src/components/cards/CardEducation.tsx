import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardEducation({ user }: { user: PortfolioData }) {
  return (
    <div className="font-mono text-fg">
      <div className="space-y-[18px]">
        {user.education.map((e, i) => (
          <div key={i}>
            <SectionLabel>{e.institution}</SectionLabel>
            <div className=" flex justify-between">
               <div className="text-[12.5px] mt-0.5">
              <span>{e.degree} {e.field}</span>
              {e.minor && (
                <>
                  <span className="text-dim"> · </span>
                  <span className="text-muted">minor in {e.minor}</span>
                </>
              )}
            </div>
            <div className="mt-0.5 text-dim">{e.period}</div>
            </div>
           
            {e.gpa && (
              <div className="text-[12px] mt-1">
                GPA: <span className=" font-semibold">{e.gpa}/4.00</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
