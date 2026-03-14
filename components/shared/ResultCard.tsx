'use client';

import React from 'react';
import { Paper, Typography, Stack, alpha } from '@mui/material';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  compact?: boolean;
  accentColor?: string;
}

export default function ResultCard({
  label,
  value,
  unit,
  compact = false,
  accentColor,
}: ResultCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: compact ? 1.5 : 2,
        borderColor: accentColor ? alpha(accentColor, 0.2) : '#E2E8F0',
        bgcolor: accentColor ? alpha(accentColor, 0.02) : '#FAFBFC',
        height: '100%',
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        textTransform="uppercase"
        letterSpacing={0.5}
        sx={{ fontSize: '0.65rem', display: 'block' }}
      >
        {label}
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mt: 0.25 }}>
        <Typography
          variant={compact ? 'body1' : 'h6'}
          fontWeight={700}
          sx={{
            fontSize: compact ? '1rem' : '1.15rem',
            color: accentColor || 'text.primary',
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {unit}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
