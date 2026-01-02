import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
