import {
  createTopic,
  addMessage,
  getTopic,
  getMessages
} from '../dailyFeedService.js';

export async function createForumTopic(req, res) {
  try {
    const { title, created_by } = req.body;

    const topic = await createTopic(title, created_by);
    res.status(201).json({
      success: true,
      topic_id: topic.id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function createMessage(req, res) {
  try {
    const { topicId } = req.params;
    const { user_id, text } = req.body;

    await addMessage(topicId, user_id, text);

    res.status(201).json({
      success: true
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function getAllTopics(req, res) {
  try {
    const topics = await getTopic();

    res.json(topics);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function getTopicMessages(req, res) {
  try {
    const { topicId } = req.params;

    const messages = await getMessages(topicId);

    res.json(messages);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}