const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  suite('convertHandler.getNum(input)', () => {
    test('read a whole number input', (done) => {
      var input = "1km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
    
    test('read a decimal number input', (done) => {
      var input = "1.2km";
      assert.equal(convertHandler.getNum(input), 1.2);
      done();
    })

    test('read a fractional input', (done) => {
      var input = "1/2km";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    })

    test('read a fractional input with a decimal', (done) => {
      var input = "5/2.5km";
      assert.equal(convertHandler.getNum(input), 2);
      done();
    })

    test('return an error on a double-fraction', (done) => {
      var input = "3/2/1km";
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    })

    test('default to a numerical input of 1 when no numerical input is provided', (done) => {
      var input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
  })


  suite('convertHandler.getUnit(input)', () => {
    test('read each valid input unit', (done) => {
      var correctInput = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
      correctInput.forEach((unit) => {
        var input = `23${unit}`;
        unit = unit.toLowerCase();
        if(unit === "l") unit = "L";
        assert.equal(convertHandler.getUnit(input), unit);
      })
      done();
    })
    
    test('return an error for an invalid input unit', (done) => {
      var input = "23notunit";
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    })
  })

  suite('convertHandler.returnUnit(initUnit)', () => {
    test('return the correct return unit for each valid input unit', (done) => {
      var validUnit = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var returnUnit = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      validUnit.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), returnUnit[i]);
      });
      done();
    })
  })

  suite('convertHandler.spellOutUnit(unit)', () => {
    test('return the spelled-out string unit for each valid input unit', (done) => {
      var units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var spellOutUnit = ['gallons', 'liters', 'miles', 'kilometers', 'pounds' , 'kilograms'];
      units.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), spellOutUnit[i]);
      });
      done();
    })
  })

  suite('convertHandler.convert(initNum, initUnit)', () => {
    test('convert gal to L', (done) => {
      var initNum = 1.5;
      var initUnit = "gal";
      var returnNum = 5.67812;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })

    test('convert L to gal', (done) => {
      var initNum = 2.3;
      var initUnit = "L";
      var returnNum = 0.60760;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })

    test('convert mi to km', (done) => {
      var initNum = 13.8;
      var initUnit = "mi";
      var returnNum = 22.20889;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })

    test('convert km to mi', (done) => {
      var initNum = 4;
      var initUnit = "km";
      var returnNum = 2.48549;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })

    test('convert lbs to kg', (done) => {
      var initNum = 150;
      var initUnit = "lbs";
      var returnNum = 68.03880;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })

    test('convert kg to lbs', (done) => {
      var initNum = 48;
      var initUnit = "kg";
      var returnNum = 105.82197;
      assert.approximately(convertHandler.convert(initNum, initUnit), returnNum, 0.1)
      done();
    })
  })
});