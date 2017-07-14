const mongoose     = require('mongoose');

const UserSchema = mongoose.Schema({
  token:    String,
  githubId: String,
  name:     String,
  username: String,
  email:    String,
  avatar:   String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
