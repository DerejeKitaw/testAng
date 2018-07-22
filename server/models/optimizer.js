const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OptimizerSchema = new Schema({
  optimizerId: {
    type: Number,
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

module.exports = Optimizer = mongoose.model('optimizer', OptimizerSchema);
