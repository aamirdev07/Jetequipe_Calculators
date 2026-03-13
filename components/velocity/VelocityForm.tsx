'use client';

import React from 'react';
import { Box, Grid, MenuItem, TextField, Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import { VelocityInputs, VelocityFlowUnit, VelocityDiameterUnit } from '@/lib/types';

interface VelocityFormProps {
  inputs: VelocityInputs;
  onChange: (inputs: VelocityInputs) => void;
}

export const VELOCITY_DEFAULTS: VelocityInputs = {
  flowRate: 10,
  flowRateUnit: 'm3h',
  pipeDiameter: 51,
  pipeDiameterUnit: 'mm',
};

export default function VelocityForm({ inputs, onChange }: VelocityFormProps) {
  const update = (partial: Partial<VelocityInputs>) => {
    onChange({ ...inputs, ...partial });
  };

  const handleReset = () => {
    onChange(VELOCITY_DEFAULTS);
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

      <SectionTitle title="Flow &amp; Pipe Parameters" />

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
            onChange={(e) => update({ flowRateUnit: e.target.value as VelocityFlowUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="m3h">m\u00B3/h</MenuItem>
            <MenuItem value="Lmin">L/min</MenuItem>
            <MenuItem value="Ls">L/s</MenuItem>
            <MenuItem value="GPM">GPM</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <InputField
            label="Pipe Diameter (D)"
            value={inputs.pipeDiameter}
            onChange={(v) => update({ pipeDiameter: v })}
            min={0}
            error={inputs.pipeDiameter <= 0}
            helperText={inputs.pipeDiameter <= 0 ? 'Must be > 0' : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Unit"
            value={inputs.pipeDiameterUnit}
            onChange={(e) => update({ pipeDiameterUnit: e.target.value as VelocityDiameterUnit })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            <MenuItem value="mm">mm</MenuItem>
            <MenuItem value="in">in</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
