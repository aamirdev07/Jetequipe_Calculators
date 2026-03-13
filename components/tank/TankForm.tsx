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
  workingVolume: 1000,
  coneAngle: 60,
};

const DEFAULTS_IMPERIAL: TankInputs = {
  unitSystem: 'imperial',
  innerDiameter: 39.4,
  workingVolume: 264.2,
  coneAngle: 60,
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
        workingVolume: parseFloat((inputs.workingVolume * 3.785411784).toFixed(1)),
      });
    } else {
      onChange({
        ...inputs,
        unitSystem: 'imperial',
        innerDiameter: parseFloat((inputs.innerDiameter / 25.4).toFixed(2)),
        workingVolume: parseFloat((inputs.workingVolume / 3.785411784).toFixed(1)),
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
        min={isMetric ? 200 : 8}
        max={isMetric ? 4000 : 157}
        step={isMetric ? 10 : 0.1}
        unit={isMetric ? 'mm' : 'in'}
        tooltipText="Internal diameter of the cylindrical tank body"
      />

      <SliderInput
        label="Working Volume"
        value={inputs.workingVolume}
        onChange={(v) => onChange({ ...inputs, workingVolume: v })}
        min={isMetric ? 10 : 3}
        max={isMetric ? 70000 : 18500}
        step={isMetric ? 10 : 1}
        unit={isMetric ? 'L' : 'gal'}
        tooltipText="Usable volume (80% of total tank volume; 20% headspace)"
      />

      <SliderInput
        label="Cone Angle (\u03C6)"
        value={inputs.coneAngle}
        onChange={(v) => onChange({ ...inputs, coneAngle: v })}
        min={10}
        max={170}
        step={1}
        unit="\u00B0"
        tooltipText="Full cone angle at the bottom of the tank (typically 60\u00B0 for sanitary tanks)"
      />
    </Box>
  );
}
