const round9 = {
  roundNumber: 9,

  title: "Master Debater",

  numberOfTurns: 10,

  passingScore: 18,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "You've improved tremendously. Tell me, what is the foundation of every strong debate?",

      options: [
        {
          optionNumber: 1,
          text: "Evidence, logical reasoning, and respectful discussion.",
          quality: 2,
          npcReply:
            "Exactly. Strong arguments are built on evidence, not emotion.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Speaking louder than everyone else.",
          quality: 0,
          npcReply:
            "Volume never replaces logic.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Winning at any cost.",
          quality: 1,
          npcReply:
            "Integrity matters just as much as victory.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Can freedom of speech survive without responsible citizens?",

      options: [
        {
          optionNumber: 1,
          text: "Rights and responsibilities must exist together.",
          quality: 2,
          npcReply:
            "A mature understanding of democracy.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Responsibility isn't necessary.",
          quality: 0,
          npcReply:
            "Freedom without responsibility often harms others.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only governments need responsibility.",
          quality: 1,
          npcReply:
            "Citizens also shape society.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Should platforms be transparent when algorithms change?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Major changes should be communicated clearly.",
          quality: 2,
          npcReply:
            "Transparency strengthens trust.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Users never need to know.",
          quality: 0,
          npcReply:
            "People deserve to understand systems affecting them.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only advertisers should know.",
          quality: 1,
          npcReply:
            "Transparency should benefit users first.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "What makes misinformation especially dangerous?",

      options: [
        {
          optionNumber: 1,
          text: "It influences decisions before people verify the facts.",
          quality: 2,
          npcReply:
            "Precisely. Speed often defeats accuracy.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "It never affects anyone.",
          quality: 0,
          npcReply:
            "Evidence strongly disagrees.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only politicians are affected.",
          quality: 1,
          npcReply:
            "Everyone can be influenced.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should platforms explain their community guidelines using simple language?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Rules should be understandable for everyone.",
          quality: 2,
          npcReply:
            "Accessibility improves fairness.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Rules should remain complicated.",
          quality: 0,
          npcReply:
            "Confusing rules create confusion.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only lawyers should understand them.",
          quality: 1,
          npcReply:
            "Users deserve clarity too.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Should moderation systems be regularly audited?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Independent audits improve accountability.",
          quality: 2,
          npcReply:
            "Excellent. Oversight builds confidence.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Audits are unnecessary.",
          quality: 0,
          npcReply:
            "Unchecked systems often become unfair.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only internal staff should review them.",
          quality: 1,
          npcReply:
            "Independent review provides greater trust.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Can respectful disagreement strengthen society?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Debate encourages learning and critical thinking.",
          quality: 2,
          npcReply:
            "Exactly why debate exists.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Disagreement should always be avoided.",
          quality: 0,
          npcReply:
            "Progress often begins with disagreement.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only experts should debate.",
          quality: 1,
          npcReply:
            "Everyone benefits from respectful discussion.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should platforms encourage civil discussion instead of only punishing bad behavior?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Rewarding positive behavior builds healthier communities.",
          quality: 2,
          npcReply:
            "Positive reinforcement is often overlooked.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Punishment alone is enough.",
          quality: 1,
          npcReply:
            "Encouragement also shapes behavior.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Communities don't need rules.",
          quality: 0,
          npcReply:
            "Rules protect constructive discussion.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "How should controversial ideas be handled?",

      options: [
        {
          optionNumber: 1,
          text: "Evaluate them fairly using evidence and context.",
          quality: 2,
          npcReply:
            "That's the heart of critical thinking.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Delete every controversial opinion.",
          quality: 0,
          npcReply:
            "Debate disappears when disagreement disappears.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Believe every controversial claim.",
          quality: 1,
          npcReply:
            "Claims should always be examined carefully.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "You've nearly reached the end. One final challenge remains before our championship debate.",

      options: [
        {
          optionNumber: 1,
          text: "I'm ready. I'll rely on logic, evidence, and respect.",
          quality: 2,
          npcReply:
            "Excellent. Prepare yourself for our final battle.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "I'll just improvise.",
          quality: 1,
          npcReply:
            "Preparation always helps.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Winning is all that matters.",
          quality: 0,
          npcReply:
            "Then you've learned very little.",
          expression: "smirk",
        },
      ],
    },
  ],
};

export default round9;