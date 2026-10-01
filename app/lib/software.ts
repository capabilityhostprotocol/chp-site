import data from '@/data/software.json';

/**
 * The /software read-model — a truthful projection of a real external artifact compiled
 * through the Capability Foundry (chp.adapters.foundry: interpret → shortlist → canonicalize).
 *
 * The front-end reaches at most `matched` (a candidate canonicalized to a registry capability).
 * It does NOT materialize, qualify, bind, ready, admit, or execute anything. So the page never
 * says anything stronger than this model, and candidates are never published to capabilities.txt.
 */

export type EntryState = 'matched' | 'candidate';

export type SoftwareEntry = {
  candidate_label: string | null;
  candidate_id: string | null;
  state: EntryState;
  canonical: string | null;
  inference_is_authority: false;
  claim: string;
};

export type SoftwareSubject = {
  source: string | null;
  state: 'observed';
  immutable: boolean;
  commit: string | null;
  content_sha256: string | null;
  acquired_at: string | null;
};

export type SoftwareProjection = {
  generated_by: string;
  subject: SoftwareSubject;
  entries: SoftwareEntry[];
  states_present: EntryState[];
  capabilities_txt_eligible: string[];
  disclaimer: string;
};

export const softwareProjection = data as SoftwareProjection;

export const matchedEntries = softwareProjection.entries.filter((e) => e.state === 'matched');
export const candidateEntries = softwareProjection.entries.filter((e) => e.state === 'candidate');

export function shortCommit(commit: string | null, n = 12): string {
  return (commit ?? '').slice(0, n);
}

export function shortDigest(digest: string | null, n = 16): string {
  return (digest ?? '').slice(0, n);
}
