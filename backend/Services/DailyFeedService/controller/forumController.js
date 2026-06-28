import {
  addMessage,
  getMessages,
  DailyTopic
} from '../dailyFeed.Message.Service.js';

export async function createMessage(req, res) {
  try {
    const { topicId } = req.params;
    const { user_id, username, text, sent_at } = req.body;

    await addMessage(topicId, user_id, username, text, sent_at);

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
// fetch messages for the topic
export async function getTopicMessages(req, res) {
  try {
    const { topicId } = req.params;
    console.log(topicId);
    const messages = await getMessages(topicId);
    console.log(messages);
    res.status(200).json({messages, message:'Successfull'});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function getCurrentTopic(req,res) {
  try{
    const topic = await DailyTopic();
    res.status(200).json({topic , message:'Topic fetched successfully'})
  }
  catch(e){
    
  }
}