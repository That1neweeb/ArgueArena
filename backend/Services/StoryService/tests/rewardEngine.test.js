import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReward } from '../services/rewardEngine.js';

test('failed round grants no xp or coins', () => {
  const reward = calculateReward({
    roundScore: 10,
    passingScore: 14,
    bossRound: false,
    maxScore: 20,
  });

  assert.equal(reward.passed, false);
  assert.equal(reward.xp, 0);
  assert.equal(reward.coins, 0);
  assert.equal(reward.stars, 0);
});

test('passed round grants xp and coins', () => {
  const reward = calculateReward({
    roundScore: 14,
    passingScore: 14,
    bossRound: false,
    maxScore: 20,
  });

  assert.equal(reward.passed, true);
  assert.ok(reward.xp > 0);
  assert.ok(reward.coins >= 0);
  assert.ok(reward.stars >= 1);
});
