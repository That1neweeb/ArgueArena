// Utility to provide a topicId even before API integration is complete.
export function getTopicIdFallback(topic) {
  // topic may be a number, string, or null.
  if (topic === null || topic === undefined) return 1;
  const n = Number(topic);
  if (Number.isFinite(n)) return n;
  return 1;
}

