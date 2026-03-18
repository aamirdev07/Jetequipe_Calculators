import { VelocityInputs, VelocityOutputs } from '@/lib/types';
import { m3hToM3s, lpmToM3s, gpmToM3s, msToFts } from '@/lib/conversions';
import { getPipeInternalDiameter } from '@/lib/config/pipeData';

export function calculateFluidVelocity(inputs: VelocityInputs): VelocityOutputs {
  const { flowRate, flowRateUnit, nominalDiameter } = inputs;

  if (flowRate <= 0) {
    return createErrorOutput('Flow rate must be greater than zero.');
  }

  // Get internal diameter in metres from pipe data
  const D_m = getPipeInternalDiameter(nominalDiameter);

  // Convert flow rate to m³/s
  let Q_m3s: number;
  switch (flowRateUnit) {
    case 'm3h':  Q_m3s = m3hToM3s(flowRate); break;
    case 'Lmin': Q_m3s = lpmToM3s(flowRate); break;
    case 'GPM':  Q_m3s = gpmToM3s(flowRate); break;
    default:     Q_m3s = m3hToM3s(flowRate);
  }

  // Area and velocity
  const A = Math.PI * D_m * D_m / 4;
  const v_ms = Q_m3s / A;
  const v_fts = msToFts(v_ms);

  // CIP range check (5–7 ft/s)
  let cipStatus: 'in-range' | 'below' | 'above';
  let cipLabel: string;

  if (v_fts < 5) {
    cipStatus = 'below';
    cipLabel = 'Not recommended';
  } else if (v_fts <= 7) {
    cipStatus = 'in-range';
    cipLabel = 'CIP Range ✓';
  } else {
    cipStatus = 'above';
    cipLabel = 'Above CIP range';
  }

  return {
    velocityMs: parseFloat(v_ms.toFixed(3)),
    velocityFts: parseFloat(v_fts.toFixed(3)),
    cipStatus,
    cipLabel,
    error: null,
  };
}

function createErrorOutput(error: string): VelocityOutputs {
  return {
    velocityMs: 0,
    velocityFts: 0,
    cipStatus: 'below',
    cipLabel: '',
    error,
  };
}
