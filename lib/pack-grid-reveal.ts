export const PACK_GRID_EAGER = 9;
export const PACK_GRID_PAGE = 9;

export function initialRevealed(total: number, eager = PACK_GRID_EAGER): number {
  const safeTotal = Math.max(0, total);
  return Math.min(safeTotal, Math.max(0, eager));
}

export function nextRevealed(
  revealed: number,
  total: number,
  page = PACK_GRID_PAGE
): number {
  const safeTotal = Math.max(0, total);
  const current = Math.min(safeTotal, Math.max(0, revealed));
  return Math.min(safeTotal, current + Math.max(0, page));
}

export function needsSentinel(revealed: number, total: number): boolean {
  const safeTotal = Math.max(0, total);
  return Math.min(safeTotal, Math.max(0, revealed)) < safeTotal;
}
