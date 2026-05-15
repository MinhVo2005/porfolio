import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardWhoami({ user }: { user: PortfolioData }) {
  return (
    <div>
      <SectionLabel>identity</SectionLabel>
      <div className="">
        <span className="text-fg font-semibold">{user.name}</span>
        <span className="text-muted"> · </span>
        <span>{user.role}</span>
        <span className="text-muted"> · </span>
        <span>{user.education[0].institution}</span>
      </div>
      <div className="text-dim">{user.location}</div>
    </div>
  );
}
