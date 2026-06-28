import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import "./StoryMode.css";

export default function StoryProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, achievementsRes] = await Promise.all([
          storyService.getProfile(),
          storyService.getAchievements(),
        ]);
        setProfile(profileRes.profile);
        setAchievements(achievementsRes.achievements || []);
      } catch (err) {
        setError(err.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="story-screen">Loading profile...</div>;
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

  return (
    <div className="story-screen">
      <div className="story-header">
        <h1>Story Profile</h1>
        <p>Your progress across the arena campaign.</p>
      </div>

      <div className="story-panel">
        <div className="story-stat-row">
          <span>XP</span>
          <strong>{profile?.xp ?? 0}</strong>
        </div>
        <div className="story-stat-row">
          <span>Coins</span>
          <strong>{profile?.coins ?? 0}</strong>
        </div>
        <div className="story-stat-row">
          <span>Stars</span>
          <strong>{profile?.stars ?? 0}</strong>
        </div>
        <div className="story-stat-row">
          <span>Unlocked chapters</span>
          <strong>{(profile?.unlockedChapters || []).join(", ") || "1"}</strong>
        </div>
      </div>

      {achievements.length > 0 && (
        <div className="story-panel">
          <h3 className="story-heading">Achievements</h3>
          <ul className="story-achievement-list">
            {achievements.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="story-actions">
        <button className="story-btn" onClick={() => navigate("/story")}>
          Back to map
        </button>
      </div>
    </div>
  );
}
