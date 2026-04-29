import type { PortfolioData } from "@/types";

const ASCII_FACE = `     .--.
    |o_o |
    |:_/ |
   //   \\ \\
  (|     | )
 /'\\_   _/\`\\
 \\___)=(___/`;

export default function CardNeofetch({ user }: { user: PortfolioData }) {
  return (
    <div>
      <div className="text-accent font-semibold text-[15px]">neofetch</div>
      <hr className="hr-dashed" />
      <div className="grid gap-4 grid-cols-[auto_1fr]">
        <pre className="text-accent m-0 text-[10px] leading-[1.1]">{ASCII_FACE}</pre>
        <div className="text-xs">
          <div>
            <span className="text-accent font-semibold">{user.username}</span>
            <span className="text-muted">@</span>
            <span className="text-magenta font-semibold">{user.hostname}</span>
          </div>
          <div className="text-muted">─────────────────────</div>
          <div><span className="text-yellow">role{"     "}</span>{user.role}</div>
          <div><span className="text-yellow">location </span>{user.location}</div>
          <div><span className="text-yellow">projects </span><span className="text-accent">{user.stats.projects}</span></div>
          <div><span className="text-yellow">awards{"   "}</span><span className="text-yellow">{user.stats.awards}</span></div>
          {user.stats.gpa !== "—" && (
            <div><span className="text-yellow">gpa{"      "}</span><span className="text-green">{user.stats.gpa}</span></div>
          )}
        </div>
      </div>
    </div>
  );
}
