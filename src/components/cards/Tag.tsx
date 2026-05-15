export default function Tag({ label }: { label: string }) {
  return (
    <span className="border border-border px-1.5 py-px rounded-[10px] ">
      {label}
    </span>
  );
}
