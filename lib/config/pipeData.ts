import { PipeSize } from '@/lib/types';

export const PIPE_SIZES: PipeSize[] = [
  { nominal_in: 0.75, label: '0.75 in (\u224819 mm)', id_m: 0.01905 },
  { nominal_in: 1.0,  label: '1.0 in (\u224825 mm)',  id_m: 0.02540 },
  { nominal_in: 1.5,  label: '1.5 in (\u224838 mm)',  id_m: 0.03810 },
  { nominal_in: 2.0,  label: '2.0 in (\u224851 mm)',  id_m: 0.05080 },
  { nominal_in: 2.5,  label: '2.5 in (\u224863 mm)',  id_m: 0.06350 },
  { nominal_in: 3.0,  label: '3.0 in (\u224876 mm)',  id_m: 0.07620 },
  { nominal_in: 4.0,  label: '4.0 in (\u2248102 mm)', id_m: 0.10160 },
  { nominal_in: 6.0,  label: '6.0 in (\u2248152 mm)', id_m: 0.15240 },
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
