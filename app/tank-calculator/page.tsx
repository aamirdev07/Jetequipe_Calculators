'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Breadcrumbs,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TankForm, { TANK_DEFAULTS_METRIC } from '@/components/tank/TankForm';
import TankResults from '@/components/tank/TankResults';
import TankDrawing2D from '@/components/tank/TankDrawing2D';
import { TankInputs } from '@/lib/types';
import { calculateTank } from '@/lib/calculations/tank';

const pageSx: SxProps<Theme> = { py: { xs: 2, md: 4 } };

export default function TankCalculatorPage() {
  const [inputs, setInputs] = useState<TankInputs>(TANK_DEFAULTS_METRIC);

  const outputs = useMemo(() => calculateTank(inputs), [inputs]);

  return (
    <Container maxWidth="lg" sx={pageSx}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: '#5A6A7A' }}>
          Calculators
        </Link>
        <Typography color="text.primary" fontWeight={600} variant="body2">
          Tank Dimensions
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        Tank Dimension Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Vertical conical-bottom tank with flat lid. Adjust parameters to see real-time results.
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Inputs
            </Typography>
            <TankForm inputs={inputs} onChange={setInputs} />
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Results
            </Typography>
            <TankResults outputs={outputs} unitSystem={inputs.unitSystem} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Tank Profile
            </Typography>
            <TankDrawing2D
              outputs={outputs}
              innerDiameter={inputs.innerDiameter}
              unitSystem={inputs.unitSystem}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
