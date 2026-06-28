const round5 = {
  roundNumber: 5,

  title: "Who Should Decide?",

  numberOfTurns: 10,

  passingScore: 16,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Who should have the final say in removing online content?",

      options: [
        {
          optionNumber: 1,
          text: "Platforms should follow transparent rules with independent oversight.",
          quality: 2,
          npcReply:
            "A balance between company authority and accountability.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Platform owners should decide everything without explanation.",
          quality: 1,
          npcReply:
            "Authority without transparency creates distrust.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Nobody should ever remove any content.",
          quality: 0,
          npcReply:
            "Ignoring harmful content has consequences too.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Should AI-generated misinformation be treated differently from human misinformation?",

      options: [
        {
          optionNumber: 1,
          text: "No. Harm should determine moderation, not who created it.",
          quality: 2,
          npcReply:
            "Exactly. Consequences matter more than origin.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "AI content should always be banned.",
          quality: 1,
          npcReply:
            "Some AI-generated content is educational or creative.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "AI can never spread misinformation.",
          quality: 0,
          npcReply:
            "Recent events clearly prove otherwise.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should users be warned before permanent suspension?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, unless the violation is extremely severe.",
          quality: 2,
          npcReply:
            "Fair procedures strengthen trust.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every violation deserves an instant permanent ban.",
          quality: 0,
          npcReply:
            "Punishment should be proportional.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Warnings should only be given to influencers.",
          quality: 1,
          npcReply:
            "Rules should apply equally.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Can content moderation reduce polarization?",

      options: [
        {
          optionNumber: 1,
          text: "It can help, but moderation alone cannot solve polarization.",
          quality: 2,
          npcReply:
            "Complex problems rarely have single solutions.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Moderation solves every social problem.",
          quality: 0,
          npcReply:
            "That's an unrealistic claim.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Moderation has no effect whatsoever.",
          quality: 1,
          npcReply:
            "Evidence suggests it can influence discussions.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should social media companies publish annual transparency reports?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Public reporting encourages accountability.",
          quality: 2,
          npcReply:
            "Transparency strengthens confidence.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Reports should remain confidential forever.",
          quality: 0,
          npcReply:
            "Secrecy weakens trust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only governments should receive reports.",
          quality: 1,
          npcReply:
            "The public also deserves information.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should false satire be labeled instead of removed?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Labels preserve discussion while adding context.",
          quality: 2,
          npcReply:
            "Providing context is often preferable.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Delete every satirical post.",
          quality: 0,
          npcReply:
            "Satire has an important place in society.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Never label anything.",
          quality: 1,
          npcReply:
            "Context sometimes prevents misunderstanding.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "What makes moderation decisions fair?",

      options: [
        {
          optionNumber: 1,
          text: "Consistency, transparency, and equal treatment.",
          quality: 2,
          npcReply:
            "Those principles form the foundation of fairness.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Favoring the most popular users.",
          quality: 0,
          npcReply:
            "Popularity should never determine justice.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Changing rules every week.",
          quality: 1,
          npcReply:
            "Consistency is equally important.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should educational misinformation be handled differently?",

      options: [
        {
          optionNumber: 1,
          text: "Educational intent should be considered alongside potential harm.",
          quality: 2,
          npcReply:
            "Intent and impact both matter.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Education excuses all misinformation.",
          quality: 0,
          npcReply:
            "Good intentions don't erase harmful consequences.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Intent never matters.",
          quality: 1,
          npcReply:
            "Context often influences moderation decisions.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Should platforms cooperate internationally against harmful content?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, while respecting local laws and human rights.",
          quality: 2,
          npcReply:
            "International cooperation requires careful balance.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Countries should never cooperate.",
          quality: 0,
          npcReply:
            "Global platforms face global challenges.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only the largest countries should decide.",
          quality: 1,
          npcReply:
            "Smaller nations also deserve representation.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "One final question. What is the purpose of moderation?",

      options: [
        {
          optionNumber: 1,
          text: "To encourage healthy discussion while minimizing harm.",
          quality: 2,
          npcReply:
            "Excellent. You're thinking beyond simple censorship arguments.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "To silence everyone.",
          quality: 0,
          npcReply:
            "That's a misunderstanding of responsible moderation.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "To make everyone agree.",
          quality: 1,
          npcReply:
            "Debate exists because disagreement exists.",
          expression: "neutral",
        },
      ],
    },
  ],
};

export default round5;