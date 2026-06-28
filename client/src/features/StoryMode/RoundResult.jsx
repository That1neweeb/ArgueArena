import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import storyService from "../../serviceLayer/storyService.js";
import "./RoundResult.css";

export default function RoundResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <div className="result-screen">
        <div className="result-card fallback-card">
          <div className="result-header">
            <div>
              <div className="result-title">No round result</div>
              <div className="result-subtitle">Return to the story map to continue.</div>
            </div>
          </div>
          <p className="fallback-text">No round result available.</p>
          <div className="result-actions">
            <button className="result-btn" onClick={() => navigate("/story", { replace: true })}>Back to map</button>
          </div>
        </div>
      </div>
    );
  }

  const {
    chapterId,
    roundNumber,
    roundScore,
    passingScore,
    bossRound,
    chapterTitle,
    passed,
    reward,
    earnedAchievements = [],
  } = state;

  const goNext = () => {
    if (!chapterId) {
      navigate("/story");
      return;
    }

    if (bossRound && passed) {
      navigate(`/story/chapter/${chapterId}/complete`, {
        state: { chapterId, chapterTitle, roundScore, reward, earnedAchievements },
      });
      return;
    }

    navigate(`/story/chapter/${chapterId}`, {
      replace: true,
      state: { chapterTitle },
    });
  };

  const handleTryAgain = async () => {
    if (!chapterId || !roundNumber) {
      navigate("/story");
      return;
    }

    setLoading(true);
    try {
      const roundResponse = await storyService.getRound(chapterId, roundNumber);
      const debateId = roundResponse.round?.debate?.id;

      if (debateId) {
        navigate(`/story/battle/${debateId}`, {
          replace: true,
          state: { chapterTitle, retryAt: Date.now() },
        });
      } else {
        navigate(`/story/chapter/${chapterId}`, {
          state: { chapterTitle },
        });
      }
    } catch (error) {
      navigate(`/story/chapter/${chapterId}`, {
        state: { chapterTitle },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="result-screen">
      <div className="result-card">
        <div className="result-header">
          <div>
            <div className="result-title">{passed ? "Victory" : "Defeat"}</div>
            <div className="result-subtitle">
              {chapterTitle ? `${chapterTitle} — ` : ""}Round {roundNumber}
              {bossRound ? " (Boss)" : ""}
            </div>
          </div>
          <div className="result-status">
            {passed ? "Mission Complete" : "Retry the round"}
          </div>
        </div>

        <div className="result-summary">
          <div className="result-row">
            <span>Score</span>
            <strong>{roundScore} / {passingScore}</strong>
          </div>
          <div className="result-row">
            <span>Round</span>
            <strong>{roundNumber}</strong>
          </div>
          <div className="result-row">
            <span>Stage</span>
            <strong>{bossRound ? "Boss" : "Standard"}</strong>
          </div>
        </div>

        <div className="result-reward-grid">
          <div className="reward-chip">
            <span>XP</span>
            <strong>{reward?.xp ?? "—"}</strong>
          </div>
          <div className="reward-chip">
            <span>Coins</span>
            <strong>{reward?.coins ?? "—"}</strong>
          </div>
          <div className="reward-chip">
            <span>Stars</span>
            <strong>{reward?.stars ?? "—"}</strong>
          </div>
        </div>

        {earnedAchievements.length > 0 && (
          <div className="result-achievements">
            <h3>Rewards & Achievements</h3>
            <ul className="achievement-list">
              {earnedAchievements.map((item) => (
                <li key={item.id || item.key}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="result-actions">
          <button className="result-btn" onClick={passed ? goNext : handleTryAgain}>
            {bossRound && passed ? "Chapter Complete" : passed ? "Next Round" : "Try Again"}
          </button>
          <button className="result-btn secondary" onClick={() => navigate("/story", { replace: true })}>
            Story Map
          </button>
        </div>
      </div>
    </div>
  );
}
