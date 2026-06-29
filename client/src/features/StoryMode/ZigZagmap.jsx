import { useRef, useEffect, useState } from "react";

/**
 * ZigzagMap — shared node-path layout for StoryMode and RoundSelector.
 *
 * Props:
 *   items        — array of objects with at minimum { id, status, label, sublabel? }
 *   onNodeClick  — (item) => void
 *   nodeSize     — base px size of a normal node (default 88)
 *   currentSize  — px size of the current node (default 108)
 *   renderBadge  — (item) => ReactNode   optional extra badge inside crest
 *   nodeClass    — CSS class prefix for nodes ("map-node" | "round-node")
 *   crestClass   — CSS class prefix for crests ("node-crest" | "round-crest")
 *   numberClass  — class for the big number ("node-number" | "round-number")
 *   labelClass   — class for the label ("node-label" | "round-label")
 *   containerClass — outer div class
 *   svgClass     — svg class
 *   nodesClass   — nodes wrapper class
 *   rowClassLeft — class for left-aligned row
 *   rowClassRight— class for right-aligned row
 */
export default function ZigzagMap({
  items = [],
  onNodeClick,
  nodeSize = 88,
  currentSize = 108,
  renderBadge,
  nodeClass = "map-node",
  crestClass = "node-crest",
  numberClass = "node-number",
  labelClass = "node-label",
  containerClass = "map-container",
  svgClass = "map-svg",
  nodesClass = "map-nodes",
  rowClassLeft = "map-row map-row--left",
  rowClassRight = "map-row map-row--right",
}) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [paths, setPaths] = useState({ track: "", glow: "" });
  const [beadProgress, setBeadProgress] = useState(0);
  const [beadPos, setBeadPos] = useState(null);
  const svgRef = useRef(null);

  // Build SVG bezier path between node centres after layout
  useEffect(() => {
    const recalc = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centres = nodeRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top  - containerRect.top  + r.height / 2,
        };
      }).filter(Boolean);

      if (centres.length < 2) return;

      let trackD = `M ${centres[0].x} ${centres[0].y}`;
      let glowD  = `M ${centres[0].x} ${centres[0].y}`;

      // How far into the active path we draw the glow
      const firstIncompleteIdx = items.findIndex(
        (item) => item.status === "current" || item.status === "unlocked" || item.status === "locked"
      );
      const activeUpTo = firstIncompleteIdx === -1 ? centres.length - 1 : firstIncompleteIdx;

      for (let i = 1; i < centres.length; i++) {
        const prev = centres[i - 1];
        const curr = centres[i];
        const midY = (prev.y + curr.y) / 2;
        const cp1 = { x: prev.x, y: midY };
        const cp2 = { x: curr.x, y: midY };
        const seg = ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${curr.x} ${curr.y}`;
        trackD += seg;
        if (i <= activeUpTo) glowD += seg;
      }

      setPaths({ track: trackD, glow: glowD });
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [items]);

  // Animate bead along glow path
  useEffect(() => {
    if (!svgRef.current) return;
    const glowPath = svgRef.current.querySelector(".map-path-glow, .rounds-path-glow");
    if (!glowPath) return;

    let raf;
    let start = null;
    const duration = 3000;

    const animate = (ts) => {
      if (!start) start = ts;
      const t = ((ts - start) % duration) / duration;
      setBeadProgress(t);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paths.glow]);

  // Get bead XY from progress along glow path
  useEffect(() => {
    if (!svgRef.current) return;
    const glowPath = svgRef.current.querySelector("[data-glow-path]");
    if (!glowPath) return;
    const len = glowPath.getTotalLength();
    const pt = glowPath.getPointAtLength(beadProgress * len);
    setBeadPos({ x: pt.x, y: pt.y });
  }, [beadProgress]);

  if (!items.length) return null;

  return (
    <div className={containerClass} ref={containerRef}>
      {/* SVG path ribbon */}
      <svg
        ref={svgRef}
        className={svgClass}
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
      >
        {paths.track && (
          <path className="map-path-track" d={paths.track} />
        )}
        {paths.glow && (
          <path
            className="map-path-glow"
            data-glow-path=""
            d={paths.glow}
          />
        )}
        {beadPos && paths.glow && (
          <circle
            className="map-path-bead"
            cx={beadPos.x}
            cy={beadPos.y}
          />
        )}
      </svg>

      {/* Nodes */}
      <div className={nodesClass}>
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const status = item.status;
          const isLocked = status === "locked";

          return (
            <div key={item.id} className={isLeft ? rowClassLeft : rowClassRight}>
              <button
                type="button"
                ref={(el) => { nodeRefs.current[index] = el; }}
                className={`${nodeClass} ${nodeClass}--${status}`}
                disabled={isLocked || item.disabled}
                onClick={() => !isLocked && !item.disabled && onNodeClick?.(item)}
                aria-label={`${item.label}${item.sublabel ? `, ${item.sublabel}` : ""} — ${status}`}
              >
                <span className={crestClass}>
                  {/* Status badge */}
                  {status === "completed" && (
                    <span className="node-badge node-badge--check" aria-hidden="true">✓</span>
                  )}
                  {status === "locked" && (
                    <span className="node-badge node-badge--lock" aria-hidden="true">🔒</span>
                  )}

                  {/* Custom badge slot (e.g. boss star) */}
                  {renderBadge?.(item)}

                  <span className={numberClass}>{item.displayNumber}</span>
                </span>

                <span className={labelClass}>{item.label}</span>
                {item.sublabel && (
                  <span style={{ fontSize: "0.75rem", color: "var(--fog-faint)", letterSpacing: "0.03em" }}>
                    {item.sublabel}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}