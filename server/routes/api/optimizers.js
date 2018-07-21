const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// @route   GET api/Optimizers/test
// @desc    Tests Optimizers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Optimizer Works' }));

// @route  GET api/Optimizers
// @desc   Get Optimizers
// @access Public
router.get('/', (req, res) => {
  res.json(
    [
      {   
      "id":1,
      "optimizerModel": "P300",
      "optimizerMaxDcVoltage": 48,
      "optimizerMaxPowerOutput": 300,
      "optimizerMaxDcCurrentOutput": 15,
      "optimizerMaxDcCurrentInput": 12.5
      },
      {   
      "id":2,
      "optimizerModel": "P320",
      "optimizerMaxDcVoltage": 48,
      "optimizerMaxPowerOutput": 320,
      "optimizerMaxDcCurrentOutput": 15,
      "optimizerMaxDcCurrentInput": 13.75
      }
    ]
  );
});

module.exports = router;
