const geminiClient = require('../utils/geminiClient');
const Chat = require('../models/Chat');

const sendMessage = async (req, res) => {
  try {
    const { message, resumeText, sessionId, resumeId } = req.body;

    if (!message || !resumeText) {
      return res.status(400).json({ error: 'Message and resumeText are required' });
    }

    const aiResponse = await geminiClient.chatAboutResume(message, resumeText);

    // Try to save to database (with fallback if connection fails)
    let chat;
    try {
      chat = await Chat.findOne({ sessionId });
      
      if (!chat) {
        chat = await Chat.create({
          sessionId: sessionId || `session_${Date.now()}`,
          resumeId: resumeId || null,
          context: resumeText,
          messages: []
        });
      }

      chat.messages.push({
        role: 'user',
        content: message
      });

      chat.messages.push({
        role: 'assistant',
        content: aiResponse
      });

      await chat.save();
    } catch (dbError) {
      console.warn('⚠️  Database save failed for chat, continuing without persistence');
      // Create a temporary session ID if not provided
      chat = { sessionId: sessionId || `session_${Date.now()}` };
    }

    res.json({
      success: true,
      response: aiResponse,
      sessionId: chat.sessionId
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to process chat message: ' + error.message });
  }
};

module.exports = { sendMessage };

