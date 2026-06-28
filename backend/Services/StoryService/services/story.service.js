import {
  buildChapterList,
  loadRoundDetails,
  loadTurnDetails,
  submitTurnChoice,
  finishRoundSession,
  finishChapterSession,
  getProfileDetails,
  getPlayerAchievements,
} from "../storyengine/storyEngine.js";

class StoryService {
  async getChapters(playerId) {
    return await buildChapterList(playerId);
  }

  async getRound(chapterId, roundNumber, playerId) {
    return await loadRoundDetails(chapterId, roundNumber, playerId);
  }

  async getTurn(debateId, turnNumber, playerId) {
    return await loadTurnDetails(debateId, turnNumber, playerId);
  }

  async submitTurn(turnId, optionNumber, playerId) {
    return await submitTurnChoice({
      turnId,
      optionNumber,
      playerId,
    });
  }

  async finishRound(
    playerId,
    chapterId,
    roundNumber,
    roundScore,
    passingScore,
    bossRound
  ) {
    return await finishRoundSession({
      playerId,
      chapterId,
      roundNumber,
      roundScore,
      passingScore,
      bossRound,
    });
  }

  async finishChapter(playerId, chapterId) {
    return await finishChapterSession({ playerId, chapterId });
  }

  async getProfile(playerId) {
    return await getProfileDetails(playerId);
  }

  async getAchievements(playerId) {
    return await getPlayerAchievements(playerId);
  }
}

export default new StoryService();