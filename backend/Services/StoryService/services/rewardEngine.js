export const calculateReward = ({
  roundScore,
  passingScore,
  bossRound,
  maxScore,
}) => {
  const passed = roundScore >= passingScore;

  if (!passed) {
    return {
      xp: 0,
      coins: 0,
      stars: 0,
      passed,
    };
  }

  const completionXP = 100;
  const scoreBonus = Math.max(0, roundScore) * 8;
  const bossBonus = bossRound ? 150 : 0;
  const xp = completionXP + scoreBonus + bossBonus;
  const coins = Math.floor(xp / 5) + (bossRound ? 25 : 0);
  const stars =
    roundScore >= maxScore
      ? 3
      : roundScore >= Math.ceil(maxScore * 0.75)
      ? 2
      : 1;

  return {
    xp,
    coins,
    stars,
    passed,
  };
};
