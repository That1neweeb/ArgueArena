import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import "./StoryMode.css";
import { dispatchAchievementPopups } from "../Achievements/achievementManager";

export default function ChapterComplete() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const finish = async () => {
      try {
        const response = await storyService.finishChapter(chapterId);
        void dispatchAchievementPopups(response?.earnedAchievements || []);
        setResult({ ...response, ...state });
      } catch (err) {
        setError(err.message || "Unable to finish chapter.");
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) finish();
  }, [chapterId, state]);

  if (loading) {
    return <div className="story-screen">Completing chapter...</div>;
  }

  if (error) {
    return (
      <div className="story-screen">
        <p>{error}</p>
        <button className="story-btn" onClick={() => navigate("/story")}>
          Back to map
        </button>
      </div>
    );
  }

  const chapter = result?.chapter;
  const nextChapter = result?.nextChapter;

  return (
    <div className="story-screen">
      <div className="story-header">
        <h1>Chapter Complete</h1>
        <p>{chapter?.title || state?.chapterTitle}</p>
      </div>

      <div className="story-panel">
        <p className="story-intro">
          You defeated {chapter?.npc?.name || "your opponent"} and cleared this
          chapter of Story Mode.
        </p>
        {nextChapter && (
          <div className="story-stat-row">
            <span>Next chapter unlocked</span>
            <strong>{nextChapter.title}</strong>
          </div>
        )}
        {!nextChapter && (
          <div className="story-stat-row">
            <span>Status</span>
            <strong>All chapters cleared</strong>
          </div>
        )}
        {result?.earnedAchievements?.length > 0 && (
          <div className="result-achievements">
            <h3>Achievements</h3>
            <ul>
              {result.earnedAchievements.map((item) => (
                <li key={item.id || item.key}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="story-actions">
        {nextChapter && (
          <button
            className="story-btn"
            onClick={() => navigate(`/story/chapter/${nextChapter.id}`)}
          >
            Start next chapter
          </button>
        )}
        <button className="story-btn" onClick={() => navigate("/story")}>
          Story map
        </button>
      </div>
    </div>
  );
}
