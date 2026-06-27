import db from './config/firebase.db.js';
import admin from 'firebase-admin';

// dailyFeedService.js
export async function addMessage(topicId, userId, username, text, time) {
  if (topicId === undefined || topicId === null) {
    throw new Error('addMessage: topicId is missing');
  }

  const docRef = await db
    .collection('topics')
    .doc(String(topicId))
    .collection('messages')
    .add({
      user_id: userId,
      username: username,
      text,
      sent_at: time,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });

  return docRef.id;
}

export async function getMessages(topicId) {
  const snapshot = await db
    .collection("topics")
    .doc(String(topicId))
    .collection("messages")
    .orderBy("created_at", "asc")
    .get();

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      username: data.username ?? null,
      sent_at: data.sent_at ?? null,
    };
  });
}

// create topic 
export async function createTopicDoc(topicId, topicName) {
  const topicRef = db.collection('topics').doc(String(topicId));
  await topicRef.set({
    id: topicId,
    name: topicName,
    created_at: admin.firestore.FieldValue.serverTimestamp()
  });
}

// update a dailytopic
export async function updateDailyTopic(topicId, topicName) {
  const dailyTopicRef = db.collection("dailyTopic").doc("current");

  await dailyTopicRef.set({
    id: topicId,
    name: topicName,
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  });
}
  
//fetch the current topic
export async function DailyTopic() {
  const doc = await db.collection("dailyTopic").doc("current").get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}