'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import TankForm, { TANK_DEFAULTS_METRIC } from '@/components/tank/TankForm';
import TankResults from '@/components/tank/TankResults';
import TankDrawing2D from '@/components/tank/TankDrawing2D';
import CalcPageHeader from '@/components/shared/CalcPageHeader';
import ExportBar, { ExportRow } from '@/components/shared/ExportBar';
import RecapSection, { RecapRow } from '@/components/shared/RecapSection';
import { TankInputs } from '@/lib/types';
import { calculateTank } from '@/lib/calculations/tank';
import { FadeInView } from '@/components/shared/MotionWrapper';

const ACCENT = '#0072CE';
const DISCLAIMER = 'For reference only. Results must be verified by a qualified engineer. Jetequip is not responsible for the results or their interpretation or use.';

export default function TankCalculatorPage() {
  const [inputs, setInputs] = useState<TankInputs>(TANK_DEFAULTS_METRIC);
  const outputs = useMemo(() => calculateTank(inputs), [inputs]);

  const unit = inputs.unitSystem === 'metric' ? 'mm' : 'in';
  const volUnit = inputs.unitSystem === 'metric' ? 'L' : 'gal';

  const exportRows: ExportRow[] = useMemo(() => {
    if (outputs.error) return [];
    return [
      { label: 'Unit System', value: inputs.unitSystem },
      { label: 'Inner Diameter', value: `${inputs.innerDiameter} ${unit}` },
      { label: 'Total Volume', value: `${inputs.totalVolume} ${volUnit}` },
      { label: 'Cone Angle', value: `${inputs.coneAngle}°` },
      { label: 'Fill Percentage', value: `${inputs.fillPercentage}%` },
      { label: 'Cone Height', value: `${outputs.coneHeight} ${unit}` },
      { label: 'Total Height', value: `${outputs.totalHeight} ${unit}` },
      { label: 'Liquid Height', value: `${outputs.liquidHeight} ${unit}` },
      { label: 'H/D Ratio', value: outputs.hdRatio.toFixed(2) },
      { label: 'Total Volume', value: `${outputs.totalVolume.toFixed(1)} ${volUnit}` },
      { label: 'Working Volume', value: `${outputs.workingVolume.toFixed(1)} ${volUnit}` },
    ];
  }, [inputs, outputs, unit, volUnit]);

  const recapRows: RecapRow[] = useMemo(() => {
    if (outputs.error) return [];
    return [
      { label: 'Unit System', value: inputs.unitSystem },
      { label: 'Inner Diameter', value: `${inputs.innerDiameter} ${unit}` },
      { label: 'Total Volume (input)', value: `${inputs.totalVolume} ${volUnit}` },
      { label: 'Cone Angle', value: `${inputs.coneAngle}°` },
      { label: 'Fill Percentage', value: `${inputs.fillPercentage}%` },
      { label: 'Results', value: '', section: true },
      { label: 'Cone Height', value: `${outputs.coneHeight} ${unit}`, bold: true },
      { label: 'Total Height', value: `${outputs.totalHeight} ${unit}`, bold: true },
      { label: 'Liquid Height', value: `${outputs.liquidHeight} ${unit}`, bold: true },
      { label: 'H/D Ratio', value: String(outputs.hdRatio) },
      { label: 'Total Volume', value: `${outputs.totalVolume.toFixed(1)} ${volUnit}` },
      { label: 'Working Volume', value: `${outputs.workingVolume.toFixed(1)} ${volUnit}`, bold: true },
    ];
  }, [inputs, outputs, unit, volUnit]);

  return (
    <>
      <CalcPageHeader
        title="Tank Dimension Calculator"
        subtitle="Vertical conical-bottom tank with flat lid — real-time geometry calculations"
        breadcrumbLabel="Tank Dimensions"
        accentColor={ACCENT}
        icon={<PropaneTankIcon sx={{ fontSize: 22 }} />}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={5}>
            <FadeInView delay={0.05}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionLabel color={ACCENT}>Inputs</SectionLabel>
                <TankForm inputs={inputs} onChange={setInputs} />
              </Paper>
            </FadeInView>

            <FadeInView delay={0.1}>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mt: 2.5 }}>
                <SectionLabel color="#00A859">Results</SectionLabel>
                <TankResults outputs={outputs} unitSystem={inputs.unitSystem} />
                {!outputs.error && (
                  <ExportBar title="Tank Dimension Calculator" rows={exportRows} accentColor={ACCENT} />
                )}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontSize: '0.7rem', lineHeight: 1.5 }}>
                  {DISCLAIMER}
                </Typography>
              </Paper>
            </FadeInView>

            {!outputs.error && (
              <FadeInView delay={0.15}>
                <Stack sx={{ mt: 2.5 }}>
                  <RecapSection title="Tank Dimension Calculator" rows={recapRows} accentColor={ACCENT} />
                </Stack>
              </FadeInView>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            <FadeInView delay={0.15}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  position: 'sticky',
                  top: 64,
                }}
              >
                <SectionLabel color={ACCENT}>Tank Profile</SectionLabel>
                <TankDrawing2D
                  outputs={outputs}
                  innerDiameter={inputs.innerDiameter}
                  unitSystem={inputs.unitSystem}
                />
              </Paper>
            </FadeInView>
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
