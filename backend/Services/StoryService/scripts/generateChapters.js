import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "content");

const roundTitles = [
  "Opening Statements",
  "Core Arguments",
  "Evidence and Data",
  "Counterpoints",
  "Ethical Dimensions",
  "Public Policy",
  "Economic Impact",
  "Rebuttal Round",
  "Final Push",
];

const chapters = [
  {
    chapterNumber: 2,
    title: "Heated Horizon",
    topic: "Should Governments Enforce Aggressive Climate Policy?",
    description:
      "Marcus Vega, a policy strategist, argues that economic stability must come before sweeping environmental mandates. Prove that evidence-based climate action can protect both the planet and prosperity.",
    npc: {
      name: "Marcus Vega",
      title: "Policy Strategist",
      personality: "Pragmatic, skeptical, data-driven.",
      images: {
        idle: "marcus/idle.png",
        neutral: "marcus/neutral.png",
        panic: "marcus/panic.png",
        smirk: "marcus/smirk.png",
      },
    },
    proPosition: "Governments must enforce aggressive climate policy now",
    conPosition: "Aggressive climate policy will cripple economies before it helps the planet",
    questions: [
      "What is the strongest reason to act on climate change immediately?",
      "How do we respond to claims that green policy destroys jobs?",
      "Should developing nations follow the same climate rules as wealthy countries?",
      "Is carbon pricing effective or just a hidden tax?",
      "How do we balance industry growth with emission targets?",
      "What role should renewable energy subsidies play?",
      "Can individual action matter without systemic policy?",
      "How do we handle climate misinformation in public debate?",
      "Should climate refugees receive legal protection?",
      "What is your closing argument on climate responsibility?",
    ],
  },
  {
    chapterNumber: 3,
    title: "Silicon Crossroads",
    topic: "Should AI Development Be Strictly Regulated?",
    description:
      "Dr. Elena Kwan, an AI ethics researcher, believes innovation dies under heavy regulation. Make the case that guardrails can accelerate trustworthy AI rather than stifle it.",
    npc: {
      name: "Dr. Elena Kwan",
      title: "AI Ethics Researcher",
      personality: "Sharp, optimistic about tech, debate-focused.",
      images: {
        idle: "elena/idle.png",
        neutral: "elena/neutral.png",
        panic: "elena/panic.png",
        smirk: "elena/smirk.png",
      },
    },
    proPosition: "AI development needs strict regulation to prevent harm",
    conPosition: "Strict AI regulation will stall breakthroughs and help rivals",
    questions: [
      "Why should AI systems face legal accountability?",
      "How do we prevent bias in automated decision-making?",
      "Should open-source AI models be unrestricted?",
      "Who is liable when an AI system causes harm?",
      "Can transparency requirements coexist with trade secrets?",
      "Should lethal autonomous weapons be banned globally?",
      "How do we protect creative workers from AI displacement?",
      "Is self-regulation by tech companies enough?",
      "Should governments require AI impact assessments?",
      "What is your final case for or against AI regulation?",
    ],
  },
  {
    chapterNumber: 4,
    title: "Safety Net Showdown",
    topic: "Should Universal Basic Income Replace Welfare Programs?",
    description:
      "Councilwoman Priya Desai argues targeted welfare is more efficient than UBI. Defend or challenge the idea that a universal floor can reduce poverty and bureaucracy.",
    npc: {
      name: "Priya Desai",
      title: "City Councilwoman",
      personality: "Empathetic, fiscal conservative, articulate.",
      images: {
        idle: "priya/idle.png",
        neutral: "priya/neutral.png",
        panic: "priya/panic.png",
        smirk: "priya/smirk.png",
      },
    },
    proPosition: "Universal basic income should replace fragmented welfare",
    conPosition: "Targeted welfare beats UBI for fairness and cost control",
    questions: [
      "Would UBI reduce poverty more effectively than current programs?",
      "How do we fund UBI without crushing taxpayers?",
      "Could UBI discourage work incentives?",
      "Is cash better than in-kind benefits like housing aid?",
      "How would UBI affect inflation?",
      "Should UBI vary by region or stay universal?",
      "What happens to disability support under UBI?",
      "Can pilots prove UBI works at national scale?",
      "How do we prevent fraud in a universal cash system?",
      "What is your closing argument on economic dignity?",
    ],
  },
  {
    chapterNumber: 5,
    title: "Beyond the Atmosphere",
    topic: "Should Public Funds Prioritize Space Exploration?",
    description:
      "Astronaut-turned-skeptic James Okonkwo says Earth crises deserve every dollar first. Argue whether exploring space is an investment in humanity's future or a distraction.",
    npc: {
      name: "James Okonkwo",
      title: "Former Astronaut",
      personality: "Bold, inspirational, fiercely practical.",
      images: {
        idle: "james/idle.png",
        neutral: "james/neutral.png",
        panic: "james/panic.png",
        smirk: "james/smirk.png",
      },
    },
    proPosition: "Public funding for space exploration is essential",
    conPosition: "Space spending steals resources from urgent Earth problems",
    questions: [
      "What scientific returns justify space budgets?",
      "Should private companies lead while governments step back?",
      "Does space exploration improve life on Earth directly?",
      "Is Mars colonization a realistic priority?",
      "How do we weigh space spending against healthcare?",
      "Can satellite technology alone justify the cost?",
      "Should militarization of space concern us more?",
      "Do space programs inspire STEM education enough to matter?",
      "Is international cooperation required for deep space missions?",
      "What is your final verdict on humanity among the stars?",
    ],
  },
  {
    chapterNumber: 6,
    title: "Code of Life",
    topic: "Should Genetic Engineering Be Allowed in Humans?",
    description:
      "Bioethicist Dr. Sofia Mendez draws a hard line at editing human embryos. Navigate the moral, medical, and societal stakes of genetic intervention.",
    npc: {
      name: "Dr. Sofia Mendez",
      title: "Bioethicist",
      personality: "Calm, principled, uncompromising on ethics.",
      images: {
        idle: "sofia/idle.png",
        neutral: "sofia/neutral.png",
        panic: "sofia/panic.png",
        smirk: "sofia/smirk.png",
      },
    },
    proPosition: "Human genetic engineering should be permitted with limits",
    conPosition: "Human genetic engineering crosses an ethical line we must not cross",
    questions: [
      "Should we eliminate hereditary diseases through gene editing?",
      "Where is the line between therapy and enhancement?",
      "Could genetic editing increase social inequality?",
      "Who decides which traits are desirable?",
      "Are consent and future generations compatible with embryo editing?",
      "Should sports ban genetically enhanced athletes?",
      "Can regulation keep pace with CRISPR advances?",
      "Do religious and cultural views deserve veto power?",
      "Should gene drives be used to fight malaria?",
      "What is your closing stance on rewriting human biology?",
    ],
  },
  {
    chapterNumber: 7,
    title: "Office or Anywhere",
    topic: "Should Companies Mandate Return to Office Work?",
    description:
      "HR executive Nathan Brooks believes in-person culture drives innovation. Challenge or support mandatory office policies in the remote-work era.",
    npc: {
      name: "Nathan Brooks",
      title: "Corporate HR Executive",
      personality: "Charismatic, tradition-minded, metrics-focused.",
      images: {
        idle: "nathan/idle.png",
        neutral: "nathan/neutral.png",
        panic: "nathan/panic.png",
        smirk: "nathan/smirk.png",
      },
    },
    proPosition: "Companies should require return-to-office for most roles",
    conPosition: "Remote work should remain the default for knowledge workers",
    questions: [
      "Does in-person work improve collaboration measurably?",
      "How do we address burnout from commute and rigid schedules?",
      "Should pay differ for remote versus office employees?",
      "Can company culture survive fully remote teams?",
      "What about employees with caregiving responsibilities?",
      "Do junior workers lose mentorship remotely?",
      "Should mandates apply equally across all departments?",
      "How do cities benefit when workers return downtown?",
      "Is hybrid work a compromise or a failure mode?",
      "What is your closing argument on the future of work?",
    ],
  },
  {
    chapterNumber: 8,
    title: "Digital Gold Rush",
    topic: "Should Cryptocurrency Face Heavy Government Regulation?",
    description:
      "Fintech founder Lila Chen sees crypto as financial freedom. Debate whether regulation protects consumers or kills decentralized innovation.",
    npc: {
      name: "Lila Chen",
      title: "Fintech Founder",
      personality: "Fast-talking, libertarian-leaning, confident.",
      images: {
        idle: "lila/idle.png",
        neutral: "lila/neutral.png",
        panic: "lila/panic.png",
        smirk: "lila/smirk.png",
      },
    },
    proPosition: "Cryptocurrency needs heavy regulation to protect the public",
    conPosition: "Heavy crypto regulation destroys innovation and freedom",
    questions: [
      "Do consumers need protection from crypto volatility?",
      "Should stablecoins be treated like banks?",
      "Can blockchain reduce fraud or increase it?",
      "Is decentralization compatible with anti-money-laundering laws?",
      "Should mining energy use be restricted?",
      "Do NFTs deserve separate regulatory frameworks?",
      "Can unbanked populations benefit without regulation?",
      "Should governments issue their own digital currencies instead?",
      "Who is accountable when exchanges collapse?",
      "What is your closing case on money in the digital age?",
    ],
  },
  {
    chapterNumber: 9,
    title: "The Testing Line",
    topic: "Is Animal Testing Justified for Medical Research?",
    description:
      "Veterinarian Dr. Amara Singh refuses to treat animal suffering as collateral. Argue the scientific and moral boundaries of animal testing.",
    npc: {
      name: "Dr. Amara Singh",
      title: "Veterinarian and Activist",
      personality: "Passionate, compassionate, relentless.",
      images: {
        idle: "amara/idle.png",
        neutral: "amara/neutral.png",
        panic: "amara/panic.png",
        smirk: "amara/smirk.png",
      },
    },
    proPosition: "Animal testing is justified when it saves human lives",
    conPosition: "Animal testing is morally unacceptable regardless of benefits",
    questions: [
      "Can medical progress occur without animal testing?",
      "Are alternatives like organ-on-a-chip ready today?",
      "Should cosmetic testing on animals be banned universally?",
      "How do we weigh animal pain against human survival?",
      "Are lab standards enforced well enough globally?",
      "Should primates receive special legal protection?",
      "Do patients have a duty to support tested treatments?",
      "Can computer modeling replace animal trials soon?",
      "Should researchers publish all animal study data?",
      "What is your closing moral judgment on this practice?",
    ],
  },
  {
    chapterNumber: 10,
    title: "Power Under Pressure",
    topic: "Should Nuclear Energy Expand to Replace Fossil Fuels?",
    description:
      "Energy analyst Viktor Hale warns that nuclear risk outweighs climate gains. Make your strongest case in the final chapter of Story Mode.",
    npc: {
      name: "Viktor Hale",
      title: "Energy Policy Analyst",
      personality: "Grave, meticulous, unflinching.",
      images: {
        idle: "viktor/idle.png",
        neutral: "viktor/neutral.png",
        panic: "viktor/panic.png",
        smirk: "viktor/smirk.png",
      },
    },
    proPosition: "Nuclear energy must expand to replace fossil fuels",
    conPosition: "Nuclear expansion creates unacceptable risk and waste problems",
    questions: [
      "Can nuclear power scale fast enough for climate targets?",
      "How do we manage radioactive waste responsibly?",
      "Are modern reactors truly safer than legacy plants?",
      "Should countries share nuclear technology internationally?",
      "What about meltdown risk in conflict zones?",
      "Is nuclear cheaper than renewables when fully accounted?",
      "Should we invest in fusion instead of fission?",
      "How do communities consent to nearby nuclear plants?",
      "Can nuclear complement intermittent solar and wind?",
      "What is your final argument on humanity's energy future?",
    ],
  },
];

