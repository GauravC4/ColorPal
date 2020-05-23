var LocalStore = (function LocalStoreModule() {
  const KEY = "COLORPAL";
  const LOCAL_STORAGE_LIMIT = 10;

  function getLocal(hex = false) {
    let local = localStorage.getItem(KEY);
    if (local) {
      local = JSON.parse(local);
      if (!hex)
        local.forEach((el) => {
          el.value = el.value.map((color) => chroma(color));
        });
      return local;
    }
    return [];
  }
  function _setLocal(local) {
    localStorage.setItem(KEY, JSON.stringify(local));
  }
  function _checkDuplicate(name, arr) {
    if (!arr.some((el) => el.name == name)) return name;
    return name + "_" + Utility.getRandomNumber();
  }
  function addToLocal(element) {
    let local = getLocal(true);
    element.name = _checkDuplicate(element.name, local);
    local.unshift(element);
    if (local.length > LOCAL_STORAGE_LIMIT) local.length = LOCAL_STORAGE_LIMIT;
    localStorage.setItem(KEY, JSON.stringify(local));
  }
  function getFromLocal(key) {
    let local = getLocal();
    if (!local) return;
    let index = local.map((el) => el.name).indexOf(key);
    if (index < 0) return null;
    let palette = local[index];
    _increasePriority(index);
    return palette;
  }
  function _increasePriority(index) {
    let local = getLocal(true);
    local = [local[index], ...local.slice(0, index), ...local.slice(index + 1)];
    _setLocal(local);
  }

  return {
    getLocal: getLocal,
    addToLocal: addToLocal,
    getFromLocal: getFromLocal,
  };
})();
