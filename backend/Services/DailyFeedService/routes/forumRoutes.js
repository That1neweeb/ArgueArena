import express from 'express';
import {
  createForumTopic,
  createMessage,
  getAllTopics,
  getTopicMessages
} from '../controller/forumController.js';

const router = express.Router();

router.post('/addTopic', createForumTopic);

router.post('/:topicId/messages', createMessage);

router.get('/getTopic', getAllTopics);

router.get('/:topicId/messages', getTopicMessages);

export default router;