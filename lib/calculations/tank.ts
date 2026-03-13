import { TankInputs, TankOutputs } from '@/lib/types';
import { mmToM, inToM, lToM3, galToM3, mToMm, mToIn, m3ToL, m3ToGal } from '@/lib/conversions';

const HEADSPACE_FACTOR = 0.8; // working volume = 80% of total

export function calculateTank(inputs: TankInputs): TankOutputs {
  const { unitSystem, innerDiameter, workingVolume, coneAngle } = inputs;

  // Convert to SI (metres, m³)
  const D_m = unitSystem === 'metric' ? mmToM(innerDiameter) : inToM(innerDiameter);
  const V_work_m3 = unitSystem === 'metric' ? lToM3(workingVolume) : galToM3(workingVolume);

  // Total volume including headspace
  const V_total_m3 = V_work_m3 / HEADSPACE_FACTOR;

  // Geometry
  const r = D_m / 2;
  const halfAngleRad = (coneAngle / 2) * Math.PI / 180;
  const tanHalfAngle = Math.tan(halfAngleRad);

  // Avoid division by zero
  if (tanHalfAngle === 0) {
    return createErrorOutput('Cone angle cannot be 0\u00B0 or 180\u00B0.');
  }

  const H_cone_m = r / tanHalfAngle;
  const A = Math.PI * r * r;

  if (A === 0) {
    return createErrorOutput('Diameter must be greater than zero.');
  }

  const V_cone_m3 = (1 / 3) * A * H_cone_m;
  const V_cyl_m3 = V_total_m3 - V_cone_m3;

  if (V_cyl_m3 < 0) {
    return createErrorOutput(
      'Volume too small for this ID/cone angle combination (the cone alone exceeds total volume). Increase volume, increase diameter, or decrease cone angle.'
    );
  }

  const H_cyl_m = V_cyl_m3 / A;
  const H_total_m = H_cone_m + H_cyl_m;
  const R = H_total_m / D_m;

  // Convert outputs to display units
  const toDisplayLen = unitSystem === 'metric' ? mToMm : mToIn;
  const toDisplayVol = unitSystem === 'metric' ? m3ToL : m3ToGal;

  return {
    cylinderHeight: parseFloat(toDisplayLen(H_cyl_m).toFixed(1)),
    coneHeight: parseFloat(toDisplayLen(H_cone_m).toFixed(1)),
    totalHeight: parseFloat(toDisplayLen(H_total_m).toFixed(1)),
    hdRatio: parseFloat(R.toFixed(3)),
    totalVolume: parseFloat(toDisplayVol(V_total_m3).toFixed(1)),
    totalVolumeM3: parseFloat(V_total_m3.toFixed(4)),
    error: null,
  };
}

function createErrorOutput(error: string): TankOutputs {
  return {
    cylinderHeight: 0,
    coneHeight: 0,
    totalHeight: 0,
    hdRatio: 0,
    totalVolume: 0,
    totalVolumeM3: 0,
    error,
  };
}

export function getRatioStatus(ratio: number): { status: string; color: 'default' | 'warning' | 'error'; label: string } {
  if (ratio < 1) {
    return { status: 'low', color: 'default', label: 'Low ratio' };
  } else if (ratio < 2) {
    return { status: 'high-vortex', color: 'warning', label: 'High vortex probability' };
  } else {
    return { status: 'very-high', color: 'error', label: 'Very high ratio' };
  }
}
