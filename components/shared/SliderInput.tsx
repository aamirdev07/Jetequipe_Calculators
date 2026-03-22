'use client';

import React, { useState, useEffect } from 'react';
import { Box, Slider, TextField, Typography, InputAdornment } from '@mui/material';
import InfoTooltip from './InfoTooltip';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  tooltipText?: string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  tooltipText,
}: SliderInputProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    if (raw === '' || raw === '-') {
      return; // allow empty while typing
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    if (displayValue === '' || displayValue === '-') {
      const fallback = min > 0 ? min : 0;
      setDisplayValue(String(fallback));
      onChange(fallback);
      return;
    }
    const num = parseFloat(displayValue);
    if (!isNaN(num)) {
      if (num < min) { onChange(min); setDisplayValue(String(min)); }
      else if (num > max) { onChange(max); setDisplayValue(String(max)); }
    }
  };

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {label}
        </Typography>
        {tooltipText && <InfoTooltip text={tooltipText} />}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Slider
          value={typeof value === 'number' ? value : min}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          sx={{ flex: 1 }}
          aria-label={label}
        />
        <TextField
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          size="small"
          inputProps={{ min, max, step }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          }}
          sx={{ width: 150 }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {min}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {max}
        </Typography>
      </Box>
    </Box>
  );
}
