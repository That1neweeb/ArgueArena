import cron from 'node-cron';
import topicPool from './topicPool.js';
import { createTopicDoc, updateDailyTopic } from '../dailyFeed.Message.Service.js'; // adjust path

let cachedTopic = null;

function pickRandom() {
  const idx = Math.floor(Math.random() * topicPool.length);
  return topicPool[idx]; // { id, title }
}

const pickRandomTopic = async (io) => {
  const topic = pickRandom();
  cachedTopic = topic;
  await createTopicDoc(topic.id, topic.title); // create the topic doc in Firestore
  await updateDailyTopic(topic.id,topic.title); //update the daily topic overwrites it entirely
  console.log('Rotated to new daily topic:', topic);
};

export async function ensureTodaysTopic(io) {
  if (cachedTopic) {
    return cachedTopic;
  }
  await pickRandomTopic(io);
  return cachedTopic;
}

export function startTopicRotation(io) {
  cron.schedule('0 6 * * *', () => pickRandomTopic(io), {
    timezone: "Asia/Kathmandu"
  });
}

export function getCachedTopic() {
  return cachedTopic;
}