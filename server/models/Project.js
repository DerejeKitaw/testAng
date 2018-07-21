const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  projectId: {
    type: String,
    required: true,
  },
  jobType: {
    type: String
  },
  customerName: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  numberOfString: {
    type: Number
  },
  numberOfModuleInverter1String1: {
    type: Number
  },
  numberOfModuleInverter1String2: {
    type: Number
  },
  numberOfModuleInverter1String3: {
    type: Number
  },
  mainServiceBreakerSize: {
    type: Number
  },
  unFusedAcDisconnectAmpRating: {
    type: Number
  },
  acOutputVoltage: {
    type: Number
  },
  fusedAcDisconnectAmpRating: {
    type: Number
  },
  fuseSize: {
    type: Number
  },
  inverterMaxDcVoltage: {
    type: Number
  },
  nominalDcInputVoltage: {
    type: Number
  },
  ratedVoltage: {
    type: Number
  },
  inverter1Type: {
    type: String
  },
  maxPowerOutput: {
    type: Number
  },
  inverterMaxPowerOutput: {
    type: Number
  },
  inverterAcOutputVoltage: {
    type: Number
  },
  maxAcCurrentOutput: {
    type: Number
  },
  cec: {
    type: Number
  },
  optimizerMaxDcCurrentInput: {
    type: Number
  },
  optimizerMaxDcCurrentOutput: {
    type: Number
  },
  optimizerMaxPowerOutput: {
    type: Number
  },
  optimizerMaxDcVoltage: {
    type: Number
  },
  optimizerModel: {
    type: Number
  },
  panelMaxSystemVoltage: {
    type: Number
  },
  panelIsc: {
    type: Number
  },
  panelVoc: {
    type: Number
  },
  panelImp: {
    type: Number
  },
  panelVmp: {
    type: Number
  },
  panelPower: {
    type: Number
  },
  panelType: {
    type: String
  },
  customerName: {
    type: String
  },
  jobType: {
    type: String
  },
  systemPower: {
    type: Number
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  drawingDate: {
    type: Date
  },
  spaceAvailable: {
    type: Boolean
  }
});

module.exports = Project = mongoose.model('project', ProjectSchema);
