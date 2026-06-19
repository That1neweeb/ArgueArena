import express from 'express';
import {
  createForumTopic,
  createMessage,
  getTodaysTopic,
  getTopicMessages
} from '../controller/forumController.js';

const router = express.Router();

router.post('/addTopic', createForumTopic);

router.post('/:topicId/messages', createMessage);

router.get('/getTopic', getTodaysTopic);

router.get('/:topicId/messages', getTopicMessages);

export default router;