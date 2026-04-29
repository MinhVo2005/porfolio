"use client";

import { Fragment } from "react";
import { THEMES, type ThemeName } from "@/store/themeStore";

const THEME_DESC: Record<ThemeName, string> = {
  default: "dark — deep navy/teal",
  nord:    "cool blues and grays",
  amber:   "retro amber CRT monochrome",
  matrix:  "green phosphor monochrome",
};

type Props = {
  current: ThemeName;
  switched?: ThemeName;
};

export default function CardTheme({ current, switched }: Props) {
  return (
    <div>
      {switched && (
        <div className="c-green mb-2">switched to theme: {switched}</div>
      )}
      <div className="text-accent font-semibold mb-1.5">available themes</div>
      <div className="grid gap-y-0.5 grid-cols-[88px_1fr]">
        {THEMES.map((t) => (
          <Fragment key={t}>
            <span className={t === current ? "text-accent" : "text-dim"}>
              {t}{t === current ? " ✓" : ""}
            </span>
            <span className="text-muted">{THEME_DESC[t]}</span>
          </Fragment>
        ))}
      </div>
      <div className="text-dim mt-2">
        usage: <span className="text-accent">theme &lt;name&gt;</span>
      </div>
    </div>
  );
}
