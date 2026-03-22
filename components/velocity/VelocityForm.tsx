'use client';

import React from 'react';
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  alpha,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SectionTitle from '@/components/shared/SectionTitle';
import InputField from '@/components/shared/InputField';
import { VelocityInputs, VelocityFlowUnit } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';

interface VelocityFormProps {
  inputs: VelocityInputs;
  onChange: (inputs: VelocityInputs) => void;
}

export const VELOCITY_DEFAULTS: VelocityInputs = {
  flowRate: 10,
  flowRateUnit: 'GPM',
  nominalDiameter: 2.0,
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
            <MenuItem value="GPM">GPM</MenuItem>
            <MenuItem value="m3h">m³/h</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Nominal Sanitary Pipe Diameter"
            value={inputs.nominalDiameter}
            onChange={(e) => update({ nominalDiameter: parseFloat(e.target.value) })}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          >
            {PIPE_SIZES.map((p) => (
              <MenuItem key={p.nominal_in} value={p.nominal_in}>
                {p.label} (ID: {p.id_in}″)
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <SectionTitle title="Sanitary Tube Reference" />
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 1.5 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: alpha('#00A859', 0.06) }}>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Tube OD</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Tube ID (in)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Wall (in)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PIPE_SIZES.map((p) => (
              <TableRow
                key={p.nominal_in}
                selected={p.nominal_in === inputs.nominalDiameter}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: alpha('#00A859', 0.08),
                  },
                }}
              >
                <TableCell sx={{ fontSize: '0.8rem', py: 0.5 }}>{p.label}</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.8rem', py: 0.5, fontWeight: p.nominal_in === inputs.nominalDiameter ? 700 : 400 }}>
                  {p.id_in}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '0.8rem', py: 0.5 }}>
                  {p.wall_in}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
