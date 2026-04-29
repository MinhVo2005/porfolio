import { useKeybinds } from "@/lib/useKeybinds";
export default function CardError({ cmd }: { cmd: string }) {
  const keybindLabel = useKeybinds().switchPane.label;
  return (
    <div>
      <div className="text-red font-semibold text-sm">command not found</div>
      <hr className="hr-dashed" />
      <div><span className="text-muted">shell:</span> {cmd}</div>
      <div className="text-muted mt-1">
        try <span className="text-magenta">help</span> or press <kbd>{keybindLabel}</kbd> and use the sidebar.
      </div>
    </div>
  );
}
