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
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav,
          .no-print,
          [class*="MuiAppBar"],
          [class*="Header"],
          button {
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
        }
      `}</style>
    </ThemeProvider>
  );
}
