const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Panel model
const Panel = require('../../models/Panel');

// @route   GET api/panels/test
// @desc    Tests panels route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Panel Works' }));

// @route  GET api/panels
// @desc   Get Panels
// @access Public
router.get('/', (req, res) => {
  Panel.find()
    .sort({ date: -1 })
    .then(panel => res.json(panel))
    .catch(err => res.status(404).json({ msg: 'No panel found' }));
});

// @route   POST api/panels
// @desc    POST panel
// @access  Public
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePanelInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newPanel = new Panel({
      panelId: req.body.panelId,
      panelsManufacturer: req.body.panelsManufacturer,
      panelType: req.body.panelType,
      power: req.body.power,
      vmp: req.body.vmp,
      imp: req.body.imp,
      voc: req.body.voc,
      isc: req.body.isc,
      vocTempCoef: req.body.vocTempCoef,
      vmpTempCoef: req.body.vmpTempCoef,
      iscTempCoef: req.body.iscTempCoef,
      maxSystemVoltage: req.body.maxSystemVoltage
      
    });
    newPanel.save().then(panel => res.json(panel));
  }
);

// @route   GET api/panels/:id
// @desc    Get panel by id
// @access  Public
router.get('/:id', (req, res) => {
  Panel.find({ panelId: req.params.id })
    .then(panel => res.json(panel))
    .catch(err => res.status(404).json({ msg: 'No panel found with that ID' }));
});

// @route   DELETE api/panels/:_id
// @desc    Delete panel
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Panel.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        Panel.find()
          .sort({ date: -1 })
          .then(panel => res.json(panel))
          .catch(err => res.status(404).json({ msg: 'No panel found' }));
        // res.json({ success: true })
      })
      .catch(err => res.status(404).json({ msg: 'No panel found' }));
  }
);

// router.delete('/a/:id', (req, res) => res.json({ _id: req.params.id}));
module.exports = router;
