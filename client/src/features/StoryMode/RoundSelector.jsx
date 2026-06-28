import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import "./StoryMode.css";

export default function RoundSelector() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const roundLoads = await Promise.all(
          Array.from({ length: 10 }, (_, i) =>
            storyService.getRound(chapterId, i + 1)
          )
        );

        const first = roundLoads[0]?.round;
        if (!first?.chapter) throw new Error("Chapter not found.");

        setChapter({ ...first.chapter, progress: first.progress });
        setRounds(
          roundLoads.map((entry, index) => ({
            roundNumber: index + 1,
            title:
              index === 9
                ? "Boss Battle"
                : [
                    "Opening Statements",
                    "Core Arguments",
                    "Evidence and Data",
                    "Counterpoints",
                    "Ethical Dimensions",
                    "Public Policy",
                    "Economic Impact",
                    "Rebuttal Round",
                    "Final Push",
                  ][index],
            debateId: entry?.round?.debate?.id,
            bossRound: entry?.round?.debate?.bossRound,
            passingScore: entry?.round?.debate?.passingScore,
          }))
        );
      } catch (err) {
        setError(err.message || "Unable to load rounds.");
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) load();
  }, [chapterId]);

  if (loading) {
    return <div className="story-screen">Loading rounds...</div>;
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
        <h1>{chapter?.title}</h1>
        <p>{chapter?.topic}</p>
        {chapter?.description && (
          <p className="story-intro">{chapter.description}</p>
        )}
      </div>

      <div className="chapter-grid">
        {rounds.map((round) => {
          const unlocked = round.roundNumber <= (chapter?.progress?.currentRound || 1);
          return (
            <button
              key={round.roundNumber}
              className={`chapter-card ${unlocked ? "unlocked" : "locked"}`}
              disabled={!unlocked || !round.debateId}
              onClick={() =>
                navigate(`/story/battle/${round.debateId}`, {
                  state: { chapterTitle: chapter?.title },
                })
              }
            >
              <div className="chapter-number">
                Round {round.roundNumber}
                {round.bossRound ? " • Boss" : ""}
              </div>
              <div className="chapter-title">{round.title}</div>
              <div className="chapter-meta">
                {unlocked ? "Enter debate" : "Locked"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="story-actions">
        <button className="story-btn" onClick={() => navigate("/story")}>
          Back to map
        </button>
        <button className="story-btn" onClick={() => navigate("/story/profile")}>
          Profile
        </button>
      </div>
    </div>
  );
}
