var Utility = (function UtilityModule() {
  const COLOR_BLACK = "black";
  const COLOR_WHITE = "white";
  const HSL_ENUM = Object.freeze({
    Hue: "hsl.h",
    Saturation: "hsl.s",
    Level: "hsl.l",
  });

  function generateHex() {
    return chroma.random();
  }

  function _isColorDark(color) {
    if (color && chroma.valid(color)) {
      return chroma(color).luminance() < 0.5;
    }
    return false;
  }

  function getForegroundColor(backgroundColor) {
    if (_isColorDark(backgroundColor)) {
      return COLOR_WHITE;
    }
    return COLOR_BLACK;
  }

  function getHslLimits(color, hsl) {
    return [color.set(hsl, 0), color.set(hsl, 0.5), color.set(hsl, 1)];
  }

  function setHSL(color, hsl) {
    return color.set("hsl.h", hsl[0]).set("hsl.l", hsl[1]).set("hsl.s", hsl[2]);
  }

  function getRandomNumber() {
    return Math.ceil(Math.random() * 1000);
  }

  return {
    HSL_ENUM: HSL_ENUM,
    generateHex: generateHex,
    getForegroundColor: getForegroundColor,
    getHslLimits: getHslLimits,
    setHSL: setHSL,
    getRandomNumber: getRandomNumber,
  };
})();
