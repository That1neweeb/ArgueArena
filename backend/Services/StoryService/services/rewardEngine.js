export const calculateReward = ({
  roundScore,
  passingScore,
  bossRound,
  maxScore,
}) => {
  const passed = roundScore >= passingScore;
  const completionXP = passed ? 100 : 20;
  const scoreBonus = Math.max(0, roundScore) * 8;
  const bossBonus = bossRound && passed ? 150 : 0;
  const xp = completionXP + scoreBonus + bossBonus;
  const coins = Math.floor(xp / 5) + (bossRound && passed ? 25 : 0);
  const stars = passed
    ? roundScore >= maxScore
      ? 3
      : roundScore >= Math.ceil(maxScore * 0.75)
      ? 2
      : 1
    : 0;

  return {
    xp,
    coins,
    stars,
    passed,
  };
};
