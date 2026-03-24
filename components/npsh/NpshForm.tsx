'use client';

import React, { useState } from 'react';
import {
  Grid,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  alpha,
  Chip,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnitToggle from '@/components/shared/UnitToggle';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import { NpshInputs, NpshPressureInputUnit, UnitSystem } from '@/lib/types';
import { FLUID_PRESETS } from '@/lib/config/fluidData';

const ACCENT = '#E65100';

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

const CUSTOM_INDEX = FLUID_PRESETS.findIndex((p) => p.label === 'Custom');

export default function NpshForm({ inputs, onChange }: NpshFormProps) {
  const isMetric = inputs.unitSystem === 'metric';
  const pressUnit = inputs.pressureInputUnit;
  const lenUnit = isMetric ? 'm' : 'ft';
  const vpUnit = isMetric ? 'bar' : 'psi';

  const [selectedFluid, setSelectedFluid] = useState<number>(0);
  const isCustom = selectedFluid === CUSTOM_INDEX;

  const handleUnitChange = (newUnit: UnitSystem) => {
    setSelectedFluid(0);
    onChange(newUnit === 'metric' ? NPSH_DEFAULTS_METRIC : NPSH_DEFAULTS_IMPERIAL);
  };

  const handlePressureUnitChange = (_: React.MouseEvent, newUnit: NpshPressureInputUnit | null) => {
    if (!newUnit) return;
    if (isMetric) {
      if (newUnit === 'm') {
        const sg = inputs.specificGravity || 1;
        onChange({
          ...inputs,
          pressureInputUnit: 'm',
          atmosphericPressure: parseFloat((inputs.atmosphericPressure * 10.1972 / sg).toFixed(2)),
          sourcePressure: parseFloat((inputs.sourcePressure * 10.1972 / sg).toFixed(2)),
          vaporPressure: parseFloat((inputs.vaporPressure * 10.1972 / sg).toFixed(4)),
        });
      } else {
        onChange({ ...NPSH_DEFAULTS_METRIC, specificGravity: inputs.specificGravity });
      }
    } else {
      if (newUnit === 'ft') {
        const sg = inputs.specificGravity || 1;
        onChange({
          ...inputs,
          pressureInputUnit: 'ft',
          atmosphericPressure: parseFloat((inputs.atmosphericPressure * 2.31 / sg).toFixed(2)),
          sourcePressure: parseFloat((inputs.sourcePressure * 2.31 / sg).toFixed(2)),
          vaporPressure: parseFloat((inputs.vaporPressure * 2.31 / sg).toFixed(4)),
        });
      } else {
        onChange({ ...NPSH_DEFAULTS_IMPERIAL, specificGravity: inputs.specificGravity });
      }
    }
  };

  const selectPreset = (index: number) => {
    setSelectedFluid(index);
    const preset = FLUID_PRESETS[index];
    if (preset.label === 'Custom') return;

    let vp: number;
    if (pressUnit === 'psi') vp = preset.vaporPressurePsi;
    else if (pressUnit === 'bar') vp = preset.vaporPressureBar;
    else if (pressUnit === 'ft') vp = preset.vaporPressurePsi * 2.31 / preset.specificGravity;
    else vp = preset.vaporPressureBar * 10.1972 / preset.specificGravity;

    onChange({
      ...inputs,
      vaporPressure: parseFloat(vp.toFixed(4)),
      specificGravity: preset.specificGravity,
    });
  };

  const handleReset = () => {
    setSelectedFluid(0);
    onChange(isMetric ? NPSH_DEFAULTS_METRIC : NPSH_DEFAULTS_IMPERIAL);
  };

  const pressureOptions = isMetric
    ? [{ value: 'bar', label: 'bar' }, { value: 'm', label: 'm (head)' }]
    : [{ value: 'psi', label: 'psi' }, { value: 'ft', label: 'ft (head)' }];

  const presets = FLUID_PRESETS.filter((p) => p.label !== 'Custom');

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

      {/* ── Fluid Selection via Table ── */}
      <SectionTitle title="Fluid Properties" subtitle="Select a fluid to set vapor pressure and specific gravity" />
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(ACCENT, 0.06) }}>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', width: 28 }} />
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Fluid</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>VP ({vpUnit})</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>SG</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presets.map((preset, i) => {
              const active = selectedFluid === i;
              return (
                <TableRow
                  key={preset.label}
                  hover
                  onClick={() => selectPreset(i)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: active ? alpha(ACCENT, 0.07) : 'transparent',
                    '&:hover': { bgcolor: active ? alpha(ACCENT, 0.1) : alpha('#000', 0.03) },
                    transition: 'background-color 0.15s',
                  }}
                >
                  <TableCell sx={{ py: 0.5, px: 1, width: 28 }}>
                    {active && <CheckCircleIcon sx={{ fontSize: 16, color: ACCENT }} />}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', py: 0.5, fontWeight: active ? 600 : 400 }}>
                    {preset.label}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: '0.8rem', py: 0.5, fontWeight: active ? 700 : 400 }}
                  >
                    {isMetric ? preset.vaporPressureBar : preset.vaporPressurePsi}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.8rem', py: 0.5 }}>
                    {preset.specificGravity}
                  </TableCell>
                </TableRow>
              );
            })}
            {/* Custom row */}
            <TableRow
              hover
              onClick={() => selectPreset(CUSTOM_INDEX)}
              sx={{
                cursor: 'pointer',
                bgcolor: isCustom ? alpha(ACCENT, 0.07) : 'transparent',
                '&:hover': { bgcolor: isCustom ? alpha(ACCENT, 0.1) : alpha('#000', 0.03) },
                borderTop: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.15s',
              }}
            >
              <TableCell sx={{ py: 0.5, px: 1, width: 28 }}>
                {isCustom && <CheckCircleIcon sx={{ fontSize: 16, color: ACCENT }} />}
              </TableCell>
              <TableCell sx={{ fontSize: '0.8rem', py: 0.5, fontWeight: isCustom ? 600 : 400, fontStyle: isCustom ? 'normal' : 'italic' }}>
                Custom fluid
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '0.8rem', py: 0.5, color: isCustom ? 'text.primary' : 'text.disabled' }}>
                {isCustom ? inputs.vaporPressure : '—'}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '0.8rem', py: 0.5, color: isCustom ? 'text.primary' : 'text.disabled' }}>
                {isCustom ? inputs.specificGravity : '—'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom fluid inputs — only when custom is selected */}
      {isCustom && (
        <Grid container spacing={1.5} sx={{ mb: 1 }}>
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
      )}

      {/* Show selected values as a chip when using a preset */}
      {!isCustom && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            size="small"
            label={`VP: ${inputs.vaporPressure} ${pressUnit}`}
            sx={{ fontSize: '0.75rem', bgcolor: alpha(ACCENT, 0.08), fontWeight: 500 }}
          />
          <Chip
            size="small"
            label={`SG: ${inputs.specificGravity}`}
            sx={{ fontSize: '0.75rem', bgcolor: alpha(ACCENT, 0.08), fontWeight: 500 }}
          />
        </Stack>
      )}

      {/* ── System Pressures ── */}
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

      {/* ── Suction Line ── */}
      <SectionTitle title="Suction Line" />
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <InputField
            label="Static Height (Δz)"
            value={inputs.staticHeight}
            onChange={(v) => onChange({ ...inputs, staticHeight: v })}
            unit={lenUnit}
            helperText="Positive = flooded, Negative = suction lift"
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
    </Stack>
  );
}
