'use client';

import React, { useCallback } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface ExportRow {
  label: string;
  value: string;
}

interface ExportBarProps {
  title: string;
  rows: ExportRow[];
  accentColor?: string;
}

function toCsv(title: string, rows: ExportRow[]): string {
  const lines: string[] = [
    `"${title}"`,
    `"Generated","${new Date().toLocaleString()}"`,
    '',
    '"Parameter","Value"',
    ...rows.map((r) => `"${r.label}","${r.value}"`),
    '',
    '"For estimation only — verify with a qualified engineer."',
    '"Jetequip — jetequip.com"',
  ];
  return lines.join('\n');
}

export default function ExportBar({ title, rows, accentColor = '#0072CE' }: ExportBarProps) {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadCsv = useCallback(() => {
    const csv = toCsv(title, rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [title, rows]);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ mt: 2 }}
      className="no-print"
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<FileDownloadIcon sx={{ fontSize: '16px !important' }} />}
        onClick={handleDownloadCsv}
        sx={{
          color: 'text.secondary',
          borderColor: 'divider',
          fontWeight: 500,
          '&:hover': { borderColor: accentColor, color: accentColor },
        }}
      >
        Export CSV
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PrintIcon sx={{ fontSize: '16px !important' }} />}
        onClick={handlePrint}
        sx={{
          color: 'text.secondary',
          borderColor: 'divider',
          fontWeight: 500,
          '&:hover': { borderColor: accentColor, color: accentColor },
        }}
      >
        Print
      </Button>
    </Stack>
  );
}
