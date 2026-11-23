// data/roundsData.js

/**
 * Calculates rolling handicap:
 * Takes the lowest scores (best differential over par 72)
 * and averages them.
 */
export function calculateRollingHcp(scores = []) {
  if (!scores || scores.length === 0) return 0;

  // Calculate score minus par (assuming standard par 72)
  const diffs = scores.map((s) => s - 72);

  // Sort lowest to highest
  diffs.sort((a, b) => a - b);

  // Pick the best scores based on how many rounds played
  let countToUse = 1;
  if (scores.length >= 20) countToUse = 8;       // Best 8 of 20
  else if (scores.length >= 10) countToUse = 4;  // Best 4 of 10
  else if (scores.length >= 5) countToUse = 2;   // Best 2 of 5
  else countToUse = Math.max(1, Math.floor(scores.length / 2));

  const bestDiffs = diffs.slice(0, countToUse);
  const average = bestDiffs.reduce((a, b) => a + b, 0) / bestDiffs.length;

  return Math.max(0, Number(average.toFixed(1)));
}

export const membersRounds = [
  {
    id: 1,
    name: "Abad, Rolando",
    scores: [78, 80, 76, 79, 77], // Try adding or changing scores here!
  },
  {
    id: 2,
    name: "Abano, Rene",
    scores: [80, 82, 78, 81, 79],
  },
  {
    id: 3,
    name: "Agpaoa, Aggie",
    scores: [82, 85, 80, 84, 81],
  },
];
