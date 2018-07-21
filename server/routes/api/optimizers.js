const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Optimizer model
const Optimizer = require('../../models/Optimizer');

// @route   GET api/optimizers/test
// @desc    Tests optimizers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Optimizer Works' }));

// @route  GET api/optimizers
// @desc   Get Optimizers
// @access Public
router.get('/', (req, res) => {
  Optimizer.find()
    .sort({ date: -1 })
    .then(optimizer => res.json(optimizer))
    .catch(err => res.status(404).json({ msg: 'No optimizer found' }));
});

// @route   POST api/optimizers
// @desc    POST optimizer
// @access  Public
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateOptimizerInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newOptimizer = new Optimizer({
      optimizerId: req.body.optimizerId,
      optimizerModel: req.body.optimizerModel,
      optimizerMaxDcVoltage: req.body.optimizerMaxDcVoltage,
      optimizerMaxPowerOutput: req.body.optimizerMaxPowerOutput,
      optimizerMaxDcCurrentOutput: req.body.optimizerMaxDcCurrentOutput,
      optimizerMaxDcCurrentInput: req.body.optimizerMaxDcCurrentInput
    });
    newOptimizer.save().then(optimizer => res.json(optimizer));
  }
);

// @route   GET api/optimizers/:id
// @desc    Get optimizer by id
// @access  Public
router.get('/:id', (req, res) => {
  Optimizer.find({ optimizerId: req.params.id })
    .then(optimizer => res.json(optimizer))
    .catch(err =>
      res.status(404).json({ msg: 'No optimizer found with that ID' })
    );
});

// @route   DELETE api/optimizers/:_id
// @desc    Delete optimizer
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Optimizer.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        Optimizer.find()
          .sort({ date: -1 })
          .then(optimizer => res.json(optimizer))
          .catch(err => res.status(404).json({ msg: 'No optimizer found' }));
        // res.json({ success: true })
      })
      .catch(err => res.status(404).json({ msg: 'No optimizer found' }));
  }
);

// router.delete('/a/:id', (req, res) => res.json({ _id: req.params.id}));
module.exports = router;
