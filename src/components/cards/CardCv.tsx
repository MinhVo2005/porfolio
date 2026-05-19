export default function CardCv({ cvUrl }: { cvUrl?: string }) {
  if (!cvUrl)
    return <div className="text-muted">no cv uploaded yet.</div>;

  return (
    <div>
      <span className="c-green pr-2">opening cv:</span>
      <a className="cursor-pointer text-amber/80 hover:bg-amber/10" href={cvUrl} target="_blank" rel="noreferrer">[ View CV ]</a>
    </div>
  );
}
