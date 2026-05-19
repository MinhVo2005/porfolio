import { useCallback } from "react";
import type { RefObject } from "react";
import type { PortfolioData, SectionId } from "@/types";
import { CardFor } from "../components/cards/CardFor";

type Options = {
  user: PortfolioData | null;
  setActiveTab: (id: SectionId) => void;
  submitRef: RefObject<(raw: string) => void>;
};

export function useCommands({ user, setActiveTab, submitRef }: Options) {
  const resolve = useCallback((raw: string) => {
    if (!user) return null;
    return CardFor(raw, user, setActiveTab, (n) => submitRef.current("open " + n));
  }, [user, setActiveTab, submitRef]);

  return { cardFor: resolve };
}
