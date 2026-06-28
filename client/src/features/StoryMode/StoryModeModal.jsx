import { useState } from 'react';
import './StoryModeModal.css';

const STAGES = {
  1: {
    npc: 'Aria',
    avatar: '👩‍⚖️',
    topic: 'Social media does more harm than good',
    dialogues: [
      'Welcome to The Commons! I\'m Aria. Let\'s start with something everyone has an opinion on...',
      'Interesting choice! But can you back it up with real arguments?',
      'I see you\'ve made your decision. Defend it well!',
    ],
    options: [
      'It creates echo chambers and fuels misinformation',
      'It connects communities and democratizes information',
      'Its impact depends entirely on the individual user',
    ],
  },
  2: {
    npc: 'Commander Rex',
    avatar: '🧑‍💼',
    topic: 'Nuclear energy is essential for climate goals',
    dialogues: [
      'The Forum demands sharper arguments. I\'m Commander Rex — impress me.',
      'You\'ve stepped into dangerous territory. The evidence better be solid.',
      'Bold stance. The jury won\'t make it easy for you.',
    ],
    options: [
      'Nuclear is the only scalable zero-carbon baseload option we have',
      'Renewables plus storage can achieve the same goals more safely',
      'We need both — a mixed energy grid is the only realistic path',
    ],
  },
  3: {
    npc: 'Dr. Vale',
    avatar: '🧑‍🔬',
    topic: 'AI will replace most human jobs',
    dialogues: [
      'The Apex demands precision. I\'m Dr. Vale. Show me your reasoning.',
      'Compelling, but is it grounded in evidence?',
      'That\'s bold. Can you defend it logically?',
    ],
    options: [
      'History shows technology creates new jobs faster than it destroys old ones',
      'Automation will devastate job markets without major policy intervention',
      'The answer depends on how we choose to implement AI technology',
    ],
  },
  4: {
    npc: 'Senator Vale',
    avatar: '👔',
    topic: 'Universal Basic Income is economically viable',
    dialogues: [
      'Welcome to The Assembly. I\'m Senator Vale. Policy matters here.',
      'Interesting angle. What\'s your evidence?',
      'A bold claim. The numbers must support it.',
    ],
    options: [
      'Pilot programs show promise; it reduces poverty and bureaucracy',
      'The tax burden and inflation risk make it impractical',
      'We need a hybrid approach combining UBI with targeted assistance',
    ],
  },
  5: {
    npc: 'Professor Sage',
    avatar: '🧑‍🎓',
    topic: 'Ethics in AI development should be regulated by law',
    dialogues: [
      'The Symposium values critical thinking. I\'m Professor Sage.',
      'That\'s a thoughtful position. But what about counterarguments?',
      'Bold stance. How would you implement that?',
    ],
    options: [
      'Legal frameworks ensure accountability and protect society from harm',
      'Self-regulation and industry standards are more effective and flexible',
      'We need collaborative governance combining law with industry input',
    ],
  },
  6: {
    npc: 'Ambassador Zere',
    avatar: '🌍',
    topic: 'International cooperation on climate change is essential',
    dialogues: [
      'Welcome to The Arena, challenger. I\'m Ambassador Zere.',
      'A compelling argument. But can you face opposition?',
      'Strong words. Now defend them.',
    ],
    options: [
      'No single nation can solve climate change alone; cooperation is survival',
      'National interests and sovereignty should take priority',
      'Both approaches are needed; balance local action with global coordination',
    ],
  },
  7: {
    npc: 'Crisis Coordinator',
    avatar: '🚨',
    topic: 'Crisis management requires transparent communication',
    dialogues: [
      'The Council only accepts solid reasoning. I\'m the Crisis Coordinator.',
      'Interesting take. Does it hold under pressure?',
      'That\'s a critical decision. Justify it.',
    ],
    options: [
      'Transparency prevents panic and builds public trust in leadership',
      'Limited information prevents misinformation during crises',
      'Selective transparency balances information with operational needs',
    ],
  },
  8: {
    npc: 'Master Orator',
    avatar: '🎤',
    topic: 'Persuasion without deception is always possible',
    dialogues: [
      'The Parliament demands mastery. I\'m the Master Orator.',
      'Eloquent. But can you sustain that argument?',
      'Impressive. Now prove it.',
    ],
    options: [
      'Truth and compelling rhetoric can be one and the same',
      'Some truths are too nuanced to persuade without simplification',
      'The best persuasion combines honest facts with strategic framing',
    ],
  },
  9: {
    npc: 'The Champion',
    avatar: '🏆',
    topic: 'What defines a truly compelling argument?',
    dialogues: [
      'Welcome to The Odyssey. I am The Champion. Show me your mastery.',
      'Insightful. Can you go deeper?',
      'Remarkable. This is the test that matters.',
    ],
    options: [
      'Evidence, logic, and emotional resonance combined with integrity',
      'Winning the audience, regardless of the underlying truth',
      'Adapting your message to connect with your specific audience',
    ],
  },
};

