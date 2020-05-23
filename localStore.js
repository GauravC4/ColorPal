var LocalStore = (function LocalStoreModule() {
  const KEY = "COLORPAL";
  const LOCAL_STORAGE_LIMIT = 10;

  function getFromLocal() {
    let local = localStorage.getItem(KEY);
    if (local) return JSON.parse(local);
    return [];
  }
  function _checkDuplicate(name, arr) {
    if (!arr.some((el) => el.name == name)) return name;
    return name + "_" + Utility.getRandomNumber();
  }

  function addToLocal(element) {
    let local = getFromLocal();
    element.name = _checkDuplicate(element.name, local);
    local.unshift(element);
    if (local.length > LOCAL_STORAGE_LIMIT) local.length = LOCAL_STORAGE_LIMIT;
    localStorage.setItem(KEY, JSON.stringify(local));
  }

  return {
    getFromLocal: getFromLocal,
    addToLocal,
  };
})();
