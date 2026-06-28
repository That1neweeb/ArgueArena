import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { NPC, Chapter, Debate, DebateTurn, ArgumentOption } from "../models/index.js";
import { enrichRoundContent } from "./storyContentGenerator.js";

const isChapterFile = (filePath) => filePath.endsWith("chapter.js");
const isLoaderFile = (filePath) => filePath.endsWith("loader.js");

const findJsFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await findJsFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".js") && !isLoaderFile(fullPath)) {
      result.push(fullPath);
    }
  }

  return result;
};

const getChapterNumberFromPath = (filePath) => {
  const segments = filePath.split(path.sep);
  const chapterFolder = segments.find((segment) => /^chapter\d+$/.test(segment));
  if (!chapterFolder) return null;
  return parseInt(chapterFolder.replace("chapter", ""), 10);
};

const pathToFileURL = (filePath) => {
  const url = new URL(`file://${path.resolve(filePath)}`);
  return url;
};

export const initializeContent = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const contentDirectory = path.join(__dirname);

  const files = await findJsFiles(contentDirectory);
  const chapterData = [];
  const roundData = [];

  for (const file of files) {
    try {
      const module = await import(pathToFileURL(file).href);
      const raw = module.default;
      if (!raw || typeof raw !== "object") continue;

      if (isChapterFile(file)) {
        chapterData.push({ raw, chapterNumber: getChapterNumberFromPath(file) });
        continue;
      }

      const chapterNumber = getChapterNumberFromPath(file);
      if (!chapterNumber) continue;
      roundData.push({ raw, chapterNumber });
    } catch (error) {
      console.error("Unable to load story content file", file, error);
    }
  }

  const chapterMap = new Map();

  for (const { raw, chapterNumber } of chapterData) {
    if (!raw.chapterNumber && !chapterNumber) continue;

    const resolvedChapterNumber = raw.chapterNumber || chapterNumber;
    const npcInfo = raw.npc || {};
    const [npc] = await NPC.findOrCreate({
      where: {
        name: npcInfo.name || `NPC ${resolvedChapterNumber}`,
      },
      defaults: {
        description: npcInfo.title || npcInfo.personality || "Story opponent",
        idleImage: npcInfo.images?.idle || "",
        neutralImage: npcInfo.images?.neutral || "",
        panicImage: npcInfo.images?.panic || "",
        smirkImage: npcInfo.images?.smirk || "",
        difficulty: npcInfo.difficulty || "medium",
        background: raw.description || raw.topic || "",
      },
    });

    const npcUpdates = {};
    if (npc.description !== (npcInfo.title || npcInfo.personality || "Story opponent")) {
      npcUpdates.description = npcInfo.title || npcInfo.personality || "Story opponent";
    }
    if (npc.idleImage !== (npcInfo.images?.idle || "")) {
      npcUpdates.idleImage = npcInfo.images?.idle || "";
    }
    if (npc.neutralImage !== (npcInfo.images?.neutral || "")) {
      npcUpdates.neutralImage = npcInfo.images?.neutral || "";
    }
    if (npc.panicImage !== (npcInfo.images?.panic || "")) {
      npcUpdates.panicImage = npcInfo.images?.panic || "";
    }
    if (npc.smirkImage !== (npcInfo.images?.smirk || "")) {
      npcUpdates.smirkImage = npcInfo.images?.smirk || "";
    }
    if (npc.difficulty !== (npcInfo.difficulty || "medium")) {
      npcUpdates.difficulty = npcInfo.difficulty || "medium";
    }
    if (npc.background !== (raw.description || raw.topic || "")) {
      npcUpdates.background = raw.description || raw.topic || "";
    }
    if (Object.keys(npcUpdates).length > 0) {
      await npc.update(npcUpdates);
    }

    const [chapter] = await Chapter.findOrCreate({
      where: {
        chapterNumber: resolvedChapterNumber,
      },
      defaults: {
        title: raw.title || `Chapter ${resolvedChapterNumber}`,
        topic: raw.topic || "To be decided",
        description: raw.description || "",
        backgroundImage: raw.backgroundImage || "",
        npcId: npc.id,
        unlocked: resolvedChapterNumber === 1,
      },
    });

    const chapterUpdates = {};
    if (chapter.title !== (raw.title || `Chapter ${resolvedChapterNumber}`)) {
      chapterUpdates.title = raw.title || `Chapter ${resolvedChapterNumber}`;
    }
    if (chapter.topic !== (raw.topic || "To be decided")) {
      chapterUpdates.topic = raw.topic || "To be decided";
    }
    if (chapter.description !== (raw.description || "")) {
      chapterUpdates.description = raw.description || "";
    }
    if (chapter.backgroundImage !== (raw.backgroundImage || "")) {
      chapterUpdates.backgroundImage = raw.backgroundImage || "";
    }
    if (chapter.npcId !== npc.id) {
      chapterUpdates.npcId = npc.id;
    }
    if (Object.keys(chapterUpdates).length > 0) {
      await chapter.update(chapterUpdates);
    }

    chapterMap.set(resolvedChapterNumber, chapter);
  }

  for (const { raw, chapterNumber } of roundData) {
    const chapter = chapterMap.get(chapterNumber);
    if (!chapter) continue;

    const enriched = enrichRoundContent(raw, {
      title: chapter.title,
      topic: chapter.topic,
      description: chapter.description,
    });

    const [debate] = await Debate.findOrCreate({
      where: {
        chapterId: chapter.id,
        roundNumber: enriched.roundNumber,
      },
      defaults: {
        numberOfTurns: enriched.numberOfTurns || 10,
        passingScore: enriched.passingScore || 14,
        bossRound: enriched.bossRound || false,
        chapterId: chapter.id,
      },
    });

    if (
      debate.numberOfTurns !== enriched.numberOfTurns ||
      debate.passingScore !== enriched.passingScore ||
      debate.bossRound !== enriched.bossRound
    ) {
      debate.numberOfTurns = enriched.numberOfTurns || debate.numberOfTurns;
      debate.passingScore = enriched.passingScore || debate.passingScore;
      debate.bossRound = enriched.bossRound ?? debate.bossRound;
      await debate.save();
    }

    for (const turnEntry of enriched.turns || []) {
      const [turn] = await DebateTurn.findOrCreate({
        where: {
          debateId: debate.id,
          turnNumber: turnEntry.turnNumber,
        },
        defaults: {
          npcDialogue: turnEntry.npcDialogue || "",
          debateId: debate.id,
        },
      });

      if (turn.npcDialogue !== (turnEntry.npcDialogue || "")) {
        turn.npcDialogue = turnEntry.npcDialogue || "";
        await turn.save();
      }

      for (const optionEntry of turnEntry.options || []) {
        const [option] = await ArgumentOption.findOrCreate({
          where: {
            turnId: turn.id,
            optionNumber: optionEntry.optionNumber,
          },
          defaults: {
            text: optionEntry.text || "",
            quality: optionEntry.quality ?? 0,
            npcReply: optionEntry.npcReply || "",
            expression: optionEntry.expression || "neutral",
            turnId: turn.id,
          },
        });

        if (
          option.text !== (optionEntry.text || "") ||
          option.quality !== (optionEntry.quality ?? 0) ||
          option.npcReply !== (optionEntry.npcReply || "") ||
          option.expression !== (optionEntry.expression || "neutral")
        ) {
          option.text = optionEntry.text || "";
          option.quality = optionEntry.quality ?? 0;
          option.npcReply = optionEntry.npcReply || "";
          option.expression = optionEntry.expression || "neutral";
          await option.save();
        }
      }
    }
  }

  console.log("Story content initialization complete", {
    chapters: chapterMap.size,
    rounds: roundData.length,
  });
};
