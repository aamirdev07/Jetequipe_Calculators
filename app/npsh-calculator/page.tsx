'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import NpshForm, { NPSH_DEFAULTS_IMPERIAL } from '@/components/npsh/NpshForm';
import NpshResults from '@/components/npsh/NpshResults';
import NpshDiagram from '@/components/npsh/NpshDiagram';
import CalcPageHeader from '@/components/shared/CalcPageHeader';
import RecapSection, { RecapRow } from '@/components/shared/RecapSection';
import { NpshInputs } from '@/lib/types';
import { calculateNpsh } from '@/lib/calculations/npsh';
import { FadeInView } from '@/components/shared/MotionWrapper';

const ACCENT = '#E65100';
const DISCLAIMER = 'For reference only. Results must be verified by a qualified engineer. Jetequip is not responsible for the results or their interpretation or use.';

export default function NpshCalculatorPage() {
  const [inputs, setInputs] = useState<NpshInputs>(NPSH_DEFAULTS_IMPERIAL);
  const outputs = useMemo(() => calculateNpsh(inputs), [inputs]);
  const diagramRef = useRef<HTMLDivElement>(null);
  const unitLabel = inputs.unitSystem === 'imperial' ? 'ft' : 'm';
  const pressureUnit = inputs.pressureInputUnit;

  const recapRows: RecapRow[] = useMemo(() => {
    if (outputs.error) return [];
    return [
      { label: 'Unit System', value: inputs.unitSystem },
      { label: 'Pressure Unit', value: pressureUnit },
      { label: 'Atmospheric Pressure', value: `${inputs.atmosphericPressure} ${pressureUnit}` },
      { label: 'Source Pressure', value: `${inputs.sourcePressure} ${pressureUnit}` },
      { label: 'Static Height', value: `${inputs.staticHeight} ${unitLabel}` },
      { label: 'Friction Loss', value: `${inputs.frictionLoss} ${unitLabel}` },
      { label: 'Vapor Pressure', value: `${inputs.vaporPressure} ${pressureUnit}` },
      { label: 'Specific Gravity', value: String(inputs.specificGravity) },
      { label: 'Results', value: '', section: true },
      { label: 'NPSHa', value: `${outputs.npsha.toFixed(2)} ${unitLabel}`, bold: true },
      { label: 'Atmospheric Head', value: `${outputs.atmosphericHead.toFixed(2)} ${unitLabel}` },
      { label: 'Source Head', value: `${outputs.sourceHead.toFixed(2)} ${unitLabel}` },
      { label: 'Static Head', value: `${outputs.staticHead.toFixed(2)} ${unitLabel}` },
      { label: 'Friction Head', value: `${outputs.frictionHead.toFixed(2)} ${unitLabel}` },
      { label: 'Vapor Head', value: `${outputs.vaporHead.toFixed(2)} ${unitLabel}` },
    ];
  }, [inputs, outputs, unitLabel, pressureUnit]);

  return (
    <>
      <CalcPageHeader
        title="NPSH Available Calculator"
        subtitle="Verify suction conditions and prevent pump cavitation"
        breadcrumbLabel="NPSH Available"
        accentColor={ACCENT}
        icon={<OpacityIcon sx={{ fontSize: 22 }} />}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={5}>
            <FadeInView delay={0.05}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionLabel color={ACCENT}>Inputs</SectionLabel>
                <NpshForm inputs={inputs} onChange={setInputs} />
              </Paper>
            </FadeInView>
          </Grid>

          <Grid item xs={12} md={7}>
            <FadeInView delay={0.1}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 2.5 }}>
                <SectionLabel color="#00A859">Results</SectionLabel>
                <NpshResults outputs={outputs} unitSystem={inputs.unitSystem} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontSize: '0.7rem', lineHeight: 1.5 }}>
                  {DISCLAIMER}
                </Typography>
              </Paper>
            </FadeInView>

            <FadeInView delay={0.15}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 2.5 }}>
                <SectionLabel color="#0072CE">System Diagram</SectionLabel>
                <div ref={diagramRef}>
                  <NpshDiagram
                    staticHeight={inputs.staticHeight}
                    unitLabel={unitLabel}
                    outputs={outputs}
                  />
                </div>
              </Paper>
            </FadeInView>

            {!outputs.error && (
              <FadeInView delay={0.2}>
                <RecapSection title="NPSH Available Calculator" rows={recapRows} accentColor={ACCENT} diagramRef={diagramRef} />
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
