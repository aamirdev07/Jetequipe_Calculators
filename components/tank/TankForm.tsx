'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UnitToggle from '@/components/shared/UnitToggle';
import SliderInput from '@/components/shared/SliderInput';
import { TankInputs, UnitSystem } from '@/lib/types';

interface TankFormProps {
  inputs: TankInputs;
  onChange: (inputs: TankInputs) => void;
}

const DEFAULTS_METRIC: TankInputs = {
  unitSystem: 'metric',
  innerDiameter: 1000,
  totalVolume: 1000,
  coneAngle: 60,
  fillPercentage: 80,
};

const DEFAULTS_IMPERIAL: TankInputs = {
  unitSystem: 'imperial',
  innerDiameter: 39.4,
  totalVolume: 264.2,
  coneAngle: 60,
  fillPercentage: 80,
};

export { DEFAULTS_METRIC as TANK_DEFAULTS_METRIC, DEFAULTS_IMPERIAL as TANK_DEFAULTS_IMPERIAL };

export default function TankForm({ inputs, onChange }: TankFormProps) {
  const isMetric = inputs.unitSystem === 'metric';

  const handleUnitChange = (newUnit: UnitSystem) => {
    if (newUnit === 'metric') {
      onChange({
        ...inputs,
        unitSystem: 'metric',
        innerDiameter: parseFloat((inputs.innerDiameter * 25.4).toFixed(1)),
        totalVolume: parseFloat((inputs.totalVolume * 3.785411784).toFixed(1)),
      });
    } else {
      onChange({
        ...inputs,
        unitSystem: 'imperial',
        innerDiameter: parseFloat((inputs.innerDiameter / 25.4).toFixed(2)),
        totalVolume: parseFloat((inputs.totalVolume / 3.785411784).toFixed(1)),
      });
    }
  };

  const handleReset = () => {
    onChange(isMetric ? DEFAULTS_METRIC : DEFAULTS_IMPERIAL);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <UnitToggle value={inputs.unitSystem} onChange={handleUnitChange} />
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          sx={{ color: 'text.secondary', borderColor: 'divider' }}
        >
          Reset
        </Button>
      </Box>

      <SliderInput
        label="Inner Diameter (ID)"
        value={inputs.innerDiameter}
        onChange={(v) => onChange({ ...inputs, innerDiameter: v })}
        min={isMetric ? 0 : 0}
        max={isMetric ? 10000 : 394}
        step={isMetric ? 10 : 0.1}
        unit={isMetric ? 'mm' : 'in'}
        tooltipText="Internal diameter of the cylindrical tank body"
      />

      <SliderInput
        label="Total Volume"
        value={inputs.totalVolume}
        onChange={(v) => onChange({ ...inputs, totalVolume: v })}
        min={0}
        max={isMetric ? 100000 : 26417}
        step={isMetric ? 10 : 1}
        unit={isMetric ? 'L' : 'gal'}
        tooltipText="Total tank volume (working volume = total volume × fill %)"
      />

      <SliderInput
        label="Cone Angle (φ)"
        value={inputs.coneAngle}
        onChange={(v) => onChange({ ...inputs, coneAngle: v })}
        min={10}
        max={180}
        step={1}
        unit="°"
        tooltipText="Full cone angle at the bottom of the tank. 180° = flat bottom (standard cylinder)"
      />

      <SliderInput
        label="Fill Percentage"
        value={inputs.fillPercentage}
        onChange={(v) => onChange({ ...inputs, fillPercentage: v })}
        min={0}
        max={100}
        step={1}
        unit="%"
        tooltipText="Liquid fill level as a percentage of total tank volume"
      />
    </Box>
  );
}
