export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 my-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted whitespace-nowrap">
        {children}
      </span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
