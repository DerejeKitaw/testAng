const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProjectInput = require('../../validation/project');

// Project model
const Project = require('../../models/Project');
const Panel = require('../../models/Panel');
const Optimizer = require('../../models/Optimizer');
const Inverter = require('../../models/Inverter');

// const panel = new Panel();

// @route   GET api/projects/test
// @desc    Tests project route
// @access  Public
// router.get('/test', (req, res) => res.json({ msg: 'projects Works' }));
// router.get('/test', (req, res) => {
//   res.json({ msg: req.body.inverter })
//   Inverter.findOne({ _id: req.body.inverter })
//   .then(inverter => {
//     panel.me = inverter.inverterId;

//     })
// });

router.post(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const inverter = new Promise((resolve, reject) => {
      Inverter.findOne({ _id: req.body.inverter }).then(inverter => {
        // testPrj.inverterManufacturer = inverter.inverterManufacturer;
        resolve(inverter);
      });
    });
    const panel = new Promise((resolve, reject) => {
      Panel.findOne({ _id: req.body.panel }).then(panel => {
        resolve(panel);
      });
    });
    const optimizer = new Promise((resolve, reject) => {
      Optimizer.findOne({ _id: req.body.optimizer }).then(optimizer => {
        resolve(optimizer);
      });
    });
    Promise.all([inverter, panel, optimizer]).then(result => {
      const newProject = new Project({
        user: req.user.id,
        panel: req.body.panel,
        inverter: req.body.inverter,

        projectId: req.body.projectId,
        jobType: req.body.jobType,
        numberOfString: calcNumberOfString(),
        numberOfModuleInverter1String1: req.body.numberOfModuleInverter1String1,
        numberOfModuleInverter1String2: req.body.numberOfModuleInverter1String2,
        numberOfModuleInverter1String3: req.body.numberOfModuleInverter1String3,
        spaceAvailable: req.body.spaceAvailable,
        mainServiceBreakerSize: req.body.mainServiceBreakerSize,
        unFusedAcDisconnectAmpRating: calcUnFusedAcDisconnectAmpRating(),
        acOutputVoltage: req.body.acOutputVoltage,
        fusedAcDisconnectAmpRating: calcFusedAcDisconnectAmpRating(),
        // fuseSize: req.body.fuseSize,
        fuseSize: calcFuseSize(),

        inverterMaxDcVoltage: result[0].inverterMaxDcVoltage,
        nominalDcInputVoltage: result[0].nominalDcInputVoltage,
        ratedVoltage: result[0].ratedVoltage,

        inverterType: result[0].inverterType,
        maxPowerOutput: result[0].maxPowerOutput,
        inverterMaxPowerOutput: result[0].inverterMaxPowerOutput,
        inverterAcOutputVoltage: result[0].inverterAcOutputVoltage,
        maxAcCurrentOutput: result[0].maxAcCurrentOutput,
        cec: result[0].cec,

        optimizerMaxDcCurrentInput: result[2].optimizerMaxDcCurrentInput,
        optimizerMaxDcCurrentOutput: result[2].optimizerMaxDcCurrentOutput,
        optimizerMaxPowerOutput: result[2].optimizerMaxPowerOutput,
        optimizerMaxDcVoltage: result[2].optimizerMaxDcVoltage,
        optimizerModel: result[2].optimizerModel,

        panelMaxSystemVoltage: result[1].maxSystemVoltage,
        panelIsc: result[1].isc,
        panelVoc: result[1].voc,
        panelImp: result[1].imp,
        panelVmp: result[1].vmp,
        panelPower: result[1].power,
        panelType: result[1].type,

        customerName: req.body.customerName,
        jobType: req.body.jobType,
        // systemPower: req.body.systemPower,
        systemPower: calcSystemPower(),
        address1: req.body.address1,
        address2: req.body.address2,
        drawingDate: req.body.drawingDate
      });
      function calcNumberOfString() {
        // const numbOfString = [Number(req.body.numberOfModuleInverter1String1) ,
        //   Number(req.body.numberOfModuleInverter1String2) ,
        //   Number(req.body.numberOfModuleInverter1String3)]
        let numbOfString = 0;
        num1 = 0;
        num2 = 0;
        num3 = 0;
        if (
          Number(req.body.numberOfModuleInverter1String1) == 0 ||
          Number(req.body.numberOfModuleInverter1String1) == null
        ) {
          num1 = 0;
        } else {
          num1 = 1;
        }
        if (
          Number(req.body.numberOfModuleInverter1String2) == 0 ||
          Number(req.body.numberOfModuleInverter1String2) == null
        ) {
          num2 = 0;
        } else {
          num2 = 1;
        }
        if (
          Number(req.body.numberOfModuleInverter1String3) == 0 ||
          Number(req.body.numberOfModuleInverter1String3) == null
        ) {
          num3 = 0;
        } else {
          num3 = 1;
        }
        return num1 + num2 + num3;
      }
      function calcSystemPower() {
        SystemPower =
          (Number(req.body.numberOfModuleInverter1String1) +
          Number(req.body.numberOfModuleInverter1String2) +
          Number(req.body.numberOfModuleInverter1String3)) * calcNumberOfString() * result[1].power;
        return SystemPower;
      }
      function calcFuseSize() {
        // switch () {
        val = result[0].maxAcCurrentOutput * 1.25;
        switch (true) {
          case val <= 40:
            fuseSize = 40;
            break;
          case val <= 45:
            fuseSize = 45;
            break;
          case val <= 50:
            fuseSize = 50;
            break;
          case val <= 60:
            fuseSize = 60;
            break;
          case val <= 70:
            fuseSize = 70;
            break;
          case val <= 80:
            fuseSize = 80;
            break;
          case val <= 90:
            fuseSize = 90;
            break;
          case val <= 100:
            fuseSize = 100;
            break;
          case val <= 110:
            fuseSize = 110;
            break;
          case val <= 120:
            fuseSize = 120;
            break;
          case val <= 125:
            fuseSize = 125;
            break;

          default:
            fuseSize = 0;
            break;
        }
        return fuseSize;
      }
      function calcFusedAcDisconnectAmpRating() {
        // TODO: If space not available and line side - min fusedAcDisconnectAmpRating=60A
        val = result[0].maxAcCurrentOutput * 1.25;
        switch (true) {
          case val <= 30:
            fusedAcDisconnectAmpRating = 30;
            break;
          case val <= 60:
            fusedAcDisconnectAmpRating = 60;
            break;
          case val <= 100:
            fusedAcDisconnectAmpRating = 100;
            break;
          case val <= 200:
            fusedAcDisconnectAmpRating = 200;
            break;

          default:
            fusedAcDisconnectAmpRating = 0;
            break;
        }
        return fusedAcDisconnectAmpRating;
      }
      function calcUnFusedAcDisconnectAmpRating() {
        // TODO: If space not available and line side - min fusedAcDisconnectAmpRating=60A
        val = result[0].maxAcCurrentOutput * 1.25;
        switch (true) {
          case val <= 30:
            fusedAcDisconnectAmpRating = 30;
            break;
          case val <= 60:
            fusedAcDisconnectAmpRating = 60;
            break;
          case val <= 100:
            fusedAcDisconnectAmpRating = 100;
            break;
          case val <= 200:
            fusedAcDisconnectAmpRating = 200;
            break;

          default:
            fusedAcDisconnectAmpRating = 0;
            break;
        }
        return fusedAcDisconnectAmpRating;
      }
      res.json({ msg: newProject });
      res.json({ msg: result });
      res.json({ msg: result[0].inverterType });
    });
  }
);
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
      panel: req.body.panel,
      inverter: req.body.inverter,

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
    if (req.body.customerName) {
      projectField.customerName = req.body.customerName;
    }
    if (req.body.address1) {
      projectField.address1 = req.body.address1;
    }
    if (req.body.address2) {
      projectField.address2 = req.body.address2;
    }

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
