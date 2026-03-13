import { FrictionInputs, FrictionOutputs } from '@/lib/types';
import { gpmToM3s, lpmToM3s, m3hToM3s, ftToM, mToFt, paToPsi, paToBar } from '@/lib/conversions';
import { getPipeInternalDiameter, PIPE_ROUGHNESS_M } from '@/lib/config/pipeData';
import { FITTINGS_K } from '@/lib/config/fittingsData';

const G = 9.81; // m/s²

export function calculateFrictionLoss(inputs: FrictionInputs): FrictionOutputs {
  const {
    flowRate,
    flowRateUnit,
    viscosity,
    specificGravity,
    nominalDiameter,
    pipeLength,
    pipeLengthUnit,
    elbows45,
    elbows90,
    ballValves,
    butterflyValves,
    elevationChange,
    elevationUnit,
    additionalLoss,
    additionalLossUnit,
  } = inputs;

  // Validate required inputs
  if (flowRate <= 0) {
    return createErrorOutput('Flow rate must be greater than zero.');
  }
  if (viscosity <= 0) {
    return createErrorOutput('Viscosity must be greater than zero.');
  }
  if (specificGravity <= 0) {
    return createErrorOutput('Specific gravity must be greater than zero.');
  }

  // Convert flow rate to m³/s
  let Q_m3s: number;
  switch (flowRateUnit) {
    case 'GPM': Q_m3s = gpmToM3s(flowRate); break;
    case 'LPM': Q_m3s = lpmToM3s(flowRate); break;
    case 'm3h': Q_m3s = m3hToM3s(flowRate); break;
    default: Q_m3s = gpmToM3s(flowRate);
  }

  // Get pipe internal diameter in metres
  const D = getPipeInternalDiameter(nominalDiameter);

  // Convert viscosity cP → Pa·s
  const mu = viscosity * 0.001;

  // Density
  const rho = specificGravity * 1000; // kg/m³

  // Pipe length in metres
  const L_m = pipeLengthUnit === 'ft' ? ftToM(pipeLength) : pipeLength;

  // Elevation change in metres
  const dz_m = elevationUnit === 'ft' ? ftToM(elevationChange) : elevationChange;

  // Cross-sectional area and velocity
  const A = Math.PI * D * D / 4;
  const v = Q_m3s / A;

  // Reynolds number
  const Re = (rho * v * D) / mu;

  // Flow regime
  let flowRegime: 'Laminar' | 'Transitional' | 'Turbulent';
  if (Re < 2300) {
    flowRegime = 'Laminar';
  } else if (Re < 4000) {
    flowRegime = 'Transitional';
  } else {
    flowRegime = 'Turbulent';
  }

  // Darcy friction factor
  let f: number;
  if (Re < 2300) {
    f = 64 / Re;
  } else {
    // Swamee-Jain approximation
    const eps = PIPE_ROUGHNESS_M;
    const term = eps / (3.7 * D) + 5.74 / Math.pow(Re, 0.9);
    f = 0.25 / Math.pow(Math.log10(term), 2);
  }

  // Major loss (straight pipe)
  const vSquaredOver2g = (v * v) / (2 * G);
  const h_major = L_m > 0 ? f * (L_m / D) * vSquaredOver2g : 0;

  // Minor loss (fittings K method)
  const K_total =
    elbows45 * FITTINGS_K.K45 +
    elbows90 * FITTINGS_K.K90 +
    ballValves * FITTINGS_K.Kball +
    butterflyValves * FITTINGS_K.Kbutterfly;
  const h_minor = K_total * vSquaredOver2g;

  // Static head (elevation change)
  const h_static = dz_m;

  // Additional loss → convert to metres of head
  let h_add = 0;
  if (additionalLoss > 0) {
    switch (additionalLossUnit) {
      case 'PSI': h_add = additionalLoss * 0.703070 / specificGravity; break;
      case 'FT':  h_add = ftToM(additionalLoss); break;
      case 'M':   h_add = additionalLoss; break;
      case 'BAR': h_add = additionalLoss * 10.1972 / specificGravity; break;
    }
  }

  // Total head loss
  const h_total = h_major + h_minor + h_static + h_add;

  // Convert to pressure (Pa)
  const dP_Pa = rho * G * h_total;

  return {
    totalHeadLossM: parseFloat(h_total.toFixed(4)),
    totalHeadLossFt: parseFloat(mToFt(h_total).toFixed(4)),
    totalPressureLossPsi: parseFloat(paToPsi(dP_Pa).toFixed(3)),
    totalPressureLossBar: parseFloat(paToBar(dP_Pa).toFixed(4)),
    velocityMs: parseFloat(v.toFixed(3)),
    velocityFts: parseFloat(mToFt(v).toFixed(3)),
    reynoldsNumber: parseFloat(Re.toFixed(0)),
    flowRegime,
    majorLossM: parseFloat(h_major.toFixed(4)),
    minorLossM: parseFloat(h_minor.toFixed(4)),
    staticHeadM: parseFloat(h_static.toFixed(4)),
    additionalLossM: parseFloat(h_add.toFixed(4)),
    frictionFactor: parseFloat(f.toFixed(6)),
    error: null,
  };
}

function createErrorOutput(error: string): FrictionOutputs {
  return {
    totalHeadLossM: 0,
    totalHeadLossFt: 0,
    totalPressureLossPsi: 0,
    totalPressureLossBar: 0,
    velocityMs: 0,
    velocityFts: 0,
    reynoldsNumber: 0,
    flowRegime: 'Laminar',
    majorLossM: 0,
    minorLossM: 0,
    staticHeadM: 0,
    additionalLossM: 0,
    frictionFactor: 0,
    error,
  };
}
