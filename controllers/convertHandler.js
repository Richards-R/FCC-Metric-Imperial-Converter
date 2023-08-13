function ConvertHandler() {
  let initUnit;
  let spelledInitUnit;
  let spelledReturnUnit;
  let numArr = [];
  let unitArr = [];
  let spelledInitReturnUnit = [];

  this.getNum = function (input) {
    let numArr = [];
    let result;
    const mapString = (str, fn) =>
      str
        .split("")
        .map((c, i) => fn(c, i, str))
        .join("");

    mapString(input, (c) => {
      if (!isNaN(c) || c === "." || c === "/") {
        numArr.push(c);
      }
    });
    let initNumResult = numArr.join("");
    if (initNumResult === "") {
      initNumResult = "1";
    }

    if (initNumResult.replace(/[^/]/g, "").length <= 1) {
      result = eval(initNumResult);
    } else if (isNaN(initNumResult)) {
      result = "invalid number";
    } else {
      result = eval(initNumResult);
    }
    return result;
  };

  this.getUnit = function (input) {
    let unitArr = [];
    let result;
    const mapString = (str, fn) =>
      str
        .split("")
        .map((c, i) => fn(c, i, str))
        .join("");

    mapString(input, (c) => {
      if (isNaN(c) && c !== "." && c !== "/") {
        unitArr.push(c);
      }
    });
    let initUnitResult = unitArr.join("");

    if (
      initUnitResult !== "gal" &&
      initUnitResult !== "GAL" &&
      initUnitResult !== "lbs" &&
      initUnitResult !== "LBS" &&
      initUnitResult !== "mi" &&
      initUnitResult !== "MI" &&
      initUnitResult !== "L" &&
      initUnitResult !== "l" &&
      initUnitResult !== "kg" &&
      initUnitResult !== "KG" &&
      initUnitResult !== "km" &&
      initUnitResult !== "KM"
    ) {
      result = "invalid unit";
    } else if (initUnitResult === "l" || initUnitResult === "L") {
      result = "L";
    } else {
      result = initUnitResult.toLowerCase();
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit === "gal" || initUnit === "GAL") {
      result = "L";
    } else if (initUnit === "lbs" || initUnit === "LBS") {
      result = "kg";
    } else if (initUnit === "mi" || initUnit === "MI") {
      result = "km";
    } else if (initUnit === "L" || initUnit === "l") {
      result = "gal";
    } else if (initUnit === "kg" || initUnit === "KG") {
      result = "lbs";
    } else if (initUnit === "km" || initUnit === "KM") {
      result = "mi";
    } else result = "invalid unit";
    returnUnit = result;
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    if (unit === "gal") {
      spelledInitUnit = "liters";
      spelledReturnUnit = "gallons";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else if (unit === "lbs") {
      spelledInitUnit = "kilograms";
      spelledReturnUnit = "pounds";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else if (unit === "mi") {
      spelledInitUnit = "kilometers";
      spelledReturnUnit = "miles";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else if (unit === "L") {
      spelledInitUnit = "gallons";
      spelledReturnUnit = "liters";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else if (unit === "kg") {
      spelledInitUnit = "pounds";
      spelledReturnUnit = "kilograms";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else if (unit === "km") {
      spelledInitUnit = "miles";
      spelledReturnUnit = "kilometers";
      spelledInitReturnUnit = [spelledInitUnit, spelledReturnUnit];
    } else spelledInitReturnUnit = "invalid unit";

    result = spelledInitReturnUnit;
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === "") {
      initUnit = "invalid unit";
    }
    if (initUnit === "gal" || initUnit === "GAL") {
      result = eval(initNum) * galToL;
    } else if (initUnit === "lbs" || initUnit === "LBS") {
      result = eval(initNum) * lbsToKg;
    } else if (initUnit === "mi" || initUnit === "MI") {
      result = eval(initNum) * miToKm;
    } else if (initUnit === "L" || initUnit === "l") {
      result = eval(initNum) / galToL;
    } else if (initUnit === "kg" || initUnit === "KG") {
      result = eval(initNum) / lbsToKg;
    } else if (initUnit === "km" || initUnit === "KM") {
      result = eval(initNum) / miToKm;
    } else result = "invalid number";
    let returnNum = result.toFixed(5);
    return result;
  };

  this.getString = function (
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    spelledInitReturnUnit,
  ) {
    let result = {
      initNum: Math.round(initNum * 100000) / 100000,
      initUnit: initUnit,
      returnNum: Math.round(returnNum * 100000) / 100000,
      returnUnit: returnUnit,
      string:
        Math.round(initNum * 100000) / 100000 +
        " " +
        spelledInitReturnUnit[0] +
        " converts to " +
        Math.round(returnNum * 100000) / 100000 +
        " " +
        spelledInitReturnUnit[1],
    };
    return result;
  };
}

module.exports = ConvertHandler;
