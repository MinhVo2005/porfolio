type Props = { title: string; children: React.ReactNode };

export default function Panel({ title, children }: Props) {
  return (
    <div className="border border-border rounded-md bg-panel overflow-hidden">
      <div className="py-1 px-2.5 border-b border-border text-[11px] text-dim">
        {title}
      </div>
      <div className="py-2.5 px-3 text-xs">{children}</div>
    </div>
  );
}
