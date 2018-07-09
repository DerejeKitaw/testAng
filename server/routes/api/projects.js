const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProjectInput = require('../../validation/project');

// Project model
const Project = require('../../models/Project');

// @route   GET api/projects
// @desc    Get projects
// @access  Public
router.get('/', (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then(projects => res.json(projects))
    .catch(err => res.status(404).json({ noprojectsfound: 'No projects found' }));
});

// @route   GET api/projects/test
// @desc    Tests project route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'projects Works' }));

// @route   POST api/projects
// @desc    POST project by id
// @access  Public
router.post('/',
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
      projectId: req.body.projectId,
      customerName: req.body.customerName,
      user: req.user.id,
      numberOfString: req.body.numberOfString,
      numberOfModuleInverter1String1: req.body.numberOfModuleInverter1String1,
      numberOfModuleInverter1String2: req.body.numberOfModuleInverter1String2,
      numberOfModuleInverter1String3: req.body.numberOfModuleInverter1String3,
      spaceAvailable: req.body.spaceAvailable,
    });

    newProject.save().then(project => res.json(project));
  }
);


// @route   GET api/projects/:id
// @desc    Get project by id
// @access  Public
router.get('/:id', (req, res) => {
  Project.find({projectId: req.params.id})
    .then(project => res.json(project))
    .catch(err =>
      res.status(404).json({ noprojectfound: 'No project found with that ID' })
    );
});

module.exports = router;
