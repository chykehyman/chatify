import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
    },
    email: {
      type: String,
      required: 'Email is required!',
    },
    password: {
      type: String,
      required: 'Password is required!',
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
