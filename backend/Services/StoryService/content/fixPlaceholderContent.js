import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDirectory = path.join(__dirname);

const topicTemplates = [
  {
    keywords: ["climate", "carbon", "emission", "policy"],
    strong: "Climate policy must act now with evidence-based measures that protect both people and the planet.",
    neutral: "The strongest path is one that balances urgency with real economic and social costs.",
    weak: "The whole issue is overblown and this kind of strong action will only cause needless harm.",
  },
  {
    keywords: ["ai", "artificial intelligence", "automated decision", "algorithm"],
    strong: "AI needs clear accountability so innovation can advance without causing harm.",
    neutral: "The right approach is careful regulation, not abandonment or unfettered progress.",
    weak: "We should let technology move on its own and not get bogged down by rules.",
  },
  {
    keywords: ["basic income", "ubi", "welfare", "poverty"],
    strong: "A universal safety net can reduce poverty when it is designed to complement essential supports.",
    neutral: "UBI can make sense in a broader system, but it should not erase targeted help.",
    weak: "This is just a feel-good policy that ignores the practical costs and incentives.",
  },
  {
    keywords: ["space", "exploration", "astronaut", "funds"],
    strong: "Investing in space can drive innovation while still respecting urgent Earth priorities.",
    neutral: "Space exploration and Earth care both matter; funding should be smart and practical.",
    weak: "This is a distraction from more pressing problems and should not be a top priority.",
  },
  {
    keywords: ["genetic", "engineering", "embryo", "bioethic"],
    strong: "Genetic engineering needs firm ethical guardrails to protect people and prevent abuse.",
    neutral: "The technology is powerful, but it must be constrained and carefully regulated.",
    weak: "Editing human genes is too risky and should be avoided entirely.",
  },
  {
    keywords: ["office", "remote", "work", "culture"],
    strong: "Companies should support collaboration while giving employees flexible options.",
    neutral: "Both in-person and remote work have merit, and policy should balance them fairly.",
    weak: "Offices are outdated; workers should just do whatever they want from home.",
  },
  {
    keywords: ["crypto", "cryptocurrency", "regulation", "blockchain"],
    strong: "Crypto needs smart regulation that protects users without killing decentralized innovation.",
    neutral: "Regulation can help if it is designed to preserve the technology while limiting abuse.",
    weak: "Regulators just want to crush the industry because they don’t understand it.",
  },
  {
    keywords: ["animal", "testing", "research", "medical"],
    strong: "Limited animal testing can be justified when it saves lives and is strictly controlled.",
    neutral: "This is a difficult trade-off and it deserves strong protections, not bans or apathy.",
    weak: "Science should do whatever it wants; animal welfare is a secondary concern.",
  },
  {
    keywords: ["nuclear", "energy", "reactor", "radioactive"],
    strong: "Nuclear power can support a cleaner grid if safety and waste are managed responsibly.",
    neutral: "Nuclear energy has potential, but it must be handled with strict rules and oversight.",
    weak: "It’s too dangerous and we should shut it down no matter the cost.",
  },
];

const chooseTopicTemplate = (topic) => {
  const lower = String(topic).toLowerCase();
  return (
    topicTemplates.find((entry) =>
      entry.keywords.some((keyword) => lower.includes(keyword))
    ) || topicTemplates[0]
  );
};

const chooseTurnText = (template, turnNumber, style) => {
  const suffix = [
    "Clear evidence and smart policy make this discussion meaningful.",
    "The best argument here relies on data and accountability.",
    "Strong reasoning wins the debate, not empty slogans.",
    "This response should show why practical choices matter.",
    "Real-world examples are more persuasive than vague warnings.",
  ][(turnNumber - 1) % 5];

  if (style === "strong") return `${template.strong} ${suffix}`;
  if (style === "neutral") return `${template.neutral} ${suffix}`;
  return `${template.weak} ${suffix}`;
};

const serialize = (value, indent = 0) => {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[
${value
      .map((item) => `${pad}  ${serialize(item, indent + 1)}`)
      .join(",\n")}

${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return `{
${entries
      .map(
        ([key, val]) => `${pad}  ${key}: ${serialize(val, indent + 1)}`
      )
      .join(",\n")}
${pad}}`;
  }
  if (typeof value === "string") {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return String(value);
};

const findChapterMeta = async (chapterDir) => {
  const chapterFile = path.join(chapterDir, "chapter.js");
  try {
    const module = await import(pathToFileURL(chapterFile).href);
    return module.default || {};
  } catch {
    return {};
  }
};

const pathToFileURL = (filePath) => new URL(`file://${path.resolve(filePath)}`);

const walkRounds = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const tasks = [];
  for (const entry of entries) {
    if (entry.isDirectory() && /^chapter\d+$/.test(entry.name)) {
      const chapterDir = path.join(dir, entry.name);
      const chapterMeta = await findChapterMeta(chapterDir);
      const roundFiles = await fs.readdir(chapterDir);
      for (const file of roundFiles) {
        if (/round\d+\.js$/.test(file)) {
          tasks.push({ chapterMeta, filePath: path.join(chapterDir, file) });
        }
      }
    }
  }
  return tasks;
};

const placeholderPattern = /we need clear reasoning grounded in evidence/i;

const updateFile = async ({ chapterMeta, filePath }) => {
  const url = pathToFileURL(filePath).href;
  const module = await import(url + `?update=${Date.now()}`);
  const raw = module.default;
  if (!raw || !Array.isArray(raw.turns)) return false;

  const template = chooseTopicTemplate(chapterMeta.topic || chapterMeta.title || "");
  let modified = false;

  const newTurns = raw.turns.map((turn) => {
    const options = turn.options.map((option, index) => {
      const needsFix = placeholderPattern.test(option.text || "");
      if (!needsFix) return option;
      modified = true;
      const style = index === 0 ? "strong" : index === 1 ? "neutral" : "weak";
      return {
        ...option,
        text: chooseTurnText(template, turn.turnNumber || 1, style),
      };
    });
    return { ...turn, options };
  });

  if (!modified) return false;

  const roundName = path.basename(filePath, ".js");
  const output = `const ${roundName} = ${serialize({
    roundNumber: raw.roundNumber,
    title: raw.title,
    numberOfTurns: raw.numberOfTurns,
    passingScore: raw.passingScore,
    bossRound: raw.bossRound,
    turns: newTurns,
  })};\n\nexport default ${roundName};\n`;

  await fs.writeFile(filePath, output, "utf8");
  return true;
};

const main = async () => {
  const tasks = await walkRounds(contentDirectory);
  let updated = 0;
  for (const task of tasks) {
    const changed = await updateFile(task);
    if (changed) updated += 1;
  }
  console.log(`Updated ${updated} round files with placeholder content.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
