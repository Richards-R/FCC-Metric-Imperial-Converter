const chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  //#1
  test("#1 should correctly read a whole number input", function () {
    let input = "10L";
    assert.isNumber(convertHandler.getNum(input), "Is a whole number input");
  });

  //#2
  test("#2 should correctly read a decimal number input", function () {
    let input = "0.25km";
    assert.isNumber(convertHandler.getNum(input), "Is a number");
  });

  //#3
  test("#3 should correctly read a fractional input", function () {
    let input = "1/2kg";
    assert.isNumber(convertHandler.getNum(input), "Is a number");
  });

  //#4
  test("#4 should correctly read a fractional input with a decimal", function () {
    let input = "1.5/2lbs";
    assert.isNumber(convertHandler.getNum(input), "Is a number");
  });

  //#5
  test("#5 should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    let input = "3/1/2kg";
    assert.isNotNumber(convertHandler.getNum(input), "Is not a number");
  });

  //#6
  test("#6 should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    input = "kg";
    assert.isNumber(convertHandler.getNum(input), "No input is one");
  });

  //#7
  test("#7 should correctly read each valid input unit", function () {
    let input = [
      "gal",
      "GAL",
      "lbs",
      "LBS",
      "mi",
      "MI",
      "kg",
      "KG",
      "km",
      "KM",
    ];
    let lInput = ["L", "l"];
    input.forEach(function (unitType) {
      assert.equal(
        convertHandler.getUnit(32 + unitType),
        unitType.toLowerCase(),
        "Each input unit is valid",
      );
    });
    lInput.forEach(function (unitType) {
      assert.equal(
        convertHandler.getUnit(32 + unitType),
        unitType.toUpperCase(),
        "Each input unit is valid",
      );
    });
  });

  //#8
  test("#8 should correctly return an error for an invalid input unit", function () {
    let input = "hours";
    let validUnits = [
      "gal",
      "GAL",
      "lbs",
      "LBS",
      "mi",
      "MI",
      "kg",
      "KG",
      "km",
      "KM",
      "L",
      "l",
    ];
    validUnits.forEach(function (unitType) {
      assert.notEqual(
        convertHandler.getUnit(input),
        unitType,
        "Input unit is invalid",
      );
    });
  });

  //#9
  test("#9 should return the correct return unit for each valid input unit", function () {
    let input = [
      "gal",
      "GAL",
      "lbs",
      "LBS",
      "mi",
      "MI",
      "kg",
      "KG",
      "km",
      "KM",
      "L",
      "l",
    ];
    let expectedOutput = [
      "L",
      "L",
      "kg",
      "kg",
      "km",
      "km",
      "lbs",
      "lbs",
      "mi",
      "mi",
      "gal",
      "gal",
    ];
    input.forEach(function (inputType, i) {
      assert.equal(
        convertHandler.getReturnUnit(inputType),
        expectedOutput[i],
        "Input unit is returned as correct new unit",
      );
    });
  });

  //#10
  test("#10 should correctly return the spelled-out string unit for each valid input unit", function () {
    let input = ["L", "kg", "km", "lbs", "mi", "gal"];
    let expectedSpelledOutput = [
      ["gallons", "liters"],
      ["pounds", "kilograms"],
      ["miles", "kilometers"],
      ["kilograms", "pounds"],
      ["kilometers", "miles"],
      ["liters", "gallons"],
    ];
    input.forEach(function (inputUnit, i) {
      assert.equal(
        convertHandler.spellOutUnit(inputUnit)[1],
        expectedSpelledOutput[i][1],
      );
    });
  });

  //#11
  test("#11 should correctly convert gal to L", function () {
    let input = "gal";
    let expectedOutput = "L";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });

  //#12
  test("#12 should correctly convert L to gal", function () {
    let input = "L";
    let expectedOutput = "gal";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });

  //#13
  test("#13 should correctly convert mi to km", function () {
    let input = "mi";
    let expectedOutput = "km";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });

  //#14
  test("#14 should correctly convert km to mi", function () {
    let input = "km";
    let expectedOutput = "mi";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });

  //#15
  test("#15 should correctly convert lbs to kg", function () {
    let input = "lbs";
    let expectedOutput = "kg";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });

  //#16
  test("#16 should correctly convert kg to lbs", function () {
    let input = "kg";
    let expectedOutput = "lbs";
    assert.equal(convertHandler.getReturnUnit(input), expectedOutput);
  });
});
