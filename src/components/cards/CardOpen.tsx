"use client";

import { useState, useCallback } from "react";
import type { PortfolioData } from "@/types";
import Tag from "./Tag";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = { user: PortfolioData; name?: string; showImg?: boolean };

function statusColor(status: string) {
  if (status === "RUNNING") return "text-green";
  if (status === "SHIPPED") return "text-yellow";
  return "text-dim";
}

type GalleryProps = { imgs: string[]; onHide: () => void };

function ImageGallery({ imgs, onHide }: GalleryProps) {
  const [idx, setIdx]       = useState(0);
  const [fading, setFading] = useState(false);
  const [error, setError]   = useState(false);

  const navigate = useCallback((next: number) => {
    setFading(true);
    setError(false);
    setTimeout(() => { setIdx(next); setFading(false); }, 150);
  }, []);

  const prev = (idx - 1 + imgs.length) % imgs.length;
  const next = (idx + 1) % imgs.length;

  return (
    <div
      className="h-full flex flex-col gap-2 min-h-0 outline-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft")  navigate(prev);
        if (e.key === "ArrowRight") navigate(next);
      }}
    >
      <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden border border-border-2 ">


        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-dim text-[11px]">
            <span className="text-[22px] opacity-40">⊟</span>
            <span>image unavailable</span>
          </div>
        ) : (
          <img
            src={imgs[idx]}
            alt=""
            onError={() => setError(true)}
            onLoad={() => setError(false)}
            className="absolute inset-0 w-full h-full object-contain trans  ition-opacity duration-150"
            style={{ opacity: fading ? 0 : 1 }}
          />
        )}
      </div>

      {imgs.length > 1 && (
        <div className="flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between text-[11px] text-dim font-mono">
            <button onClick={() => navigate(prev)} className="hover:text-accent">‹ prev</button>
            <span>{idx + 1} / {imgs.length}</span>
            <button onClick={() => navigate(next)} className="hover:text-accent">next ›</button>
          </div>
          <div className="flex justify-center gap-1.5">
            {imgs.map((_, i) => (
              <span
                key={i}
                onClick={() => navigate(i)}
                className={`cursor-pointer text-[8px] transition-colors ${i === idx ? "text-accent" : "text-dim"}`}
              >
                ●
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardOpen({ user, name, showImg: initialShowImg = false }: Props) {
  const p = name
    ? (user.projects.find((x) => x.name === name.toLowerCase()) ??
       user.projects.find((x) => x.displayName.toLowerCase().includes(name.toLowerCase())))
    : undefined;

  const hasImg = (p?.img ?? []).length > 0;
  const [showImg, setShowImg] = useState(initialShowImg);

  if (!name)
    return <div><span className="text-red">usage:</span> open &lt;id&gt; [--show]</div>;

  if (!p)
    return (
      <div>
        <div className="text-red font-semibold">error</div>
        <hr className="hr-dashed" />
        <div>
          no project matching <span className="text-accent">&quot;{name}&quot;</span>. try{" "}
          <span className="text-magenta">projects</span>.
        </div>
      </div>
    );

  const showGallery = hasImg && showImg;

  return (
    <div className="@container">
      <div className={`grid gap-4 ${showGallery ? "@[720px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : ""}`}>

        {/* Left: text */}
        <div className="min-w-0">
          <div className="flex items-start gap-2">
            <div>
              
              <div className="flex gap-2 items-baseline">
                <div className="text-3xl! font-bold text-accent">{p.displayName}</div> 
                {hasImg && (
                <button
                  onClick={() => setShowImg(!showImg)}
                  className="cursor-pointer text-amber/80 hover:bg-amber/10 "
                >
                  [ image ]
                </button>
              )} 
              </div>
              
              <div className="mt-0.5">
                <span className="text-magenta">[{p.category}]</span>
                <span className="text-dim"> · </span>
                <span className={statusColor(p.status)}>{p.status.toLowerCase()}</span>
              </div>
            </div>
 
          </div>

          {p.skills.length > 0 && (
            <>
              <SectionLabel>stack</SectionLabel>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.skills.map((t) => <Tag key={t} label={t} />)}
              </div>
            </>
          )}

          <SectionLabel>summary</SectionLabel>
          <div className="mb-1">{p.description}</div>

          {(p.highlights ?? []).length > 0 && (
            <>
              <SectionLabel>highlights</SectionLabel>
              <div className="mt-1 space-y-1">
                {(p.highlights ?? []).map((h, i) => (
                  <div key={i} className="pl-3.5 -indent-3.5">
                    <span>· </span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {p.url && (
            <div className="mt-3">
              <a className="text-amber hover:bg-amber/10" href={p.url} target="_blank" rel="noreferrer">[ View Project ]</a>
            </div>
          )}
        </div>

        {/* Right: gallery */}
        {showGallery && <ImageGallery imgs={p.img ?? []} onHide={() => setShowImg(false)} />}
      </div>
    </div>
  );
}
