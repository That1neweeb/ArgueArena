import express from 'express';
import {
  createMessage,
  getTopicMessages,
  getCurrentTopic,
} from '../controller/forumController.js';
import { verifyToken } from '../../AuthService/auth.middleware.js';

const router = express.Router();

// router.post('/addTopic', createForumTopic);

// router.post('/:topicId/messages',verifyToken, createMessage);

router.get('/getTopic', getCurrentTopic);

router.get('/:topicId/messages', getTopicMessages);

export default router;