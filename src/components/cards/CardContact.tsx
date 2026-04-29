import type { PortfolioData } from "@/types";

export default function CardContact({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">contact</div>
      <hr className="hr-dashed" />
      <div className="grid gap-y-1 grid-cols-[80px_1fr]">
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
        <span className="text-muted">location</span>
        <span>{user.location}</span>
        {user.cvUrl && <>
          <span className="text-muted">cv</span>
          <a className="text-blue" href={user.cvUrl} target="_blank" rel="noreferrer">download CV</a>
        </>}
      </div>
    </div>
  );
}
