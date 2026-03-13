'use client';

import React from 'react';
import { Stack, Chip, Alert, Grid, Paper, Typography } from '@mui/material';
import ResultCard from '@/components/shared/ResultCard';
import { TankOutputs, UnitSystem } from '@/lib/types';
import { getRatioStatus } from '@/lib/calculations/tank';

interface TankResultsProps {
  outputs: TankOutputs;
  unitSystem: UnitSystem;
}

export default function TankResults({ outputs, unitSystem }: TankResultsProps) {
  if (outputs.error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {outputs.error}
      </Alert>
    );
  }

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'mm' : 'in';
  const volUnit = isMetric ? 'L' : 'gal';
  const ratioInfo = getRatioStatus(outputs.hdRatio);
  const ratioChipColor = ratioInfo.color === 'default' ? 'primary' : ratioInfo.color;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={6}>
        <ResultCard label="Cylinder Height" value={outputs.cylinderHeight.toLocaleString()} unit={lenUnit} compact />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Cone Height" value={outputs.coneHeight.toLocaleString()} unit={lenUnit} compact />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Height" value={outputs.totalHeight.toLocaleString()} unit={lenUnit} compact />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Volume" value={outputs.totalVolume.toLocaleString()} unit={volUnit} compact />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Volume" value={outputs.totalVolumeM3} unit={'\u00B3'} compact />
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined" sx={{ p: 1.5 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
            H/ID Ratio
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
            {outputs.hdRatio}
          </Typography>
          <Chip
            label={ratioInfo.label}
            color={ratioChipColor as 'primary' | 'warning' | 'error'}
            variant="outlined"
            size="small"
            sx={{ mt: 0.5 }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
