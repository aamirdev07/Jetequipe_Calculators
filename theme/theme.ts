'use client';

import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY = '#0072CE';
const SECONDARY = '#00A859';
const R = 0; // global border-radius — sharp rectangles

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
      light: '#4DA3E8',
      dark: '#004F8F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: SECONDARY,
      light: '#4DC98A',
      dark: '#00753E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5A6A7A',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#ED6C02',
    },
    success: {
      main: '#2E7D32',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    h3: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: R,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollBehavior: 'smooth',
        },
        '@media print': {
          body: {
            backgroundColor: '#FFFFFF !important',
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: R,
          border: '1px solid #E2E8F0',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: alpha(PRIMARY, 0.3),
            boxShadow: `0 4px 20px ${alpha(PRIMARY, 0.08)}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: R,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.3)}`,
          },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: R,
            transition: 'box-shadow 0.2s ease',
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.12)}`,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: R,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: R,
          backgroundColor: '#F0F4F8',
          padding: 2,
          gap: 2,
        },
        grouped: {
          borderRadius: `${R}px !important`,
          border: 'none !important',
          padding: '6px 18px',
          fontSize: '0.8125rem',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            backgroundColor: PRIMARY,
            color: '#FFFFFF',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#004F8F',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 6,
        },
        thumb: {
          width: 18,
          height: 18,
          borderRadius: R,
          transition: 'box-shadow 0.2s ease',
          '&:hover, &.Mui-focusVisible': {
            boxShadow: `0 0 0 8px ${alpha(PRIMARY, 0.16)}`,
          },
        },
        track: {
          borderRadius: R,
        },
        rail: {
          borderRadius: R,
          opacity: 0.25,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: R,
        },
        outlined: {
          borderColor: '#E2E8F0',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: R,
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: R,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: `${R}px !important`,
          border: '1px solid #E2E8F0',
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '0.8125rem',
        },
      },
    },
  },
});

export default theme;
