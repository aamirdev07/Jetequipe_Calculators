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
import VelocityForm, { VELOCITY_DEFAULTS } from '@/components/velocity/VelocityForm';
import VelocityResults from '@/components/velocity/VelocityResults';
import PipeDrawing2D from '@/components/velocity/PipeDrawing2D';
import { VelocityInputs } from '@/lib/types';
import { calculateFluidVelocity } from '@/lib/calculations/fluidVelocity';

const pageSx: SxProps<Theme> = { py: { xs: 2, md: 4 } };

export default function FluidVelocityPage() {
  const [inputs, setInputs] = useState<VelocityInputs>(VELOCITY_DEFAULTS);

  const outputs = useMemo(() => calculateFluidVelocity(inputs), [inputs]);

  const diameterMm =
    inputs.pipeDiameterUnit === 'mm'
      ? inputs.pipeDiameter
      : inputs.pipeDiameter * 25.4;

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
          Fluid Velocity
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        Fluid Velocity in Pipe
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Compute velocity from flow rate and pipe diameter with CIP range validation (5–7 ft/s).
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Inputs
            </Typography>
            <VelocityForm inputs={inputs} onChange={setInputs} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Results
            </Typography>
            <VelocityResults outputs={outputs} />
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Pipe Diagram
            </Typography>
            <PipeDrawing2D
              diameterMm={diameterMm}
              velocityMs={outputs.velocityMs}
              diameterUnit={inputs.pipeDiameterUnit}
              diameterValue={inputs.pipeDiameter}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
