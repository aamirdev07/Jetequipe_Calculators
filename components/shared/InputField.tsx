'use client';

import React from 'react';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      onChange(0);
      return;
    }
    const num = type === 'integer' ? parseInt(raw, 10) : parseFloat(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
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