const goodReply = (npc) =>
  `Strong point. ${npc} adjusts their stance and listens more carefully.`;
const neutralReply = (npc) =>
  `${npc} nods but presses for stronger evidence.`;
const badReply = (npc) =>
  `${npc} smirks — that argument plays right into their hands.`;

function buildOptions(ch, turnIndex, qIndex) {
  const npc = ch.npc.name;
  const pro = ch.proPosition;
  const con = ch.conPosition;
  return [
    {
      optionNumber: 1,
      text: `${pro}. Turn ${turnIndex}: we need clear reasoning grounded in evidence, not slogans.`,
      quality: 2,
      npcReply: goodReply(npc),
      expression: "panic",
    },
    {
      optionNumber: 2,
      text: `Both sides have merit, but ${turnIndex % 2 === 0 ? "policy must move carefully" : "public opinion is divided"}.`,
      quality: 1,
      npcReply: neutralReply(npc),
      expression: "neutral",
    },
    {
      optionNumber: 3,
      text: `${con} — and honestly, the whole debate is overblown anyway.`,
      quality: 0,
      npcReply: badReply(npc),
      expression: "smirk",
    },
  ];
}

function buildTurns(ch, roundNumber, isBoss) {
  const intro =
    isBoss
      ? `Final round. ${ch.npc.name} steps forward: "This is our boss battle. ${ch.topic} — give me everything you've got."`
      : null;

  return ch.questions.map((question, index) => {
    const turnNumber = index + 1;
    const npcDialogue =
      turnNumber === 1 && intro
        ? intro
        : turnNumber === 1
        ? `Round ${roundNumber} begins. ${question}`
        : question;

    return {
      turnNumber,
      npcDialogue,
      options: buildOptions(ch, turnNumber, index),
    };
  });
}

