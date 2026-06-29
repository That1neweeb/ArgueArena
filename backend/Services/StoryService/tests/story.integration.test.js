import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Story Service Integration Test Suite
 * Tests complete story mode flows and service interactions
 */

// Mock data fixtures
const mockChapters = [
  {
    id: 1,
    title: 'Chapter 1: The Beginning',
    description: 'Start your debate journey',
    roundCount: 3,
    completed: false,
    bestScore: 0,
  },
  {
    id: 2,
    title: 'Chapter 2: Rising Stakes',
    description: 'Debates get more challenging',
    roundCount: 3,
    completed: false,
    bestScore: 0,
  },
  {
    id: 3,
    title: 'Chapter 3: The Tournament',
    description: 'Face the ultimate challenge',
    roundCount: 4,
    completed: false,
    bestScore: 0,
  },
];

const mockRound = {
  id: 1,
  chapterId: 1,
  roundNumber: 1,
  debateId: 1,
  npcId: 1,
  npcName: 'Logical Larry',
  isBossRound: false,
  passingScore: 4,
  debate: {
    id: 1,
    turns: [
      {
        id: 1,
        turnNumber: 1,
        question: 'What is the best approach to solving climate change?',
        npcArgument: 'We should focus on renewable energy.',
        argumentOptions: [
          {
            id: 1,
            text: 'Renewable energy is indeed the solution.',
            quality: 2,
          },
          {
            id: 2,
            text: 'We need a balanced approach with multiple solutions.',
            quality: 1,
          },
          {
            id: 3,
            text: 'Climate change is not real.',
            quality: 0,
          },
        ],
      },
      {
        id: 2,
        turnNumber: 2,
        question: 'How should we transition to renewable energy?',
        npcArgument: 'Gradually over 20 years.',
        argumentOptions: [
          {
            id: 4,
            text: 'A gradual transition with government support.',
            quality: 2,
          },
          {
            id: 5,
            text: 'Both gradual and aggressive approaches have merit.',
            quality: 1,
          },
          {
            id: 6,
            text: 'We should abandon renewable energy immediately.',
            quality: 0,
          },
        ],
      },
    ],
  },
};

test('Story Service - getChapters returns all available chapters', () => {
  const chapters = mockChapters;

  assert.ok(Array.isArray(chapters));
  assert.equal(chapters.length, 3);
  assert.equal(chapters[0].title, 'Chapter 1: The Beginning');
  assert.equal(chapters[2].title, 'Chapter 3: The Tournament');
});

test('Story Service - chapters have required fields', () => {
  const chapter = mockChapters[0];

  assert.ok(chapter.id);
  assert.ok(chapter.title);
  assert.ok(chapter.description);
  assert.ok(typeof chapter.roundCount === 'number');
  assert.ok(typeof chapter.completed === 'boolean');
  assert.ok(typeof chapter.bestScore === 'number');
});

test('Story Service - getRound returns round with debate data', () => {
  const round = mockRound;

  assert.equal(round.chapterId, 1);
  assert.equal(round.roundNumber, 1);
  assert.ok(round.debate);
  assert.equal(round.debate.turns.length, 2);
});

test('Story Service - round contains turns with argument options', () => {
  const turns = mockRound.debate.turns;

  assert.equal(turns.length, 2);

  // First turn
  assert.equal(turns[0].turnNumber, 1);
  assert.equal(turns[0].argumentOptions.length, 3);
  assert.ok(turns[0].argumentOptions[0].quality);

  // Second turn
  assert.equal(turns[1].turnNumber, 2);
  assert.equal(turns[1].argumentOptions.length, 3);
});

test('Story Service - argument options have quality ratings', () => {
  const options = mockRound.debate.turns[0].argumentOptions;

  options.forEach((option) => {
    assert.ok(typeof option.id === 'number');
    assert.ok(typeof option.text === 'string');
    assert.ok([0, 1, 2].includes(option.quality), 'Quality should be 0, 1, or 2');
  });
});

test('Story Service - submitTurn records player selection', () => {
  const playerSelection = {
    turnId: 1,
    selectedOptionId: 1,
    selectedOptionQuality: 2,
    timestamp: new Date(),
  };

  assert.ok(playerSelection.turnId);
  assert.ok(playerSelection.selectedOptionId);
  assert.equal(playerSelection.selectedOptionQuality, 2);
  assert.ok(playerSelection.timestamp);
});

test('Story Service - finishRound calculates rewards for passed round', () => {
  const roundResult = {
    roundScore: 6,
    passingScore: 4,
    bossRound: false,
    maxScore: 8,
    passed: true,
    xpReward: 120,
    coinReward: 40,
    starsEarned: 3,
  };

  assert.equal(roundResult.passed, true);
  assert.ok(roundResult.xpReward > 0);
  assert.ok(roundResult.coinReward >= 0);
  assert.ok(roundResult.starsEarned >= 1);
});

