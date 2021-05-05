function ConvertHandler() {

  this.getNum = function(input) {
    let regex = /[a-zA-Z]/;
    let inp = input.split(regex);
    let result;
    inp = inp[0];
    if (inp !== "") {
      if (inp.includes("/")) {
        result = inp.split("/").length !== 2 ? 'invalid number' : eval(inp);
      }
      else {
        result = parseFloat(inp);
      }
    }
    else {
      result = 1;
    }
    return result;
  };

  this.getUnit = function(input) {
    let regex = /[a-zA-Z]+$/;
    let inp = input.match(regex);
    inp = inp[0];
    let result;
    if (inp && ["gal", "lbs", "mi", "l", "kg", "km"].includes(inp.toLowerCase())) {
      result = inp;
      result = result.toLowerCase();
      if(result === "l") result = "L";
    } else {
      result = "invalid unit";
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "lbs":
        result = "kg";
        break;
      case "mi":
        result = "km";
        break;
      case "l":
        result = "gal";
        break;
      case "kg":
        result = "lbs";
        break;
      case "km":
        result = "mi";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "mi":
        result = "miles";
        break;
      case "l":
        result = "liters";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "km":
        result = "kilometers";
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
