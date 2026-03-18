'use client';

import React from 'react';
import { Grid, MenuItem, TextField, Button, Stack, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UnitToggle from '@/components/shared/UnitToggle';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import { NpshInputs, NpshPressureInputUnit, UnitSystem } from '@/lib/types';
import { FLUID_PRESETS } from '@/lib/config/fluidData';

interface NpshFormProps {
  inputs: NpshInputs;
  onChange: (inputs: NpshInputs) => void;
}

export const NPSH_DEFAULTS_IMPERIAL: NpshInputs = {
  unitSystem: 'imperial',
  pressureInputUnit: 'psi',
  atmosphericPressure: 14.7,
  sourcePressure: 0,
  staticHeight: 0,
  frictionLoss: 0,
  vaporPressure: 0.34,
  specificGravity: 1.0,
};

export const NPSH_DEFAULTS_METRIC: NpshInputs = {
  unitSystem: 'metric',
  pressureInputUnit: 'bar',
  atmosphericPressure: 1.01325,
  sourcePressure: 0,
  staticHeight: 0,
  frictionLoss: 0,
  vaporPressure: 0.0234,
  specificGravity: 1.0,
};

export default function NpshForm({ inputs, onChange }: NpshFormProps) {
  const isMetric = inputs.unitSystem === 'metric';
  const pressUnit = inputs.pressureInputUnit;
  const lenUnit = isMetric ? 'm' : 'ft';

  const handleUnitChange = (newUnit: UnitSystem) => {
    if (newUnit === 'metric') {
      onChange(NPSH_DEFAULTS_METRIC);
    } else {
      onChange(NPSH_DEFAULTS_IMPERIAL);
    }
  };

  const handlePressureUnitChange = (_: React.MouseEvent, newUnit: NpshPressureInputUnit | null) => {
    if (!newUnit) return;
    // Reset to defaults with the new pressure unit
    if (isMetric) {
      if (newUnit === 'm') {
        // Convert bar defaults to metres of head (approx: 1 bar ≈ 10.2 m / SG)
        const sg = inputs.specificGravity || 1;
        onChange({
          ...inputs,
          pressureInputUnit: 'm',
          atmosphericPressure: parseFloat((inputs.atmosphericPressure * 10.1972 / sg).toFixed(2)),
          sourcePressure: parseFloat((inputs.sourcePressure * 10.1972 / sg).toFixed(2)),
          vaporPressure: parseFloat((inputs.vaporPressure * 10.1972 / sg).toFixed(4)),
        });
      } else {
        // bar — reset to defaults
        onChange({ ...NPSH_DEFAULTS_METRIC, specificGravity: inputs.specificGravity });
      }
    } else {
      if (newUnit === 'ft') {
        // Convert psi to ft of head (approx: 1 psi ≈ 2.31 ft / SG)
        const sg = inputs.specificGravity || 1;
        onChange({
          ...inputs,
          pressureInputUnit: 'ft',
          atmosphericPressure: parseFloat((inputs.atmosphericPressure * 2.31 / sg).toFixed(2)),
          sourcePressure: parseFloat((inputs.sourcePressure * 2.31 / sg).toFixed(2)),
          vaporPressure: parseFloat((inputs.vaporPressure * 2.31 / sg).toFixed(4)),
        });
      } else {
        // psi — reset to defaults
        onChange({ ...NPSH_DEFAULTS_IMPERIAL, specificGravity: inputs.specificGravity });
      }
    }
  };

  const handleFluidPreset = (index: number) => {
    const preset = FLUID_PRESETS[index];
    if (preset.label === 'Custom') return;

    let vp: number;
    if (pressUnit === 'psi') {
      vp = preset.vaporPressurePsi;
    } else if (pressUnit === 'bar') {
      vp = preset.vaporPressureBar;
    } else if (pressUnit === 'ft') {
      vp = preset.vaporPressurePsi * 2.31 / preset.specificGravity;
    } else {
      // m
      vp = preset.vaporPressureBar * 10.1972 / preset.specificGravity;
    }

    onChange({
      ...inputs,
      vaporPressure: parseFloat(vp.toFixed(4)),
      specificGravity: preset.specificGravity,
    });
  };

  const handleReset = () => {
    onChange(isMetric ? NPSH_DEFAULTS_METRIC : NPSH_DEFAULTS_IMPERIAL);
  };

  const pressureOptions = isMetric
    ? [{ value: 'bar', label: 'bar' }, { value: 'm', label: 'm (head)' }]
    : [{ value: 'psi', label: 'psi' }, { value: 'ft', label: 'ft (head)' }];

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
            {preset.label !== 'Custom' && ` (VP: ${isMetric ? preset.vaporPressureBar : preset.vaporPressurePsi} ${isMetric ? 'bar' : 'psi'}, SG: ${preset.specificGravity})`}
          </MenuItem>
        ))}
      </TextField>

      <SectionTitle title="System Pressures" />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.75rem' }}>
          Pressure unit:
        </Typography>
        <ToggleButtonGroup
          value={pressUnit}
          exclusive
          onChange={handlePressureUnitChange}
          size="small"
        >
          {pressureOptions.map((opt) => (
            <ToggleButton key={opt.value} value={opt.value} sx={{ py: 0.25, px: 1.5, fontSize: '0.75rem' }}>
              {opt.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
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
