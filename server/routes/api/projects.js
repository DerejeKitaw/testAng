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

// @route   GET api/projects
// @desc    Get projects
// @access  Public
router.get('/', (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then(projects => res.json(projects))
    .catch(err =>
      res.status(404).json({ noprojectsfound: 'No projects found' })
    );
});

// @route   POST api/projects
// @desc    POST project
// @access  Public
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
      user: req.user.id,
      projectId: req.body.projectId,
      jobType: req.body.jobType,
      numberOfString: req.body.numberOfString,
      numberOfModuleInverter1String1: req.body.numberOfModuleInverter1String1,
      numberOfModuleInverter1String2: req.body.numberOfModuleInverter1String2,
      numberOfModuleInverter1String3: req.body.numberOfModuleInverter1String3,
      spaceAvailable: req.body.spaceAvailable,
      mainServiceBreakerSize: req.body.mainServiceBreakerSize,
      unFusedAcDisconnectAmpRating: req.body.unFusedAcDisconnectAmpRating,
      acOutputVoltage: req.body.acOutputVoltage,
      fusedAcDisconnectAmpRating: req.body.fusedAcDisconnectAmpRating,
      fuseSize: req.body.fuseSize,
      inverterMaxDcVoltage: req.body.inverterMaxDcVoltage,
      nominalDcInputVoltage: req.body.nominalDcInputVoltage,
      ratedVoltage: req.body.ratedVoltage,
      inverter1Type: req.body.inverter1Type,
      maxPowerOutput: req.body.maxPowerOutput,
      inverterMaxPowerOutput: req.body.inverterMaxPowerOutput,
      inverterAcOutputVoltage: req.body.inverterAcOutputVoltage,
      maxAcCurrentOutput: req.body.maxAcCurrentOutput,
      cec: req.body.cec,
      optimizerMaxDcCurrentInput: req.body.optimizerMaxDcCurrentInput,
      optimizerMaxDcCurrentOutput: req.body.optimizerMaxDcCurrentOutput,
      optimizerMaxPowerOutput: req.body.optimizerMaxPowerOutput,
      optimizerMaxDcVoltage: req.body.optimizerMaxDcVoltage,
      optimizerModel: req.body.optimizerModel,
      panelMaxSystemVoltage: req.body.panelMaxSystemVoltage,
      panelIsc: req.body.panelIsc,
      panelVoc: req.body.panelVoc,
      panelImp: req.body.panelImp,
      panelVmp: req.body.panelVmp,
      panelPower: req.body.panelPower,
      panelType: req.body.panelType,
      customerName: req.body.customerName,
      jobType: req.body.jobType,
      systemPower: req.body.systemPower,
      address1: req.body.address1,
      address2: req.body.address2,
      drawingDate: req.body.drawingDate
    });

    newProject.save().then(project => res.json(project));
  }
);

// @route   GET api/projects/:id
// @desc    Get project by id
// @access  Public
router.get('/:id', (req, res) => {
  Project.find({ projectId: req.params.id })
    .then(project => res.json(project))
    .catch(err =>
      res.status(404).json({ noprojectfound: 'No project found with that ID' })
    );
});

// @route   POST api/project/:id
// @desc    Create or edit project
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
     // res.json({ msg: req.body }) // return form values

    // TODO: validate project input

    // Get fields
    const projectField = {};
    // TODO: Add all fields
    projectField.projectId = req.params.id;
    if (req.body.customerName){ projectField.customerName = req.body.customerName;}
    if (req.body.address1){ projectField.address1 = req.body.address1;}
    if (req.body.address2){ projectField.address2 = req.body.address2;}

    Project.find().then(projects => {
      // res.json({ msg: projects }) // return all projects with _id
      Project.findOne({ projectId: req.params.id }).then(project => {
        // res.json({ msg: project }); // return project-projectId with _id
        if (project) {
          // update project
          Project.findOneAndUpdate(
            { _id: project._id },
            { $set: projectField },
            { new: true }
          ).then(project => res.json(project));
        } else {
          // Create new
          new Project(projectField).save().then(project => res.json(project));
        }
        // Project.update(
        //   project,
        //   {
        //     $set : {customerName: req.body.customerName}
        //   }
        // ).then(pro => {
        //   res.json(pro)
        // })
        // res.json(project)
      });
    });
  }
);

module.exports = router;
