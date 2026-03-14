'use client';

import React from 'react';
import { Grid, MenuItem, TextField, Button, Stack } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UnitToggle from '@/components/shared/UnitToggle';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import { NpshInputs, UnitSystem } from '@/lib/types';
import { FLUID_PRESETS } from '@/lib/config/fluidData';

interface NpshFormProps {
  inputs: NpshInputs;
  onChange: (inputs: NpshInputs) => void;
}

export const NPSH_DEFAULTS_IMPERIAL: NpshInputs = {
  unitSystem: 'imperial',
  atmosphericPressure: 14.7,
  sourcePressure: 0,
  staticHeight: 0,
  frictionLoss: 0,
  vaporPressure: 0.34,
  specificGravity: 1.0,
};

export const NPSH_DEFAULTS_METRIC: NpshInputs = {
  unitSystem: 'metric',
  atmosphericPressure: 1.01325,
  sourcePressure: 0,
  staticHeight: 0,
  frictionLoss: 0,
  vaporPressure: 0.0234,
  specificGravity: 1.0,
};

export default function NpshForm({ inputs, onChange }: NpshFormProps) {
  const isMetric = inputs.unitSystem === 'metric';
  const pressUnit = isMetric ? 'bar' : 'psi';
  const lenUnit = isMetric ? 'm' : 'ft';

  const handleUnitChange = (newUnit: UnitSystem) => {
    // Reset to proper defaults when switching units to avoid floating-point drift
    if (newUnit === 'metric') {
      onChange(NPSH_DEFAULTS_METRIC);
    } else {
      onChange(NPSH_DEFAULTS_IMPERIAL);
    }
  };

  const handleFluidPreset = (index: number) => {
    const preset = FLUID_PRESETS[index];
    if (preset.label === 'Custom') return;
    onChange({
      ...inputs,
      vaporPressure: isMetric ? preset.vaporPressureBar : preset.vaporPressurePsi,
      specificGravity: preset.specificGravity,
    });
  };

  const handleReset = () => {
    onChange(isMetric ? NPSH_DEFAULTS_METRIC : NPSH_DEFAULTS_IMPERIAL);
  };

  return (
    <Stack spacing={0}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
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
      </Stack>

      <SectionTitle title="Fluid Preset" subtitle="Select a common fluid to auto-fill vapor pressure and SG" />
      <TextField
        select
        label="Common Fluids"
        fullWidth
        size="small"
        defaultValue=""
        onChange={(e) => handleFluidPreset(parseInt(e.target.value))}
        sx={{ mb: 2 }}
      >
        {FLUID_PRESETS.map((preset, i) => (
          <MenuItem key={preset.label} value={i} disabled={preset.label === 'Custom'}>
            {preset.label}
            {preset.label !== 'Custom' && ` (VP: ${isMetric ? preset.vaporPressureBar : preset.vaporPressurePsi} ${pressUnit}, SG: ${preset.specificGravity})`}
          </MenuItem>
        ))}
      </TextField>

      <SectionTitle title="System Pressures" />
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <InputField
            label="Atmospheric Pressure"
            value={inputs.atmosphericPressure}
            onChange={(v) => onChange({ ...inputs, atmosphericPressure: v })}
            unit={pressUnit}
            min={0}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label="Source Pressure (gauge)"
            value={inputs.sourcePressure}
            onChange={(v) => onChange({ ...inputs, sourcePressure: v })}
            unit={pressUnit}
            helperText="0 for open/vented tank"
          />
        </Grid>
      </Grid>

      <SectionTitle title="Suction Line" />
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <InputField
            label="Static Height (Δz)"
            value={inputs.staticHeight}
            onChange={(v) => onChange({ ...inputs, staticHeight: v })}
            unit={lenUnit}
            helperText="Positive = suction lift, Negative = flooded"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label="Friction Loss in Suction Pipe"
            value={inputs.frictionLoss}
            onChange={(v) => onChange({ ...inputs, frictionLoss: v })}
            unit={lenUnit}
            min={0}
          />
        </Grid>
      </Grid>

      <SectionTitle title="Fluid Properties" />
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <InputField
            label="Vapor Pressure"
            value={inputs.vaporPressure}
            onChange={(v) => onChange({ ...inputs, vaporPressure: v })}
            unit={pressUnit}
            min={0}
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="Specific Gravity"
            value={inputs.specificGravity}
            onChange={(v) => onChange({ ...inputs, specificGravity: v })}
            min={0}
            error={inputs.specificGravity <= 0}
            helperText={inputs.specificGravity <= 0 ? 'Must be > 0' : ''}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
