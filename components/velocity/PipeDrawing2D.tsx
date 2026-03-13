'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface PipeDrawing2DProps {
  diameterMm: number;
  velocityMs: number;
  diameterUnit: string;
  diameterValue: number;
}

export default function PipeDrawing2D({ diameterMm, velocityMs, diameterUnit, diameterValue }: PipeDrawing2DProps) {
  if (diameterMm <= 0 || velocityMs <= 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#F8FAFC',
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Enter valid inputs to see the pipe diagram
        </Typography>
      </Box>
    );
  }

  const svgWidth = 400;
  const svgHeight = 220;

  // Scale pipe height with diameter
  const pipeHeightPx = Math.min(120, Math.max(30, 30 + 20 * Math.sqrt(diameterMm / 50)));
  // Arrow length proportional to velocity
  const arrowLengthPx = Math.min(160, Math.max(40, 40 + 10 * velocityMs));

  const cx = svgWidth / 2;
  const cy = svgHeight / 2;

  const pipeLeft = 60;
  const pipeRight = svgWidth - 60;
  const pipeTop = cy - pipeHeightPx / 2;
  const pipeBottom = cy + pipeHeightPx / 2;
  const pipeWidth = pipeRight - pipeLeft;

  const arrowX = cx - arrowLengthPx / 2;
  const arrowEndX = cx + arrowLengthPx / 2;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="auto" style={{ maxHeight: 220 }}>
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#F8FAFC" rx="8" />

        {/* Pipe body */}
        <rect
          x={pipeLeft}
          y={pipeTop}
          width={pipeWidth}
          height={pipeHeightPx}
          rx={pipeHeightPx / 2}
          fill="#E3F2FD"
          stroke="#0072CE"
          strokeWidth={2.5}
        />

        {/* Inner flow area fill */}
        <rect
          x={pipeLeft + 8}
          y={pipeTop + 4}
          width={pipeWidth - 16}
          height={pipeHeightPx - 8}
          rx={(pipeHeightPx - 8) / 2}
          fill="#BBDEFB"
          opacity={0.5}
        />

        {/* Flow arrow */}
        <defs>
          <marker id="flowArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#00A859" />
          </marker>
        </defs>
        <line
          x1={arrowX}
          y1={cy}
          x2={arrowEndX}
          y2={cy}
          stroke="#00A859"
          strokeWidth={3}
          markerEnd="url(#flowArrow)"
        />

        {/* Velocity label */}
        <text
          x={cx}
          y={cy - pipeHeightPx / 2 - 30}
          textAnchor="middle"
          fill="#00A859"
          fontSize="13"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          v = {velocityMs.toFixed(2)} m/s
        </text>

        {/* Diameter dimension line */}
        <line
          x1={pipeLeft - 20}
          y1={pipeTop}
          x2={pipeLeft - 20}
          y2={pipeBottom}
          stroke="#5A6A7A"
          strokeWidth={1}
        />
        <line x1={pipeLeft - 25} y1={pipeTop} x2={pipeLeft - 15} y2={pipeTop} stroke="#5A6A7A" strokeWidth={0.5} />
        <line x1={pipeLeft - 25} y1={pipeBottom} x2={pipeLeft - 15} y2={pipeBottom} stroke="#5A6A7A" strokeWidth={0.5} />
        <text
          x={pipeLeft - 28}
          y={cy + 4}
          textAnchor="end"
          fill="#5A6A7A"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          D = {diameterValue} {diameterUnit}
        </text>

        {/* Flow direction label */}
        <text
          x={cx}
          y={cy + pipeHeightPx / 2 + 22}
          textAnchor="middle"
          fill="#5A6A7A"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Flow direction \u2192
        </text>
      </svg>
    </Box>
  );
}
