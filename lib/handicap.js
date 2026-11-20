/**
 * USGA/WHS Handicap Calculation Utility
 */

// 1. Calculate Score Differential for a single round
export function calculateDifferential(grossScore, courseRating = 72.0, slopeRating = 113) {
  const diff = ((113 / slopeRating) * (grossScore - courseRating));
  return Math.round(diff * 10) / 10; // Round to 1 decimal place
}

// 2. Calculate Handicap Index based on differentials
// Follows USGA guideline: averages lowest differentials among recent rounds
export function calculateHandicapIndex(differentials) {
  if (!differentials || differentials.length === 0) return 0.0;

  const count = differentials.length;
  // Sort from lowest to highest differential
  const sorted = [...differentials].sort((a, b) => a - b);

  let usedDifferentials = [];

  if (count <= 3) {
    // Lowest 1 differential minus 2.0 adjustment
    usedDifferentials = [sorted[0] - 2.0];
  } else if (count <= 5) {
    usedDifferentials = [sorted[0]];
  } else if (count <= 8) {
    usedDifferentials = sorted.slice(0, 2);
  } else if (count <= 11) {
    usedDifferentials = sorted.slice(0, 3);
  } else if (count <= 14) {
    usedDifferentials = sorted.slice(0, 4);
  } else if (count <= 16) {
    usedDifferentials = sorted.slice(0, 5);
  } else if (count <= 19) {
    usedDifferentials = sorted.slice(0, 6);
  } else {
    // 20+ rounds: Average of the lowest 8 of the last 20
    const last20 = differentials.slice(-20).sort((a, b) => a - b);
    usedDifferentials = last20.slice(0, 8);
  }

  const average =
    usedDifferentials.reduce((sum, val) => sum + val, 0) / usedDifferentials.length;

  // Truncate/round to 1 decimal place (WHS standard)
  return Math.max(0, Math.round(average * 10) / 10);
}
