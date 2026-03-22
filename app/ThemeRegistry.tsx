'use client';

import React from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AppShell = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  overflowX: 'hidden',
});

const Main = styled('main')({
  flex: 1,
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </AppShell>
      {/* Print styles — only recap section prints */}
      <style jsx global>{`
        @media print {
          header, footer, nav,
          .no-print,
          [class*="MuiAppBar"],
          [class*="Header"] {
            display: none !important;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          main {
            padding: 0 !important;
          }
          /* Hide everything in grid except accordion (recap) */
          [class*="MuiGrid-container"] > [class*="MuiGrid-item"] > [class*="MuiPaper"] {
            display: none !important;
          }
          /* Show accordion (recap section) */
          [class*="MuiAccordion"] {
            display: block !important;
            border: none !important;
            box-shadow: none !important;
          }
          [class*="MuiAccordion"] [class*="MuiAccordionSummary"] {
            display: none !important;
          }
          [class*="MuiAccordion"] [class*="MuiAccordionDetails"] {
            display: block !important;
            padding: 0 !important;
          }
          [class*="MuiAccordion"] .no-print {
            display: none !important;
          }
          /* Show the calc page header for context */
          [class*="CalcPageHeader"],
          main > div:first-child {
            display: block !important;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}
