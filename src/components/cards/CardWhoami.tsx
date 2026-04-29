import type { PortfolioData } from "@/types";

export default function CardWhoami({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">whoami</div>
      <hr className="hr-dashed" />
      <div className="text-[13px]">
        <span className="text-fg font-semibold">{user.name}</span>
        <span className="text-muted"> · </span>
        <span>{user.role}</span>
      </div>
      <div className="text-dim">{user.location}</div>
    </div>
  );
}
