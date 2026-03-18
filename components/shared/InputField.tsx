'use client';

import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  error?: boolean;
  helperText?: string;
  type?: 'number' | 'integer';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  error,
  helperText,
  type = 'number',
  fullWidth = true,
  disabled = false,
}: InputFieldProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    if (raw === '' || raw === '-') {
      return; // keep display empty, don't update numeric value yet
    }
    const num = type === 'integer' ? parseInt(raw, 10) : parseFloat(raw);
    if (!isNaN(num)) {
      // Block negative values when min >= 0
      if (min !== undefined && min >= 0 && num < 0) {
        return;
      }
      onChange(num);
    }
  };

  const handleBlur = () => {
    if (displayValue === '' || displayValue === '-') {
      const fallback = min !== undefined && min > 0 ? min : 0;
      setDisplayValue(String(fallback));
      onChange(fallback);
    }
  };

  return (
    <TextField
      label={label}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      type="number"
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      helperText={helperText}
      inputProps={{
        min,
        max,
        step: type === 'integer' ? 1 : 'any',
      }}
      InputProps={{
        endAdornment: unit ? (
          <InputAdornment position="end">{unit}</InputAdornment>
        ) : undefined,
      }}
      sx={{ mb: 1.5 }}
    />
  );
}
