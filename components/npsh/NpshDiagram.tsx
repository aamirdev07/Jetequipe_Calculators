'use client';

import React from 'react';
import { Stack } from '@mui/material';
import { NpshOutputs } from '@/lib/types';

interface NpshDiagramProps {
  staticHeight: number;
  unitLabel: string;
  outputs: NpshOutputs;
}

export default function NpshDiagram({ staticHeight, unitLabel, outputs }: NpshDiagramProps) {
  const svgWidth = 460;
  const svgHeight = 340;

  // Positive = flooded (liquid above pump), Negative = suction lift (pump above liquid)
  const pumpAbove = staticHeight < 0;

  // Tank position
  const tankX = 30;
  const tankY = pumpAbove ? 80 : 140;
  const tankW = 90;
  const tankH = 110;

  // Pump position
  const pumpX = 300;
  const pumpY = pumpAbove ? 60 : 210;
  const pumpR = 26;

  // Liquid level inside tank
  const liquidLevel = tankY + 25;
  const pipeExitY = tankY + tankH - 15;
  const pipeToX = pumpX - pumpR - 10;

  // Ground/datum line
  const datumY = Math.max(tankY + tankH + 30, pumpY + pumpR + 30);

  return (
    <Stack alignItems="center" sx={{ mt: 2 }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="auto" style={{ maxHeight: 340 }}>
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#F8FAFC" rx="8" />

        {/* Tank body */}
        <rect
          x={tankX}
          y={tankY}
          width={tankW}
          height={tankH}
          fill="none"
          stroke="#0072CE"
          strokeWidth={2}
        />
        {/* Liquid in tank */}
        <rect
          x={tankX + 2}
          y={liquidLevel}
          width={tankW - 4}
          height={tankY + tankH - liquidLevel - 2}
          fill="#BBDEFB"
          opacity={0.5}
        />
        {/* Liquid surface line */}
        <line
          x1={tankX + 4} y1={liquidLevel}
          x2={tankX + tankW - 4} y2={liquidLevel}
          stroke="#1976D2" strokeWidth={1} strokeDasharray="4,3"
        />

        {/* Tank open top indicator (atmospheric) */}
        <line x1={tankX - 4} y1={tankY} x2={tankX + 4} y2={tankY - 7} stroke="#5A6A7A" strokeWidth={1} />
        <line x1={tankX + tankW - 4} y1={tankY} x2={tankX + tankW + 4} y2={tankY - 7} stroke="#5A6A7A" strokeWidth={1} />

        {/* P_atm + P_source label */}
        <text
          x={tankX + tankW / 2}
          y={tankY - 14}
          textAnchor="middle"
          fill="#0072CE"
          fontSize="10"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          P_atm + P_s
        </text>
        <text
          x={tankX + tankW / 2}
          y={tankY - 3}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="8"
          fontFamily="Inter, sans-serif"
        >
          ↓ ha + hs
        </text>

        {/* Suction pipe: horizontal from tank to vertical rise */}
        <line
          x1={tankX + tankW}
          y1={pipeExitY}
          x2={pipeToX}
          y2={pipeExitY}
          stroke="#0072CE"
          strokeWidth={3}
        />

        {/* Suction pipe: vertical to pump height */}
        {pumpAbove ? (
          <>
            <line x1={pipeToX} y1={pipeExitY} x2={pipeToX} y2={pumpY} stroke="#0072CE" strokeWidth={3} />
            <line x1={pipeToX} y1={pumpY} x2={pumpX - pumpR} y2={pumpY} stroke="#0072CE" strokeWidth={3} />
          </>
        ) : (
          <>
            <line x1={pipeToX} y1={pipeExitY} x2={pipeToX} y2={pumpY} stroke="#0072CE" strokeWidth={3} />
            <line x1={pipeToX} y1={pumpY} x2={pumpX - pumpR} y2={pumpY} stroke="#0072CE" strokeWidth={3} />
          </>
        )}

        {/* hf label on horizontal pipe */}
        <text
          x={(tankX + tankW + pipeToX) / 2}
          y={pipeExitY - 10}
          textAnchor="middle"
          fill="#ED6C02"
          fontSize="10"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          hf = {outputs.frictionHead.toFixed(2)} {unitLabel}
        </text>
        <text
          x={(tankX + tankW + pipeToX) / 2}
          y={pipeExitY + 14}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="8"
          fontFamily="Inter, sans-serif"
        >
          friction loss
        </text>

        {/* Pump symbol (circle with impeller) */}
        <circle cx={pumpX} cy={pumpY} r={pumpR} fill="#E8F5E9" stroke="#2E7D32" strokeWidth={2} />
        <text
          x={pumpX}
          y={pumpY + 4}
          textAnchor="middle"
          fill="#2E7D32"
          fontSize="10"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          PUMP
        </text>

        {/* Discharge pipe with arrow */}
        <line x1={pumpX + pumpR} y1={pumpY} x2={svgWidth - 25} y2={pumpY} stroke="#00A859" strokeWidth={3} />
        <polygon
          points={`${svgWidth - 25},${pumpY - 6} ${svgWidth - 13},${pumpY} ${svgWidth - 25},${pumpY + 6}`}
          fill="#00A859"
        />
        <text
          x={svgWidth - 18}
          y={pumpY - 10}
          textAnchor="middle"
          fill="#00A859"
          fontSize="8"
          fontFamily="Inter, sans-serif"
        >
          discharge
        </text>

        {/* Delta-z dimension line */}
        {staticHeight !== 0 && (
          <>
            <line
              x1={pumpX + pumpR + 12}
              y1={liquidLevel}
              x2={pumpX + pumpR + 12}
              y2={pumpY}
              stroke="#D32F2F"
              strokeWidth={1.5}
              strokeDasharray="4,3"
            />
            <line x1={pumpX + pumpR + 7} y1={liquidLevel} x2={pumpX + pumpR + 17} y2={liquidLevel} stroke="#D32F2F" strokeWidth={1} />
            <line x1={pumpX + pumpR + 7} y1={pumpY} x2={pumpX + pumpR + 17} y2={pumpY} stroke="#D32F2F" strokeWidth={1} />
            <text
              x={pumpX + pumpR + 20}
              y={(liquidLevel + pumpY) / 2 - 2}
              fill="#D32F2F"
              fontSize="10"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              Δz = {Math.abs(staticHeight)} {unitLabel}
            </text>
            <text
              x={pumpX + pumpR + 20}
              y={(liquidLevel + pumpY) / 2 + 10}
              fill="#5A6A7A"
              fontSize="8"
              fontFamily="Inter, sans-serif"
            >
              {staticHeight >= 0 ? 'flooded suction' : 'suction lift'}
            </text>
          </>
        )}

        {/* hvp label near pump */}
        <text
          x={pumpX}
          y={pumpY + pumpR + 16}
          textAnchor="middle"
          fill="#7C3AED"
          fontSize="9"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          hvp = {outputs.vaporHead.toFixed(2)} {unitLabel}
        </text>

        {/* Labels */}
        <text
          x={tankX + tankW / 2}
          y={tankY + tankH + 16}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="10"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
        >
          Supply Tank
        </text>

        {/* NPSHa result */}
        <rect
          x={tankX}
          y={datumY + 4}
          width={svgWidth - tankX * 2}
          height={24}
          fill="#FFF3E0"
          stroke="#E65100"
          strokeWidth={1}
          rx={2}
        />
        <text
          x={svgWidth / 2}
          y={datumY + 20}
          textAnchor="middle"
          fill="#E65100"
          fontSize="11"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          NPSHa = ha + hs + Δz − hf − hvp = {outputs.npsha.toFixed(2)} {unitLabel}
        </text>
      </svg>
    </Stack>
  );
}
