import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Howl, Howler } from "howler";
import "./Battle.css";
import battleBg from "./images/battle-bg.png";

import npcIdle from "./images/npc-idle.png";
import npcPanic from "./images/npc-panic.png";
import npcNeutral from "./images/npc-neutral.png";
import npcSmirk from "./images/npc-smirk.png";
import playerImg from "./images/player.png";
import storyService from "../../serviceLayer/storyService.js"

// Achievement & Progress System
import {
  defeatBoss,
  completeStage,
} from "../../gameData/playerProgress";

import { unlockAchievement } from "../Achievements/achievementManager";

// ── SOUNDS ────────────────────────────────────────────────────────────────
const sounds = {
  battleBgm: new Howl({
    src: ["/sounds/battle-bgm.mp3"],
    loop: true,
    volume: 0.35,
  }),
  optionHover: new Howl({
    src: ["/sounds/hover.mp3"],
    volume: 0.25,
  }),
  optionClick: new Howl({
    src: ["/sounds/click.mp3"],
    volume: 0.5,
  }),
  correctAnswer: new Howl({
    src: ["/sounds/correct.mp3"],
    volume: 0.6,
  }),
  wrongAnswer: new Howl({
    src: ["/sounds/wrong.mp3"],
    volume: 0.55,
  }),
  victory: new Howl({
    src: ["/sounds/victory.mp3"],
    volume: 0.7,
  }),
  defeat: new Howl({
    src: ["/sounds/defeat.mp3"],
    volume: 0.7,
  }),
};

const moodMap = {
  0: "smirk",
  1: "neutral",
  2: "panic",
};

const REPLY_DELAY_MS = 1800;