const LEVEL_NAMES = [
  { name: 'THE COMMONS', subtitle: 'Intro Debate' },
  { name: 'THE FORUM', subtitle: 'Advanced Topics' },
  { name: 'THE APEX', subtitle: 'Strategic Clash' },
  { name: 'THE ASSEMBLY', subtitle: 'Policy Debate' },
  { name: 'THE SYMPOSIUM', subtitle: 'Ethics & Tech' },
  { name: 'THE ARENA', subtitle: 'Global Debate' },
  { name: 'THE COUNCIL', subtitle: 'Crisis Response' },
  { name: 'THE PARLIAMENT', subtitle: 'Persuasion Mastery' },
  { name: 'THE ODYSSEY', subtitle: 'Final Summit' },
];

export default function StoryModeModal({ onClose }) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [currentStage, setCurrentStage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const openStage = (n) => {
    if (n > unlockedLevel) {
      alert(`🔒 Complete Stage ${n - 1} to unlock this stage!`);
      return;
    }
    setCurrentStage(n);
    setSelectedOption(null);
  };

  const closeStageModal = () => {
    setCurrentStage(null);
    setSelectedOption(null);
  };

  const selectOption = (idx) => {
    setSelectedOption(idx);
  };

  const completeStage = () => {
    if (unlockedLevel < 9) {
      setUnlockedLevel(unlockedLevel + 1);
    }
    closeStageModal();
  };

  // FULL-PAGE BATTLE ENVIRONMENT when stage is selected
  if (currentStage) {
    const stage = STAGES[currentStage];
    const level = LEVEL_NAMES[currentStage - 1];

    return (
      <div className="stage-battle-page">
        <button className="battle-back-btn" onClick={closeStageModal}>
          ← BACK TO MAP
        </button>

        <div className="battle-title">{level.name}</div>
        <p style={{ color: 'rgba(255, 243, 224, 0.5)', marginBottom: '28px', fontSize: '0.85rem' }}>
          {level.subtitle}
        </p>

        {/* Battle arena area - could expand with 3D environment later */}
        <div className="stage-card">
          <div className="npc-area">
            <div className="npc-avatar">{stage.avatar}</div>
            <div className="npc-dialogue-box">
              <div className="npc-name">{stage.npc.toUpperCase()}</div>
              <div id="npc-dialogue">
                {selectedOption !== null
                  ? stage.dialogues[selectedOption]
                  : stage.dialogues[0]}
              </div>
            </div>
          </div>

          <div className="modal-topic">{`TOPIC: ${stage.topic}`}</div>

          <div className="options-label">Choose your argument</div>

          {stage.options.map((opt, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedOption === idx ? 'selected' : ''}`}
              onClick={() => selectOption(idx)}
            >
              {opt}
            </button>
          ))}

          {selectedOption !== null && (
            <button className="complete-btn" onClick={completeStage}>
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }

  // CENTERED MODAL for stage selection (like HTP)
  return (
    <div className="story-modal-overlay active">
      <div className="story-modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="page-title">STORY MODE</div>
        <p className="map-subtitle">Choose your stage</p>

        <div className="story-map-container">
          {LEVEL_NAMES.map((level, idx) => {
            const levelNum = idx + 1;
            const unlocked = levelNum <= unlockedLevel;
            const isLast = idx === LEVEL_NAMES.length - 1;

            return (
              <div key={levelNum} className="stage-wrapper">
                <button
                  className={`stage-node ${unlocked ? '' : 'locked'}`}
                  onClick={() => openStage(levelNum)}
                  disabled={!unlocked}
                >
                  {unlocked ? levelNum : '🔒'}
                </button>

                <div className="stage-label">
                  {level.name}
                  <br />
                  <small>
                    {unlocked ? level.subtitle : `Unlock Stage ${levelNum - 1} first`}
                  </small>
                </div>

                {!isLast && <div className="connector-line" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
