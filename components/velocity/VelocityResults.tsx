'use client';

import React from 'react';
import { Stack, Grid, Chip, Alert, Typography, Paper } from '@mui/material';
import { VelocityOutputs } from '@/lib/types';

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

  const chipColor =
    outputs.cipStatus === 'in-range' ? 'success' :
    outputs.cipStatus === 'below' ? 'warning' : 'error';

  const cipMessage =
    outputs.cipStatus === 'in-range'
      ? 'Velocity is within the recommended CIP range (5–7 ft/s)'
      : outputs.cipStatus === 'below'
      ? 'Velocity is below the CIP minimum of 5 ft/s'
      : 'Velocity exceeds the CIP maximum of 7 ft/s';

  return (
    <Stack spacing={2}>
      {/* Main velocity display */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
          Fluid Velocity
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h3" fontWeight={700} color="primary.main">
              {outputs.velocityMs.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              m/s
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" fontWeight={700} color="primary.main">
              {outputs.velocityFts.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              ft/s
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* CIP Indicator */}
      <Alert
        severity={chipColor === 'success' ? 'success' : chipColor === 'warning' ? 'warning' : 'error'}
        icon={false}
        sx={{ alignItems: 'center' }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Chip
            label={outputs.cipLabel}
            color={chipColor}
            size="small"
            sx={{ fontWeight: 700 }}
          />
          <Typography variant="body2" fontWeight={500}>
            {cipMessage}
          </Typography>
        </Stack>
      </Alert>
    </Stack>
  );
}
