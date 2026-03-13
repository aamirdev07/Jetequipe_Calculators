'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import InputField from '@/components/shared/InputField';

interface FittingsInputProps {
  elbows45: number;
  elbows90: number;
  ballValves: number;
  butterflyValves: number;
  onChange: (field: string, value: number) => void;
}

export default function FittingsInput({
  elbows45,
  elbows90,
  ballValves,
  butterflyValves,
  onChange,
}: FittingsInputProps) {
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={6}>
        <InputField
          label="45\u00B0 Elbows"
          value={elbows45}
          onChange={(v) => onChange('elbows45', v)}
          type="integer"
          min={0}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label="90\u00B0 Elbows"
          value={elbows90}
          onChange={(v) => onChange('elbows90', v)}
          type="integer"
          min={0}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label="Ball Valves"
          value={ballValves}
          onChange={(v) => onChange('ballValves', v)}
          type="integer"
          min={0}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label="Butterfly Valves"
          value={butterflyValves}
          onChange={(v) => onChange('butterflyValves', v)}
          type="integer"
          min={0}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          K-values: 45\u00B0=0.35, 90\u00B0=0.75, Ball=0.05, Butterfly=0.25
        </Typography>
      </Grid>
    </Grid>
  );
}
