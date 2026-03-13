'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { TankOutputs, UnitSystem } from '@/lib/types';

interface TankDrawing2DProps {
  outputs: TankOutputs;
  innerDiameter: number;
  unitSystem: UnitSystem;
}

export default function TankDrawing2D({ outputs, innerDiameter, unitSystem }: TankDrawing2DProps) {
  if (outputs.error || outputs.totalHeight === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 300,
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
          Enter valid inputs to see the tank drawing
        </Typography>
      </Box>
    );
  }

  const unit = unitSystem === 'metric' ? 'mm' : 'in';
  const D = innerDiameter;
  const H_cyl = outputs.cylinderHeight;
  const H_cone = outputs.coneHeight;
  const H_total = outputs.totalHeight;

  // SVG dimensions and scaling
  const svgWidth = 400;
  const svgHeight = 450;
  const margin = { top: 30, right: 80, bottom: 30, left: 80 };
  const drawWidth = svgWidth - margin.left - margin.right;
  const drawHeight = svgHeight - margin.top - margin.bottom;

  // Scale to fit
  const scaleX = drawWidth / D;
  const scaleY = drawHeight / H_total;
  const scale = Math.min(scaleX, scaleY);

  const tankW = D * scale;
  const cylH = H_cyl * scale;
  const coneH = H_cone * scale;
  const totalH = cylH + coneH;

  // Centre horizontally
  const offsetX = margin.left + (drawWidth - tankW) / 2;
  const offsetY = margin.top + (drawHeight - totalH) / 2;

  // Tank coordinates (inverted Y: top of SVG = top of tank)
  const topLeft = { x: offsetX, y: offsetY };
  const topRight = { x: offsetX + tankW, y: offsetY };
  const cylBottomLeft = { x: offsetX, y: offsetY + cylH };
  const cylBottomRight = { x: offsetX + tankW, y: offsetY + cylH };
  const coneBottom = { x: offsetX + tankW / 2, y: offsetY + totalH };

  // Liquid level (80% of total volume → visually approximate)
  const liquidY = offsetY + totalH * 0.15;

  // Dimension line positions
  const dimLineLeft = offsetX - 35;
  const dimLineRight = offsetX + tankW + 35;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width="100%"
        height="auto"
        style={{ maxHeight: 450 }}
      >
        {/* Background */}
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#F8FAFC" rx="8" />

        {/* Tank fill — liquid area */}
        <clipPath id="tankClip">
          <polygon
            points={`
              ${topLeft.x},${liquidY}
              ${topRight.x},${liquidY}
              ${cylBottomRight.x},${cylBottomRight.y}
              ${coneBottom.x},${coneBottom.y}
              ${cylBottomLeft.x},${cylBottomLeft.y}
            `}
          />
        </clipPath>
        <rect
          x={topLeft.x}
          y={liquidY}
          width={tankW}
          height={totalH}
          fill="#E3F2FD"
          clipPath="url(#tankClip)"
        />

        {/* Tank outline */}
        {/* Flat lid */}
        <line
          x1={topLeft.x} y1={topLeft.y}
          x2={topRight.x} y2={topRight.y}
          stroke="#0072CE" strokeWidth={2.5}
        />
        {/* Left cylinder wall */}
        <line
          x1={topLeft.x} y1={topLeft.y}
          x2={cylBottomLeft.x} y2={cylBottomLeft.y}
          stroke="#0072CE" strokeWidth={2}
        />
        {/* Right cylinder wall */}
        <line
          x1={topRight.x} y1={topRight.y}
          x2={cylBottomRight.x} y2={cylBottomRight.y}
          stroke="#0072CE" strokeWidth={2}
        />
        {/* Left cone */}
        <line
          x1={cylBottomLeft.x} y1={cylBottomLeft.y}
          x2={coneBottom.x} y2={coneBottom.y}
          stroke="#0072CE" strokeWidth={2}
        />
        {/* Right cone */}
        <line
          x1={cylBottomRight.x} y1={cylBottomRight.y}
          x2={coneBottom.x} y2={coneBottom.y}
          stroke="#0072CE" strokeWidth={2}
        />

        {/* Cylinder-cone junction dashed line */}
        <line
          x1={cylBottomLeft.x} y1={cylBottomLeft.y}
          x2={cylBottomRight.x} y2={cylBottomRight.y}
          stroke="#0072CE" strokeWidth={1} strokeDasharray="6,4" opacity={0.5}
        />

        {/* Liquid level dashed line */}
        <line
          x1={topLeft.x + 4} y1={liquidY}
          x2={topRight.x - 4} y2={liquidY}
          stroke="#1976D2" strokeWidth={1} strokeDasharray="4,3" opacity={0.7}
        />
        <text
          x={topRight.x + 8} y={liquidY + 4}
          fill="#1976D2" fontSize="10" fontFamily="Inter, sans-serif"
        >
          Liquid level
        </text>

        {/* Dimension: Diameter (top) */}
        <line
          x1={topLeft.x} y1={offsetY - 15}
          x2={topRight.x} y2={offsetY - 15}
          stroke="#5A6A7A" strokeWidth={1}
          markerStart="url(#arrowLeft)" markerEnd="url(#arrowRight)"
        />
        <line x1={topLeft.x} y1={offsetY - 20} x2={topLeft.x} y2={offsetY - 5} stroke="#5A6A7A" strokeWidth={0.5} />
        <line x1={topRight.x} y1={offsetY - 20} x2={topRight.x} y2={offsetY - 5} stroke="#5A6A7A" strokeWidth={0.5} />
        <text
          x={offsetX + tankW / 2} y={offsetY - 19}
          textAnchor="middle" fill="#5A6A7A" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif"
        >
          ID = {D} {unit}
        </text>

        {/* Dimension: Total height (right) */}
        <line
          x1={dimLineRight} y1={topRight.y}
          x2={dimLineRight} y2={coneBottom.y}
          stroke="#5A6A7A" strokeWidth={1}
          markerStart="url(#arrowUp)" markerEnd="url(#arrowDown)"
        />
        <line x1={dimLineRight - 5} y1={topRight.y} x2={dimLineRight + 5} y2={topRight.y} stroke="#5A6A7A" strokeWidth={0.5} />
        <line x1={dimLineRight - 5} y1={coneBottom.y} x2={dimLineRight + 5} y2={coneBottom.y} stroke="#5A6A7A" strokeWidth={0.5} />
        <text
          x={dimLineRight + 4} y={offsetY + totalH / 2}
          fill="#5A6A7A" fontSize="10" fontFamily="Inter, sans-serif"
          transform={`rotate(90, ${dimLineRight + 4}, ${offsetY + totalH / 2})`}
          textAnchor="middle"
        >
          H = {H_total} {unit}
        </text>

        {/* Dimension: Cylinder height (left) */}
        {cylH > 5 && (
          <>
            <line
              x1={dimLineLeft} y1={topLeft.y}
              x2={dimLineLeft} y2={cylBottomLeft.y}
              stroke="#5A6A7A" strokeWidth={1}
              markerStart="url(#arrowUp)" markerEnd="url(#arrowDown)"
            />
            <line x1={dimLineLeft - 5} y1={topLeft.y} x2={dimLineLeft + 5} y2={topLeft.y} stroke="#5A6A7A" strokeWidth={0.5} />
            <line x1={dimLineLeft - 5} y1={cylBottomLeft.y} x2={dimLineLeft + 5} y2={cylBottomLeft.y} stroke="#5A6A7A" strokeWidth={0.5} />
            <text
              x={dimLineLeft - 4} y={offsetY + cylH / 2}
              fill="#5A6A7A" fontSize="9" fontFamily="Inter, sans-serif"
              textAnchor="end"
            >
              H_cyl
            </text>
            <text
              x={dimLineLeft - 4} y={offsetY + cylH / 2 + 12}
              fill="#5A6A7A" fontSize="9" fontFamily="Inter, sans-serif"
              textAnchor="end"
            >
              {H_cyl} {unit}
            </text>
          </>
        )}

        {/* Dimension: Cone height (left, below cylinder) */}
        {coneH > 5 && (
          <>
            <line
              x1={dimLineLeft} y1={cylBottomLeft.y}
              x2={dimLineLeft} y2={coneBottom.y}
              stroke="#5A6A7A" strokeWidth={1}
              markerStart="url(#arrowUp)" markerEnd="url(#arrowDown)"
            />
            <line x1={dimLineLeft - 5} y1={cylBottomLeft.y} x2={dimLineLeft + 5} y2={cylBottomLeft.y} stroke="#5A6A7A" strokeWidth={0.5} />
            <line x1={dimLineLeft - 5} y1={coneBottom.y} x2={dimLineLeft + 5} y2={coneBottom.y} stroke="#5A6A7A" strokeWidth={0.5} />
            <text
              x={dimLineLeft - 4} y={cylBottomLeft.y + coneH / 2}
              fill="#5A6A7A" fontSize="9" fontFamily="Inter, sans-serif"
              textAnchor="end"
            >
              H_cone
            </text>
            <text
              x={dimLineLeft - 4} y={cylBottomLeft.y + coneH / 2 + 12}
              fill="#5A6A7A" fontSize="9" fontFamily="Inter, sans-serif"
              textAnchor="end"
            >
              {H_cone} {unit}
            </text>
          </>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowRight" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#5A6A7A" />
          </marker>
          <marker id="arrowLeft" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
            <polygon points="8 0, 0 3, 8 6" fill="#5A6A7A" />
          </marker>
          <marker id="arrowDown" markerWidth="6" markerHeight="8" refX="3" refY="8" orient="auto">
            <polygon points="0 0, 6 0, 3 8" fill="#5A6A7A" />
          </marker>
          <marker id="arrowUp" markerWidth="6" markerHeight="8" refX="3" refY="0" orient="auto">
            <polygon points="0 8, 6 8, 3 0" fill="#5A6A7A" />
          </marker>
        </defs>
      </svg>
    </Box>
  );
}
