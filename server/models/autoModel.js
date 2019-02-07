const mongoose = require('mongoose');

// User Schema
const AutoSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  fuel: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    trim: true,
  },
  fotos: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  popularity: {
    type: Number,
    required: false,
    default: 1,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  stock: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Auto = (module.exports = mongoose.model('auto', AutoSchema));
