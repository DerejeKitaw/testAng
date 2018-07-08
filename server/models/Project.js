const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
  spaceAvailable: {
    type: Boolean
  }
});

module.exports = Project = mongoose.model('project', ProjectsSchema);
