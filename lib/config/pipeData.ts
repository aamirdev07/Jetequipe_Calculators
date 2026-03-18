import { PipeSize } from '@/lib/types';

export const PIPE_SIZES: PipeSize[] = [
  { nominal_in: 0.5,  label: '½″',   id_m: 0.01250, id_in: 0.500 },
  { nominal_in: 0.75, label: '¾″',   id_m: 0.01905, id_in: 0.750 },
  { nominal_in: 1.0,  label: '1″',   id_m: 0.02540, id_in: 1.000 },
  { nominal_in: 1.5,  label: '1½″',  id_m: 0.03810, id_in: 1.500 },
  { nominal_in: 2.0,  label: '2″',   id_m: 0.04763, id_in: 1.875 },
  { nominal_in: 2.5,  label: '2½″',  id_m: 0.06198, id_in: 2.440 },
  { nominal_in: 3.0,  label: '3″',   id_m: 0.07391, id_in: 2.910 },
  { nominal_in: 4.0,  label: '4″',   id_m: 0.09804, id_in: 3.860 },
  { nominal_in: 6.0,  label: '6″',   id_m: 0.15240, id_in: 5.782 },
];

/** Pipe roughness for sanitary stainless steel (metres) */
export const PIPE_ROUGHNESS_M = 0.0000015;

/** Get internal diameter in metres for a given nominal size */
export function getPipeInternalDiameter(nominalIn: number): number {
  const pipe = PIPE_SIZES.find((p) => p.nominal_in === nominalIn);
  if (!pipe) {
    throw new Error(`Unknown pipe nominal size: ${nominalIn}`);
  }
  return pipe.id_m;
}
