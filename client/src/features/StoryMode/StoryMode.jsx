import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import "./StoryMode.css";

export default function StoryMode() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await storyService.getChapters();
        setChapters(response.chapters || []);
      } catch (err) {
        setError(err.message || "Unable to load story chapters.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="story-screen">Loading story map...</div>;
  }

  if (error) {
    return <div className="story-screen">{error}</div>;
  }

  return (
    <div className="story-screen">
      <div className="story-header">
        <h1>Story Mode</h1>
        <p>Choose a chapter and take on the arena.</p>
      </div>

      <div className="story-actions story-actions-top">
        <button className="story-btn" onClick={() => navigate("/story/profile")}>
          Profile
        </button>
        <button className="story-btn" onClick={() => navigate("/lobby")}>
          Back to lobby
        </button>
      </div>

      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            className={`chapter-card ${chapter.unlocked ? "unlocked" : "locked"}`}
            disabled={!chapter.unlocked}
            onClick={() => navigate(`/story/chapter/${chapter.id}`)}
          >
            <div className="chapter-number">Chapter {chapter.chapterNumber}</div>
            <div className="chapter-title">{chapter.title}</div>
            <div className="chapter-topic">{chapter.topic}</div>
            <div className="chapter-meta">
              {chapter.unlocked ? "Enter the arena" : "Locked"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
