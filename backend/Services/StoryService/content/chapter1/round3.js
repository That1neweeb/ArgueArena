const round3 = {
  roundNumber: 3,

  title: "The Cost of Freedom",

  numberOfTurns: 10,

  passingScore: 15,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should platforms remove content that encourages violence?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Direct incitement to violence should never be tolerated.",
          quality: 2,
          npcReply:
            "Protecting public safety is one of moderation's strongest arguments.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No. Every statement deserves protection.",
          quality: 1,
          npcReply:
            "Even freedom has limits when lives are at risk.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Violence online isn't a real issue.",
          quality: 0,
          npcReply:
            "Ignoring evidence weakens your argument.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Can fake news influence elections?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. False information can shape public opinion.",
          quality: 2,
          npcReply:
            "Information has tremendous influence over democracy.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Only intelligent people vote anyway.",
          quality: 0,
          npcReply:
            "That's an assumption rather than evidence.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Sometimes, depending on its reach.",
          quality: 1,
          npcReply:
            "Scale certainly affects impact.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should social media companies explain why content was removed?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Users deserve transparency.",
          quality: 2,
          npcReply:
            "Transparency builds trust between users and platforms.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No explanation is ever necessary.",
          quality: 0,
          npcReply:
            "People lose confidence when decisions seem arbitrary.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only explain removals to verified users.",
          quality: 1,
          npcReply:
            "Fairness should apply equally.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Is banning repeat offenders justified?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, after repeated violations and fair warnings.",
          quality: 2,
          npcReply:
            "Consequences should follow repeated misconduct.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Ban everyone after one mistake.",
          quality: 0,
          npcReply:
            "Punishment should be proportional.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Never ban anyone.",
          quality: 1,
          npcReply:
            "Some behavior requires stronger action.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should children receive stronger online protection?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Young users deserve additional safeguards.",
          quality: 2,
          npcReply:
            "Protecting vulnerable users is an important responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Children should follow adult rules.",
          quality: 1,
          npcReply:
            "Different age groups often require different protections.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Children should have unrestricted access.",
          quality: 0,
          npcReply:
            "That ignores many online risks.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should satire ever be removed?",

      options: [
        {
          optionNumber: 1,
          text: "Only if it clearly causes serious harm or violates policies.",
          quality: 2,
          npcReply:
            "Context remains essential.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every joke should be deleted.",
          quality: 0,
          npcReply:
            "Humor is part of free expression.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Satire can never be misunderstood.",
          quality: 1,
          npcReply:
            "Misunderstanding is always possible.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Should platforms be responsible for recommendation algorithms?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Recommendations shape what people see.",
          quality: 2,
          npcReply:
            "Algorithms influence millions of users every day.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Algorithms have no impact.",
          quality: 0,
          npcReply:
            "Evidence suggests otherwise.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Users are always responsible alone.",
          quality: 1,
          npcReply:
            "Responsibility can be shared.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should fact-check labels replace removing posts?",

      options: [
        {
          optionNumber: 1,
          text: "Whenever possible, adding context is better than deleting content.",
          quality: 2,
          npcReply:
            "Providing information can preserve discussion.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Delete every questionable post immediately.",
          quality: 1,
          npcReply:
            "Sometimes additional context is enough.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Never fact-check anything.",
          quality: 0,
          npcReply:
            "Reliable information benefits everyone.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Can freedom of speech exist without responsibility?",

      options: [
        {
          optionNumber: 1,
          text: "Rights and responsibilities should exist together.",
          quality: 2,
          npcReply:
            "A mature democracy depends on both.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Responsibility is unnecessary.",
          quality: 0,
          npcReply:
            "Every freedom carries consequences.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only governments need responsibility.",
          quality: 1,
          npcReply:
            "Individuals also influence society.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "You're improving rapidly. Final argument: What is the greatest challenge for modern social media?",

      options: [
        {
          optionNumber: 1,
          text: "Balancing free expression, safety, transparency, and accountability.",
          quality: 2,
          npcReply:
            "Excellent. You understand why this debate is so difficult.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Making everyone agree.",
          quality: 1,
          npcReply:
            "Consensus is rarely possible in open societies.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "There are no real challenges.",
          quality: 0,
          npcReply:
            "Ignoring complexity won't win debates.",
          expression: "smirk",
        },
      ],
    },
  ],
};

export default round3;