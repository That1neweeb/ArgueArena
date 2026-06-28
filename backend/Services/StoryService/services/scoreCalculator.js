export const OPTION_SCORES = {
  GOOD: 2,
  NEUTRAL: 1,
  POOR: 0,
};

/**
 * Returns score based on option quality
 * quality:
 * 2 = Good
 * 1 = Neutral
 * 0 = Poor
 */
export const calculateOptionScore = (quality) => {
  switch (quality) {
    case 2:
      return OPTION_SCORES.GOOD;

    case 1:
      return OPTION_SCORES.NEUTRAL;

    case 0:
      return OPTION_SCORES.POOR;

    default:
      return 0;
  }
};

/**
 * Calculates total score of current round
 */
export const calculateRoundScore = (selectedOptions = []) => {
  let score = 0;

  selectedOptions.forEach((option) => {
    score += calculateOptionScore(option.quality);
  });

  return score;
};

/**
 * Checks if player passed the round
 */
export const hasPassedRound = (score, passingScore) => {
  return score >= passingScore;
};

/**
 * Returns percentage progress of current round
 */
export const calculateProgress = (
  currentTurn,
  totalTurns
) => {
  if (!totalTurns) return 0;

  return Math.floor((currentTurn / totalTurns) * 100);
};
