import Conversation from "../models/Conversation.js";

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user_id: req.user._id })
      .sort({ updated_at: -1 });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createConversation = async (req, res) => {
  try {
    const conversation = new Conversation({
      user_id: req.user._id,
      title: req.body.title || 'New Conversation'
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
    res.json({ message: 'Conversation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      { title: req.body.title },
      { new: true }
    );
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
