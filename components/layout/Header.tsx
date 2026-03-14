'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '@media print': { display: 'none' },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  minHeight: '56px !important',
  maxHeight: 56,
  paddingLeft: 0,
  paddingRight: 0,
}));

export default function Header() {
  const pathname = usePathname();
  const isCalculatorPage = pathname !== '/';

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <StyledToolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <a
              href="https://jetequip.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src="https://jetequip.com/wp-content/themes/custom/assets/New_images/Shared/Logo_Jetequip_c.png"
                alt="Jetequip"
                style={{ height: 28, objectFit: 'contain' }}
              />
            </a>
            <Stack
              sx={{
                width: '1px',
                height: 20,
                bgcolor: 'divider',
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Engineering Calculators
              </Typography>
            </Link>
          </Stack>

          {isCalculatorPage && (
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIcon sx={{ fontSize: '15px !important' }} />}
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  '&:hover': {
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    bgcolor: 'transparent',
                  },
                }}
              >
                All tools
              </Button>
            </Link>
          )}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}