function writeChapterFile(ch) {
  const dir = path.join(contentDir, `chapter${ch.chapterNumber}`);
  fs.mkdirSync(dir, { recursive: true });

  const chapterBody = `const chapter${ch.chapterNumber} = {
  chapterNumber: ${ch.chapterNumber},

  title: ${JSON.stringify(ch.title)},

  topic: ${JSON.stringify(ch.topic)},

  description: ${JSON.stringify(ch.description)},

  npc: {
    name: ${JSON.stringify(ch.npc.name)},

    title: ${JSON.stringify(ch.npc.title)},

    personality: ${JSON.stringify(ch.npc.personality)},

    images: {
      idle: ${JSON.stringify(ch.npc.images.idle)},
      neutral: ${JSON.stringify(ch.npc.images.neutral)},
      panic: ${JSON.stringify(ch.npc.images.panic)},
      smirk: ${JSON.stringify(ch.npc.images.smirk)},
    },
  },

  totalRounds: 10,

  turnsPerRound: 10,

  bossRound: 10,
};

export default chapter${ch.chapterNumber};
`;

  fs.writeFileSync(path.join(dir, "chapter.js"), chapterBody);

  for (let round = 1; round <= 10; round += 1) {
    const isBoss = round === 10;
    const title = isBoss
      ? `Boss Battle - ${ch.npc.name}`
      : roundTitles[round - 1];
    const passingScore = isBoss ? 20 : 14;
    const turns = buildTurns(ch, round, isBoss);

    const roundBody = `const round${round} = {
  roundNumber: ${round},

  title: ${JSON.stringify(title)},

  numberOfTurns: 10,

  passingScore: ${passingScore},

  bossRound: ${isBoss},

  turns: ${JSON.stringify(turns, null, 4).replace(/"([^"]+)":/g, "$1:")},
};

export default round${round};
`;

    fs.writeFileSync(path.join(dir, `round${round}.js`), roundBody);
  }
}

for (const ch of chapters) {
  writeChapterFile(ch);
  console.log(`Generated chapter ${ch.chapterNumber}: ${ch.title}`);
}

console.log("Done generating chapters 2-10.");
