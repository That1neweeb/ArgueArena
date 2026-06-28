const round6 = {
  roundNumber: 6,

  title: "The Ethics of Moderation",

  numberOfTurns: 10,

  passingScore: 17,

  bossRound: false,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "Should platforms remove posts that spread conspiracy theories?",

      options: [
        {
          optionNumber: 1,
          text: "Only when they cause significant harm or encourage dangerous actions.",
          quality: 2,
          npcReply:
            "Good. Context and impact matter more than labels.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every conspiracy theory should immediately disappear.",
          quality: 1,
          npcReply:
            "Some discussions are harmless or purely speculative.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Platforms should promote conspiracy theories.",
          quality: 0,
          npcReply:
            "Promoting misinformation undermines public trust.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Should users know exactly why their content was removed?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Clear explanations improve fairness and transparency.",
          quality: 2,
          npcReply:
            "Transparency strengthens credibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "No explanation should ever be given.",
          quality: 0,
          npcReply:
            "Secret decisions create distrust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only verified users deserve explanations.",
          quality: 1,
          npcReply:
            "Rules should apply equally.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "Can misinformation spread faster than facts?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Emotional content often spreads more quickly.",
          quality: 2,
          npcReply:
            "Exactly. That's one reason moderation is challenging.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Facts always spread faster.",
          quality: 0,
          npcReply:
            "Evidence doesn't support that claim.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Both always spread at the same speed.",
          quality: 1,
          npcReply:
            "Many factors influence online reach.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should moderation rules change during emergencies?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, temporarily, with clear justification and transparency.",
          quality: 2,
          npcReply:
            "Emergency policies should remain accountable.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Rules should never change under any circumstances.",
          quality: 1,
          npcReply:
            "Extraordinary situations sometimes require flexibility.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Platforms should remove anything they dislike.",
          quality: 0,
          npcReply:
            "That's arbitrary, not responsible moderation.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Should repeated misinformation affect account reputation?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Repeated harmful behavior should influence moderation decisions.",
          quality: 2,
          npcReply:
            "Past behavior often predicts future risk.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "History should never matter.",
          quality: 1,
          npcReply:
            "Patterns are important in moderation.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "Everyone should be permanently banned after one mistake.",
          quality: 0,
          npcReply:
            "Fairness requires proportional responses.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Can moderation accidentally suppress legitimate debate?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. That's why appeals and human review are essential.",
          quality: 2,
          npcReply:
            "An excellent observation.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Moderation is never wrong.",
          quality: 0,
          npcReply:
            "No system is perfect.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Appeals are unnecessary.",
          quality: 1,
          npcReply:
            "Appeals improve fairness.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "Should community feedback influence moderation decisions?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, but final decisions should follow clear policies.",
          quality: 2,
          npcReply:
            "Community participation is valuable when balanced.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Communities should control moderation entirely.",
          quality: 1,
          npcReply:
            "Majorities can also become biased.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "User reports should be ignored.",
          quality: 0,
          npcReply:
            "Community reporting is often the first warning system.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Should moderation policies be the same worldwide?",

      options: [
        {
          optionNumber: 1,
          text: "Core principles should remain consistent while respecting local laws.",
          quality: 2,
          npcReply:
            "A thoughtful balance between consistency and flexibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Every country should have completely unrelated rules.",
          quality: 1,
          npcReply:
            "Global platforms still need common standards.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "No rules should exist anywhere.",
          quality: 0,
          npcReply:
            "Global platforms still require governance.",
          expression: "smirk",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "Should platforms publicly admit moderation mistakes?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Accountability increases public trust.",
          quality: 2,
          npcReply:
            "Owning mistakes strengthens credibility.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Mistakes should always be hidden.",
          quality: 0,
          npcReply:
            "Secrecy usually damages trust.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only admit mistakes to governments.",
          quality: 1,
          npcReply:
            "Users deserve transparency too.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "Your arguments are becoming stronger. Final question: What is the greatest ethical challenge in moderation?",

      options: [
        {
          optionNumber: 1,
          text: "Balancing individual rights, public safety, transparency, and fairness.",
          quality: 2,
          npcReply:
            "Excellent. You're beginning to see the full complexity of the issue.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Making everyone happy.",
          quality: 1,
          npcReply:
            "That's desirable, but rarely possible.",
          expression: "neutral",
        },
        {
          optionNumber: 3,
          text: "There is no ethical challenge.",
          quality: 0,
          npcReply:
            "Ignoring ethics is the fastest way to lose a debate.",
          expression: "smirk",
        },
      ],
    },
  ],
};

export default round6;