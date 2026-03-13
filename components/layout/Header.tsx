'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
  minHeight: '56px !important',
  paddingLeft: 16,
  paddingRight: 16,
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '0.95rem',
  [theme.breakpoints.down('sm')]: { display: 'none' },
})) as typeof Typography;

export default function Header() {
  const pathname = usePathname();
  const isCalculatorPage = pathname !== '/';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '@media print': { display: 'none' },
      }}
    >
      <StyledToolbar>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <a
            href="https://jetequip.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://jetequip.com/wp-content/themes/custom/assets/New_images/Shared/Logo_Jetequip_c.png"
              alt="Jetequip"
              style={{ height: 28, objectFit: 'contain' }}
            />
          </a>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <TitleTypography variant="body1">
              Engineering Calculators
            </TitleTypography>
          </Link>
        </Stack>

        {isCalculatorPage && (
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              size="small"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
              }}
            >
              Back
            </Button>
          </Link>
        )}
      </StyledToolbar>
    </AppBar>
  );
}
