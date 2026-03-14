'use client';

import React from 'react';
import { Stack, Chip, Alert, Typography, Paper, alpha } from '@mui/material';
import { NpshOutputs, UnitSystem } from '@/lib/types';

const ACCENT = '#E65100';

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

  const resultColor =
    outputs.riskLevel === 'adequate' ? '#2E7D32' :
    outputs.riskLevel === 'low' ? '#ED6C02' : '#D32F2F';

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          p: 2.5,
          bgcolor: alpha(resultColor, 0.04),
          border: `1px solid ${alpha(resultColor, 0.15)}`,
          borderRadius: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5} sx={{ display: 'block', fontSize: '0.65rem' }}>
          NPSHa (Net Positive Suction Head Available)
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ my: 0.75, fontSize: '1.75rem', color: resultColor }}>
          {outputs.npsha.toFixed(2)} {unit}
        </Typography>
        <Chip
          label={outputs.riskLabel}
          color={chipColor}
          size="small"
          sx={{ fontWeight: 600, height: 24 }}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing={0.5} color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.65rem' }}>
          Calculation Breakdown
        </Typography>
        <Stack spacing={0.75}>
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
            label="Static head (Δz)"
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
            <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.85rem' }}>
              = NPSHa
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.85rem', color: resultColor }}>
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
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.25 }}>
      <Stack direction="row" alignItems="center" spacing={0.75}>
        <Typography
          variant="body2"
          fontWeight={700}
          color={sign === '+' ? 'success.main' : 'error.main'}
          sx={{ width: 14, textAlign: 'center', fontSize: '0.85rem' }}
        >
          {sign}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          {label}
          {note && (
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: '0.7rem' }}>
              ({note})
            </Typography>
          )}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
        {value.toFixed(2)} {unit}
      </Typography>
    </Stack>
  );
}
