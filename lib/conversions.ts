// ============================================
// LENGTH CONVERSIONS
// ============================================

export function mmToM(mm: number): number {
  return mm / 1000;
}

export function inToM(inches: number): number {
  return inches * 0.0254;
}

export function mToMm(m: number): number {
  return m * 1000;
}

export function mToIn(m: number): number {
  return m / 0.0254;
}

export function mToFt(m: number): number {
  return m * 3.28084;
}

export function ftToM(ft: number): number {
  return ft * 0.3048;
}

export function mmToIn(mm: number): number {
  return mm / 25.4;
}

export function inToMm(inches: number): number {
  return inches * 25.4;
}

// ============================================
// VOLUME CONVERSIONS
// ============================================

export function lToM3(l: number): number {
  return l * 0.001;
}

export function galToM3(gal: number): number {
  return gal * 0.003785411784;
}

export function m3ToL(m3: number): number {
  return m3 * 1000;
}

export function m3ToGal(m3: number): number {
  return m3 / 0.003785411784;
}

export function lToGal(l: number): number {
  return m3ToGal(lToM3(l));
}

export function galToL(gal: number): number {
  return m3ToL(galToM3(gal));
}

// ============================================
// FLOW RATE CONVERSIONS (to m³/s)
// ============================================

export function gpmToM3s(gpm: number): number {
  return gpm * 0.003785411784 / 60;
}

export function lpmToM3s(lpm: number): number {
  return lpm * 0.001 / 60;
}

export function m3hToM3s(m3h: number): number {
  return m3h / 3600;
}

export function lsToM3s(ls: number): number {
  return ls * 0.001;
}

// ============================================
// PRESSURE CONVERSIONS
// ============================================

export function psiToBar(psi: number): number {
  return psi * 0.0689476;
}

export function barToPsi(bar: number): number {
  return bar * 14.5038;
}

export function psiToHeadM(psi: number, sg: number): number {
  return psi * 0.703070 / sg;
}

export function barToHeadM(bar: number, sg: number): number {
  return bar * 10.1972 / sg;
}

export function psiToHeadFt(psi: number, sg: number): number {
  return psi * 2.31 / sg;
}

export function barToHeadFt(bar: number, sg: number): number {
  return mToFt(barToHeadM(bar, sg));
}

export function paToBar(pa: number): number {
  return pa / 100000;
}

export function paToPsi(pa: number): number {
  return pa / 6894.76;
}

export function headMToPsi(headM: number, sg: number): number {
  return headM * sg / 0.703070;
}

export function headMToBar(headM: number, sg: number): number {
  return headM * sg / 10.1972;
}

// ============================================
// TEMPERATURE CONVERSIONS
// ============================================

export function cToF(c: number): number {
  return c * 9 / 5 + 32;
}

export function fToC(f: number): number {
  return (f - 32) * 5 / 9;
}

// ============================================
// VELOCITY CONVERSIONS
// ============================================

export function msToFts(ms: number): number {
  return ms * 3.28084;
}

export function ftsToMs(fts: number): number {
  return fts / 3.28084;
}
