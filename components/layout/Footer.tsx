'use client';

import React from 'react';
import { Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

const footerSx: SxProps<Theme> = {
  mt: 'auto',
  py: 2,
  px: { xs: 2, md: 4 },
  borderTop: '1px solid',
  borderColor: 'divider',
  '@media print': { display: 'none' },
};

export default function Footer() {
  return (
    <Stack component="footer" sx={footerSx}>
      <Typography variant="caption" color="text.secondary" textAlign="center">
        For estimation only — always verify with a qualified engineer. &copy; {new Date().getFullYear()} Jetequip
      </Typography>
    </Stack>
  );
}
