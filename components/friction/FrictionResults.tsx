'use client';

import React from 'react';
import { Stack, Grid, Chip, Alert, Typography, Paper } from '@mui/material';
import ResultCard from '@/components/shared/ResultCard';
import { FrictionOutputs } from '@/lib/types';
import { mToFt } from '@/lib/conversions';

interface FrictionResultsProps {
  outputs: FrictionOutputs;
}

export default function FrictionResults({ outputs }: FrictionResultsProps) {
  if (outputs.error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {outputs.error}
      </Alert>
    );
  }

  const regimeColor = outputs.flowRegime === 'Laminar' ? 'success' : outputs.flowRegime === 'Turbulent' ? 'warning' : 'info';

  return (
    <Stack spacing={2}>
      {/* Primary results */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
          Total Loss
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {outputs.totalHeadLossFt.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ft (head) | {outputs.totalHeadLossM.toFixed(2)} m
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {outputs.totalPressureLossPsi.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              psi | {outputs.totalPressureLossBar.toFixed(3)} bar
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Secondary results */}
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <ResultCard
            label="Velocity"
            value={`${outputs.velocityMs.toFixed(2)} m/s`}
            unit={`(${outputs.velocityFts.toFixed(2)} ft/s)`}
            compact
          />
        </Grid>
        <Grid item xs={6}>
          <ResultCard
            label="Reynolds Number"
            value={outputs.reynoldsNumber.toLocaleString()}
            compact
          />
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
              Flow Regime
            </Typography>
            <Stack sx={{ mt: 0.5 }}>
              <Chip label={outputs.flowRegime} color={regimeColor as 'success' | 'warning' | 'info'} size="small" />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <ResultCard
            label="Friction Factor (f)"
            value={outputs.frictionFactor.toFixed(6)}
            compact
          />
        </Grid>
      </Grid>

      {/* Loss breakdown */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Loss Breakdown
        </Typography>
        <Stack spacing={0.75}>
          <LossRow label="Major loss (pipe friction)" value={outputs.majorLossM} />
          <LossRow label="Minor loss (fittings)" value={outputs.minorLossM} />
          <LossRow label="Static head (elevation)" value={outputs.staticHeadM} />
          <LossRow label="Additional losses" value={outputs.additionalLossM} />
        </Stack>
      </Paper>
    </Stack>
  );
}

function LossRow({ label, value }: { label: string; value: number }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {value.toFixed(4)} m ({mToFt(value).toFixed(4)} ft)
      </Typography>
    </Stack>
  );
}
