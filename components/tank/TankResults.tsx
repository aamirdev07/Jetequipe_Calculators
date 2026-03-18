'use client';

import React from 'react';
import { Stack, Chip, Alert, Grid, Paper, Typography, alpha } from '@mui/material';
import ResultCard from '@/components/shared/ResultCard';
import { TankOutputs, UnitSystem } from '@/lib/types';
import { getRatioStatus } from '@/lib/calculations/tank';

interface TankResultsProps {
  outputs: TankOutputs;
  unitSystem: UnitSystem;
}

const BLUE = '#0072CE';
const GREEN = '#00A859';

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

  const ratioChipColor: Record<string, string> = {
    success: '#2E7D32',
    warning: '#ED6C02',
    error: '#D32F2F',
  };

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={6}>
        <ResultCard label="Cylinder Height" value={outputs.cylinderHeight.toLocaleString()} unit={lenUnit} compact accentColor={BLUE} />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Height" value={outputs.totalHeight.toLocaleString()} unit={lenUnit} compact accentColor={GREEN} />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Liquid Height" value={outputs.liquidHeight.toLocaleString()} unit={lenUnit} compact accentColor={BLUE} />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Volume" value={outputs.totalVolume.toLocaleString()} unit={volUnit} compact accentColor={GREEN} />
      </Grid>
      <Grid item xs={6}>
        <ResultCard label="Total Volume" value={outputs.totalVolumeM3.toFixed(4)} unit="m³" compact />
      </Grid>
      <Grid item xs={6}>
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            borderColor: alpha(ratioChipColor[ratioInfo.color] || BLUE, 0.2),
            bgcolor: alpha(ratioChipColor[ratioInfo.color] || BLUE, 0.02),
            height: '100%',
          }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5} sx={{ fontSize: '0.65rem' }}>
            H/ID Ratio
          </Typography>
          <Typography variant="body1" fontWeight={700} sx={{ mt: 0.25, fontSize: '1rem', color: ratioChipColor[ratioInfo.color] || BLUE }}>
            {outputs.hdRatio}
          </Typography>
          <Chip
            label={ratioInfo.label}
            size="small"
            sx={{
              mt: 0.5,
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#fff',
              bgcolor: ratioChipColor[ratioInfo.color],
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
