const round2 = {
  roundNumber: 2,

  title: "Finding the Balance",

  numberOfTurns: 10,

  passingScore: 15,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should governments regulate social media platforms?",

      options: [
        {
          optionNumber: 1,
          text: "Governments should create laws protecting both safety and freedom of speech.",
          quality: 2,
          npcReply:
            "A legal framework can provide consistency while protecting rights.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Governments should completely control every online platform.",
          quality: 0,
          npcReply:
            "Too much control risks censorship.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Governments should never interfere.",
          quality: 1,
          npcReply:
            "Some regulation may still be necessary for illegal activities.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Who should decide what qualifies as misinformation?",

      options: [
        {
          optionNumber: 1,
          text: "Independent experts using transparent standards.",
          quality: 2,
          npcReply:
            "Transparency is essential for public trust.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Whoever owns the platform without explanation.",
          quality: 1,
          npcReply:
            "Ownership gives authority, but accountability still matters.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Nobody. Every claim should automatically be treated as true.",
          quality: 0,
          npcReply:
            "That would encourage misinformation.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Can online anonymity be beneficial?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, it protects vulnerable individuals while requiring moderation.",
          quality: 2,
          npcReply:
            "Privacy and accountability should coexist.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No one should ever be anonymous online.",
          quality: 1,
          npcReply:
            "Privacy remains important in many situations.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Anonymous users should never follow any rules.",
          quality: 0,
          npcReply:
            "Rules still apply regardless of identity.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should false information always be removed immediately?",

      options: [
        {
          optionNumber: 1,
          text: "Serious misinformation should be addressed based on evidence and context.",
          quality: 2,
          npcReply:
            "Context often changes the correct response.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Everything false should disappear instantly.",
          quality: 1,
          npcReply:
            "Mistakes and satire complicate that approach.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Nothing should ever be removed.",
          quality: 0,
          npcReply:
            "That ignores genuinely dangerous content.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should platforms publish moderation statistics?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Transparency reports build public confidence.",
          quality: 2,
          npcReply:
            "Users deserve to understand moderation decisions.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Statistics should remain secret forever.",
          quality: 0,
          npcReply:
            "Secrecy usually reduces trust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only governments should see them.",
          quality: 1,
          npcReply:
            "Public accountability is still valuable.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should hate speech receive special moderation?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Harmful speech targeting protected groups deserves stricter review.",
          quality: 2,
          npcReply:
            "Protecting people from targeted harm is an important responsibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every hateful statement should remain online.",
          quality: 0,
          npcReply:
            "Freedom of speech still has practical limits.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only famous people deserve protection.",
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
        "Should moderation decisions be reviewed by humans?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Human review improves fairness and accuracy.",
          quality: 2,
          npcReply:
            "Technology works best alongside human judgment.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Computers should make every decision alone.",
          quality: 0,
          npcReply:
            "Algorithms are not perfect.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Moderation isn't necessary.",
          quality: 1,
          npcReply:
            "Most platforms still require some oversight.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "What is the biggest challenge of content moderation?",

      options: [
        {
          optionNumber: 1,
          text: "Balancing safety with freedom of expression.",
          quality: 2,
          npcReply:
            "Exactly. That's why moderation is difficult.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Making everyone agree.",
          quality: 1,
          npcReply:
            "Consensus is nearly impossible online.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Choosing the funniest comments.",
          quality: 0,
          npcReply:
            "That's unrelated to moderation.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Should users be educated about misinformation?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Education reduces misinformation in the long term.",
          quality: 2,
          npcReply:
            "Prevention is often better than punishment.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Education isn't necessary.",
          quality: 0,
          npcReply:
            "Knowledge is one of the strongest defenses.",
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
      turnNumber: 10,

      npcDialogue:
        "You've improved. Final question: What creates the healthiest online community?",

      options: [
        {
          optionNumber: 1,
          text: "Transparent rules, respectful discussion, education, and fair moderation.",
          quality: 2,
          npcReply:
            "Excellent answer. You're starting to think like a true debater.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Complete freedom with zero responsibility.",
          quality: 0,
          npcReply:
            "Rights and responsibilities usually go together.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Strict censorship of every disagreement.",
          quality: 1,
          npcReply:
            "Debate disappears when disagreement disappears.",
          expression: "neutral",
        },
      ],
    },
  ],
};

export default round2;