const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// @route   GET api/inverters/test
// @desc    Tests inverters route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Inverter Works' }));

// @route  GET api/inverters
// @desc   Get Inverters
// @access Public
router.get('/', (req, res) => {
  res.json(
    [
      {   
      "id":1,
      "inverterManufacturer": "SOLAREDGE",
      "inverterType": "SE3800A-US",
      "maxDcVoltage": "500",
      "nominalDcInputVoltage": "350",
      "maxPowerOutput": "3800",
      "acOutputVoltage": "240",
      "maxAcCurrentOutput": "16",
      "startupVoltage": "256",
      "cec": "97.5"  
  },
  {   
      "id":2,
      "inverterManufacturer": "SOLAREDGE",
      "inverterType": "SE10000A-US",
      "maxPowerOutput": "10000",
      "nominalDcInputVoltage": "350",
      "acOutputVoltage": "240",
      "maxAcCurrentOutput": "47.8",
      "maxDcVoltage": "500",
      "startupVoltage": "",
      "cec": "97.5"  
  },
  {   
      "id":3,
      "inverterManufacturer": "SOLAREDGE",
      "inverterType": "SE11000A-US",
      "maxPowerOutput": "11000",
      "nominalDcInputVoltage": "350",
      "acOutputVoltage": "240",
      "maxAcCurrentOutput": "47.3",
      "maxDcVoltage": "500",
      "startupVoltage": "",
      "cec": "96.3"  
  }
]
  );
});

module.exports = router;
