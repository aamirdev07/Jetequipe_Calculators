'use client';

import React from 'react';
import { Stack } from '@mui/material';

interface NpshDiagramProps {
  staticHeight: number;
  unitLabel: string;
}

export default function NpshDiagram({ staticHeight, unitLabel }: NpshDiagramProps) {
  const svgWidth = 420;
  const svgHeight = 300;

  const pumpAbove = staticHeight > 0;

  const tankX = 40;
  const tankY = pumpAbove ? 100 : 160;
  const tankW = 80;
  const tankH = 100;

  const pumpX = 280;
  const pumpY = pumpAbove ? 80 : 200;
  const pumpR = 25;

  const liquidLevel = tankY + 20;
  const pipeExitY = tankY + tankH - 15;
  const pipeToX = pumpX - pumpR;

  return (
    <Stack alignItems="center" sx={{ mt: 2 }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="auto" style={{ maxHeight: 300 }}>
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#F8FAFC" rx="8" />

        {/* Tank */}
        <rect
          x={tankX}
          y={tankY}
          width={tankW}
          height={tankH}
          fill="#E3F2FD"
          stroke="#0072CE"
          strokeWidth={2}
          rx={2}
        />
        {/* Liquid in tank */}
        <rect
          x={tankX + 2}
          y={liquidLevel}
          width={tankW - 4}
          height={tankY + tankH - liquidLevel - 2}
          fill="#BBDEFB"
          rx={1}
        />
        {/* Tank open top indicator */}
        <line x1={tankX - 5} y1={tankY} x2={tankX + 5} y2={tankY - 8} stroke="#5A6A7A" strokeWidth={1} />
        <line x1={tankX + tankW - 5} y1={tankY} x2={tankX + tankW + 5} y2={tankY - 8} stroke="#5A6A7A" strokeWidth={1} />

        {/* P_atm label */}
        <text
          x={tankX + tankW / 2}
          y={tankY - 12}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {'P_atm ↓'}
        </text>

        {/* Suction pipe */}
        <line
          x1={tankX + tankW}
          y1={pipeExitY}
          x2={pipeToX}
          y2={pipeExitY}
          stroke="#0072CE"
          strokeWidth={3}
        />
        {pumpAbove ? (
          <>
            <line x1={pipeToX} y1={pipeExitY} x2={pipeToX} y2={pumpY + pumpR} stroke="#0072CE" strokeWidth={3} />
            <line x1={pipeToX} y1={pumpY + pumpR} x2={pumpX - pumpR} y2={pumpY + pumpR} stroke="#0072CE" strokeWidth={3} />
          </>
        ) : (
          <>
            <line x1={pipeToX} y1={pipeExitY} x2={pipeToX} y2={pumpY - pumpR} stroke="#0072CE" strokeWidth={3} />
            <line x1={pipeToX} y1={pumpY - pumpR} x2={pumpX - pumpR} y2={pumpY - pumpR} stroke="#0072CE" strokeWidth={3} />
          </>
        )}

        {/* hf label on pipe */}
        <text
          x={(tankX + tankW + pipeToX) / 2}
          y={pipeExitY - 8}
          textAnchor="middle"
          fill="#ED6C02"
          fontSize="9"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          hf (friction)
        </text>

        {/* Pump symbol */}
        <circle cx={pumpX} cy={pumpY} r={pumpR} fill="#E8F5E9" stroke="#2E7D32" strokeWidth={2} />
        <text
          x={pumpX}
          y={pumpY + 4}
          textAnchor="middle"
          fill="#2E7D32"
          fontSize="11"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          PUMP
        </text>

        {/* Discharge pipe */}
        <line x1={pumpX + pumpR} y1={pumpY} x2={svgWidth - 30} y2={pumpY} stroke="#00A859" strokeWidth={3} />
        <polygon
          points={`${svgWidth - 30},${pumpY - 6} ${svgWidth - 18},${pumpY} ${svgWidth - 30},${pumpY + 6}`}
          fill="#00A859"
        />

        {/* Delta-z dimension */}
        {staticHeight !== 0 && (
          <>
            <line
              x1={pumpX + 45}
              y1={liquidLevel}
              x2={pumpX + 45}
              y2={pumpY}
              stroke="#D32F2F"
              strokeWidth={1}
              strokeDasharray="4,3"
            />
            <line x1={pumpX + 40} y1={liquidLevel} x2={pumpX + 50} y2={liquidLevel} stroke="#D32F2F" strokeWidth={1} />
            <line x1={pumpX + 40} y1={pumpY} x2={pumpX + 50} y2={pumpY} stroke="#D32F2F" strokeWidth={1} />
            <text
              x={pumpX + 55}
              y={(liquidLevel + pumpY) / 2 + 4}
              fill="#D32F2F"
              fontSize="10"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {`Δz = ${Math.abs(staticHeight)} ${unitLabel}`}
            </text>
          </>
        )}

        {/* Labels */}
        <text
          x={tankX + tankW / 2}
          y={tankY + tankH + 18}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Supply Tank
        </text>
        <text
          x={pumpX}
          y={pumpY + pumpR + 18}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {pumpAbove ? 'Suction lift' : 'Flooded suction'}
        </text>
      </svg>
    </Stack>
  );
}
