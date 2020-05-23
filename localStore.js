var LocalStore = (function LocalStoreModule() {
  const KEY = "COLORPAL";
  const LOCAL_STORAGE_LIMIT = 10;

  function getLocal() {
    let local = localStorage.getItem(KEY);
    if (local) {
      local = JSON.parse(local);
      local.forEach((el) => {
        el.value = el.value.map((color) => chroma(color));
      });
      return local;
    }
    return [];
  }
  function _checkDuplicate(name, arr) {
    if (!arr.some((el) => el.name == name)) return name;
    return name + "_" + Utility.getRandomNumber();
  }
  function addToLocal(element) {
    let local = getLocal();
    element.name = _checkDuplicate(element.name, local);
    local.unshift(element);
    if (local.length > LOCAL_STORAGE_LIMIT) local.length = LOCAL_STORAGE_LIMIT;
    localStorage.setItem(KEY, JSON.stringify(local));
  }
  function getFromLocal(key) {
    let local = getLocal();
    if (!local) return;
    return local.find((element) => element.name == key);
  }

  return {
    getLocal: getLocal,
    addToLocal: addToLocal,
    getFromLocal: getFromLocal,
  };
})();
