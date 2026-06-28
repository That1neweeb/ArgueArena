import { Debate } from "../models/debate.model.js";
import { DebateTurn } from "../models/debateTurn.model.js";
import { ArgumentOption } from "../models/argumentOption.model.js";

export const loadRound = async (
  chapterId,
  roundNumber
) => {
  const debate = await Debate.findOne({
    where: {
      chapterId,
      roundNumber,
    },
  });

  if (!debate)
    throw new Error("Round not found.");

  return debate;
};

export const loadTurn = async (
  debateId,
  turnNumber
) => {
  const turn = await DebateTurn.findOne({
    where: {
      debateId,
      turnNumber,
    },
  });

  if (!turn)
    throw new Error("Turn not found.");

  return turn;
};

export const loadOptions = async (
  turnId
) => {
  return await ArgumentOption.findAll({
    where: {
      turnId,
    },
    order: [["optionNumber", "ASC"]],
  });
};

export const processTurn = async (
  turnId,
  optionNumber
) => {
  const option =
    await ArgumentOption.findOne({
      where: {
        turnId,
        optionNumber,
      },
    });

  if (!option)
    throw new Error("Invalid option.");

  return {
    quality: option.quality,
    npcReply: option.npcReply,
    expression: option.expression,
  };
};