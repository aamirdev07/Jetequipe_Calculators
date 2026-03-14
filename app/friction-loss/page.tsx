'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import FrictionForm, { FRICTION_DEFAULTS } from '@/components/friction/FrictionForm';
import FrictionResults from '@/components/friction/FrictionResults';
import FrictionRecap from '@/components/friction/FrictionRecap';
import CalcPageHeader from '@/components/shared/CalcPageHeader';
import ExportBar, { ExportRow } from '@/components/shared/ExportBar';
import { FrictionInputs } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';
import { calculateFrictionLoss } from '@/lib/calculations/frictionLoss';
import { FadeInView } from '@/components/shared/MotionWrapper';

const ACCENT = '#7C3AED';

export default function FrictionLossPage() {
  const [inputs, setInputs] = useState<FrictionInputs>(FRICTION_DEFAULTS);
  const outputs = useMemo(() => calculateFrictionLoss(inputs), [inputs]);

  const flowUnitMap: Record<string, string> = { GPM: 'GPM', LPM: 'L/min', m3h: 'm\u00B3/h' };
  const pipeLabel = PIPE_SIZES.find((p) => p.nominal_in === inputs.nominalDiameter)?.label ?? String(inputs.nominalDiameter);

  const exportRows: ExportRow[] = useMemo(() => {
    if (outputs.error) return [];
    return [
      { label: 'Flow Rate', value: `${inputs.flowRate} ${flowUnitMap[inputs.flowRateUnit]}` },
      { label: 'Viscosity', value: `${inputs.viscosity} cP` },
      { label: 'Temperature', value: `${inputs.temperature} \u00B0C` },
      { label: 'Specific Gravity', value: String(inputs.specificGravity) },
      { label: 'Pipe Diameter', value: pipeLabel },
      { label: 'Pipe Length', value: `${inputs.pipeLength} ${inputs.pipeLengthUnit}` },
      { label: '45\u00B0 Elbows', value: String(inputs.elbows45) },
      { label: '90\u00B0 Elbows', value: String(inputs.elbows90) },
      { label: 'Ball Valves', value: String(inputs.ballValves) },
      { label: 'Butterfly Valves', value: String(inputs.butterflyValves) },
      { label: 'Elevation Change', value: `${inputs.elevationChange} ${inputs.elevationUnit}` },
      ...(inputs.additionalLoss > 0 ? [{ label: 'Additional Loss', value: `${inputs.additionalLoss} ${inputs.additionalLossUnit}` }] : []),
      { label: 'Total Head Loss', value: `${outputs.totalHeadLossFt.toFixed(2)} ft (${outputs.totalHeadLossM.toFixed(2)} m)` },
      { label: 'Total Pressure Loss', value: `${outputs.totalPressureLossPsi.toFixed(2)} psi (${outputs.totalPressureLossBar.toFixed(3)} bar)` },
      { label: 'Velocity', value: `${outputs.velocityMs.toFixed(2)} m/s (${outputs.velocityFts.toFixed(2)} ft/s)` },
      { label: 'Reynolds Number', value: outputs.reynoldsNumber.toLocaleString() },
      { label: 'Flow Regime', value: outputs.flowRegime },
    ];
  }, [inputs, outputs, pipeLabel]);

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
          <Grid item xs={12} md={5}>
            <FadeInView delay={0.05}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionLabel color={ACCENT}>Inputs</SectionLabel>
                <FrictionForm inputs={inputs} onChange={setInputs} />
              </Paper>
            </FadeInView>
          </Grid>

          <Grid item xs={12} md={7}>
            <FadeInView delay={0.1}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 2.5 }}>
                <SectionLabel color="#00A859">Results</SectionLabel>
                <FrictionResults outputs={outputs} />
              </Paper>
            </FadeInView>

            {!outputs.error && (
              <>
                <ExportBar title="Friction Loss Calculator" rows={exportRows} accentColor={ACCENT} />
                <FadeInView delay={0.15}>
                  <FrictionRecap inputs={inputs} outputs={outputs} />
                </FadeInView>
              </>
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
