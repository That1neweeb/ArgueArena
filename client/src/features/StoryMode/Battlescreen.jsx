import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Battle.css";
import battleBg from "./images/battle-bg.png";

import npcIdle from "./images/npc-idle.png";
import npcPanic from "./images/npc-panic.png";
import npcNeutral from "./images/npc-neutral.png";
import npcSmirk from "./images/npc-smirk.png";
import playerImg from "./images/player.png";
import storyService from "../../serviceLayer/storyService.js";

const moodMap = {
  0: "smirk",
  1: "neutral",
  2: "panic",
};

const OPTION_MARKS = ["①", "②", "③"];
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

  const npcImage = {
    idle: npcIdle,
    panic: npcPanic,
    neutral: npcNeutral,
    smirk: npcSmirk,
  }[npcMood] || npcIdle;

  const roundNumber = roundInfo?.roundNumber ?? "—";
  const xpDisplay = score * 8;

  const handleExitBattle = () => {
    const confirmed = window.confirm(
      "Exit this battle? Unsaved progress for this round will be lost."
    );
    if (confirmed) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      navigate("/story");
    }
  };

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

  const chooseOption = async (option) => {
    if (!turn || !roundInfo || isResolving || isTurnTransition) return;

    setIsResolving(true);
    try {
      const result = await storyService.submitTurn(turn.id, option.optionNumber);
      const nextScore = score + (result.earnedScore || 0);
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

  if (loading) {
    return (
      <div className="battle-screen battle-screen--status" style={{ backgroundImage: `url(${battleBg})` }}>
        <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
          ← Exit Battle
        </button>
        <div className="battle-status-message">Loading battle...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="battle-screen battle-screen--status" style={{ backgroundImage: `url(${battleBg})` }}>
        <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
          ← Exit Battle
        </button>
        <div className="battle-status-message">{error}</div>
      </div>
    );
  }

  const npcRole = roundInfo?.bossRound ? "Boss" : "Debater";
  const dialogueHeader =
    dialoguePhase === "reply" ? `${npcName} responds` : npcName;

  return (
    <div className="battle-screen" style={{ backgroundImage: `url(${battleBg})` }}>
      <button type="button" className="battle-exit-btn" onClick={handleExitBattle}>
        ← Exit Battle
      </button>

      <div className="battle-layout">
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

        <main className="poke-field">
          <article className="combat-card combat-card--enemy">
            <div className="combat-portrait combat-portrait--enemy">
              <img src={npcImage} alt={npcName} />
            </div>
            <div className="combat-stats">
              <span className="combat-name">{npcName}</span>
              <span className="combat-role">{npcRole}</span>
            </div>
          </article>

          <div className="sprite-zone sprite-zone--enemy">
            <div className="sprite-glow sprite-glow--enemy" aria-hidden="true" />
            <img
              className={`battle-sprite battle-sprite--enemy mood-${npcMood}`}
              src={npcImage}
              alt={npcName}
            />
          </div>

          <div className="sprite-zone sprite-zone--player">
            <div className="sprite-glow sprite-glow--player" aria-hidden="true" />
            <img
              className="battle-sprite battle-sprite--player"
              src={playerImg}
              alt="Player"
            />
          </div>

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

        <footer className="poke-menu">
          <div className="poke-menu-grid">
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

            <div className="options-panel">
              {options.length > 0 ? (
                options.map((option) => (
                  <button
                    key={option.id ?? option.optionNumber}
                    className="option-btn"
                    disabled={isResolving || isTurnTransition}
                    onClick={() => chooseOption(option)}
                  >
                    <span className="option-num">
                      {OPTION_MARKS[option.optionNumber - 1] || option.optionNumber}
                    </span>
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
    </div>
  );
}
