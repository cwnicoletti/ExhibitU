export const SET_DARKMODE = "SET_DARKMODE";
export const SET_SHOWCASELOCALMODE = "SET_SHOWCASELOCALMODE";
export const SHOW_RESUME = "SHOW_RESUME";
export const HIDE_FOLLOWING = "HIDE_FOLLOWING";
export const HIDE_FOLLOWERS = "HIDE_FOLLOWERS";
export const HIDE_ADVOCATES = "HIDE_ADVOCATES";

export const setDarkMode = (value) => {
  return { type: SET_DARKMODE, darkModeValue: value };
};

export const setShowcaseLocalMode = (value) => {
  return { type: SET_SHOWCASELOCALMODE, showcaseLocalValue: value };
};

export const setShowResume = (value) => {
  return { type: SHOW_RESUME, showResumeValue: value };
};

export const setHideFollowing = (value) => {
  return { type: HIDE_FOLLOWING, hideFollowingValue: value };
};

export const setHideFollowers = (value) => {
  return { type: HIDE_FOLLOWERS, hideFollowersValue: value };
};

export const setHideAdvocates = (value) => {
  return { type: HIDE_ADVOCATES, hideAdvocatesValue: value };
};
