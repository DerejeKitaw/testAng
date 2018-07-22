const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProjectInput = require('../../validation/project');

// Project models
const Project = require('../../models/Project');
const Panel = require('../../models/Panel');
const Optimizer = require('../../models/Optimizer');
const Inverter = require('../../models/Inverter');

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
// @desc    POST project - Add project
// @access  Public
const newProject = new Project();
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);
    // res.json({ msg: req.body }) // return form values
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Inverter.findOne({ _id: req.body.inverter })
    .then(inverter => {
      // res.json({ msg: inverter.inverterManufacturer })
       // newProject['inverterMaxDcVoltage'] = inverter.inverterMaxDcVoltage;
    nominalDcInputVoltage = inverter.nominalDcInputVoltage;
    ratedVoltage = inverter.ratedVoltage;
    inverter1Type = inverter.inverter1Type;
    maxPowerOutput = inverter.maxPowerOutput;
    inverterMaxPowerOutput = inverter.inverterMaxPowerOutput;
    inverterAcOutputVoltage = inverter.inverterAcOutputVoltage;
    maxAcCurrentOutput = inverter.maxAcCurrentOutput;
    cec = inverter.cec;
    // const newProject = new Project({
      newProject.user = req.user.id;
      newProject.panel = req.body.panel;
      newProject.inverter = req.body.inverter;
      newProject.optimizer = req.body.optimizer;
      newProject.projectId = req.body.projectId;
      newProject.jobType = req.body.jobType;
      newProject.numberOfString = req.body.numberOfString;
      newProject.numberOfModuleInverter1String1 = req.body.numberOfModuleInverter1String1;
      newProject.numberOfModuleInverter1String2 = req.body.numberOfModuleInverter1String2;
      newProject.numberOfModuleInverter1String3 = req.body.numberOfModuleInverter1String3;
      newProject.spaceAvailable = req.body.spaceAvailable;
      newProject.mainServiceBreakerSize = req.body.mainServiceBreakerSize;
      newProject.unFusedAcDisconnectAmpRating = req.body.unFusedAcDisconnectAmpRating;
      newProject.acOutputVoltage = req.body.acOutputVoltage;
      newProject.fusedAcDisconnectAmpRating = req.body.fusedAcDisconnectAmpRating;
      newProject.fuseSize = req.body.fuseSize;
      
    //   nominalDcInputVoltage : nominalDcInputVoltage,
    // ratedVoltage : ratedVoltage,
    // inverter1Type : inverter1Type,
    // maxPowerOutput : maxPowerOutput,
    // inverterMaxPowerOutput : inverterMaxPowerOutput,
    // inverterAcOutputVoltage : inverterAcOutputVoltage,
    // maxAcCurrentOutput : maxAcCurrentOutput,
    // cec : cec,
      
    //   // optimizerMaxDcCurrentInput: req.body.optimizerMaxDcCurrentInput,
    //   // optimizerMaxDcCurrentOutput: req.body.optimizerMaxDcCurrentOutput,
    //   // optimizerMaxPowerOutput: req.body.optimizerMaxPowerOutput,
    //   // optimizerMaxDcVoltage: req.body.optimizerMaxDcVoltage,
    //   // optimizerModel: req.body.optimizerModel,
    //   // panelMaxSystemVoltage: req.body.panelMaxSystemVoltage,
    //   // panelIsc: req.body.panelIsc,
    //   // panelVoc: req.body.panelVoc,
    //   // panelImp: req.body.panelImp,
    //   // panelVmp: req.body.panelVmp,
    //   // panelPower: req.body.panelPower,
    //   // panelType: req.body.panelType,
  
    //   customerName: req.body.customerName,
    //   jobType: req.body.jobType,
    //   systemPower: req.body.systemPower,
    //   address1: req.body.address1,
    //   address2: req.body.address2,
    //   drawingDate: req.body.drawingDate
    // });
    
  })
  .catch(err =>
    res.status(404).json({ noinvertersfound: 'No inverters found',_id: req.body.inverter  })
  );
  
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
    if (req.body.panel){ projectField.Panel = req.body.panel;}

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

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        Project.find()
          .sort({ date: -1 })
          .then(project => res.json(project))
          .catch(err => res.status(404).json({ msg: 'No project found' }));
        // res.json({ success: true })
      })
      .catch(err => res.status(404).json({ msg: 'No project found' }));
  }
);
module.exports = router;
