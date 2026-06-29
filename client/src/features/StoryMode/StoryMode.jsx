import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import ZigzagMap from "./ZigzagMap.jsx";
import "./StoryMode.css";

import { unlockAchievement } from "../Achievements/achievementManager";

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

        // ===============================
      // ADDED FOR ACHIEVEMENTS
      // Unlock the Welcome Challenger achievement
      // This only unlocks once because
      // achievementManager prevents duplicates.
      // ===============================
            unlockAchievement("welcome");

      } catch (err) {
        setError(err.message || "Unable to load story chapters.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const currentChapterId = useMemo(() => {
    const active = chapters.find(
      (ch) => ch.unlocked && !ch.progress?.chapterCompleted
    );
    return active?.id ?? null;
  }, [chapters]);

  const getNodeStatus = (chapter) => {
    if (!chapter.unlocked) return "locked";
    if (chapter.progress?.chapterCompleted) return "completed";
    if (chapter.id === currentChapterId) return "current";
    return "unlocked";
  };

  // Map chapters → ZigzagMap items
  const mapItems = useMemo(
    () =>
      chapters.map((chapter) => ({
        id: chapter.id,
        status: getNodeStatus(chapter),
        displayNumber: chapter.chapterNumber,
        label: chapter.title,
        _raw: chapter,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chapters, currentChapterId]
  );

  if (loading) {
    return (
      <div className="story-screen">
        <div className="story-header">
          <h1>Story Mode</h1>
          <p>Summoning the map…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-screen">
        <div className="story-header">
          <h1>Story Mode</h1>
          <p>{error}</p>
        </div>
        <div className="story-actions">
          <button className="story-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
          <button className="story-btn" onClick={() => navigate("/lobby")}>
            Back to lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="story-screen">
      <div className="story-header">
        <h1>Story Mode</h1>
        <p>Follow the path. Conquer each chapter of the arena.</p>
      </div>

      <div className="story-actions story-actions-top">
        <button className="story-btn" onClick={() => navigate("/story/profile")}>
          Profile
        </button>
        <button className="story-btn" onClick={() => navigate("/lobby")}>
          Back to lobby
        </button>
      </div>

      <ZigzagMap
        items={mapItems}
        onNodeClick={(item) => navigate(`/story/chapter/${item.id}`)}
        nodeClass="map-node"
        crestClass="node-crest"
        numberClass="node-number"
        labelClass="node-label"
        containerClass="map-container"
        svgClass="map-svg"
        nodesClass="map-nodes"
        rowClassLeft="map-row map-row--left"
        rowClassRight="map-row map-row--right"
      />
    </div>
  );
}