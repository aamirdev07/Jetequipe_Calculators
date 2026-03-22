import { TankInputs, TankOutputs } from '@/lib/types';
import { mmToM, inToM, lToM3, galToM3, mToMm, mToIn, m3ToL, m3ToGal } from '@/lib/conversions';

export function calculateTank(inputs: TankInputs): TankOutputs {
  const { unitSystem, innerDiameter, totalVolume, coneAngle, fillPercentage } = inputs;

  // Convert to SI (metres, m³)
  const D_m = unitSystem === 'metric' ? mmToM(innerDiameter) : inToM(innerDiameter);
  const V_total_m3 = unitSystem === 'metric' ? lToM3(totalVolume) : galToM3(totalVolume);

  if (D_m <= 0) {
    return createErrorOutput('Diameter must be greater than zero.');
  }

  // Geometry
  const r = D_m / 2;
  const A = Math.PI * r * r;

  let H_cone_m: number;
  let V_cone_m3: number;

  if (coneAngle >= 180) {
    // Flat bottom — standard cylinder, no cone
    H_cone_m = 0;
    V_cone_m3 = 0;
  } else {
    const halfAngleRad = (coneAngle / 2) * Math.PI / 180;
    const tanHalfAngle = Math.tan(halfAngleRad);

    if (tanHalfAngle === 0) {
      return createErrorOutput('Invalid cone angle.');
    }

    H_cone_m = r / tanHalfAngle;
    V_cone_m3 = (1 / 3) * A * H_cone_m;
  }

  const V_cyl_m3 = V_total_m3 - V_cone_m3;

  if (V_cyl_m3 < 0) {
    return createErrorOutput(
      'Volume too small for this ID/cone angle combination (the cone alone exceeds total volume). Increase volume, increase diameter, or decrease cone angle.'
    );
  }

  const H_cyl_m = A > 0 ? V_cyl_m3 / A : 0;
  const H_total_m = H_cone_m + H_cyl_m;
  const R = D_m > 0 ? H_total_m / D_m : 0;

  // Calculate liquid height based on fill percentage
  const fillFraction = (fillPercentage ?? 80) / 100;
  const V_liquid_m3 = V_total_m3 * fillFraction;
  const H_liquid_m = calculateLiquidHeight(V_liquid_m3, r, H_cone_m, A);

  // Convert outputs to display units
  const toDisplayLen = unitSystem === 'metric' ? mToMm : mToIn;
  const toDisplayVol = unitSystem === 'metric' ? m3ToL : m3ToGal;

  return {
    cylinderHeight: parseFloat(toDisplayLen(H_cyl_m).toFixed(1)),
    coneHeight: parseFloat(toDisplayLen(H_cone_m).toFixed(1)),
    totalHeight: parseFloat(toDisplayLen(H_total_m).toFixed(1)),
    liquidHeight: parseFloat(toDisplayLen(H_liquid_m).toFixed(1)),
    hdRatio: parseFloat(R.toFixed(3)),
    totalVolume: parseFloat(toDisplayVol(V_total_m3).toFixed(1)),
    workingVolume: parseFloat(toDisplayVol(V_liquid_m3).toFixed(1)),
    error: null,
  };
}

/**
 * Calculate the liquid height from the bottom of the cone given a liquid volume.
 * Uses cone volume formula up to H_cone, then cylinder above that.
 */
function calculateLiquidHeight(
  V_liquid: number,
  tankRadius: number,
  H_cone: number,
  crossSection: number
): number {
  if (V_liquid <= 0) return 0;

  // If no cone (flat bottom), liquid is purely in cylinder
  if (H_cone <= 0) {
    return crossSection > 0 ? V_liquid / crossSection : 0;
  }

  // Volume of the full cone
  const V_cone = (1 / 3) * crossSection * H_cone;

  if (V_liquid <= V_cone) {
    // Liquid is within the cone section
    // V = (π/3) * (r_at_h)² * h, where r_at_h = (tankRadius / H_cone) * h
    // V = (π/3) * (tankRadius / H_cone)² * h³
    // h = cbrt(3V * H_cone² / (π * tankRadius²))
    const h = Math.cbrt((3 * V_liquid * H_cone * H_cone) / (Math.PI * tankRadius * tankRadius));
    return h;
  } else {
    // Liquid fills the cone + part of the cylinder
    const V_in_cyl = V_liquid - V_cone;
    const h_cyl = V_in_cyl / crossSection;
    return H_cone + h_cyl;
  }
}

function createErrorOutput(error: string): TankOutputs {
  return {
    cylinderHeight: 0,
    coneHeight: 0,
    totalHeight: 0,
    liquidHeight: 0,
    hdRatio: 0,
    totalVolume: 0,
    workingVolume: 0,
    error,
  };
}

export function getRatioStatus(ratio: number): { status: string; color: 'success' | 'warning' | 'error'; label: string } {
  if (ratio < 1) {
    return { status: 'low', color: 'success', label: 'Low ratio' };
  } else if (ratio < 2) {
    return { status: 'high-vortex', color: 'warning', label: 'High vortex probability' };
  } else {
    return { status: 'very-high', color: 'error', label: 'Very high ratio' };
  }
}
