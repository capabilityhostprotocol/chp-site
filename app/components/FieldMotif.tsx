'use client';

import { EvidenceField } from '@chp/ui/evidence-field';
import FieldMotifCanvas2D from './FieldMotifCanvas2D';

/**
 * FieldMotif — the signature hero visual. Renders the reusable WebGPU `EvidenceField` from the CHP
 * design system (@chp/ui), falling back to the 2D-canvas rendering when WebGPU is unavailable or the
 * viewer prefers reduced motion. Same public name/shape as before, so Hero and /design-system are
 * unchanged.
 *
 * The shader + vgpu wiring now live once, in @chp/ui — no local mirror.
 */
export default function FieldMotif() {
  return <EvidenceField fallback={<FieldMotifCanvas2D />} />;
}
