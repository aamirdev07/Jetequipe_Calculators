'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';

const DISCLAIMER = 'For reference only. Results must be verified by a qualified engineer. Jetequip is not responsible for the results or their interpretation or use.';
import StraightenIcon from '@mui/icons-material/Straighten';
import FrictionForm, { FRICTION_DEFAULTS } from '@/components/friction/FrictionForm';
import FrictionResults from '@/components/friction/FrictionResults';
import FrictionRecap from '@/components/friction/FrictionRecap';
import CalcPageHeader from '@/components/shared/CalcPageHeader';
import { FrictionInputs } from '@/lib/types';
import { calculateFrictionLoss } from '@/lib/calculations/frictionLoss';
import { FadeInView } from '@/components/shared/MotionWrapper';

const ACCENT = '#7C3AED';

export default function FrictionLossPage() {
  const [inputs, setInputs] = useState<FrictionInputs>(FRICTION_DEFAULTS);
  const outputs = useMemo(() => calculateFrictionLoss(inputs), [inputs]);

  return (
    <>
      <CalcPageHeader
        title="Friction Loss Calculator"
        subtitle="Darcy-Weisbach equation — major, minor, elevation, and additional losses"
        breadcrumbLabel="Friction Loss"
        accentColor={ACCENT}
        icon={<StraightenIcon sx={{ fontSize: 22 }} />}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <FadeInView delay={0.05}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionLabel color={ACCENT}>Inputs</SectionLabel>
                <FrictionForm inputs={inputs} onChange={setInputs} />
              </Paper>
            </FadeInView>
          </Grid>

          <Grid item xs={12} md={6}>
            <FadeInView delay={0.1}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  mb: 2.5,
                  position: 'sticky',
                  top: 64,
                }}
              >
                <SectionLabel color="#00A859">Results</SectionLabel>
                <FrictionResults outputs={outputs} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontSize: '0.7rem', lineHeight: 1.5 }}>
                  {DISCLAIMER}
                </Typography>
              </Paper>
            </FadeInView>

            {!outputs.error && (
              <FadeInView delay={0.15}>
                <FrictionRecap inputs={inputs} outputs={outputs} />
              </FadeInView>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Stack
        sx={{
          width: 4,
          height: 18,
          borderRadius: 0,
          bgcolor: color,
        }}
      />
      <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.85rem', color }}>
        {children}
      </Typography>
    </Stack>
  );
}
