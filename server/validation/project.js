const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.customerName = !isEmpty(data.customerName) ? data.customerName : '';

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
