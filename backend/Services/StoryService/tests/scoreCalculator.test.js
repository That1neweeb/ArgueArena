import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoundScore } from '../services/scoreCalculator.js';

test('poor choice deducts one point from round score', () => {
  const score = calculateRoundScore([
    { quality: 2 },
    { quality: 0 },
    { quality: 1 },
  ]);

  assert.equal(score, 2);
});
