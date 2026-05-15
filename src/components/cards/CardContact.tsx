import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardContact({ user }: { user: PortfolioData }) {
  return (
    <div className="font-mono text-fg">
      <div className="mt-3.5">
        <SectionLabel>reach me</SectionLabel>
        <div className="grid gap-y-1 grid-cols-[auto_1fr] gap-x-10">
          <span className="text-muted">email</span>
          <a className="text-blue" href={`mailto:${user.email}`}>{user.email}</a>
          {user.github && <>
            <span className="text-muted">github</span>
            <a className="text-blue" href={user.github} target="_blank" rel="noreferrer">{user.github}</a>
          </>}
          {user.linkedin && <>
            <span className="text-muted">linkedin</span>
            <a className="text-blue" href={user.linkedin} target="_blank" rel="noreferrer">{user.linkedin}</a>
          </>}
          {user.cvUrl && <>
            <span className="text-muted">cv</span>
            <a className="text-blue" href={user.cvUrl} target="_blank" rel="noreferrer">download CV</a>
          </>}
        </div>
      </div>
    </div>
  );
}
