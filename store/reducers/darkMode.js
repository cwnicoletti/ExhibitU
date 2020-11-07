import { SET_DARKMODE } from "../actions/darkMode";

const intialState = {
  darkMode: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkModeValue,
      };
    default:
      return state;
  }
};
