import storyClient from "../serviceClient/story.Client.js";

export const getChapters = async () => {
  const response = await storyClient.get("/chapters");
  return response.data;
};

export const getTurn = async (debateId, turnNumber) => {
  const response = await storyClient.get(`/turn/${debateId}/${turnNumber}`);
  return response.data;
};

export const getRound = async (chapterId, roundNumber) => {
  const response = await storyClient.get(
    `/chapter/${chapterId}/round/${roundNumber}`
  );
  return response.data.round ? response.data : { round: response.data };
};

export const submitTurn = async (turnId, optionNumber) => {
  const response = await storyClient.post("/turn", { turnId, optionNumber });
  return response.data.result ?? response.data;
};

export const finishRound = async (
  chapterId,
  roundNumber,
  score,
  passingScore,
  bossRound
) => {
  const response = await storyClient.post("/finish-round", {
    chapterId,
    roundNumber,
    score,
    passingScore,
    bossRound,
  });
  return response.data;
};

export const finishChapter = async (chapterId) => {
  const response = await storyClient.post("/finish-chapter", { chapterId });
  return response.data;
};

export const getProfile = async () => {
  const response = await storyClient.get("/profile");
  return response.data;
};

export const getAchievements = async () => {
  const response = await storyClient.get("/achievements");
  return response.data;
};

const storyService = {
  getChapters,
  getRound,
  getTurn,
  submitTurn,
  finishRound,
  finishChapter,
  getProfile,
  getAchievements,
};

export default storyService;
