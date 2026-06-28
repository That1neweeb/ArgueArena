const topicTemplates = [
  {
    keywords: ["climate", "carbon", "emission", "policy"],
    strong:
      "Climate policy must act now with fair safeguards that protect people and the planet.",
    neutral:
      "The debate needs balance: urgent action should be weighed against real economic concerns.",
    weak:
      "The whole issue is overblown and only causes unnecessary disruption.",
  },
  {
    keywords: ["ai", "artificial intelligence", "automated decision", "algorithm"],
    strong:
      "AI needs ethical guardrails so innovation can advance without harming people.",
    neutral:
      "This is a powerful technology, but its risks should be managed instead of ignored.",
    weak:
      "We should let the market decide everything and not slow progress with rules.",
  },
  {
    keywords: ["basic income", "ubi", "welfare", "poverty"],
    strong:
      "A universal floor can reduce poverty if it is designed to complement essential support.",
    neutral:
      "UBI has promise, but it must be balanced with the programs people already rely on.",
    weak:
      "Giving everyone cash sounds nice, but it will just reward laziness and waste money.",
  },
  {
    keywords: ["space", "exploration", "astronaut", "funds"],
    strong:
      "Investing in space can drive breakthroughs while still treating Earth’s problems as urgent.",
    neutral:
      "Space and Earth priorities both matter; funding should be smart and targeted.",
    weak:
      "Space travel is a luxury project we can’t afford until every other problem is solved.",
  },
  {
    keywords: ["genetic", "engineering", "embryo", "bioethic"],
    strong:
      "Genetic science should move forward carefully with tight ethical oversight.",
    neutral:
      "The technology is powerful, but it must be constrained so people and families are safe.",
    weak:
      "Editing humans is too creepy and we should stop it before it starts.",
  },
  {
    keywords: ["office", "remote", "work", "culture"],
    strong:
      "Companies should support collaboration while giving employees room to work flexibly.",
    neutral:
      "Both remote and in-person work can succeed if policies respect people’s needs.",
    weak:
      "Offices are outdated; people should just stay home and do whatever they want.",
  },
  {
    keywords: ["crypto", "cryptocurrency", "regulation", "blockchain"],
    strong:
      "Crypto needs rules that protect users while preserving decentralization.",
    neutral:
      "Regulation can be useful, but it should avoid crushing the technology entirely.",
    weak:
      "Regulators just want to kill the industry because they don’t understand it.",
  },
  {
    keywords: ["animal", "testing", "research", "medical"],
    strong:
      "Limited animal testing can be justified if it prevents human suffering and saves lives.",
    neutral:
      "This is a hard moral trade-off and it deserves strict safeguards, not bans or abuses.",
    weak:
      "Science should do whatever it wants; animals don’t matter as much as research does.",
  },
  {
    keywords: ["nuclear", "energy", "reactor", "radioactive"],
    strong:
      "Nuclear power can be part of a cleaner future if its safety systems are ironclad.",
    neutral:
      "Nuclear energy is useful, but it must be handled with clear rules and accountability.",
    weak:
      "It’s just too dangerous; we should shut it down immediately no matter the cost.",
  },
];

const fallback = {
  strong: "This issue needs thoughtful leadership and strong evidence to move forward.",
  neutral: "There are good points on both sides, so the best answer is careful compromise.",
  weak: "This argument is too vague and avoids the real consequences of the choice.",
};

const chooseTopicTemplate = (topic = "") => {
  const lower = topic.toLowerCase();
  return (
    topicTemplates.find((entry) =>
      entry.keywords.some((keyword) => lower.includes(keyword))
    ) || fallback
  );
};

const chooseCycle = (items, turnNumber) => {
  if (!items || items.length === 0) return "";
  return items[(turnNumber - 1) % items.length];
};

const turnReasonTemplates = [
  "Clear rules and evidence can make the difference between risk and progress.",
  "Practical oversight lets us keep the benefits while limiting harm.",
  "Real-world examples show that thoughtful policy works better than fear.",
  "Trusted frameworks help public confidence without stalling the issue.",
  "The strongest case is grounded in data, not slogans or panic.",
];

const neutralPhrases = [
  "the best path is to protect people while staying open to improvement.",
  "we should avoid extreme positions and look for a balanced solution.",
  "policy should reflect real-world trade-offs instead of simple slogans.",
  "the problem deserves both ambition and caution, not a one-size-fits-all answer.",
  "we should move carefully and keep the conversation open as new evidence appears.",
];

const weakPhrases = [
  "that position ignores the wider consequences and sounds like an easy answer.",
  "this approach is too simplistic and doesn’t address the actual risks.",
  "it relies on emotion instead of clear evidence, which weakens the argument.",
  "that claim avoids the real issue and does not help find a practical solution.",
  "it sounds more like a slogan than a serious position on the topic.",
];

const buildStatement = (topic, turnNumber) => {
  const template = chooseTopicTemplate(topic);
  const reason = chooseCycle(turnReasonTemplates, turnNumber);
  return `${template.strong} ${reason}`;
};

const buildNeutralStatement = (topic, turnNumber) => {
  const template = chooseTopicTemplate(topic);
  const phrase = chooseCycle(neutralPhrases, turnNumber);
  return `${template.neutral} ${phrase}`;
};

const buildWeakStatement = (topic, turnNumber) => {
  const template = chooseTopicTemplate(topic);
  const phrase = chooseCycle(weakPhrases, turnNumber);
  return `${template.weak} ${phrase}`;
};

const placeholderPattern = /we need clear reasoning grounded in evidence/i;

export const hasPlaceholderText = (text = "") => placeholderPattern.test(text);

export const enrichRoundContent = (roundRaw, chapterMeta = {}) => {
  if (!roundRaw || !Array.isArray(roundRaw.turns)) return roundRaw;
  const topic = chapterMeta.topic || chapterMeta.title || "";
  const enrichedTurns = roundRaw.turns.map((turn) => {
    const needsFix = Array.isArray(turn.options)
      ? turn.options.some((option) => hasPlaceholderText(option.text || ""))
      : false;

    if (!needsFix) {
      return turn;
    }

    const turnNumber = turn.turnNumber || 1;
    return {
      ...turn,
      options: [
        {
          optionNumber: 1,
          text: buildStatement(topic, turnNumber),
          quality: 2,
          npcReply: "Strong point. Your opponent adjusts their stance and listens more carefully.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: buildNeutralStatement(topic, turnNumber),
          quality: 1,
          npcReply: "Your opponent considers the nuance but wants a stronger case.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: buildWeakStatement(topic, turnNumber),
          quality: 0,
          npcReply: "That argument sounds weak and your opponent gains the upper hand.",
          expression: "smirk",
        },
      ],
    };
  });

  return {
    ...roundRaw,
    turns: enrichedTurns,
  };
};
