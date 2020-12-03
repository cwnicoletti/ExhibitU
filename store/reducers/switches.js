import {
  SET_DARKMODE,
  SET_SHOWCASELOCALMODE,
  SHOW_RESUME,
} from "../actions/switches";

const intialState = {
  darkMode: false,
  showcaseLocalMode: false,
  showResume: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkModeValue,
      };
    case SET_SHOWCASELOCALMODE:
      return {
        ...state,
        showcaseLocalMode: action.showcaseLocalValue,
      };
    case SHOW_RESUME:
      return {
        ...state,
        showResume: action.showResumeValue,
      };
    default:
      return state;
  }
};
