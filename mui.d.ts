/* eslint-disable @typescript-eslint/no-empty-interface */
import type { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // Reduce type complexity for sx prop by disabling csstype autocomplete
  interface CSSProperties {
    // Allow any string value for custom CSS properties
    [key: `--${string}`]: string | number;
  }
}