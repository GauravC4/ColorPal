var Utility = (function UtilityModule() {
  const COLOR_BLACK = "black";
  const COLOR_WHITE = "white";

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

  return {
    generateHex: generateHex,
    getForegroundColor: getForegroundColor,
  };
})();
