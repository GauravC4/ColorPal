var LocalStore = (function LocalStoreModule() {
  const KEY = "COLORPAL";
  const LOCAL_STORAGE_LIMIT = 10;

  function getFromLocal() {
    let local = localStorage.getItem(KEY);
    if (local) return JSON.parse(local);
    return [];
  }
  function addToLocal(element) {
    let local = getFromLocal();
    local.unshift(element);
    localStorage.setItem(KEY, JSON.stringify(local));
  }

  return {
    getFromLocal: getFromLocal,
    addToLocal,
  };
})();