export default function BattleScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const advanceTimer = useRef(null);

  const [turnNumber, setTurnNumber] = useState(1);
  const [turn, setTurn] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundInfo, setRoundInfo] = useState(null);
  const [chapterTitle, setChapterTitle] = useState(location.state?.chapterTitle || "");
  const [npcMood, setNpcMood] = useState("idle");
  const [npcName, setNpcName] = useState("Opponent");
  const [dialogue, setDialogue] = useState("Loading debate...");
  const [dialoguePhase, setDialoguePhase] = useState("question");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isResolving, setIsResolving] = useState(false);
  const [isTurnTransition, setIsTurnTransition] = useState(false);
  const [error, setError] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [muted, setMuted] = useState(false);

  const npcImage = {
    idle: npcIdle,
    panic: npcPanic,
    neutral: npcNeutral,
    smirk: npcSmirk,
  }[npcMood] || npcIdle;

  const roundNumber = roundInfo?.roundNumber ?? "—";
  const xpDisplay = score * 8;

  // ── BGM: start on mount, stop on unmount ──────────────────────────────
  useEffect(() => {
    sounds.battleBgm.play();
    return () => {
      sounds.battleBgm.stop();
    };
  }, []);

  // ── MUTE toggle ───────────────────────────────────────────────────────
 const toggleMute = () => {
  if (muted) {
    sounds.battleBgm.volume(0.35);
  } else {
    sounds.battleBgm.volume(0);
  }
  setMuted(!muted);
};

  // ── EXIT ──────────────────────────────────────────────────────────────
  const handleExitBattle = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    sounds.battleBgm.stop();
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    navigate("/story");
  };

  // ── FETCH TURN ────────────────────────────────────────────────────────
  const fetchTurn = async (debateId, currentTurn, { fullScreen = false } = {}) => {
    try {
      if (fullScreen) setLoading(true);
      else setIsTurnTransition(true);

      setNpcMood("idle");
      const response = await storyService.getTurn(debateId, currentTurn);
      const turnData = response.turn || null;
      const optionData = Array.isArray(response.options) ? response.options : [];

      setTurn(turnData);
      setOptions(optionData);
      setRoundInfo({
        chapterId: response.chapterId,
        roundNumber: response.roundNumber,
        bossRound: response.bossRound,
        numberOfTurns: response.numberOfTurns,
        passingScore: response.passingScore,
      });
      setDialogue(turnData?.npcDialogue || "Choose your argument.");
      setDialoguePhase("question");
      setNpcName(response.npc?.name || "Opponent");

      if (!chapterTitle && response.chapterId && response.roundNumber) {
        const roundData = await storyService.getRound(
          response.chapterId,
          response.roundNumber
        );
        setChapterTitle(roundData.round?.chapter?.title || "");
      }
    } catch (err) {
      setError(err.message || "Unable to load turn.");
    } finally {
      if (fullScreen) setLoading(false);
      else setIsTurnTransition(false);
    }
  };

  const battleSession = location.state?.retryAt ?? location.key;

  useEffect(() => {
    if (!id) return;
    setTurnNumber(1);
    setScore(0);
    setError("");
    setNpcMood("idle");
    fetchTurn(id, 1, { fullScreen: true });
  }, [id, battleSession]);

  useEffect(() => {
    if (!id || turnNumber === 1) return;
    fetchTurn(id, turnNumber);
  }, [turnNumber]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  // ── CHOOSE OPTION ─────────────────────────────────────────────────────
  const chooseOption = async (option) => {
    if (!turn || !roundInfo || isResolving || isTurnTransition) return;

    sounds.optionClick.play();
    setIsResolving(true);

    try {
      const result = await storyService.submitTurn(turn.id, option.optionNumber);
      const nextScore = score + (result.earnedScore || 0);
      const maxPossibleScore = roundInfo.numberOfTurns * 2;
      const scorePercentage = (nextScore / maxPossibleScore) * 100;

      // Play correct / wrong SFX
      const quality = result.quality ?? 1;
      if (quality === 2) {
        sounds.correctAnswer.play();
      } else if (quality === 0) {
        sounds.wrongAnswer.play();
      }

      if (scorePercentage >= 90) {
        unlockAchievement("critical");
      }

      setScore(nextScore);
      setNpcMood(result.expression || moodMap[result.quality] || "neutral");
      setDialogue(result.npcReply || "Your argument lands.");
      setDialoguePhase("reply");

      const nextTurn = turnNumber + 1;
      const isLastTurn = nextTurn > roundInfo.numberOfTurns;

      await new Promise((resolve) => {
        advanceTimer.current = setTimeout(resolve, REPLY_DELAY_MS);
      });

      if (isLastTurn) {
        const finishResult = await storyService.finishRound(
          roundInfo.chapterId,
          roundInfo.roundNumber,
          nextScore,
          roundInfo.passingScore,
          roundInfo.bossRound
        );

        // Stop BGM then play result sting
        sounds.battleBgm.stop();
        if (finishResult.passed) {
          sounds.victory.play();
          completeStage(roundInfo.chapterId);
          defeatBoss();
        } else {
          sounds.defeat.play();
        }

        navigate("/story/round-result", {
          state: {
            chapterId: roundInfo.chapterId,
            roundNumber: roundInfo.roundNumber,
            roundScore: nextScore,
            passingScore: roundInfo.passingScore,
            bossRound: roundInfo.bossRound,
            chapterTitle,
            passed: finishResult.passed,
            reward: finishResult.reward,
            earnedAchievements: finishResult.earnedAchievements || [],
          },
        });
      } else {
        setTurnNumber(nextTurn);
      }
    } catch (err) {
      setError(err.message || "Unable to submit turn.");
    } finally {
      setIsResolving(false);
    }
  };

  // ── EXIT MODAL (reusable) ─────────────────────────────────────────────
  const ExitModal = () => (
    <div className="exit-overlay">
      <div className="exit-modal">
        <p className="exit-title">Exit Battle?</p>
        <p className="exit-sub">Your current progress will be lost.</p>
        <div className="exit-actions">
          <button className="exit-btn exit-btn--cancel" onClick={() => setShowExitConfirm(false)}>
            Keep Fighting
          </button>
          <button className="exit-btn exit-btn--confirm" onClick={confirmExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );

  // ── LOADING ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="battle-screen battle-screen--status" style={{ backgroundImage: `url(${battleBg})` }}>
        <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
          ← Exit Battle
        </button>
        <div className="battle-status-message">Loading battle...</div>
        {showExitConfirm && <ExitModal />}
      </div>
    );
  }

  // ── ERROR ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="battle-screen battle-screen--status" style={{ backgroundImage: `url(${battleBg})` }}>
        <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
          ← Exit Battle
        </button>
        <div className="battle-status-message">{error}</div>
        {showExitConfirm && <ExitModal />}
      </div>
    );
  }

  const npcRole = roundInfo?.bossRound ? "Boss" : "Debater";
  const dialogueHeader = dialoguePhase === "reply" ? `${npcName} responds` : npcName;

  // ── MAIN RENDER ───────────────────────────────────────────────────────
  return (
    <div className="battle-screen" style={{ backgroundImage: `url(${battleBg})` }}>

      {/* Exit button */}
      <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
        ← Exit Battle
      </button>

      {/* Mute button */}
      <button type="button" className="battle-mute-btn" onClick={toggleMute}>
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="battle-layout">

        {/* HUD */}
        <header className="battle-hud">
          <div className="hud-cluster hud-cluster--left">
            <span className="hud-chip hud-chip--accent">{npcName}</span>
            <span className="hud-chip">Round {roundNumber}</span>
            <span className="hud-chip">Turn {turnNumber}</span>
          </div>
          <div className="hud-cluster hud-cluster--right">
            <span className="hud-chip">
              Score <strong>{score}</strong>
            </span>
            <span className="hud-chip">
              XP <strong>{xpDisplay}</strong>
            </span>
            <span className="hud-chip">
              Coins <strong>—</strong>
            </span>
          </div>
        </header>

        {/* Battle field */}
        <main className="poke-field">

          {/* NPC combat card */}
          <article className="combat-card combat-card--enemy">
            <div className="combat-portrait combat-portrait--enemy">
              <img src={npcImage} alt={npcName} />
            </div>
            <div className="combat-stats">
              <span className="combat-name">{npcName}</span>
              <span className="combat-role">{npcRole}</span>
            </div>
          </article>

          {/* NPC sprite */}
          <div className="sprite-zone sprite-zone--enemy">
            <div className="sprite-glow sprite-glow--enemy" aria-hidden="true" />
            <img
              className={`battle-sprite battle-sprite--enemy mood-${npcMood}`}
              src={npcImage}
              alt={npcName}
            />
          </div>

          {/* Player sprite */}
          <div className="sprite-zone sprite-zone--player">
            <div className="sprite-glow sprite-glow--player" aria-hidden="true" />
            <img
              className="battle-sprite battle-sprite--player"
              src={playerImg}
              alt="Player"
            />
          </div>

          {/* Player combat card */}
          <article className="combat-card combat-card--player">
            <div className="combat-portrait combat-portrait--player">
              <img src={playerImg} alt="Player" />
            </div>
            <div className="combat-stats">
              <span className="combat-name">You</span>
              <span className="combat-score">Score {score}</span>
            </div>
          </article>

        </main>

        {/* Bottom menu */}
        <footer className="poke-menu">
          <div className="poke-menu-grid">

            {/* Dialogue box */}
            <div className={`dialogue-box ${isTurnTransition ? "dialogue-box--loading" : ""}`}>
              <div className="dialogue-header">{dialogueHeader}</div>
              <p className="dialogue-text" key={`${dialoguePhase}-${dialogue}`}>
                {dialogue}
              </p>
              {(isResolving || isTurnTransition) && (
                <div className="dialogue-status">
                  {isResolving ? "Awaiting response..." : "Next turn..."}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="options-panel">
              {options.length > 0 ? (
                options.map((option) => (
                  <button
                    key={option.id ?? option.optionNumber}
                    className="option-btn"
                    disabled={isResolving || isTurnTransition}
                    onMouseEnter={() => sounds.optionHover.play()}
                    onClick={() => chooseOption(option)}
                  >
                    <span className="option-text">{option.text}</span>
                  </button>
                ))
              ) : (
                <div className="option-btn option-btn--empty">
                  No debate options available.
                </div>
              )}
            </div>

          </div>
        </footer>
      </div>

      {/* Exit confirm modal */}
      {showExitConfirm && <ExitModal />}

    </div>
  );
}