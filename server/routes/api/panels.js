const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// @route   GET api/panels/test
// @desc    Tests panels route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Panel Works' }));

// @route  GET api/panels
// @desc   Get Panels
// @access Public
router.get('/', (req, res) => {
  res.json(
    [
      {
          "id":1,
          "panelsManufacturer": "Trina",
          "panelType": "TSM-300DD05A.08(II)",
          "power": "300",
          "vmp": "38.7",
          "imp": "8.93",
          "voc": "47.3",
          "isc": "9.41",
          "vocTempCoef": "0.3",
          "vmpTempCoef": "0.29",
          "iscTempCoef": "0.04"  ,
          "maxSystemVoltage": "1000",  
          "optimizerModel": "P320",  
          "optimizerMaxDcVoltage": "48V",  
          "optimizerMaxPowerOutput": "320W",  
          "optimizerMaxDcCurrentOutput": "15",  
          "optimizerMaxDcCurrentInput": "13.75"  
          
      },
      {
          "id":2,
          "panelsManufacturer": "HANWHA",
          "panelType": "REC 280 Q.PLUS BFR G4.1",
          "power": "280",
          "vmp": "31.67",
          "imp": "8.84",
          "voc": "38.97",
          "isc": "9.41",
          "vocTempCoef": "0.29",
          "vmpTempCoef": "0.29",
          "iscTempCoef": "0.04"  ,
          "maxSystemVoltage": "1000",  
          "optimizerModel": "P300",  
          "optimizerMaxDcVoltage": "48V",  
          "optimizerMaxPowerOutput": "300W",  
          "optimizerMaxDcCurrentOutput": "15",  
          "optimizerMaxDcCurrentInput": "12.5" 
      }
      ,
      {
          "id":3,
          "panelsManufacturer": "HANWHA",
          "panelType": "HANWHA 300 Q.PLUS BFR G4.1",
          "power": "300",
          "vmp": "31.67",
          "imp": "8.84",
          "voc": "38.97",
          "isc": "9.41",
          "vocTempCoef": "0.29",
          "vmpTempCoef": "0.29",
          "iscTempCoef": "0.04"  ,
          "maxSystemVoltage": "1000",  
          "optimizerModel": "P300",  
          "optimizerMaxDcVoltage": "48V",  
          "optimizerMaxPowerOutput": "300W",  
          "optimizerMaxDcCurrentOutput": "600",  
          "optimizerMaxDcCurrentInput": "600" 
      }
      ,
      {
          "id":4,
          "panelsManufacturer": "HANWHA",
          "panelType": "suniva 290 Q.PLUS BFR G4.1",
          "power": "290",
          "vmp": "33",
          "imp": "8.84",
          "voc": "38.97",
          "isc": "8.41",
          "vocTempCoef": "0.29",
          "vmpTempCoef": "0.29",
          "iscTempCoef": "0.04" ,
          "maxSystemVoltage": "1000",  
          "optimizerModel": "P300",  
          "optimizerMaxDcVoltage": "48V",  
          "optimizerMaxPowerOutput": "300W",  
          "optimizerMaxDcCurrentOutput": "600",  
          "optimizerMaxDcCurrentInput": "600" 
      }
  ]
  );
});

module.exports = router;
