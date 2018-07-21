const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InverterSchema = new Schema({
  inverterId: {
    type: String,
    required: true,
  },
  inverterManufacturer: {
    type: String,
    required: true
  },
  inverterType: {
    type: String,
    required: true
  },
  maxDcVoltage: {
    type: Number,
    required: true
  },
  maxPowerOutput: {
    type: Number,
    required: true
  },
  nominalDcInputVoltage: {
    type: Number,
    required: true
  },
  acOutputVoltage: {
    type: Number,
    required: true
  },
  maxAcCurrentOutput: {
    type: Number,
    required: true
  },
  startupVoltage: {
    type: Number,
    required: true
  },
  cec: {
    type: Number,
    required: true
  },

});

module.exports = Inverter = mongoose.model('inverters', InverterSchema);
