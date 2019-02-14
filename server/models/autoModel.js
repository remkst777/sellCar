const mongoose = require('mongoose');
const { AUTO_MODEL_FIELDS } = require('../constants');

// User Schema
const AutoSchema = mongoose.Schema({
  [AUTO_MODEL_FIELDS.BRAND]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.MODEL]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.MANUFACTURER]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.COLOR]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.BODY]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.FUEL]: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  [AUTO_MODEL_FIELDS.YEAR]: {
    type: Number,
    required: true,
    trim: true,
  },
  [AUTO_MODEL_FIELDS.CAPACITY]: {
    type: Number,
    required: true,
    trim: true,
  },
  [AUTO_MODEL_FIELDS.COST]: {
    type: Number,
    required: true,
    trim: true,
  },
  [AUTO_MODEL_FIELDS.FOTOS]: {
    type: Array,
    required: true,
  },
  [AUTO_MODEL_FIELDS.DESCRIPTION]: {
    type: String,
    required: true,
    trim: true,
  },
  [AUTO_MODEL_FIELDS.POPULARITY]: {
    type: Number,
    required: false,
    default: 1,
  },
  [AUTO_MODEL_FIELDS.DATE]: {
    type: Date,
    required: false,
    default: Date.now,
  },
  [AUTO_MODEL_FIELDS.STOCK]: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Auto = (module.exports = mongoose.model('auto', AutoSchema));
