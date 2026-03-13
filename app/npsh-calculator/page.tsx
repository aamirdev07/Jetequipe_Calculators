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
import NpshForm, { NPSH_DEFAULTS_IMPERIAL } from '@/components/npsh/NpshForm';
import NpshResults from '@/components/npsh/NpshResults';
import NpshDiagram from '@/components/npsh/NpshDiagram';
import { NpshInputs } from '@/lib/types';
import { calculateNpsh } from '@/lib/calculations/npsh';

const pageSx: SxProps<Theme> = { py: { xs: 2, md: 4 } };

export default function NpshCalculatorPage() {
  const [inputs, setInputs] = useState<NpshInputs>(NPSH_DEFAULTS_IMPERIAL);

  const outputs = useMemo(() => calculateNpsh(inputs), [inputs]);

  const unitLabel = inputs.unitSystem === 'imperial' ? 'ft' : 'm';

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
          NPSH Available
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        NPSH Available Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Verify adequate suction conditions and avoid cavitation in your pumping system.
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Inputs
            </Typography>
            <NpshForm inputs={inputs} onChange={setInputs} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Results
            </Typography>
            <NpshResults outputs={outputs} unitSystem={inputs.unitSystem} />
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              System Diagram
            </Typography>
            <NpshDiagram
              staticHeight={inputs.staticHeight}
              unitLabel={unitLabel}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
