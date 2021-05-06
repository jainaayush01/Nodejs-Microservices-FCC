const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('GET /api/convert Route tests with chai-http', () => {
    test('Test GET /api/convert with valid input', (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({
          input: "10L"
        })
        .end(function (err, res) {
          var string = "10 liters converts to 2.64172 gallons"
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(res.body.string, string);
        });
      done();
    })

    test('Test GET /api/convert with invalid input unit', (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({
          input: "25g"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
        });
      done();
    })

    test('Test GET /api/convert with invalid input number', (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({
          input: "3/4/8L"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
        });
      done();
    })

    test('Test GET /api/convert with invalid input number and unit', (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({
          input: "2/3/5g"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
        });
      done();
    })

    test('Test GET /api/convert with no input number', (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({
          input: "L"
        })
        .end(function (err, res) {
          var string = "1 liters converts to 0.26417 gallons"
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 0.26417, 0.1);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(res.body.string, string);
        });
      done();
    })
  })
});
