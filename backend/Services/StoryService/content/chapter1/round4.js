const round4 = {
  roundNumber: 4,

  title: "Freedom vs Responsibility",

  numberOfTurns: 10,

  passingScore: 16,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should platforms remove misinformation even if it is popular?",

      options: [
        {
          optionNumber: 1,
          text: "Popularity doesn't determine truth. Harmful misinformation should be addressed.",
          quality: 2,
          npcReply:
            "Exactly. Popularity and accuracy aren't the same thing.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Popular posts should never be removed.",
          quality: 1,
          npcReply:
            "Popularity shouldn't grant immunity.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Truth doesn't matter online.",
          quality: 0,
          npcReply:
            "That argument falls apart immediately.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Can online harassment limit another person's freedom of speech?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Harassment can silence people through fear.",
          quality: 2,
          npcReply:
            "A thoughtful point. Freedom should exist for everyone.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Harassment is just another opinion.",
          quality: 1,
          npcReply:
            "Intent and impact matter.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Harassment never affects anyone.",
          quality: 0,
          npcReply:
            "Reality clearly disagrees.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should repeat offenders receive stricter punishments?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Consequences should escalate after repeated violations.",
          quality: 2,
          npcReply:
            "Consistency strengthens moderation.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every violation deserves the same punishment.",
          quality: 1,
          npcReply:
            "Context often matters.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Punishments shouldn't exist.",
          quality: 0,
          npcReply:
            "Rules without consequences rarely work.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should users verify information before sharing it?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Everyone shares responsibility for accurate information.",
          quality: 2,
          npcReply:
            "Responsible users strengthen online communities.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Verification is only the platform's job.",
          quality: 1,
          npcReply:
            "Responsibility is shared.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Sharing false information isn't a problem.",
          quality: 0,
          npcReply:
            "That creates unnecessary harm.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should controversial discussions always remain visible?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, unless they violate clear community standards.",
          quality: 2,
          npcReply:
            "Balanced reasoning once again.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every controversial topic should be hidden.",
          quality: 0,
          npcReply:
            "Debate requires disagreement.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only political discussions should disappear.",
          quality: 1,
          npcReply:
            "Selective moderation raises fairness concerns.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should anonymous accounts have fewer privileges?",

      options: [
        {
          optionNumber: 1,
          text: "Privacy is important, but accountability should still exist.",
          quality: 2,
          npcReply:
            "You've found another reasonable balance.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Anonymous users should control everything.",
          quality: 0,
          npcReply:
            "Power without accountability is dangerous.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Anonymous users should never exist.",
          quality: 1,
          npcReply:
            "Privacy also protects vulnerable people.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "What role should education play in fighting misinformation?",

      options: [
        {
          optionNumber: 1,
          text: "Teaching critical thinking is a long-term solution.",
          quality: 2,
          npcReply:
            "Education often outlasts enforcement.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Education is unnecessary.",
          quality: 0,
          npcReply:
            "Knowledge remains one of society's best defenses.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only moderators need education.",
          quality: 1,
          npcReply:
            "Everyone benefits from digital literacy.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Can moderation ever be completely unbiased?",

      options: [
        {
          optionNumber: 1,
          text: "No, but transparency and accountability reduce bias.",
          quality: 2,
          npcReply:
            "An honest and realistic answer.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Humans are perfectly unbiased.",
          quality: 0,
          npcReply:
            "That ignores human nature.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "AI will eliminate all bias.",
          quality: 1,
          npcReply:
            "Algorithms inherit human decisions too.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Should platforms explain how recommendation algorithms work?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Transparency increases trust.",
          quality: 2,
          npcReply:
            "Users deserve to understand the systems influencing them.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No explanation should ever be provided.",
          quality: 0,
          npcReply:
            "Hidden systems often create distrust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only experts should know.",
          quality: 1,
          npcReply:
            "General transparency still matters.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "You've become much stronger. Tell me—what defines responsible moderation?",

      options: [
        {
          optionNumber: 1,
          text: "Clear policies, transparency, fairness, appeals, and proportional action.",
          quality: 2,
          npcReply:
            "Excellent. You're beginning to debate like a champion.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Remove everything that causes disagreement.",
          quality: 0,
          npcReply:
            "Without disagreement, there is no debate.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Never moderate anything.",
          quality: 1,
          npcReply:
            "Some moderation remains necessary for public safety.",
          expression: "neutral",
        },
      ],
    },
  ],
};

export default round4;