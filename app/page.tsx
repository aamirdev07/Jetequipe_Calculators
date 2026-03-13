'use client';

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpeedIcon from '@mui/icons-material/Speed';
import StraightenIcon from '@mui/icons-material/Straighten';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import Link from 'next/link';

interface CalculatorCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const calculators: CalculatorCard[] = [
  {
    title: 'Tank Dimensions',
    description:
      'Vertical conical-bottom tank geometry — cylinder height, total height, H/D ratio, and 2D profile drawing.',
    icon: <PropaneTankIcon sx={{ fontSize: 24, color: 'primary.main' }} />,
    link: '/tank-calculator',
  },
  {
    title: 'Friction Loss',
    description:
      'Darcy-Weisbach pressure and head loss — major losses, minor losses from fittings, elevation, and additional losses.',
    icon: <StraightenIcon sx={{ fontSize: 24, color: 'primary.main' }} />,
    link: '/friction-loss',
  },
  {
    title: 'Fluid Velocity',
    description:
      'Velocity from flow rate and pipe diameter in m/s and ft/s, with CIP range indicator (5–7 ft/s).',
    icon: <SpeedIcon sx={{ fontSize: 24, color: 'primary.main' }} />,
    link: '/fluid-velocity',
  },
  {
    title: 'NPSH Available',
    description:
      'Net Positive Suction Head Available to verify suction conditions and avoid cavitation.',
    icon: <OpacityIcon sx={{ fontSize: 24, color: 'primary.main' }} />,
    link: '/npsh-calculator',
  },
];

const containerSx: SxProps<Theme> = { py: { xs: 3, md: 5 } };
const cardSx: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={containerSx}>
      <Stack sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}
        >
          Engineering Calculators
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520 }}>
          Process engineering tools for the sanitary and aseptic processing industry.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {calculators.map((calc) => (
          <Grid item xs={12} sm={6} key={calc.link}>
            <Link href={calc.link} passHref style={{ textDecoration: 'none' }}>
              <Card variant="outlined" sx={cardSx}>
                <CardContent sx={{ flex: 1, p: { xs: 2, sm: 2.5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    {calc.icon}
                    <Typography variant="subtitle1" component="h2" fontWeight={600}>
                      {calc.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {calc.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: { xs: 2, sm: 2.5 }, pb: 2 }}>
                  <Button
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowForwardIcon fontSize="small" />}
                    size="small"
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
