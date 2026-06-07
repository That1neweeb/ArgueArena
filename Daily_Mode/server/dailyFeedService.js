import db from './config/firebase.db.js';
import admin from 'firebase-admin';

export async function createTopic(title, createdBy) {
  return await db.collection('forums').add({
    title,
    created_by: createdBy,
    created_at: admin.firestore.FieldValue.serverTimestamp()
  });
}

export async function addMessage(topicId, userId, text) {
  return await db
    .collection('forums')
    .doc(topicId)
    .collection('messages')
    .add({
      user_id: userId,
      text,
      sent_at: admin.firestore.FieldValue.serverTimestamp()
    });
}

export async function getTopic() {
  const snapshot = await db.collection('forums').get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
}

export async function getMessages(topicId) {
  const snapshot = await db 
  .collection('forums')
  .doc(topicId)
  .collection('messages')
  .orderBy('sent_at')
  .get();

  return snapshot.docs.map(doc => ({
    id:doc.id,
    ...doc.data()
  }));
}

