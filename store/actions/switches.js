export const SET_DARKMODE = "SET_DARKMODE";
export const SET_SHOWCASELOCALMODE = "SET_SHOWCASELOCALMODE";
export const SHOW_RESUME = "SHOW_RESUME";

export const setDarkMode = (value) => {
  return { type: SET_DARKMODE, darkModeValue: value };
};

export const setShowcaseLocalMode = (value) => {
  return { type: SET_SHOWCASELOCALMODE, showcaseLocalValue: value };
};

export const setShowResume = (value) => {
  return { type: SHOW_RESUME, showResumeValue: value };
};