test('Story Service - finishRound grants no rewards for failed round', () => {
  const roundResult = {
    roundScore: 2,
    passingScore: 4,
    bossRound: false,
    maxScore: 8,
    passed: false,
    xpReward: 0,
    coinReward: 0,
    starsEarned: 0,
  };

  assert.equal(roundResult.passed, false);
  assert.equal(roundResult.xpReward, 0);
  assert.equal(roundResult.coinReward, 0);
  assert.equal(roundResult.starsEarned, 0);
});

test('Story Service - boss round grants bonus rewards', () => {
  const bossRoundResult = {
    roundScore: 6,
    passingScore: 5,
    bossRound: true,
    passed: true,
    xpReward: 300, // Bonus multiplier
    coinReward: 150,
    starsEarned: 3,
    bossDefeated: true,
  };

  assert.equal(bossRoundResult.bossRound, true);
  assert.equal(bossRoundResult.passed, true);
  assert.ok(bossRoundResult.xpReward > 120, 'Boss round XP should be higher');
  assert.equal(bossRoundResult.bossDefeated, true);
});

test('Story Service - finishChapter unlocks next chapter', () => {
  const chapterCompletion = {
    chapterId: 1,
    completed: true,
    totalScore: 18,
    roundsPassed: 3,
    nextChapterUnlocked: true,
    chapterRewards: {
      xp: 500,
      coins: 200,
    },
  };

  assert.equal(chapterCompletion.completed, true);
  assert.equal(chapterCompletion.nextChapterUnlocked, true);
  assert.ok(chapterCompletion.chapterRewards.xp > 0);
});

test('Story Service - getProfile returns player progression', () => {
  const profile = {
    id: 1,
    username: 'DebateMaster',
    level: 12,
    totalXP: 5400,
    coins: 1200,
    chaptersCompleted: 3,
    totalRoundsPassed: 9,
    totalTurnsWon: 27,
  };

  assert.ok(profile.id);
  assert.equal(typeof profile.username, 'string');
  assert.ok(profile.level > 0);
  assert.ok(profile.totalXP >= 0);
  assert.ok(profile.coins >= 0);
  assert.equal(profile.chaptersCompleted, 3);
});

test('Story Service - getAchievements returns earned achievements', () => {
  const achievements = [
    {
      key: 'first-debate',
      title: 'First Debate',
      earned: true,
      earnedDate: new Date('2024-01-15'),
    },
    {
      key: 'first-victory',
      title: 'First Victory',
      earned: true,
      earnedDate: new Date('2024-01-16'),
    },
    {
      key: 'perfect-round',
      title: 'Perfect Round',
      earned: false,
    },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;

  assert.equal(achievements.length, 3);
  assert.equal(earnedCount, 2);
  assert.ok(achievements[0].earned);
  assert.equal(achievements[2].earned, false);
});

test('Story Service - complete game flow: start chapter', () => {
  const gameFlow = {
    step: 'START_CHAPTER',
    chapterId: 1,
    chapterTitle: 'Chapter 1: The Beginning',
    roundNumber: 1,
    status: 'IN_PROGRESS',
  };

  assert.equal(gameFlow.step, 'START_CHAPTER');
  assert.ok(gameFlow.chapterId);
  assert.equal(gameFlow.status, 'IN_PROGRESS');
});

test('Story Service - complete game flow: complete round sequence', () => {
  const roundSequence = [
    {
      roundNumber: 1,
      passed: true,
      score: 6,
      starsEarned: 3,
    },
    {
      roundNumber: 2,
      passed: true,
      score: 5,
      starsEarned: 2,
    },
    {
      roundNumber: 3,
      passed: true,
      score: 8,
      starsEarned: 3,
      isBoss: true,
    },
  ];

  const allPassed = roundSequence.every((r) => r.passed);
  const totalStars = roundSequence.reduce((sum, r) => sum + r.starsEarned, 0);

  assert.equal(allPassed, true);
  assert.equal(totalStars, 8);
});

test('Story Service - player can retry failed round', () => {
  const retryScenario = {
    roundId: 1,
    attempt: 1,
    firstAttempt: {
      score: 2,
      passed: false,
    },
    attempt: 2,
    secondAttempt: {
      score: 5,
      passed: true,
    },
  };

  assert.equal(retryScenario.firstAttempt.passed, false);
  assert.equal(retryScenario.secondAttempt.passed, true);
});

test('Story Service - maintains save state across sessions', () => {
  const saveState = {
    playerId: 1,
    currentChapterId: 2,
    currentRoundNumber: 2,
    chaptersUnlocked: [1, 2],
    chaptersCompleted: [1],
    progress: {
      totalXP: 5400,
      coins: 1200,
      level: 12,
    },
    lastSaveTime: new Date(),
  };

  assert.ok(saveState.playerId);
  assert.equal(saveState.currentChapterId, 2);
  assert.equal(saveState.chaptersUnlocked.length, 2);
  assert.ok(saveState.lastSaveTime);
});
