'use client';

import React, { useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Stack,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface RecapRow {
  label: string;
  value: string;
  bold?: boolean;
  section?: boolean;
}

interface RecapSectionProps {
  title: string;
  rows: RecapRow[];
  accentColor?: string;
}

function toCsv(title: string, rows: RecapRow[]): string {
  const lines: string[] = [
    `"${title}"`,
    `"Generated","${new Date().toLocaleString()}"`,
    '',
    '"Parameter","Value"',
    ...rows.filter((r) => !r.section).map((r) => `"${r.label}","${r.value}"`),
    '',
    '"For reference only. Results must be verified by a qualified engineer."',
    '"Jetequip — jetequip.com"',
  ];
  return lines.join('\n');
}

export default function RecapSection({ title, rows, accentColor = '#0072CE' }: RecapSectionProps) {
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
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing={0.5} sx={{ fontSize: '0.7rem' }}>
          Input Recap &amp; Export
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small" sx={{ '& td': { border: 'none', py: 0.4 } }}>
          <TableBody>
            {rows.map((row, i) =>
              row.section ? (
                <TableRow key={i}>
                  <TableCell colSpan={2} sx={{ pt: 1.5 }}>
                    <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing={0.5} sx={{ fontSize: '0.65rem' }}>
                      {row.label}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={i}>
                  <TableCell sx={{ color: 'text.secondary', width: '40%' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{row.label}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={row.bold ? 700 : 400} sx={{ fontSize: '0.8rem' }}>
                      {row.value}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} className="no-print">
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
            variant="contained"
            size="small"
            startIcon={<PrintIcon sx={{ fontSize: '16px !important' }} />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
