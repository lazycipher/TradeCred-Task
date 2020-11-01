const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  files: {
    type: [String],
    default: []
  },
  registeredOn: {
    type: Date,
    default: Date.now()
  }
});

const User = model('user', UserSchema);

module.exports = User
