'use client';

import React from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import FittingsInput from './FittingsInput';
import { FrictionInputs, FlowRateUnit, LengthUnit, AdditionalLossUnit } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';

interface FrictionFormProps {
  inputs: FrictionInputs;
  onChange: (inputs: FrictionInputs) => void;
}

export const FRICTION_DEFAULTS: FrictionInputs = {
  flowRate: 50,
  flowRateUnit: 'GPM',
  viscosity: 1,
  temperature: 20,
  specificGravity: 1.0,
  nominalDiameter: 2.0,
  pipeLength: 100,
  pipeLengthUnit: 'ft',
  elbows45: 0,
  elbows90: 0,
  ballValves: 0,
  butterflyValves: 0,
  elevationChange: 0,
  elevationUnit: 'ft',
  additionalLoss: 0,
  additionalLossUnit: 'PSI',
};

export default function FrictionForm({ inputs, onChange }: FrictionFormProps) {
  const update = (partial: Partial<FrictionInputs>) => {
    onChange({ ...inputs, ...partial });
  };

  const handleReset = () => {
    onChange(FRICTION_DEFAULTS);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
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

      {/* Fluid Properties */}
      <SectionTitle title="Fluid Properties" />
      <Grid container spacing={1.5}>
        <Grid item xs={8}>
          <InputField
            label="Flow Rate (Q)"
            value={inputs.flowRate}
            onChange={(v) => update({ flowRate: v })}
            min={0}
            error={inputs.flowRate <= 0}
            helperText={inputs.flowRate <= 0 ? 'Must be > 0' : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Unit"
            value={inputs.flowRateUnit}
            onChange={(e) => update({ flowRateUnit: e.target.value as FlowRateUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="GPM">GPM</MenuItem>
            <MenuItem value="LPM">L/min</MenuItem>
            <MenuItem value="m3h">m³/h</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="Viscosity (μ)"
            value={inputs.viscosity}
            onChange={(v) => update({ viscosity: v })}
            unit="cP"
            min={0}
            error={inputs.viscosity <= 0}
            helperText={inputs.viscosity <= 0 ? 'Must be > 0' : ''}
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="Temperature"
            value={inputs.temperature}
            onChange={(v) => update({ temperature: v })}
            unit="°C"
            helperText="Reference only — adjust viscosity for temperature"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label="Specific Gravity (SG)"
            value={inputs.specificGravity}
            onChange={(v) => update({ specificGravity: v })}
            min={0}
            error={inputs.specificGravity <= 0}
            helperText={inputs.specificGravity <= 0 ? 'Must be > 0' : ''}
          />
        </Grid>
      </Grid>

      {/* Pipe Configuration */}
      <SectionTitle title="Pipe Configuration" />
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <TextField
            select
            label="Nominal Pipe Diameter"
            value={inputs.nominalDiameter}
            onChange={(e) => update({ nominalDiameter: parseFloat(e.target.value) })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            {PIPE_SIZES.map((p) => (
              <MenuItem key={p.nominal_in} value={p.nominal_in}>
                {p.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <InputField
            label="Straight Pipe Length (L)"
            value={inputs.pipeLength}
            onChange={(v) => update({ pipeLength: v })}
            min={0}
            error={inputs.pipeLength < 0}
            helperText={inputs.pipeLength < 0 ? 'Cannot be negative' : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Unit"
            value={inputs.pipeLengthUnit}
            onChange={(e) => update({ pipeLengthUnit: e.target.value as LengthUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="ft">ft</MenuItem>
            <MenuItem value="m">m</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Fittings & Valves */}
      <SectionTitle title="Fittings &amp; Valves" />
      <FittingsInput
        elbows45={inputs.elbows45}
        elbows90={inputs.elbows90}
        ballValves={inputs.ballValves}
        butterflyValves={inputs.butterflyValves}
        onChange={(field, value) => update({ [field]: value })}
      />

      {/* Rise & Additional Losses */}
      <SectionTitle title="Rise &amp; Additional Losses" />
      <Grid container spacing={1.5}>
        <Grid item xs={8}>
          <InputField
            label="Rise (Δz)"
            value={inputs.elevationChange}
            onChange={(v) => update({ elevationChange: v })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Unit"
            value={inputs.elevationUnit}
            onChange={(e) => update({ elevationUnit: e.target.value as LengthUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="ft">ft</MenuItem>
            <MenuItem value="m">m</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="Additional Loss"
            value={inputs.additionalLoss}
            onChange={(v) => update({ additionalLoss: v })}
            min={0}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Loss Unit"
            value={inputs.additionalLossUnit}
            onChange={(e) => update({ additionalLossUnit: e.target.value as AdditionalLossUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="PSI">psi</MenuItem>
            <MenuItem value="FT">ft (head)</MenuItem>
            <MenuItem value="M">m (head)</MenuItem>
            <MenuItem value="BAR">bar</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
