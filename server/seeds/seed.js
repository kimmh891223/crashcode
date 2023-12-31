const db = require('../config/connection');
const { User, Codes, Comments } = require('../models');
const userData = require('./userData.json');
const codeData = require('./codeData.json');
const commentData = require('./commentData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Codes.deleteMany({});
  await Comments.deleteMany({});
  
  const users = await User.insertMany(userData);

  const userMap = {};
  for (let createdUser of users) {
    userMap[createdUser.username] = createdUser._id;
  }

  for (let code of codeData) {
    if (userMap[code.username]) {
      code.user_id = userMap[code.username];
      if (code.createdAt) {
        code.createdAt = new Date(code.createdAt);
      }
    } else {
      console.log(`No user found for username ${code.username}, skipping this code.`);
      continue;
    }
    await Codes.create(code);
  }

  for (let comment of commentData) {
    if (userMap[comment.username]) {
      comment.username = userMap[comment.username];
    } else {
      console.log(`No user found for username ${comment.username}, skipping this comment.`);
      continue;
    }
    await Comments.create(comment);
  }
  console.log('All tables have been updated');
  process.exit(0);
});