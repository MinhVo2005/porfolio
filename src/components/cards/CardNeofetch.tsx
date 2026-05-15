import type { PortfolioData } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";

const ASCII_FACE = ` 
                  .88888888:.
                88888888.88888.
              .8888888888888888.
              888888888888888888
              88' _\`88'_  \`88888
              88 88 88 88  88888
              88_88_::_88_:88888
              88:::,::,:::::8888
              88\`:::::::::'\`8888
             .88  \`::::'    8:88.
            8888            \`8:888.
          .8888'             \`888888.
         .8888:..  .::.  ...:'8888888:.
        .8888.'     :'     \`'::\`88:88888
       .8888        '         \`.888:8888.
      888:8         .           888:88888
    .888:88        .:           888:88888:
    8888888.       ::           88:888888
    \`.::.888.      ::          .88888888
   .::::::.888.    ::         :::\`8888'.:.
  ::::::::::.888   '         .::::::::::::
  ::::::::::::.8    '      .:8::::::::::::.
 .::::::::::::::.        .:888:::::::::::::
 :::::::::::::::88:.__..:88888:::::::::::'
  \`'.:::::::::::88888888888.88:::::::::'
        \`':::_:' -- '' -'-' \`':_::::'`;
                

export default function CardNeofetch({ user }: { user: PortfolioData }) {
  return (
    <div>
      <SectionLabel>system</SectionLabel>
      <div className="grid gap-4 grid-cols-[auto_1fr]">
        <pre className="text-accent m-0 text-[6px]! leading-[1.1]">{ASCII_FACE}</pre>
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
