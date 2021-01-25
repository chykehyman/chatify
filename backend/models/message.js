import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  chatroom: {
    type: Schema.Types.ObjectId,
    required: 'Chatroom ID is required!',
    ref: 'Chatroom',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: 'User ID is required!',
    ref: 'User',
  },
  message: {
    type: String,
    required: 'Message is required!',
  },
});

export default model('Message', messageSchema);
