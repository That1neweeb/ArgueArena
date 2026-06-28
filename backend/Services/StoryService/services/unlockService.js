import { PlayerProgress } from "../models/playerProgress.model.js";
import { PlayerProfile } from "../models/playerProfile.model.js";
import { Chapter } from "../models/chapter.model.js";

export const unlockNextChapter = async (
  playerId,
  currentChapterId
) => {
  const currentProgress =
    await PlayerProgress.findOne({
      where: {
        playerId,
        chapterId: currentChapterId,
      },
    });

  if (!currentProgress) return;

  currentProgress.chapterCompleted = true;
  currentProgress.completedAt = new Date();

  await currentProgress.save();

  const currentChapter = await Chapter.findByPk(currentChapterId);
  if (!currentChapter) return;

  const nextChapter = await Chapter.findOne({
    where: {
      chapterNumber: currentChapter.chapterNumber + 1,
    },
  });

  if (!nextChapter) return;

  const existing =
    await PlayerProgress.findOne({
      where: {
        playerId,
        chapterId: nextChapter.id,
      },
    });

  if (!existing) {
    await PlayerProgress.create({
      playerId,
      chapterId: nextChapter.id,
      currentRound: 1,
      chapterScore: 0,
      chapterCompleted: false,
    });
  }

  nextChapter.unlocked = true;
  await nextChapter.save();

  const profile = await PlayerProfile.findOne({ where: { playerId } });
  if (profile && !profile.unlockedChapters.includes(nextChapter.chapterNumber)) {
    profile.unlockedChapters = [...profile.unlockedChapters, nextChapter.chapterNumber];
    await profile.save();
  }
};