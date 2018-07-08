const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProjectInput = require('../../validation/project');

// Project model
const Project = require('../../models/Project');

// @route   GET api/projects/test
// @desc    Tests project route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'projects Works' }));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newProject = new Project({
      jobType: req.body.jobType,
      customerName: req.body.customerName,
      user: req.user.id
    });

    newProject.save().then(project => res.json(project));
  }
);

module.exports = router;
