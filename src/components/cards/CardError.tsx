import { useKeybinds } from "@/lib/useKeybinds";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CardError({ cmd }: { cmd: string }) {
  const keybindLabel = useKeybinds().switchPane.label;
  return (
    <div className="font-mono">
      <div className="text-red font-semibold">command not found</div>
      <SectionLabel>shell</SectionLabel>
      <div><span className="text-muted">input:</span> {cmd}</div>
      <div className="text-muted mt-1">
        try <span className="text-magenta">help</span> or press <kbd>{keybindLabel}</kbd> and use the sidebar.
      </div>
    </div>
  );
}
