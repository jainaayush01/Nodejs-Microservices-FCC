'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    console.log(input);
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if(initNum === "invalid number") {
      if(initUnit === "invalid unit") {
        res.end('invalid number and unit')
      }
      else res.end(initNum);
    }
    else if(initUnit === "invalid unit") {
      res.end(initUnit);
    }
    else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      console.log({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      })
    }
  })

};
