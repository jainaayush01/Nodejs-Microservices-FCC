const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler.getNum(input)', function() {
    test('Whole Number Input', function(done) {
      var input = "1km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
    
    test('Decimal Number Input', function(done) {
      var input = "1.2km";
      assert.equal(convertHandler.getNum(input), 1.2);
      done();
    })

    test('Fractional Input', function(done) {
      var input = "1/2km";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    })

    test('Fractional Input with a Decimal Number', function(done) {
      var input = "5/2.5km";
      assert.equal(convertHandler.getNum(input), 2);
      done();
    })

    test('Error on a Double Fraction', function(done) {
      var input = "3/2/1km";
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    })

    test('Default Numerical Input to 1', function(done) {
      var input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
  })
});