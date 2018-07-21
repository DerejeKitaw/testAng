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
    .catch(err => res.status(404).json({ msg: 'No inverter found' }));
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
      cec: req.body.cec
    });
    newInverter.save().then(inverter => res.json(inverter));
  }
);

// @route   GET api/inverters/:id
// @desc    Get inverter by id
// @access  Public
router.get('/:id', (req, res) => {
  Inverter.find({ inverterId: req.params.id })
    .then(inverter => res.json(inverter))
    .catch(err =>
      res.status(404).json({ msg: 'No inverter found with that ID' })
    );
});

// @route   DELETE api/inverters/:_id
// @desc    Delete inverter
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inverter.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        Inverter.find()
          .sort({ date: -1 })
          .then(inverter => res.json(inverter))
          .catch(err => res.status(404).json({ msg: 'No inverter found' }));
        // res.json({ success: true })
      })
      .catch(err => res.status(404).json({ msg: 'No inverter found' }));
  }
);

// router.delete('/a/:id', (req, res) => res.json({ _id: req.params.id}));
module.exports = router;
