const Note = require("../models/note");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialNotes = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

// const generatePassword = async (password) => {
//   const hashed = await bcrypt.hash(password, 10);
//   return hashed;
// };

const generateUsers = async () => {
  const users = [
    {
      name: "test",
      username: "test",
      passwordHash: "test",
      notes: [],
    },
  ];

  for (let user of users) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
  }

  return users;
};

const initialUsers = generateUsers();

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon", date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
};
