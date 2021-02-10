import {
  SET_DARKMODE,
  SHOW_RESUME,
  SHOW_CHEERING,
  HIDE_FOLLOWING,
  HIDE_FOLLOWERS,
  HIDE_ADVOCATES,
} from "../actions/switches";

import { GET_SWITCHES } from "../actions/user";

const intialState = {
  darkMode: true,
  showResume: false,
  showCheering: true,
  hideFollowing: false,
  hideFollowers: false,
  hideAdvocates: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_SWITCHES:
      return {
        darkMode: action.darkMode,
        showResume: action.showResume,
        showCheering: action.showCheering,
        hideFollowing: action.hideFollowing,
        hideFollowers: action.hideFollowers,
        hideAdvocates: action.hideAdvocates,
      };
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case SHOW_RESUME:
      return {
        ...state,
        showResume: action.showResumeValue,
      };
    case SHOW_CHEERING:
      return {
        ...state,
        showCheering: action.showCheering,
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
