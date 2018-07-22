const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
  // Project model
  // const Project = require('../../models/Project');
  // const Panel = require('../../models/Panel');
  // const Optimizer = require('../../models/Optimizer');
  const Inverter = require('../models/Inverter');
  let errors = {};
  const inverter = new Promise((resolve, reject) => {
    // errors.inverter = data.inverter;
    Inverter.findOne({ _id: data.inverter }).then(inverter => {
      resolve(inverter);
    });
  });
  Promise.all([inverter]).then(result => { 
    errors.inverter = 'result';
    if (Validator.isEmpty(result)) {
      errors.inverter = 'Inverter field is required';
    }
  });
  data.inverter = !isEmpty(data.inverter) ? data.inverter : '';

  if (Validator.isEmpty(data.inverter)) {
    errors.inverter = 'Inverter field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
