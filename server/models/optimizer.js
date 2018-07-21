const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  optimizerId: {
    type: String,
    required: true,
  },
  optimizerModel: {
    type: String,
    required: true
  },
  optimizerMaxDcVoltage: {
    type: Number,
    required: true
  },
  optimizerMaxPowerOutput: {
    type: Number,
    required: true
  },
  optimizerMaxDcCurrentOutput: {
    type: Number,
    required: true
  },
  optimizerMaxDcCurrentInput: {
    type: Number,
    required: true
  }

});

module.exports = User = mongoose.model('users', UserSchema);
