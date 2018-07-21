const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  panelId: {
    type: String,
    required: true,
  },
  panelsManufacturer: {
    type: String,
    required: true
  },
  panelType: {
    type: String,
    required: true
  },
  power: {
    type: Number,
    required: true
  },
  vmp: {
    type: Number,
    required: true
  },
  imp: {
    type: Number,
    required: true
  },
  voc: {
    type: Number,
    required: true
  },
  isc: {
    type: Number,
    required: true
  },
  vocTempCoef: {
    type: Number,
    required: true
  },
  vmpTempCoef: {
    type: Number,
    required: true
  },
  iscTempCoef: {
    type: Number,
    required: true
  }

});

module.exports = User = mongoose.model('users', UserSchema);
