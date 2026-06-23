import CodePanel from '../CodePanel';

/**
 * EvidenceArtifact — a concrete evidence/outcome JSON with optional annotations
 * calling out the fields that matter. Generalizes the `CodePanel` pattern that
 * the page audit found is the single most effective existing visual aid.
 */
export default function EvidenceArtifact({
  json,
  label = 'evidence event',
  annotations,
  caption,
}: {
  json: string;
  label?: string;
  annotations?: { field: string; note: string }[];
  caption?: React.ReactNode;
}) {
  return (
    <figure className="my-10">
      <CodePanel code={json} label={label} language="json" />
      {annotations && annotations.length > 0 && (
        <ul className="mt-4 space-y-2">
          {annotations.map((a) => (
            <li key={a.field} className="flex gap-3 text-sm leading-relaxed">
              <code className="font-mono text-xs text-[color:var(--color-signal-cyan)] whitespace-nowrap pt-0.5">
                {a.field}
              </code>
              <span className="text-zinc-400">{a.note}</span>
            </li>
          ))}
        </ul>
      )}
      {caption && (
        <figcaption className="mt-3 text-sm text-zinc-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
