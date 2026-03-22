'use client';

import React from 'react';
import { Container, Typography, Stack, Breadcrumbs, alpha } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { FadeIn } from './MotionWrapper';

interface CalcPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  accentColor: string;
  icon: React.ReactNode;
}

export default function CalcPageHeader({ title, subtitle, breadcrumbLabel, accentColor, icon }: CalcPageHeaderProps) {
  return (
    <Stack
      sx={{
        background: `linear-gradient(135deg, ${accentColor} 0%, ${alpha(accentColor, 0.85)} 100%)`,
        color: '#fff',
        py: { xs: 2.5, md: 3.5 },
      }}
    >
      <Container maxWidth="lg">
        <FadeIn duration={0.4} y={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }} />}
            sx={{ mb: 1.5, '& .MuiBreadcrumbs-li': { fontSize: '0.8rem' } }}
          >
            <Link href="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              Calculators
            </Link>
            <Typography sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600, fontSize: '0.8rem' }}>
              {breadcrumbLabel}
            </Typography>
          </Breadcrumbs>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {icon}
            </Stack>
            <Stack>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.15rem', sm: '1.35rem' },
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem',
                  mt: 0.25,
                }}
              >
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
        </FadeIn>
      </Container>
    </Stack>
  );
}
