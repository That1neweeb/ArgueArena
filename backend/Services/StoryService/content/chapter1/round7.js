const round7 = {
  roundNumber: 7,

  title: "The Public's Trust",

  numberOfTurns: 10,

  passingScore: 17,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should social media companies be legally responsible for harmful content?",

      options: [
        {
          optionNumber: 1,
          text: "They should share responsibility while users remain accountable for what they post.",
          quality: 2,
          npcReply:
            "Responsibility is strongest when it's shared.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Platforms should never have responsibility.",
          quality: 1,
          npcReply:
            "Their influence makes complete immunity difficult to justify.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Users should have no responsibility at all.",
          quality: 0,
          npcReply:
            "Every action online still belongs to someone.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Should freedom of speech protect hate speech?",

      options: [
        {
          optionNumber: 1,
          text: "Freedom is important, but speech directly causing harm deserves limits.",
          quality: 2,
          npcReply:
            "Balancing liberty and protection is never simple.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Everything should always be allowed.",
          quality: 1,
          npcReply:
            "Absolute freedom has difficult consequences.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Every offensive opinion is hate speech.",
          quality: 0,
          npcReply:
            "Those concepts aren't identical.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should users verify information before reposting it?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Responsible sharing reduces misinformation.",
          quality: 2,
          npcReply:
            "Digital literacy begins with individual responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Only platforms should verify information.",
          quality: 1,
          npcReply:
            "Users also influence the spread of information.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Verification is pointless.",
          quality: 0,
          npcReply:
            "Reliable information remains valuable.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should algorithms prioritize reliable sources?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, while still allowing diverse viewpoints.",
          quality: 2,
          npcReply:
            "Quality information and diversity can coexist.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Algorithms should only reward popularity.",
          quality: 0,
          npcReply:
            "Popularity isn't evidence of truth.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Algorithms should randomly recommend content.",
          quality: 1,
          npcReply:
            "Randomness creates new problems.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should repeated false reports against innocent users be punished?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Abuse of reporting systems should have consequences.",
          quality: 2,
          npcReply:
            "Fair systems protect everyone.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Anyone should report without consequences.",
          quality: 1,
          npcReply:
            "False reports waste valuable moderation resources.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Reporting systems should be removed.",
          quality: 0,
          npcReply:
            "Moderators rely heavily on user reports.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should deleted posts remain accessible for legal investigations?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, when legally required and privacy is respected.",
          quality: 2,
          npcReply:
            "A reasonable balance between justice and privacy.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Everything should be erased forever.",
          quality: 0,
          npcReply:
            "Evidence can still be important.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Governments should access every account freely.",
          quality: 1,
          npcReply:
            "Oversight and legal safeguards still matter.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Should moderation teams include experts from different cultures?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Diversity improves fairness and cultural understanding.",
          quality: 2,
          npcReply:
            "Different perspectives reduce bias.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Only one culture should decide global rules.",
          quality: 0,
          npcReply:
            "Global platforms serve diverse communities.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Culture doesn't matter.",
          quality: 1,
          npcReply:
            "Context often depends on culture.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should platforms openly publish their moderation guidelines?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Public rules increase accountability.",
          quality: 2,
          npcReply:
            "Transparency creates confidence.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Rules should remain confidential.",
          quality: 0,
          npcReply:
            "Hidden rules create confusion.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only moderators should know the rules.",
          quality: 1,
          npcReply:
            "Users also deserve clarity.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Should educational campaigns accompany moderation efforts?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Education prevents future misinformation.",
          quality: 2,
          npcReply:
            "Prevention is stronger than punishment alone.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Education has no effect.",
          quality: 0,
          npcReply:
            "Knowledge changes behavior over time.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only schools should educate people.",
          quality: 1,
          npcReply:
            "Platforms also influence digital literacy.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "You're becoming a worthy opponent. Final question: What creates long-term trust in social media?",

      options: [
        {
          optionNumber: 1,
          text: "Transparency, fairness, accountability, education, and consistent moderation.",
          quality: 2,
          npcReply:
            "Excellent. You're nearly ready for our final confrontation.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Keeping every decision secret.",
          quality: 0,
          npcReply:
            "Secrecy rarely builds trust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Removing all disagreement.",
          quality: 1,
          npcReply:
            "Healthy debate depends on differing opinions.",
          expression: "neutral",
        },
      ],
    },
  ],
};

export default round7;