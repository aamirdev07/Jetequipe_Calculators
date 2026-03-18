import { NpshInputs, NpshOutputs } from '@/lib/types';
import { psiToHeadFt, barToHeadM, mToFt } from '@/lib/conversions';

export function calculateNpsh(inputs: NpshInputs): NpshOutputs {
  const {
    unitSystem,
    pressureInputUnit,
    atmosphericPressure,
    sourcePressure,
    staticHeight,
    frictionLoss,
    vaporPressure,
    specificGravity,
  } = inputs;

  if (specificGravity <= 0) {
    return createErrorOutput('Specific gravity must be greater than zero.');
  }

  if (unitSystem === 'imperial') {
    // All calculations in feet of head
    let ha: number;
    let hs_source: number;
    let hvp: number;

    if (pressureInputUnit === 'ft') {
      // Already in ft of head
      ha = atmosphericPressure;
      hs_source = sourcePressure;
      hvp = vaporPressure;
    } else {
      // psi → ft of head
      ha = psiToHeadFt(atmosphericPressure, specificGravity);
      hs_source = psiToHeadFt(sourcePressure, specificGravity);
      hvp = psiToHeadFt(vaporPressure, specificGravity);
    }

    // Static head: positive staticHeight = pump above liquid (suction lift, subtract)
    const hs = hs_source - staticHeight;

    // Friction loss in suction pipe (already in ft)
    const hf = frictionLoss;

    // NPSHa = ha + hs - hf - hvp
    const npsha = ha + hs - hf - hvp;

    const riskInfo = getRiskLevel(npsha);

    return {
      npsha: parseFloat(npsha.toFixed(2)),
      atmosphericHead: parseFloat(ha.toFixed(2)),
      sourceHead: parseFloat(hs_source.toFixed(2)),
      staticHead: parseFloat((-staticHeight).toFixed(2)),
      frictionHead: parseFloat(hf.toFixed(2)),
      vaporHead: parseFloat(hvp.toFixed(2)),
      ...riskInfo,
      error: null,
    };
  } else {
    // Metric: all calculations in metres of head
    let ha: number;
    let hs_source: number;
    let hvp: number;

    if (pressureInputUnit === 'm') {
      // Already in metres of head
      ha = atmosphericPressure;
      hs_source = sourcePressure;
      hvp = vaporPressure;
    } else {
      // bar → metres of head
      ha = barToHeadM(atmosphericPressure, specificGravity);
      hs_source = barToHeadM(sourcePressure, specificGravity);
      hvp = barToHeadM(vaporPressure, specificGravity);
    }

    // Static head in metres
    const hs = hs_source - staticHeight;

    // Friction loss (already in m)
    const hf = frictionLoss;

    // NPSHa
    const npsha = ha + hs - hf - hvp;

    // Convert to ft for risk assessment
    const npsha_ft = mToFt(npsha);
    const riskInfo = getRiskLevel(npsha_ft);

    return {
      npsha: parseFloat(npsha.toFixed(2)),
      atmosphericHead: parseFloat(ha.toFixed(2)),
      sourceHead: parseFloat(hs_source.toFixed(2)),
      staticHead: parseFloat((-staticHeight).toFixed(2)),
      frictionHead: parseFloat(hf.toFixed(2)),
      vaporHead: parseFloat(hvp.toFixed(2)),
      ...riskInfo,
      error: null,
    };
  }
}

function getRiskLevel(
  npsha_ft: number
): { riskLevel: 'adequate' | 'low' | 'critical'; riskLabel: string } {
  if (npsha_ft > 10) {
    return { riskLevel: 'adequate', riskLabel: 'Adequate NPSH margin' };
  } else if (npsha_ft > 3) {
    return { riskLevel: 'low', riskLabel: 'Low NPSH margin — verify against pump NPSHR' };
  } else {
    return { riskLevel: 'critical', riskLabel: 'Critical — high cavitation risk' };
  }
}

function createErrorOutput(error: string): NpshOutputs {
  return {
    npsha: 0,
    atmosphericHead: 0,
    sourceHead: 0,
    staticHead: 0,
    frictionHead: 0,
    vaporHead: 0,
    riskLevel: 'critical',
    riskLabel: '',
    error,
  };
}
