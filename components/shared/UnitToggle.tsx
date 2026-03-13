'use client';

import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { UnitSystem } from '@/lib/types';

interface UnitToggleProps {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}

export default function UnitToggle({ value, onChange }: UnitToggleProps) {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: UnitSystem | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        Units:
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        aria-label="Unit system"
      >
        <ToggleButton value="metric" sx={{ px: 2, py: 0.5 }}>
          Metric
        </ToggleButton>
        <ToggleButton value="imperial" sx={{ px: 2, py: 0.5 }}>
          Imperial
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
