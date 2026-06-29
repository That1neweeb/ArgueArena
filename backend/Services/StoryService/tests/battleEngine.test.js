import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOptionScore,
  calculateRoundScore,
  hasPassedRound,
  calculateProgress,
  OPTION_SCORES,
} from '../services/scoreCalculator.js';

/**
 * Battle Engine Test Suite
 * Tests game mechanics for debates and argument selections
 */

test('Battle Engine - calculateOptionScore for GOOD quality returns 2 points', () => {
  const score = calculateOptionScore(2);
  assert.equal(score, OPTION_SCORES.GOOD);
  assert.equal(score, 2);
});

test('Battle Engine - calculateOptionScore for NEUTRAL quality returns 1 point', () => {
  const score = calculateOptionScore(1);
  assert.equal(score, OPTION_SCORES.NEUTRAL);
  assert.equal(score, 1);
});

test('Battle Engine - calculateOptionScore for POOR quality returns -1 points', () => {
  const score = calculateOptionScore(0);
  assert.equal(score, OPTION_SCORES.POOR);
  assert.equal(score, -1);
});

test('Battle Engine - calculateOptionScore for invalid input returns 0', () => {
  const score = calculateOptionScore(99);
  assert.equal(score, 0);
});

test('Battle Engine - calculateRoundScore with multiple selections', () => {
  const selectedOptions = [
    { quality: 2 }, // GOOD = 2
    { quality: 2 }, // GOOD = 2
    { quality: 1 }, // NEUTRAL = 1
    { quality: 0 }, // POOR = -1
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  assert.equal(roundScore, 4); // 2 + 2 + 1 - 1 = 4
});

test('Battle Engine - calculateRoundScore with empty selections returns 0', () => {
  const roundScore = calculateRoundScore([]);
  assert.equal(roundScore, 0);
});

test('Battle Engine - calculateRoundScore with all good options', () => {
  const selectedOptions = [
    { quality: 2 },
    { quality: 2 },
    { quality: 2 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  assert.equal(roundScore, 6);
});

test('Battle Engine - calculateRoundScore with all poor options', () => {
  const selectedOptions = [
    { quality: 0 },
    { quality: 0 },
    { quality: 0 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  assert.equal(roundScore, -3);
});

test('Battle Engine - hasPassedRound returns true when score meets minimum', () => {
  const passed = hasPassedRound(5, 4);
  assert.equal(passed, true);
});

test('Battle Engine - hasPassedRound returns true when score equals minimum', () => {
  const passed = hasPassedRound(4, 4);
  assert.equal(passed, true);
});

test('Battle Engine - hasPassedRound returns false when score below minimum', () => {
  const passed = hasPassedRound(3, 4);
  assert.equal(passed, false);
});

test('Battle Engine - calculateProgress at start of round', () => {
  const progress = calculateProgress(1, 5);
  assert.equal(progress, 20); // 1/5 * 100 = 20%
});

test('Battle Engine - calculateProgress at midpoint of round', () => {
  const progress = calculateProgress(3, 5);
  assert.equal(progress, 60); // 3/5 * 100 = 60%
});

test('Battle Engine - calculateProgress at end of round', () => {
  const progress = calculateProgress(5, 5);
  assert.equal(progress, 100); // 5/5 * 100 = 100%
});

test('Battle Engine - calculateProgress with zero total turns', () => {
  const progress = calculateProgress(0, 0);
  assert.equal(progress, 0);
});

test('Battle Engine - debate outcome: perfect round', () => {
  // Perfect round: all good options
  const selectedOptions = [
    { quality: 2 },
    { quality: 2 },
    { quality: 2 },
    { quality: 2 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  const passingScore = 5;
  const passed = hasPassedRound(roundScore, passingScore);

  assert.equal(passed, true);
  assert.equal(roundScore, 8);
});

test('Battle Engine - debate outcome: narrow pass', () => {
  // Narrow pass: mix of options
  const selectedOptions = [
    { quality: 2 },
    { quality: 1 },
    { quality: 1 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  const passingScore = 3;
  const passed = hasPassedRound(roundScore, passingScore);

  assert.equal(passed, true);
  assert.equal(roundScore, 4);
});

test('Battle Engine - debate outcome: narrow fail', () => {
  // Narrow fail: just below passing
  const selectedOptions = [
    { quality: 2 },
    { quality: 1 },
    { quality: 0 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  const passingScore = 3;
  const passed = hasPassedRound(roundScore, passingScore);

  assert.equal(passed, false);
  assert.equal(roundScore, 2);
});

test('Battle Engine - debate outcome: complete failure', () => {
  // Complete failure: all poor options
  const selectedOptions = [
    { quality: 0 },
    { quality: 0 },
    { quality: 0 },
  ];

  const roundScore = calculateRoundScore(selectedOptions);
  const passed = hasPassedRound(roundScore, 0);

  assert.equal(passed, false);
  assert.equal(roundScore, -3);
});

test('Battle Engine - round progression calculates correctly', () => {
  const turns = [
    { turnNumber: 1, completed: true },
    { turnNumber: 2, completed: true },
    { turnNumber: 3, completed: false },
    { turnNumber: 4, completed: false },
  ];

  const completedTurns = turns.filter((t) => t.completed).length;
  const progress = calculateProgress(completedTurns, turns.length);

  assert.equal(completedTurns, 2);
  assert.equal(progress, 50);
});
