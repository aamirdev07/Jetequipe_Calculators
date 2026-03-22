'use client';

import React from 'react';
import { Stack, Grid, Chip, Alert, Typography, Paper, alpha } from '@mui/material';
import ResultCard from '@/components/shared/ResultCard';
import { FrictionOutputs } from '@/lib/types';
import { mToFt } from '@/lib/conversions';

const ACCENT = '#7C3AED';

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
      {/* Primary result with accent background */}
      <Paper
        sx={{
          p: 2.5,
          bgcolor: alpha(ACCENT, 0.04),
          border: `1px solid ${alpha(ACCENT, 0.15)}`,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5} sx={{ mb: 1.5, display: 'block', fontSize: '0.65rem' }}>
          Total Loss
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={700} color={ACCENT} sx={{ fontSize: '1.5rem' }}>
              {outputs.totalHeadLossFt.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ft (head) | {outputs.totalHeadLossM.toFixed(2)} m
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={700} color={ACCENT} sx={{ fontSize: '1.5rem' }}>
              {outputs.totalPressureLossPsi.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              psi | {outputs.totalPressureLossBar.toFixed(3)} bar
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <ResultCard
            label="Velocity"
            value={`${outputs.velocityMs.toFixed(2)} m/s`}
            unit={`(${outputs.velocityFts.toFixed(2)} ft/s)`}
            compact
            accentColor="#0072CE"
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
          <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5} sx={{ fontSize: '0.65rem' }}>
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

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing={0.5} color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.65rem' }}>
          Loss Breakdown
        </Typography>
        <Stack spacing={0.5}>
          <LossRow label="Major loss (pipe friction)" value={outputs.majorLossM} />
          <LossRow label="Minor loss (fittings)" value={outputs.minorLossM} />
          <LossRow label="Static head (rise)" value={outputs.staticHeadM} />
          <LossRow label="Additional losses" value={outputs.additionalLossM} />
        </Stack>
      </Paper>
    </Stack>
  );
}

function LossRow({ label, value }: { label: string; value: number }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
        {value.toFixed(4)} m ({mToFt(value).toFixed(4)} ft)
      </Typography>
    </Stack>
  );
}
