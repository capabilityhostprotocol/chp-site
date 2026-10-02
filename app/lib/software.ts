import data from '@/data/software.json';

/**
 * The /software read-model — a truthful multi-artifact catalog produced by the Capability Foundry
 * (chp.adapters.foundry: interpret → shortlist → canonicalize) over real artifacts acquired across
 * git, HuggingFace, PyPI, and npm.
 *
 * The front-end reaches at most `matched` (a candidate canonicalized to a registry capability). It
 * does NOT materialize, qualify, bind, ready, admit, or execute anything. So the page never says
 * anything stronger than this model, and nothing is published to capabilities.txt (published = 0).
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

export type SubjectKind = 'github' | 'hf' | 'pypi' | 'npm' | string;

export type SubjectMeta = {
  source: string | null;
  kind: SubjectKind | null;
  state: 'observed';
  immutable: boolean;
  commit: string | null;
  version: string | null;
  content_sha256: string | null;
  acquired_at: string | null;
};

export type SoftwareSubject = {
  subject: SubjectMeta;
  entries: SoftwareEntry[];
  states_present: EntryState[];
  capabilities_txt_eligible: string[];
  disclaimer: string;
};

export type SoftwareCatalog = {
  generated_by: string;
  subjects: SoftwareSubject[];
  totals: { subjects: number; matched: number; candidates: number; published: number };
  disclaimer: string;
};

export const catalog = data as SoftwareCatalog;

const KIND_LABEL: Record<string, string> = {
  github: 'Git repository',
  hf: 'Model hub',
  pypi: 'PyPI package',
  npm: 'npm package',
};

export function kindLabel(kind: SubjectKind | null): string {
  return (kind && KIND_LABEL[kind]) ?? (kind ?? 'artifact');
}

/** The immutable provider-native identity: a commit for git/HF, a version for registries. */
export function pinnedIdentity(s: SubjectMeta): { label: string; value: string } | null {
  if (s.commit) return { label: 'commit', value: s.commit.slice(0, 12) };
  if (s.version) return { label: 'version', value: s.version };
  return null;
}

export function shortDigest(digest: string | null, n = 16): string {
  return (digest ?? '').slice(0, n);
}
