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
import FrictionForm, { FRICTION_DEFAULTS } from '@/components/friction/FrictionForm';
import FrictionResults from '@/components/friction/FrictionResults';
import FrictionRecap from '@/components/friction/FrictionRecap';
import { FrictionInputs } from '@/lib/types';
import { calculateFrictionLoss } from '@/lib/calculations/frictionLoss';

const pageSx: SxProps<Theme> = { py: { xs: 2, md: 4 } };

export default function FrictionLossPage() {
  const [inputs, setInputs] = useState<FrictionInputs>(FRICTION_DEFAULTS);

  const outputs = useMemo(() => calculateFrictionLoss(inputs), [inputs]);

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
          Friction Loss
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        Friction Loss Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Darcy-Weisbach equation — major losses, minor losses from fittings, elevation, and additional losses.
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Inputs
            </Typography>
            <FrictionForm inputs={inputs} onChange={setInputs} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Results
            </Typography>
            <FrictionResults outputs={outputs} />
          </Paper>

          {!outputs.error && (
            <FrictionRecap inputs={inputs} outputs={outputs} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
