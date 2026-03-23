'use client';

import React, { useCallback, useRef } from 'react';
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
  /** Ref to a DOM element (e.g. diagram) to include on the right side of the printed PDF */
  diagramRef?: React.RefObject<HTMLDivElement | null>;
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

function buildPrintHtml(
  title: string,
  tableHtml: string,
  diagramHtml: string | null,
  logoUrl: string,
): string {
  const disclaimer =
    'For reference only. Results must be verified by a qualified engineer. Jetequip is not responsible for the results or their interpretation or use.';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, Arial, Helvetica, sans-serif; color: #1a1a2e; padding: 24px; }
    .logo-header { text-align: center; margin-bottom: 16px; }
    .logo-header img { height: 44px; }
    h1 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .subtitle { font-size: 11px; color: #666; margin-bottom: 16px; }
    .wrap { display: flex; gap: 32px; }
    .table-side { flex: 1; min-width: 0; }
    .diagram-side { flex: 1; min-width: 0; display: flex; align-items: flex-start; justify-content: center; }
    .diagram-side svg { width: 100%; height: auto; max-height: 500px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    td { padding: 4px 8px; border-bottom: 1px solid #eee; }
    td:first-child { color: #666; width: 45%; }
    .section-header td { padding-top: 12px; border-bottom: none; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
    .bold { font-weight: 700; }
    .disclaimer { font-size: 9px; color: #999; margin-top: 16px; line-height: 1.5; }
    .footer { font-size: 9px; color: #999; margin-top: 8px; }
    @media print {
      body { padding: 16px; }
    }
  </style>
</head>
<body>
  <div class="logo-header"><img src="${logoUrl}" alt="Jetequip"/></div>
  <h1>${title}</h1>
  <div class="subtitle">Generated ${new Date().toLocaleString()}</div>
  <div class="wrap">
    <div class="table-side">${tableHtml}</div>
    ${diagramHtml ? `<div class="diagram-side">${diagramHtml}</div>` : ''}
  </div>
  <div class="disclaimer">${disclaimer}</div>
  <div class="footer">Jetequip — jetequip.com</div>
</body>
</html>`;
}

export default function RecapSection({
  title,
  rows,
  accentColor = '#0072CE',
  diagramRef,
}: RecapSectionProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  const handlePrint = useCallback(() => {
    // Build table HTML from rows data (not DOM) for clean output
    const tableHtml = `<table>${rows
      .map((row) => {
        if (row.section) {
          return `<tr class="section-header"><td colspan="2">${row.label}</td></tr>`;
        }
        return `<tr><td>${row.label}</td><td class="${row.bold ? 'bold' : ''}">${row.value}</td></tr>`;
      })
      .join('')}</table>`;

    // Grab diagram SVG if ref is provided
    let diagramHtml: string | null = null;
    if (diagramRef?.current) {
      const svg = diagramRef.current.querySelector('svg');
      if (svg) {
        diagramHtml = new XMLSerializer().serializeToString(svg);
      }
    }

    const logoUrl = `${window.location.origin}/Jetequip-Couleur-Sans-Mention.png`;
    const html = buildPrintHtml(title, tableHtml, diagramHtml, logoUrl);

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    // Wait for content to render before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
    // Fallback if onload doesn't fire
    setTimeout(() => {
      try {
        printWindow.print();
        printWindow.close();
      } catch {
        // window already closed
      }
    }, 500);
  }, [title, rows, diagramRef]);

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
        <Table ref={tableRef} size="small" sx={{ '& td': { border: 'none', py: 0.4 } }}>
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
