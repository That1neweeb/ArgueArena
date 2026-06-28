const round10 = {
  roundNumber: 10,

  title: "Boss Battle - Aria",

  numberOfTurns: 10,

  passingScore: 20,

  bossRound: true,

  turns: [
    {
      turnNumber: 1,

      npcDialogue:
        "You've made it this far. But becoming a true debater requires more than memorizing arguments. Let's begin.",

      options: [
        {
          optionNumber: 1,
          text: "A strong debate is built on evidence, logic, and respect for opposing views.",
          quality: 2,
          npcReply:
            "Excellent opening. Confidence without arrogance.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "The loudest speaker usually wins.",
          quality: 0,
          npcReply:
            "Debate isn't a shouting contest.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Winning matters more than honesty.",
          quality: 1,
          npcReply:
            "Victory without integrity means little.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 2,

      npcDialogue:
        "Can free speech exist if people are afraid to speak because of harassment?",

      options: [
        {
          optionNumber: 1,
          text: "Protecting users from harassment allows more voices to participate.",
          quality: 2,
          npcReply:
            "An insightful perspective.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Harassment is simply part of free speech.",
          quality: 0,
          npcReply:
            "Freedom shouldn't silence others.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "People should simply ignore harassment.",
          quality: 1,
          npcReply:
            "Reality is often more complicated.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 3,

      npcDialogue:
        "How should platforms balance individual freedom with public safety?",

      options: [
        {
          optionNumber: 1,
          text: "Use transparent policies and proportional moderation.",
          quality: 2,
          npcReply:
            "You're thinking like a policymaker now.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Public safety should never matter.",
          quality: 0,
          npcReply:
            "That position ignores real consequences.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Remove everything controversial.",
          quality: 1,
          npcReply:
            "That would also remove valuable discussion.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 4,

      npcDialogue:
        "Should users have the right to appeal moderation decisions?",

      options: [
        {
          optionNumber: 1,
          text: "Yes. Fair systems always include accountability.",
          quality: 2,
          npcReply:
            "Excellent.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Moderators should never be questioned.",
          quality: 0,
          npcReply:
            "Unchecked authority invites abuse.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only famous users deserve appeals.",
          quality: 1,
          npcReply:
            "Justice shouldn't depend on popularity.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 5,

      npcDialogue:
        "Can AI completely replace human moderators?",

      options: [
        {
          optionNumber: 1,
          text: "AI should assist humans, not replace them.",
          quality: 2,
          npcReply:
            "Technology works best with human judgment.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Humans aren't needed anymore.",
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
            "Automation still has benefits.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 6,

      npcDialogue:
        "Can moderation itself become censorship?",

      options: [
        {
          optionNumber: 1,
          text: "Yes, if rules become unfair or lack transparency.",
          quality: 2,
          npcReply:
            "An excellent distinction.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Moderation and censorship are always identical.",
          quality: 0,
          npcReply:
            "That's an oversimplification.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Censorship no longer exists.",
          quality: 1,
          npcReply:
            "History suggests otherwise.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 7,

      npcDialogue:
        "What role does transparency play in moderation?",

      options: [
        {
          optionNumber: 1,
          text: "It builds trust and helps users understand decisions.",
          quality: 2,
          npcReply:
            "Exactly.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Transparency isn't important.",
          quality: 0,
          npcReply:
            "Trust requires openness.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Only employees should understand moderation.",
          quality: 1,
          npcReply:
            "Users deserve clarity too.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 8,

      npcDialogue:
        "Can education reduce misinformation more effectively than punishment?",

      options: [
        {
          optionNumber: 1,
          text: "Education creates long-term improvements while moderation handles immediate risks.",
          quality: 2,
          npcReply:
            "That's the strongest answer today.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Punishment alone solves everything.",
          quality: 0,
          npcReply:
            "Society is rarely that simple.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Education is useless.",
          quality: 1,
          npcReply:
            "Knowledge changes behavior.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 9,

      npcDialogue:
        "One last question before the final argument. What is the purpose of debate?",

      options: [
        {
          optionNumber: 1,
          text: "To discover better ideas through respectful disagreement.",
          quality: 2,
          npcReply:
            "I'm impressed.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "To embarrass your opponent.",
          quality: 0,
          npcReply:
            "That isn't debate.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "To prove you're always right.",
          quality: 1,
          npcReply:
            "Humility matters.",
          expression: "neutral",
        },
      ],
    },

    {
      turnNumber: 10,

      npcDialogue:
        "Final argument. Convince me in one sentence why balanced moderation is so difficult.",

      options: [
        {
          optionNumber: 1,
          text: "Because it must protect free expression, public safety, fairness, transparency, and accountability at the same time.",
          quality: 2,
          npcReply:
            "Outstanding... You've earned your victory.",
          expression: "panic",
        },
        {
          optionNumber: 2,
          text: "Because nobody knows what they're doing.",
          quality: 0,
          npcReply:
            "That's hardly a convincing conclusion.",
          expression: "smirk",
        },
        {
          optionNumber: 3,
          text: "Because everyone should simply agree.",
          quality: 1,
          npcReply:
            "Debate exists because disagreement exists.",
          expression: "neutral",
        },
      ],
    },
  ],

  completion: {
    victoryDialogue:
      "Congratulations. You defeated Aria. More importantly, you've learned that great debaters don't seek easy answers—they seek balanced ones.",

    defeatDialogue:
      "You fought well, but every defeat is another lesson. Return when you're ready.",

    rewards: {
      xp: 500,
      coins: 250,
      badge: "First Victory",
      unlockChapter: 2,
    },
  },
};

export default round10;