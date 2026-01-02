import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY,
  baseURL: "https://api.sambanova.ai/v1",
});

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation_id: req.params.conversationId })
      .sort({ created_at: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversation_id, role, content } = req.body;
    
    // Check if conversation belongs to user
    const conversation = await Conversation.findOne({ _id: conversation_id, user_id: req.user._id });
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });

    const message = new Message({ conversation_id, role, content });
    await message.save();

    // If it's the first message and title is default, update title
    const messageCount = await Message.countDocuments({ conversation_id });
    if (messageCount === 1 && role === 'user') {
      conversation.title = content.slice(0, 50);
      await conversation.save();
    }

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const aiChat = async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const systemPrompt = {
      role: "system",
      content: `You are a specialized AI Tutor. Your primary goal is to mentor students through their educational journey.
      
      NUANCED BRIDGING STRATEGY:
      1. DO NOT simply reject off-topic questions. Instead, bridge them to education/knowledge.
      2. If a user asks for something unrelated (e.g., entertainment, dance, "fun"):
         - Acknowledge their interest warmly.
         - Connect the topic to science, history, linguistics, or logic.
         - Provide a "Brain Break" that is intellectually stimulating (interesting facts, riddles, or the "why" behind things).
      3. Example: If asked to "dance", explain the physics of balance or the history of a culture; if asked for "distractions", provide "Mind-Bending Facts" that pique curiosity.
      4. Use the Socratic method: Explain things step-by-step and ask follow-up questions to keep the "Study Session" alive.
      5. Always maintain a helpful, encouraging, and wise mentor persona.
      
      Style: Use Markdown for clarity (bolding, lists, code blocks). Respond in the language the user is using.`
    };

    const stream = await client.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [systemPrompt, ...messages.map(m => ({
        role: m.role,
        content: m.content
      }))],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        const delta = { choices: [{ delta: { content } }] };
        res.write(`data: ${JSON.stringify(delta)}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('SambaNova API error:', err);
    res.write(`data: ${JSON.stringify({ error: "AI service error" })}\n\n`);
    res.end();
  }
};
