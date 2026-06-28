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
  const playerConfidence = roundInfo
    ? Math.min(100, Math.max(0, Math.round((score / ((roundInfo.numberOfTurns || 10) * 2)) * 100)))
    : 50;
  const npcConfidence = Math.min(100, Math.max(0, 100 - playerConfidence));
  const xpDisplay = score * 8;
  const playerLevel = Math.max(1, Math.floor(score / 4) + 1);
  const npcLevel = roundInfo?.bossRound
    ? Math.max(1, Number(roundNumber) || 1) + 2
    : Math.max(1, Number(roundNumber) || 1);

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
        <div className="battle-status-message">Loading battle...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="battle-screen battle-screen--status" style={{ backgroundImage: `url(${battleBg})` }}>
        <div className="battle-status-message">{error}</div>
      </div>
    );
  }

  const npcRole = roundInfo?.bossRound ? "Boss" : "Debater";
  const dialogueHeader =
    dialoguePhase === "reply" ? `${npcName} responds` : npcName;

  return (
    <div className="battle-screen" style={{ backgroundImage: `url(${battleBg})` }}>
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
              <div className="combat-header">
                <span className="combat-name">{npcName}</span>
                <span className="combat-role">{npcRole}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Confidence</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill--enemy"
                    style={{ width: `${npcConfidence}%` }}
                  />
                </div>
              </div>
              <div className="combat-meta">
                <span>Lv. {npcLevel}</span>
                <span>Score —</span>
                <span>XP —</span>
              </div>
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
              <div className="combat-header">
                <span className="combat-name">You</span>
                <span className="combat-role">Debater</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Confidence</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill--player"
                    style={{ width: `${playerConfidence}%` }}
                  />
                </div>
              </div>
              <div className="combat-meta">
                <span>Lv. {playerLevel}</span>
                <span>Score {score}</span>
                <span>XP {xpDisplay}</span>
              </div>
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
