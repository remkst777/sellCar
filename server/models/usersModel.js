const mongoose = require('mongoose');
const { USERS_MODEL_FIELDS } = require('../constants');

// User Schema
const UserSchema = mongoose.Schema({
  [USERS_MODEL_FIELDS.EMAIL]: {
    type: String,
    inique: true,
    required: true,
  },
  [USERS_MODEL_FIELDS.USERNAME]: {
    type: String,
    required: true,
    trim: true,
  },
  [USERS_MODEL_FIELDS.PASSWORD]: {
    type: String,
    required: true,
  },
  [USERS_MODEL_FIELDS.ISVERIFIED]: {
    type: Boolean,
    default: false,
  },
  [USERS_MODEL_FIELDS.DATE]: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

const Users = (module.exports = mongoose.model('user', UserSchema));
