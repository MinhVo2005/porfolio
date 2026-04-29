import { useEffect } from "react";
import { themeStore } from "@/store/themeStore";

export function useTheme() {
  useEffect(() => {
    const apply = (t: string) =>
      t === "default"
        ? document.documentElement.removeAttribute("data-theme")
        : document.documentElement.setAttribute("data-theme", t);

    apply(themeStore.getState().theme);
    return themeStore.subscribe((s) => apply(s.theme));
  }, []);
}
