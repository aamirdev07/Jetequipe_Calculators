'use client';

import React from 'react';
import { Stack, Typography, Container, Grid, Button } from '@mui/material';
import Link from 'next/link';

const calculatorLinks = [
  { label: 'Tank Dimensions', href: '/tank-calculator' },
  { label: 'Friction Loss', href: '/friction-loss' },
  { label: 'Fluid Velocity', href: '/fluid-velocity' },
  { label: 'NPSH Available', href: '/npsh-calculator' },
];

const companyLinks = [
  { label: 'Jetequip Home', href: 'https://jetequip.com/en/', external: true },
  { label: 'Products', href: 'https://jetequip.com/en/products/', external: true },
  { label: 'Contact', href: 'https://jetequip.com/en/contact/', external: true },
];

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: '#1A1A2E',
        '@media print': { display: 'none' },
      }}
    >
      {/* Main footer */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand column */}
          <Grid item xs={12} sm={5}>
            <a
              href="https://jetequip.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <img
                src="https://jetequip.com/wp-content/themes/custom/assets/New_images/Shared/Logo_Jetequip_c.png"
                alt="Jetequip"
                style={{ height: 32, objectFit: 'contain' }}
              />
            </a>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.55)',
                mt: 2,
                maxWidth: 300,
                lineHeight: 1.6,
                fontSize: '0.8rem',
              }}
            >
              Sanitary and aseptic process solutions for food, beverage, dairy, pharmaceutical, and biotech industries.
            </Typography>
          </Grid>

          {/* Calculators column */}
          <Grid item xs={6} sm={3.5}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: '0.65rem',
                display: 'block',
                mb: 1.5,
              }}
            >
              Calculators
            </Typography>
            <Stack spacing={0.75}>
              {calculatorLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.8rem',
                      transition: 'color 0.15s',
                      '&:hover': { color: '#fff' },
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company column */}
          <Grid item xs={6} sm={3.5}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: '0.65rem',
                display: 'block',
                mb: 1.5,
              }}
            >
              Company
            </Typography>
            <Stack spacing={0.75}>
              {companyLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.8rem',
                      transition: 'color 0.15s',
                      '&:hover': { color: '#fff' },
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </Typography>
                </a>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom bar */}
      <Stack
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
          >
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}
            >
              &copy; {new Date().getFullYear()} Jetequip. All rights reserved.
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem' }}
            >
              For estimation only — verify with a qualified engineer.
            </Typography>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
