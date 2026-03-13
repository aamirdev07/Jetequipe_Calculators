'use client';

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import { FrictionInputs, FrictionOutputs } from '@/lib/types';
import { PIPE_SIZES } from '@/lib/config/pipeData';

interface FrictionRecapProps {
  inputs: FrictionInputs;
  outputs: FrictionOutputs;
}

export default function FrictionRecap({ inputs, outputs }: FrictionRecapProps) {
  const pipeLabel = PIPE_SIZES.find((p) => p.nominal_in === inputs.nominalDiameter)?.label ?? String(inputs.nominalDiameter);

  const handlePrint = () => {
    window.print();
  };

  const flowUnitLabel: Record<string, string> = {
    GPM: 'GPM',
    LPM: 'L/min',
    m3h: 'm\u00B3/h',
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight={600}>
            Input Recap &amp; Print
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small" sx={{ '& td': { border: 'none', py: 0.5 } }}>
            <TableBody>
              <RecapRow label="Flow Rate" value={`${inputs.flowRate} ${flowUnitLabel[inputs.flowRateUnit]}`} />
              <RecapRow label="Viscosity" value={`${inputs.viscosity} cP`} />
              <RecapRow label="Temperature" value={`${inputs.temperature} \u00B0C`} />
              <RecapRow label="Specific Gravity" value={String(inputs.specificGravity)} />
              <RecapRow label="Pipe Diameter" value={pipeLabel} />
              <RecapRow label="Pipe Length" value={`${inputs.pipeLength} ${inputs.pipeLengthUnit}`} />
              <RecapRow label="45\u00B0 Elbows" value={String(inputs.elbows45)} />
              <RecapRow label="90\u00B0 Elbows" value={String(inputs.elbows90)} />
              <RecapRow label="Ball Valves" value={String(inputs.ballValves)} />
              <RecapRow label="Butterfly Valves" value={String(inputs.butterflyValves)} />
              <RecapRow label="Elevation Change" value={`${inputs.elevationChange} ${inputs.elevationUnit}`} />
              {inputs.additionalLoss > 0 && (
                <RecapRow label="Additional Loss" value={`${inputs.additionalLoss} ${inputs.additionalLossUnit}`} />
              )}
              <TableRow>
                <TableCell colSpan={2} sx={{ pt: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>Results</Typography>
                </TableCell>
              </TableRow>
              <RecapRow label="Total Head Loss" value={`${outputs.totalHeadLossFt.toFixed(2)} ft (${outputs.totalHeadLossM.toFixed(2)} m)`} bold />
              <RecapRow label="Total Pressure Loss" value={`${outputs.totalPressureLossPsi.toFixed(2)} psi (${outputs.totalPressureLossBar.toFixed(3)} bar)`} bold />
              <RecapRow label="Velocity" value={`${outputs.velocityMs.toFixed(2)} m/s (${outputs.velocityFts.toFixed(2)} ft/s)`} />
              <RecapRow label="Reynolds Number" value={outputs.reynoldsNumber.toLocaleString()} />
              <RecapRow label="Flow Regime" value={outputs.flowRegime} />
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              size="small"
            >
              Print
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function RecapRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <TableRow>
      <TableCell sx={{ color: 'text.secondary', width: '40%' }}>
        <Typography variant="body2">{label}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={bold ? 700 : 400}>
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
