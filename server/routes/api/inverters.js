const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Inverter model
const Inverter = require('../../models/Inverter');

// @route   GET api/inverters/test
// @desc    Tests inverters route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Inverter Works' }));

// @route  GET api/inverters
// @desc   Get Inverters
// @access Public
router.get('/', (req, res) => {
  Inverter.find()
    .sort({ date: -1 })
    .then(inverter => res.json(inverter))
    .catch(err =>
      res.status(404).json({ msg: 'No inverter found' })
    );
});

// @route   POST api/inverters
// @desc    POST inverter
// @access  Public
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
   // const { errors, isValid } = validateInverterInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newInverter = new Inverter({
      inverterId: req.body.inverterId,
      inverterManufacturer: req.body.inverterManufacturer,
      inverterType: req.body.inverterType,
      maxDcVoltage: req.body.maxDcVoltage,
      maxPowerOutput: req.body.maxPowerOutput,
      nominalDcInputVoltage: req.body.nominalDcInputVoltage,
      acOutputVoltage: req.body.acOutputVoltage,
      maxAcCurrentOutput: req.body.maxAcCurrentOutput,
      startupVoltage: req.body.startupVoltage,
      cec: req.body.cec,
    
    });
    newInverter.save().then(inverter => res.json(inverter));
  }
);

module.exports = router;
