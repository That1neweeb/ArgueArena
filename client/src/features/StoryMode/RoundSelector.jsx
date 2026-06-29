import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import storyService from "../../serviceLayer/storyService.js";
import ZigzagMap from "./ZigzagMap.jsx";
import "./StoryMode.css";

const ROUND_TITLES = [
  "Opening Statements",
  "Core Arguments",
  "Evidence & Data",
  "Counterpoints",
  "Ethical Dimensions",
  "Public Policy",
  "Economic Impact",
  "Rebuttal Round",
  "Final Push",
  "Boss Battle",
];

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
            title: ROUND_TITLES[index],
            debateId: entry?.round?.debate?.id,
            bossRound: entry?.round?.debate?.bossRound ?? false,
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

  // Derive per-round status from chapter progress
  const getRoundStatus = (round) => {
    const currentRound = chapter?.progress?.currentRound ?? 1;
    if (round.roundNumber < currentRound) return "completed";
    if (round.roundNumber === currentRound) return "current";
    if (round.roundNumber <= currentRound) return "unlocked";
    return "locked";
  };

  // Map rounds → ZigzagMap items
  const roundItems = rounds.map((round) => ({
    id: round.roundNumber,
    status: getRoundStatus(round),
    displayNumber: round.roundNumber,
    label: round.title,
    sublabel: round.bossRound ? "Boss" : null,
    disabled: !round.debateId,
    _raw: round,
  }));

  if (loading) {
    return (
      <div className="story-screen">
        <div className="story-header">
          <h1>Loading…</h1>
          <p>Preparing your rounds.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-screen">
        <div className="story-header">
          <h1>Chapter not found</h1>
          <p>{error}</p>
        </div>
        <div className="story-actions">
          <button className="story-btn" onClick={() => navigate("/story")}>
            Back to map
          </button>
        </div>
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

      <div className="story-actions story-actions-top">
        <button className="story-btn" onClick={() => navigate("/story")}>
          Back to map
        </button>
        <button className="story-btn" onClick={() => navigate("/story/profile")}>
          Profile
        </button>
      </div>

      <ZigzagMap
        items={roundItems}
        onNodeClick={(item) =>
          navigate(`/story/battle/${item._raw.debateId}`, {
            state: { chapterTitle: chapter?.title },
          })
        }
        nodeClass="round-node"
        crestClass="round-crest"
        numberClass="round-number"
        labelClass="round-label"
        containerClass="rounds-container"
        svgClass="rounds-svg"
        nodesClass="rounds-nodes"
        rowClassLeft="map-row map-row--left"
        rowClassRight="map-row map-row--right"
        renderBadge={(item) =>
          item._raw?.bossRound ? (
            <span className="round-boss-star" aria-hidden="true">
              ★ BOSS
            </span>
          ) : null
        }
      />
    </div>
  );
}