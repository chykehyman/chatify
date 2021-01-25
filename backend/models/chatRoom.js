import { Schema, model } from 'mongoose';

const chatroomSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required!',
  },
});

export default model('Chatroom', chatroomSchema);
