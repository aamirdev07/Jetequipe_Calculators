// ============================================
// Unit Systems
// ============================================

export type UnitSystem = 'metric' | 'imperial';

// ============================================
// Tank Calculator Types
// ============================================

export interface TankInputs {
  unitSystem: UnitSystem;
  innerDiameter: number; // mm (metric) or in (imperial)
  workingVolume: number; // L (metric) or gal (imperial)
  coneAngle: number; // degrees
}

export interface TankOutputs {
  cylinderHeight: number; // mm (metric) or in (imperial)
  coneHeight: number; // mm (metric) or in (imperial)
  totalHeight: number; // mm (metric) or in (imperial)
  hdRatio: number; // dimensionless
  totalVolume: number; // L (metric) or gal (imperial)
  totalVolumeM3: number; // always m³ for display
  error: string | null;
}

export type RatioStatus = 'low' | 'high-vortex' | 'very-high';

// ============================================
// Friction Loss Calculator Types
// ============================================

export type FlowRateUnit = 'GPM' | 'LPM' | 'm3h';
export type LengthUnit = 'ft' | 'm';
export type AdditionalLossUnit = 'PSI' | 'FT' | 'M' | 'BAR';

export interface FrictionInputs {
  flowRate: number;
  flowRateUnit: FlowRateUnit;
  viscosity: number; // cP
  temperature: number; // °C
  specificGravity: number;
  nominalDiameter: number; // nominal inches (e.g., 2.0)
  pipeLength: number;
  pipeLengthUnit: LengthUnit;
  elbows45: number;
  elbows90: number;
  ballValves: number;
  butterflyValves: number;
  elevationChange: number;
  elevationUnit: LengthUnit;
  additionalLoss: number;
  additionalLossUnit: AdditionalLossUnit;
}

export interface FrictionOutputs {
  totalHeadLossM: number; // metres
  totalHeadLossFt: number; // feet
  totalPressureLossPsi: number; // psi
  totalPressureLossBar: number; // bar
  velocityMs: number; // m/s
  velocityFts: number; // ft/s
  reynoldsNumber: number;
  flowRegime: 'Laminar' | 'Transitional' | 'Turbulent';
  majorLossM: number;
  minorLossM: number;
  staticHeadM: number;
  additionalLossM: number;
  frictionFactor: number;
  error: string | null;
}

// ============================================
// Fluid Velocity Calculator Types
// ============================================

export type VelocityFlowUnit = 'm3h' | 'Lmin' | 'Ls' | 'GPM';
export type VelocityDiameterUnit = 'mm' | 'in';

export interface VelocityInputs {
  flowRate: number;
  flowRateUnit: VelocityFlowUnit;
  pipeDiameter: number;
  pipeDiameterUnit: VelocityDiameterUnit;
}

export interface VelocityOutputs {
  velocityMs: number; // m/s
  velocityFts: number; // ft/s
  cipStatus: 'in-range' | 'below' | 'above';
  cipLabel: string;
  error: string | null;
}

// ============================================
// NPSH Calculator Types
// ============================================

export type PressureUnit = 'psi' | 'bar';
export type HeadUnit = 'ft' | 'm';

export interface NpshInputs {
  unitSystem: UnitSystem;
  atmosphericPressure: number; // psi (imperial) or bar (metric)
  sourcePressure: number; // psi (imperial) or bar (metric)
  staticHeight: number; // ft (imperial) or m (metric) — positive = pump above liquid
  frictionLoss: number; // ft (imperial) or m (metric)
  vaporPressure: number; // psi (imperial) or bar (metric)
  specificGravity: number;
}

export interface NpshOutputs {
  npsha: number; // ft (imperial) or m (metric)
  atmosphericHead: number;
  sourceHead: number;
  staticHead: number;
  frictionHead: number;
  vaporHead: number;
  riskLevel: 'adequate' | 'low' | 'critical';
  riskLabel: string;
  error: string | null;
}

export interface FluidPreset {
  label: string;
  vaporPressurePsi: number;
  vaporPressureBar: number;
  specificGravity: number;
}

// ============================================
// Pipe Data Types
// ============================================

export interface PipeSize {
  nominal_in: number;
  label: string;
  id_m: number;
}

export interface FittingsKValues {
  K45: number;
  K90: number;
  Kball: number;
  Kbutterfly: number;
}
