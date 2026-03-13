import { FluidPreset } from '@/lib/types';

/** Common fluid presets with vapor pressure and specific gravity */
export const FLUID_PRESETS: FluidPreset[] = [
  {
    label: 'Water at 68\u00B0F (20\u00B0C)',
    vaporPressurePsi: 0.34,
    vaporPressureBar: 0.0234,
    specificGravity: 1.0,
  },
  {
    label: 'Water at 104\u00B0F (40\u00B0C)',
    vaporPressurePsi: 1.07,
    vaporPressureBar: 0.0738,
    specificGravity: 0.992,
  },
  {
    label: 'Water at 140\u00B0F (60\u00B0C)',
    vaporPressurePsi: 2.89,
    vaporPressureBar: 0.1993,
    specificGravity: 0.983,
  },
  {
    label: 'Water at 176\u00B0F (80\u00B0C)',
    vaporPressurePsi: 6.87,
    vaporPressureBar: 0.4736,
    specificGravity: 0.972,
  },
  {
    label: 'Water at 212\u00B0F (100\u00B0C)',
    vaporPressurePsi: 14.7,
    vaporPressureBar: 1.0133,
    specificGravity: 0.958,
  },
  {
    label: 'Custom',
    vaporPressurePsi: 0,
    vaporPressureBar: 0,
    specificGravity: 1.0,
  },
];
