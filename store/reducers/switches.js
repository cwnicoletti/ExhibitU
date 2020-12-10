import {
  SET_DARKMODE,
  SET_SHOWCASELOCALMODE,
  SHOW_RESUME,
  HIDE_FOLLOWING,
  HIDE_FOLLOWERS,
  HIDE_ADVOCATES,
} from "../actions/switches";

const intialState = {
  darkMode: false,
  showcaseLocalMode: false,
  showResume: false,
  hideFollowing: false,
  hideFollowers: false,
  hideAdvocates: false,
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
    case HIDE_FOLLOWING:
      return {
        ...state,
        hideFollowing: action.hideFollowingValue,
      };
    case HIDE_FOLLOWERS:
      return {
        ...state,
        hideFollowers: action.hideFollowersValue,
      };
    case HIDE_ADVOCATES:
      return {
        ...state,
        hideAdvocates: action.hideAdvocatesValue,
      };
    default:
      return state;
  }
};
