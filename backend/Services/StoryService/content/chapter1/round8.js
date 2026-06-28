const round8 = {
  roundNumber: 8,

  title: "The Final Stretch",

  numberOfTurns: 10,

  passingScore: 18,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should platforms prioritize public safety over complete freedom of speech?",

      options: [
        {
          optionNumber: 1,
          text: "Public safety should be protected while preserving lawful expression.",
          quality: 2,
          npcReply:
            "A reasonable balance between liberty and responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Freedom should always come first regardless of consequences.",
          quality: 1,
          npcReply:
            "Even rights come with responsibilities.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Safety is completely unimportant.",
          quality: 0,
          npcReply:
            "Ignoring public safety weakens your position.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Should social media companies disclose how recommendation algorithms work?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Greater transparency improves public trust.",
          quality: 2,
          npcReply:
            "Users deserve to understand what influences their feeds.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Algorithms should remain completely secret.",
          quality: 0,
          npcReply:
            "Secrecy often creates suspicion.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only developers should understand them.",
          quality: 1,
          npcReply:
            "Transparency still has value.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should moderation rules change based on cultural differences?",

      options: [
        {
          optionNumber: 1,
          text: "Core principles should stay consistent while respecting local culture.",
          quality: 2,
          npcReply:
            "Excellent balance between consistency and flexibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every country should have completely unrelated rules.",
          quality: 1,
          npcReply:
            "Some global standards are still necessary.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Culture should never matter.",
          quality: 0,
          npcReply:
            "Context often depends on culture.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should users have access to moderation history on their accounts?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Transparency helps users improve their behavior.",
          quality: 2,
          npcReply:
            "Clear feedback creates better communities.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Moderation history should always remain hidden.",
          quality: 0,
          npcReply:
            "Users deserve to understand actions taken against them.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only moderators should see it.",
          quality: 1,
          npcReply:
            "Greater transparency benefits everyone.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Can technology alone solve misinformation?",

      options: [
        {
          optionNumber: 1,
          text: "No. Technology, education, and responsible users must work together.",
          quality: 2,
          npcReply:
            "Exactly. Complex problems require multiple solutions.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "AI alone will solve everything.",
          quality: 1,
          npcReply:
            "Technology still has limitations.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Technology makes misinformation worse every time.",
          quality: 0,
          npcReply:
            "Technology can also help identify harmful content.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should moderation decisions be reviewed regularly?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Policies should evolve as society changes.",
          quality: 2,
          npcReply:
            "Continuous improvement is essential.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Rules should never change.",
          quality: 1,
          npcReply:
            "Society evolves over time.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Rules should change every day.",
          quality: 0,
          npcReply:
            "Constant changes create confusion.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Should verified experts receive greater visibility during emergencies?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, provided the process remains transparent.",
          quality: 2,
          npcReply:
            "Reliable information becomes especially important during crises.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Experts should never receive priority.",
          quality: 1,
          npcReply:
            "Expertise can help reduce confusion.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Popularity should decide everything.",
          quality: 0,
          npcReply:
            "Popularity isn't always reliability.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should social media educate users about digital literacy?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Better-informed users strengthen the entire platform.",
          quality: 2,
          npcReply:
            "Education remains one of the strongest long-term solutions.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Education isn't the platform's concern.",
          quality: 1,
          npcReply:
            "Platforms influence millions of people every day.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Education has no value online.",
          quality: 0,
          npcReply:
            "Knowledge reduces misinformation.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "What should moderation ultimately protect?",

      options: [
        {
          optionNumber: 1,
          text: "Healthy discussion, public safety, and individual rights.",
          quality: 2,
          npcReply:
            "A mature answer.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Only company profits.",
          quality: 0,
          npcReply:
            "Communities require more than financial success.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only government interests.",
          quality: 1,
          npcReply:
            "Many stakeholders are involved.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "One more round remains before our final battle. Are you ready?",

      options: [
        {
          optionNumber: 1,
          text: "I'll rely on evidence, logic, and respectful debate.",
          quality: 2,
          npcReply:
            "Excellent. That's exactly how a true debater prepares.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "I'll simply argue louder.",
          quality: 1,
          npcReply:
            "Volume rarely defeats logic.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Facts don't matter anymore.",
          quality: 0,
          npcReply:
            "Then you'll struggle against me.",
          expression: "smirk",
        },
      ],
    },
  ],
};

export default round8;