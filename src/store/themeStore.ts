import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "default" | "nord" |  "classic";
export const THEMES: ThemeName[] = ["default", "nord", "classic"];

type ThemeStore = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

export const themeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "default",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme-storage" }
  )
);
