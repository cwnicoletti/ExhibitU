const updateDictionaryOnRemove = (state: object) => {
  let linkNum: number = 1;
  for (const key in state) {
    if (key.search("link") !== -1) {
      state[`link${linkNum}`] = state[key];
      if (`link${linkNum}` !== key) {
        delete state[key];
      }
      linkNum += 1;
    }
  }
  return state;
};

export default updateDictionaryOnRemove;
