import { NpshInputs, NpshOutputs } from '@/lib/types';
import { psiToHeadFt, barToHeadM, mToFt, ftToM } from '@/lib/conversions';

export function calculateNpsh(inputs: NpshInputs): NpshOutputs {
  const {
    unitSystem,
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

    // Atmospheric pressure head (psi → ft)
    const ha = psiToHeadFt(atmosphericPressure, specificGravity);

    // Source/supply pressure head (psi → ft)
    const hs_source = psiToHeadFt(sourcePressure, specificGravity);

    // Static head: positive staticHeight = pump above liquid (suction lift, subtract)
    // hs = source_pressure_head - static_height
    const hs = hs_source - staticHeight;

    // Friction loss in suction pipe (already in ft)
    const hf = frictionLoss;

    // Vapor pressure head (psi → ft)
    const hvp = psiToHeadFt(vaporPressure, specificGravity);

    // NPSHa = ha + hs - hf - hvp
    const npsha = ha + hs - hf - hvp;

    const riskInfo = getRiskLevel(npsha, 'imperial');

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

    // Atmospheric pressure head (bar → m)
    const ha = barToHeadM(atmosphericPressure, specificGravity);

    // Source pressure head (bar → m)
    const hs_source = barToHeadM(sourcePressure, specificGravity);

    // Static head in metres
    const hs = hs_source - staticHeight;

    // Friction loss (already in m)
    const hf = frictionLoss;

    // Vapor pressure head (bar → m)
    const hvp = barToHeadM(vaporPressure, specificGravity);

    // NPSHa
    const npsha = ha + hs - hf - hvp;

    // Convert to ft for risk assessment
    const npsha_ft = mToFt(npsha);
    const riskInfo = getRiskLevel(npsha_ft, 'metric');

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
  npsha_ft: number,
  _unitSystem: string
): { riskLevel: 'adequate' | 'low' | 'critical'; riskLabel: string } {
  if (npsha_ft > 10) {
    return { riskLevel: 'adequate', riskLabel: 'Adequate NPSH margin' };
  } else if (npsha_ft > 3) {
    return { riskLevel: 'low', riskLabel: 'Low NPSH margin \u2014 verify against pump NPSHR' };
  } else {
    return { riskLevel: 'critical', riskLabel: 'Critical \u2014 high cavitation risk' };
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
