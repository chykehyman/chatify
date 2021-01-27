import ChatRoom from '../models/chatRoom';

export const createChatRoom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw 'Chat room name can contain only alphabets.';

  const chatroomExists = await ChatRoom.findOne({ name });

  if (chatroomExists) throw 'Chat room with that name already exists!';

  const chatroom = await ChatRoom.create({ name });

  res.status(201).json({
    message: 'Chat room created successfully!',
    payload: chatroom,
  });
};

export const getAllChatRooms = async (req, res) => {
  const chatRooms = await ChatRoom.find();

  res.status(200).json({ payload: chatRooms });
};
