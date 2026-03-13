'use client';

import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  compact?: boolean;
}

export default function ResultCard({ label, value, unit, compact = false }: ResultCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: compact ? 1.5 : 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        {label}
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ mt: 0.5 }}>
        <Typography
          variant={compact ? 'h6' : 'h5'}
          fontWeight={700}
          color="text.primary"
        >
          {value}
        </Typography>
        {unit && (
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {unit}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
