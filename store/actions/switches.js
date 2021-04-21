import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const SET_DARKMODE = "SET_DARKMODE";
export const SET_SHOWCASELOCALMODE = "SET_SHOWCASELOCALMODE";
export const SHOW_RESUME = "SHOW_RESUME";
export const SHOW_CHEERING = "SHOW_CHEERING";
export const HIDE_FOLLOWING = "HIDE_FOLLOWING";
export const HIDE_FOLLOWERS = "HIDE_FOLLOWERS";
export const HIDE_ADVOCATES = "HIDE_ADVOCATES";

export const setDarkMode = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = { localId, creatistId, value, switchName: "darkMode" };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.darkMode = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SET_DARKMODE, darkMode: value });
  };
};

export const setShowResume = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId,
      creatistId,
      value,
      switchName: "showResume",
    };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.showResume = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SHOW_RESUME, showResumeValue: value });
  };
};

export const setShowCheering = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId,
      creatistId,
      value,
      switchName: "showCheering",
    };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.showCheering = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: SHOW_CHEERING, showCheering: value });
  };
};

export const setHideFollowing = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId,
      creatistId,
      value,
      switchName: "hideFollowing",
    };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.hideFollowing = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_FOLLOWING, hideFollowingValue: value });
  };
};

export const setHideFollowers = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId,
      creatistId,
      value,
      switchName: "hideFollowers",
    };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.hideFollowers = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_FOLLOWERS, hideFollowersValue: value });
  };
};

export const setHideAdvocates = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId,
      creatistId,
      value,
      switchName: "hideAdvocates",
    };

    axios.post(
      `https://us-central1-creatist-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.hideAdvocates = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: HIDE_ADVOCATES, hideAdvocatesValue: value });
  };
};
