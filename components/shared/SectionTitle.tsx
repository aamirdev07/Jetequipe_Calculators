'use client';

import React from 'react';
import { Typography, Stack } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <Stack sx={{ mb: 1.5, mt: 1.5 }}>
      <Typography variant="subtitle2" fontWeight={600} color="text.primary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
