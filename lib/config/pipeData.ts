import { PipeSize } from '@/lib/types';

export const PIPE_SIZES: PipeSize[] = [
  { nominal_in: 0.25,  label: '¼″',   id_in: 0.180, wall_in: 0.035, id_m: 0.180 * 0.0254 },
  { nominal_in: 0.375, label: '⅜″',   id_in: 0.305, wall_in: 0.035, id_m: 0.305 * 0.0254 },
  { nominal_in: 0.5,   label: '½″',   id_in: 0.370, wall_in: 0.065, id_m: 0.370 * 0.0254 },
  { nominal_in: 0.75,  label: '¾″',   id_in: 0.620, wall_in: 0.065, id_m: 0.620 * 0.0254 },
  { nominal_in: 1.0,   label: '1″',   id_in: 0.870, wall_in: 0.065, id_m: 0.870 * 0.0254 },
  { nominal_in: 1.5,   label: '1½″',  id_in: 1.370, wall_in: 0.065, id_m: 1.370 * 0.0254 },
  { nominal_in: 2.0,   label: '2″',   id_in: 1.870, wall_in: 0.065, id_m: 1.870 * 0.0254 },
  { nominal_in: 2.5,   label: '2½″',  id_in: 2.370, wall_in: 0.065, id_m: 2.370 * 0.0254 },
  { nominal_in: 3.0,   label: '3″',   id_in: 2.870, wall_in: 0.065, id_m: 2.870 * 0.0254 },
  { nominal_in: 4.0,   label: '4″',   id_in: 3.834, wall_in: 0.083, id_m: 3.834 * 0.0254 },
  { nominal_in: 6.0,   label: '6″',   id_in: 5.782, wall_in: 0.109, id_m: 5.782 * 0.0254 },
  { nominal_in: 8.0,   label: '8″',   id_in: 7.782, wall_in: 0.109, id_m: 7.782 * 0.0254 },
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
