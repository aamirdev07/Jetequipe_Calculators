'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import VelocityForm, { VELOCITY_DEFAULTS } from '@/components/velocity/VelocityForm';
import VelocityResults from '@/components/velocity/VelocityResults';
import CalcPageHeader from '@/components/shared/CalcPageHeader';
import RecapSection, { RecapRow } from '@/components/shared/RecapSection';
import { VelocityInputs } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';
import { calculateFluidVelocity } from '@/lib/calculations/fluidVelocity';
import { FadeInView } from '@/components/shared/MotionWrapper';

const ACCENT = '#00A859';
const DISCLAIMER = 'For reference only. Results must be verified by a qualified engineer. Jetequip is not responsible for the results or their interpretation or use.';

export default function FluidVelocityPage() {
  const [inputs, setInputs] = useState<VelocityInputs>(VELOCITY_DEFAULTS);
  const outputs = useMemo(() => calculateFluidVelocity(inputs), [inputs]);

  const pipeInfo = PIPE_SIZES.find((p) => p.nominal_in === inputs.nominalDiameter);

  const flowUnitMap: Record<string, string> = { m3h: 'm³/h', GPM: 'GPM' };

  const recapRows: RecapRow[] = useMemo(() => {
    if (outputs.error) return [];
    return [
      { label: 'Flow Rate', value: `${inputs.flowRate} ${flowUnitMap[inputs.flowRateUnit] ?? inputs.flowRateUnit}` },
      { label: 'Nominal Pipe Size', value: pipeInfo?.label ?? String(inputs.nominalDiameter) },
      { label: 'Actual ID', value: `${pipeInfo?.id_in ?? ''}″` },
      { label: 'Wall Thickness', value: `${pipeInfo?.wall_in ?? ''}″` },
      { label: 'Results', value: '', section: true },
      { label: 'Velocity', value: `${outputs.velocityMs.toFixed(2)} m/s (${outputs.velocityFts.toFixed(2)} ft/s)`, bold: true },
      { label: 'CIP Status', value: outputs.cipLabel },
    ];
  }, [inputs, outputs, pipeInfo]);

  return (
    <>
      <CalcPageHeader
        title="Fluid Velocity in Pipe"
        subtitle="Flow rate to velocity with CIP range validation (5–7 ft/s)"
        breadcrumbLabel="Fluid Velocity"
        accentColor={ACCENT}
        icon={<SpeedIcon sx={{ fontSize: 22 }} />}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={5}>
            <FadeInView delay={0.05}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionLabel color={ACCENT}>Inputs</SectionLabel>
                <VelocityForm inputs={inputs} onChange={setInputs} />
              </Paper>
            </FadeInView>
          </Grid>

          <Grid item xs={12} md={7}>
            <FadeInView delay={0.1}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  position: 'sticky',
                  top: 64,
                }}
              >
                <SectionLabel color={ACCENT}>Results</SectionLabel>
                <VelocityResults outputs={outputs} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontSize: '0.7rem', lineHeight: 1.5 }}>
                  {DISCLAIMER}
                </Typography>
              </Paper>
            </FadeInView>

            {!outputs.error && (
              <FadeInView delay={0.15}>
                <Stack sx={{ mt: 2.5 }}>
                  <RecapSection title="Fluid Velocity Calculator" rows={recapRows} accentColor={ACCENT} />
                </Stack>
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
