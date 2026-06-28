const round1 = {
  roundNumber: 1,

  title: "Opening Statements",

  numberOfTurns: 10,

  passingScore: 14,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Welcome to your first debate. Tell me, should social media regulate free speech?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Harmful misinformation should be moderated while protecting constructive discussion.",
          quality: 2,
          npcReply:
            "A balanced beginning. You're considering both freedom and responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No. Every post should remain online regardless of consequences.",
          quality: 1,
          npcReply:
            "Absolute freedom sounds appealing, but it creates difficult ethical problems.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Everyone should simply stop using social media.",
          quality: 0,
          npcReply:
            "Avoiding the issue isn't the same as solving it.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Why do people support content moderation?",

      options: [
        {
          optionNumber: 1,
          text: "To reduce harmful misinformation, scams, and dangerous content.",
          quality: 2,
          npcReply:
            "Exactly. Moderation exists to reduce real-world harm.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Because everyone enjoys censorship.",
          quality: 0,
          npcReply:
            "That's an oversimplification of a complex issue.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Mostly because companies want fewer legal problems.",
          quality: 1,
          npcReply:
            "Legal responsibility is certainly part of the discussion.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should offensive opinions always be removed?",

      options: [
        {
          optionNumber: 1,
          text: "No. Context should determine whether moderation is necessary.",
          quality: 2,
          npcReply:
            "Good. Context often changes the entire meaning.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Yes. Every offensive opinion should disappear immediately.",
          quality: 1,
          npcReply:
            "Some offensive ideas are still protected forms of expression.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Nothing is offensive anymore.",
          quality: 0,
          npcReply:
            "Reality suggests otherwise.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Who should create moderation policies?",

      options: [
        {
          optionNumber: 1,
          text: "Platforms should create transparent policies with public accountability.",
          quality: 2,
          npcReply:
            "Transparency improves trust.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Nobody. Let randomness decide.",
          quality: 0,
          npcReply:
            "Random decisions rarely produce fair outcomes.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Governments alone.",
          quality: 1,
          npcReply:
            "Government oversight introduces another set of challenges.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Can misinformation cause real-world harm?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. False information can influence dangerous decisions.",
          quality: 2,
          npcReply:
            "History provides many examples supporting that.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No. People never believe misinformation.",
          quality: 0,
          npcReply:
            "Unfortunately, evidence shows otherwise.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Sometimes, depending on the situation.",
          quality: 1,
          npcReply:
            "Context certainly matters.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should users be able to appeal moderation decisions?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Appeals make moderation more accountable.",
          quality: 2,
          npcReply:
            "An appeal system improves fairness.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No. Moderators should never be questioned.",
          quality: 0,
          npcReply:
            "Unchecked authority often creates abuse.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only famous users should appeal.",
          quality: 1,
          npcReply:
            "Fairness should apply equally.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Should AI replace human moderators?",

      options: [
        {
          optionNumber: 1,
          text: "AI should assist humans, not replace them.",
          quality: 2,
          npcReply:
            "Combining technology with human judgment is sensible.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "AI should moderate everything alone.",
          quality: 0,
          npcReply:
            "Algorithms still make mistakes.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "AI should never be used.",
          quality: 1,
          npcReply:
            "Automation still has useful applications.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should moderation policies be public?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Users deserve to understand the rules.",
          quality: 2,
          npcReply:
            "Transparency creates confidence.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Keep every rule secret.",
          quality: 0,
          npcReply:
            "Hidden rules reduce trust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only moderators should know them.",
          quality: 1,
          npcReply:
            "Public understanding still matters.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Is complete freedom of speech possible on private platforms?",

      options: [
        {
          optionNumber: 1,
          text: "Private platforms still establish community standards.",
          quality: 2,
          npcReply:
            "Exactly. Ownership carries responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Private companies have no rights.",
          quality: 0,
          npcReply:
            "That misunderstands private ownership.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Freedom means no platform rules.",
          quality: 1,
          npcReply:
            "Platforms still have legal obligations.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "Final question. What makes good moderation?",

      options: [
        {
          optionNumber: 1,
          text: "Clear rules, transparency, appeals, and proportional enforcement.",
          quality: 2,
          npcReply:
            "Excellent. You've shown strong reasoning today.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No moderation at all.",
          quality: 0,
          npcReply:
            "Absolute freedom also creates absolute risks.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Delete anything controversial.",
          quality: 1,
          npcReply:
            "That would silence healthy discussion.",
          expression: "neutral",
        },
      ],
    },
  ],
};

export default round1;