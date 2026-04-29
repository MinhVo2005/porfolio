import type { PortfolioData } from "@/types";

export default function CardCV({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">cv</div>
      <hr className="hr-dashed" />
      {user.cvUrl ? (
        <div className="mt-1">
          <span className="text-green">ok </span>
          <a className="text-blue" href={user.cvUrl} target="_blank" rel="noreferrer">{user.cvUrl}</a>
        </div>
      ) : (
        <div className="text-muted">No CV uploaded yet.</div>
      )}
    </div>
  );
}
