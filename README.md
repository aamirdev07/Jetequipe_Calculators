# Jetequip Engineering Calculators

Process engineering calculators for the sanitary and aseptic processing industry, built for [Jetequip](https://jetequip.com).

## Calculators

- **Tank Dimensions** — Vertical conical-bottom tank geometry (cylinder height, total height, volume, H/D ratio) with 2D profile drawing
- **Friction Loss** — Darcy-Weisbach pipe friction with Swamee-Jain friction factor, K-method minor losses, and elevation head
- **Fluid Velocity** — Flow rate to velocity conversion with CIP range indicator (5–7 ft/s)
- **NPSH Available** — Net Positive Suction Head with risk assessment and system diagram

All calculations run client-side for instant results. Imperial and metric unit systems supported.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Material UI v5**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/                    # Next.js pages (App Router)
  page.tsx              # Landing page
  tank-calculator/      # Tank dimension calculator
  friction-loss/        # Friction loss calculator
  fluid-velocity/       # Fluid velocity calculator
  npsh-calculator/      # NPSH available calculator
components/
  layout/               # Header, Footer
  shared/               # Reusable UI (InputField, ResultCard, UnitToggle, etc.)
  tank/                 # Tank-specific components
  friction/             # Friction-specific components
  velocity/             # Velocity-specific components
  npsh/                 # NPSH-specific components
lib/
  calculations/         # Engineering formulas
  config/               # Pipe sizes, fittings K-values, fluid presets
  types.ts              # TypeScript interfaces
  conversions.ts        # Unit conversion utilities
theme/
  theme.ts              # MUI theme (colors, typography, component overrides)
```
