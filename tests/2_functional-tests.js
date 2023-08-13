const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const api = require("../routes/api.js");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  //#1
  test("FT#1 ?input=10L (valid input unit)", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200, "Response status should be 200");
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  //#2
  test("FT#2 ?input=32g (invalid input unit)", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.body, "invalid unit");
        done();
      });
  });
  //#3
  test("FT#3 ?input=3/7.2/4kg (invalid input number)", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.body, "invalid number");
        done();
      });
  });
  //#4
  test("FT#4 ?input=3/7.2/4kilomegagram (invalid input number and unit)", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });
  //#5
  test("FT#5 ?input=''kg (no input number)", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200, "Response status should be 200");
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});
