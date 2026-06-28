import storyService from "../services/story.service.js";

class StoryController {
  // =========================
  // GET /story/chapters
  // =========================
  async getChapters(req, res) {
    try {
      const playerId = req.user.id;

      const chapters = await storyService.getChapters(playerId);

      return res.status(200).json({
        success: true,
        chapters,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to load chapters.",
      });
    }
  }

  // =========================
  // GET /story/chapter/:chapterId/round/:roundNumber
  // =========================
  async getRound(req, res) {
    try {
      const { chapterId, roundNumber } = req.params;
      const playerId = req.user.id;

      const round = await storyService.getRound(
        chapterId,
        roundNumber,
        playerId
      );

      return res.status(200).json({
        success: true,
        round,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to load round.",
      });
    }
  }

  // =========================
  // GET /story/turn/:debateId/:turnNumber
  // =========================
  async getTurn(req, res) {
    try {
      const { debateId, turnNumber } = req.params;
      const playerId = req.user.id;

      const turn = await storyService.getTurn(
        debateId,
        turnNumber,
        playerId
      );

      return res.status(200).json({
        success: true,
        ...turn,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to load turn.",
      });
    }
  }

  // =========================
  // POST /story/turn
  // =========================
  async submitTurn(req, res) {
    try {
      const { turnId, optionNumber } = req.body;
      const playerId = req.user.id;

      const result = await storyService.submitTurn(
        turnId,
        optionNumber,
        playerId
      );

      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to submit turn.",
      });
    }
  }

  // =========================
  // POST /story/finish-round
  // =========================
  async finishRound(req, res) {
    try {
      const { chapterId, roundNumber, score, passingScore, bossRound } = req.body;
      const playerId = req.user.id;

      const result = await storyService.finishRound(
        playerId,
        chapterId,
        roundNumber,
        score,
        passingScore,
        bossRound
      );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to finish round.",
      });
    }
  }

  // =========================
  // POST /story/finish-chapter
  // =========================
  async finishChapter(req, res) {
    try {
      const playerId = req.user.id;
      const { chapterId } = req.body;

      const result =
        await storyService.finishChapter(
          playerId,
          chapterId
        );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to finish chapter.",
      });
    }
  }

  // =========================
  // GET /story/profile
  // =========================
  async getProfile(req, res) {
    try {
      const playerId = req.user.id;
      const profile = await storyService.getProfile(playerId);

      return res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Unable to load profile.",
      });
    }
  }

  // =========================
  // GET /story/achievements
  // =========================
  async getAchievements(req, res) {
    try {
      const playerId = req.user.id;
      const achievements = await storyService.getAchievements(playerId);

      return res.status(200).json({
        success: true,
        achievements,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Unable to load achievements.",
      });
    }
  }
}

export default new StoryController();