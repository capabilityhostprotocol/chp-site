import CompareTable from './CompareTable';

/**
 * Data-baked CompareTable wrappers for blog posts. MDX (next-mdx-remote) does
 * not reliably parse multi-line object/array props, so posts reference these
 * propless components instead of passing data inline.
 */

export function TelemetryVsEvidenceTable() {
  return (
    <CompareTable
      columns={[
        { label: 'OpenTelemetry', sub: 'built to understand' },
        { label: 'CHP evidence', sub: 'built to defend', accent: true },
      ]}
      rows={[
        {
          dimension: 'Capture',
          cells: [
            'Sampled — keep enough to see the shape',
            'Mandatory — every attempt at the boundary',
          ],
        },
        {
          dimension: 'Integrity',
          cells: [
            'Mutable, ops-owned — enriched and aged out',
            'Tamper-evident — SHA256 hash-chained',
          ],
        },
        {
          dimension: 'Decisions',
          cells: [
            'No notion of a denial or an approval',
            'Denials and approvals are first-class outcomes',
          ],
        },
        {
          dimension: 'Reconstruction',
          cells: [
            'A sampled trace',
            'Replayable by correlation — the actual ordered sequence',
          ],
        },
      ]}
      caption="The same four choices, made oppositely — because the jobs are opposite."
    />
  );
}

export function AgenticStackTable() {
  return (
    <CompareTable
      columns={[
        { label: 'Discovery', sub: 'capabilities.txt' },
        { label: 'Invocation', sub: 'MCP / HTTP / SDKs' },
        { label: 'Evidence', sub: 'CHP', accent: true },
      ]}
      rows={[
        {
          dimension: 'The question',
          cells: [
            'What can this host do?',
            'How do I call it?',
            'What happened — and can I prove it?',
          ],
        },
        {
          dimension: 'Nature',
          cells: [
            'A static, crawlable advertisement',
            'A live connection that runs the tool',
            'A durable, governed record of the attempt',
          ],
        },
        {
          dimension: 'Owner',
          cells: [
            'capabilities.txt',
            'MCP owns this layer well',
            'CHP owns the third',
          ],
        },
      ]}
      caption="Three layers, not two competitors. capabilities.txt hands off to whichever invocation layer you use; CHP records what crossed the boundary."
    />
  );
}
