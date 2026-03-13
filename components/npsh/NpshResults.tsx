'use client';

import React from 'react';
import { Stack, Grid, Chip, Alert, Typography, Paper } from '@mui/material';
import { NpshOutputs, UnitSystem } from '@/lib/types';

interface NpshResultsProps {
  outputs: NpshOutputs;
  unitSystem: UnitSystem;
}

export default function NpshResults({ outputs, unitSystem }: NpshResultsProps) {
  if (outputs.error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {outputs.error}
      </Alert>
    );
  }

  const unit = unitSystem === 'imperial' ? 'ft' : 'm';
  const chipColor =
    outputs.riskLevel === 'adequate' ? 'success' :
    outputs.riskLevel === 'low' ? 'warning' : 'error';

  return (
    <Stack spacing={2}>
      {/* Main NPSHa result */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={600} sx={{ display: 'block' }}>
          NPSHa (Net Positive Suction Head Available)
        </Typography>
        <Typography variant="h3" fontWeight={700} color={`${chipColor}.main`} sx={{ my: 1 }}>
          {outputs.npsha.toFixed(2)} {unit}
        </Typography>
        <Chip
          label={outputs.riskLabel}
          color={chipColor}
          sx={{ fontWeight: 600 }}
        />
      </Paper>

      {/* Breakdown */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Calculation Breakdown
        </Typography>
        <Stack spacing={1}>
          <BreakdownRow
            sign="+"
            label="Atmospheric pressure head (ha)"
            value={outputs.atmosphericHead}
            unit={unit}
          />
          <BreakdownRow
            sign="+"
            label="Source pressure head"
            value={outputs.sourceHead}
            unit={unit}
          />
          <BreakdownRow
            sign={outputs.staticHead >= 0 ? '+' : '−'}
            label={'Static head (Δz)'}
            value={Math.abs(outputs.staticHead)}
            unit={unit}
            note={outputs.staticHead >= 0 ? 'flooded suction' : 'suction lift'}
          />
          <BreakdownRow
            sign="−"
            label="Friction loss (hf)"
            value={outputs.frictionHead}
            unit={unit}
          />
          <BreakdownRow
            sign="−"
            label="Vapor pressure head (hvp)"
            value={outputs.vaporHead}
            unit={unit}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pt: 1, mt: 0.5, borderTop: '2px solid', borderColor: 'divider' }}
          >
            <Typography variant="body2" fontWeight={700}>
              = NPSHa
            </Typography>
            <Typography variant="body1" fontWeight={700} color={`${chipColor}.main`}>
              {outputs.npsha.toFixed(2)} {unit}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

function BreakdownRow({
  sign,
  label,
  value,
  unit,
  note,
}: {
  sign: string;
  label: string;
  value: number;
  unit: string;
  note?: string;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          variant="body2"
          fontWeight={700}
          color={sign === '+' ? 'success.main' : 'error.main'}
          sx={{ width: 16, textAlign: 'center' }}
        >
          {sign}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
          {note && (
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              ({note})
            </Typography>
          )}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight={600}>
        {value.toFixed(2)} {unit}
      </Typography>
    </Stack>
  );
}
