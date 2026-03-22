'use client';

import React from 'react';
import { Stack, Grid, Chip, Alert, Typography, Paper, alpha } from '@mui/material';
import { VelocityOutputs } from '@/lib/types';

const ACCENT = '#00A859';

interface VelocityResultsProps {
  outputs: VelocityOutputs;
}

export default function VelocityResults({ outputs }: VelocityResultsProps) {
  if (outputs.error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {outputs.error}
      </Alert>
    );
  }

  // CIP color rules:
  // below 5 ft/s → orange (warning) — "Not recommended"
  // 5-7 ft/s → green (success) — "Minimum recommended range"
  // above 7 ft/s → green (success) — "Above minimum"
  const chipColor =
    outputs.cipStatus === 'below' ? 'warning' : 'success';

  const cipMessage =
    outputs.cipStatus === 'below'
      ? 'Below CIP minimum (5 ft/s) — Not recommended'
      : outputs.cipStatus === 'in-range'
      ? 'Within CIP range (5–7 ft/s) — Minimum recommended'
      : 'Above CIP minimum (> 7 ft/s)';

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          p: 2.5,
          bgcolor: alpha(ACCENT, 0.04),
          border: `1px solid ${alpha(ACCENT, 0.15)}`,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5} sx={{ mb: 1.5, display: 'block', fontSize: '0.65rem' }}>
          Fluid Velocity
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" fontWeight={700} color={ACCENT} sx={{ fontSize: '1.75rem' }}>
              {outputs.velocityMs.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              m/s
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" fontWeight={700} color={ACCENT} sx={{ fontSize: '1.75rem' }}>
              {outputs.velocityFts.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              ft/s
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Alert
        severity={chipColor === 'success' ? 'success' : 'warning'}
        icon={false}
        sx={{ alignItems: 'center', py: 1 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            label={outputs.cipLabel}
            color={chipColor}
            size="small"
            sx={{ fontWeight: 700, height: 24 }}
          />
          <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
            {cipMessage}
          </Typography>
        </Stack>
      </Alert>
    </Stack>
  );
}
