import CompareTable from './CompareTable';
import EvidenceArtifact from './EvidenceArtifact';

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

export function LogsVsEvidenceTable() {
  return (
    <CompareTable
      columns={[
        { label: 'Application logs', sub: 'a byproduct' },
        { label: 'CHP evidence', sub: 'the record', accent: true },
      ]}
      rows={[
        {
          dimension: 'Completeness',
          cells: [
            'Whatever someone remembered to log',
            'Every attempt at the boundary, by contract',
          ],
        },
        {
          dimension: 'Integrity',
          cells: [
            'Editable text — trust the writer',
            'SHA256 hash-chained — alteration is detectable',
          ],
        },
        {
          dimension: 'Denials',
          cells: [
            'Usually an error or an absence',
            'A first-class outcome with a reason code',
          ],
        },
        {
          dimension: 'Reconstruction',
          cells: [
            'Stitched together after the fact',
            'Replayed in order by correlation id',
          ],
        },
      ]}
      caption="A log is something you write. Evidence is something you can be held to."
    />
  );
}

export function DiscoveryFilesTable() {
  return (
    <CompareTable
      columns={[
        { label: 'robots.txt' },
        { label: 'llms.txt' },
        { label: 'capabilities.txt', accent: true },
      ]}
      rows={[
        {
          dimension: 'Advertises',
          cells: [
            'What crawlers may access',
            'What content LLMs should read',
            'What a host can actually do',
          ],
        },
        {
          dimension: 'Reader',
          cells: ['Search crawlers', 'Language models', 'Agents that act'],
        },
        {
          dimension: 'Answers',
          cells: ['May I read this?', 'What is worth reading?', 'What can I invoke here?'],
        },
      ]}
      caption="Each file answers a narrow question for an automated reader. capabilities.txt fills the missing one: what can this host do?"
    />
  );
}

export function ClaimDenialArtifact() {
  return (
    <EvidenceArtifact
      label="decision outcome — with reason"
      json={`{
  "invocation_id": "inv_session_abc_001",
  "capability_id": "claim.decide",
  "correlation": { "correlation_id": "claim-48217" },
  "outcome": "denied",
  "success": false,
  "denial": {
    "code": "coverage_excluded",
    "message": "loss type excluded under policy section 4.2",
    "retryable": false
  },
  "subject": "model://claims-triage@2.3.1",
  "evidence_ids": ["evt_8f3a1c"],
  "completed_at": "2026-06-16T15:14:22.104Z"
}`}
      annotations={[
        { field: 'outcome', note: 'A denial is a first-class result, not a swallowed error.' },
        { field: 'denial.code', note: 'A stable reason code — not free-text written after the fact.' },
        { field: 'subject', note: 'Exactly what decided, and which version.' },
        { field: 'correlation', note: 'Ties the whole case together for replay.' },
      ]}
      caption="“Show me why this claim was denied” becomes a field on the record, not a reconstruction."
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
