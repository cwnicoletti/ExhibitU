const updateArrayOnRemove = (state) => {
  state.forEach((object: object, i: number) => {
    for (const key in object) {
      if (key.search("linkTitle") !== -1) {
        object[`linkTitle${i + 1}`] = object[key];
        if (`linkTitle${i + 1}` !== key) {
          delete object[key];
        }
      } else if (key.search("linkUrl") !== -1) {
        object[`linkUrl${i + 1}`] = object[key];
        if (`linkUrl${i + 1}` !== key) {
          delete object[key];
        }
      } else if (key.search("linkId") !== -1) {
        object[`linkId`] = i + 1;
      }
    }
  });
  return state;
};

export default updateArrayOnRemove;
