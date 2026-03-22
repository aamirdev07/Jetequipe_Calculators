'use client';

import React, { useMemo } from 'react';
import RecapSection, { RecapRow } from '@/components/shared/RecapSection';
import { FrictionInputs, FrictionOutputs } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';

interface FrictionRecapProps {
  inputs: FrictionInputs;
  outputs: FrictionOutputs;
}

const ACCENT = '#7C3AED';

export default function FrictionRecap({ inputs, outputs }: FrictionRecapProps) {
  const pipeLabel = PIPE_SIZES.find((p) => p.nominal_in === inputs.nominalDiameter)?.label ?? String(inputs.nominalDiameter);

  const flowUnitLabel: Record<string, string> = {
    GPM: 'GPM',
    LPM: 'L/min',
    m3h: 'm³/h',
  };

  const lossUnitLabel: Record<string, string> = {
    PSI: 'psi',
    FT: 'ft (head)',
    M: 'm (head)',
    BAR: 'bar',
  };

  const rows: RecapRow[] = useMemo(() => [
    { label: 'Flow Rate', value: `${inputs.flowRate} ${flowUnitLabel[inputs.flowRateUnit]}` },
    { label: 'Viscosity', value: `${inputs.viscosity} cP` },
    { label: 'Temperature', value: `${inputs.temperature} °C` },
    { label: 'Specific Gravity', value: String(inputs.specificGravity) },
    { label: 'Pipe Diameter', value: pipeLabel },
    { label: 'Pipe Length', value: `${inputs.pipeLength} ${inputs.pipeLengthUnit}` },
    { label: '45° Elbows', value: String(inputs.elbows45) },
    { label: '90° Elbows', value: String(inputs.elbows90) },
    { label: 'Ball Valves', value: String(inputs.ballValves) },
    { label: 'Butterfly Valves', value: String(inputs.butterflyValves) },
    { label: 'Rise', value: `${inputs.elevationChange} ${inputs.elevationUnit}` },
    ...(inputs.additionalLoss > 0 ? [{ label: 'Additional Loss', value: `${inputs.additionalLoss} ${lossUnitLabel[inputs.additionalLossUnit] ?? inputs.additionalLossUnit}` }] : []),
    { label: 'Results', value: '', section: true },
    { label: 'Total Head Loss', value: `${outputs.totalHeadLossFt.toFixed(2)} ft (${outputs.totalHeadLossM.toFixed(2)} m)`, bold: true },
    { label: 'Total Pressure Loss', value: `${outputs.totalPressureLossPsi.toFixed(2)} psi (${outputs.totalPressureLossBar.toFixed(3)} bar)`, bold: true },
    { label: 'Velocity', value: `${outputs.velocityMs.toFixed(2)} m/s (${outputs.velocityFts.toFixed(2)} ft/s)` },
    { label: 'Reynolds Number', value: outputs.reynoldsNumber.toLocaleString() },
    { label: 'Flow Regime', value: outputs.flowRegime },
  ], [inputs, outputs, pipeLabel]);

  return (
    <RecapSection title="Friction Loss Calculator" rows={rows} accentColor={ACCENT} />
  );
}
