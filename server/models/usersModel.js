const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    inique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const Users = (module.exports = mongoose.model('user', UserSchema));
