import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const INTROING = "INTROING";
export const SIGNUP_EMAIL = "SIGNUP_EMAIL";
export const SIGNUP_FULLNAME = "SIGNUP_FULLNAME";
export const SIGNUP_USERNAME = "SIGNUP_USERNAME";
export const SIGNUP_PASSWORD = "SIGNUP_PASSWORD";

export const setIntroing = (localId, creatistId, value) => {
  return async (dispatch) => {
    const userFeedGet = { localId, creatistId, value, switchName: "introing" };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitch`,
      userFeedGet
    );

    AsyncStorage.getItem("userLoginData").then(async (data) => {
      data = JSON.parse(data);
      data.introing = value;
      await AsyncStorage.setItem("userLoginData", JSON.stringify(data));
    });
    
    await dispatch({ type: INTROING, introing: value });
  };
};

export const setEmail = (value) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_EMAIL, email: value });
  };
};

export const setFullname = (value) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_FULLNAME, fullname: value });
  };
};

export const setUsername = (value) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_USERNAME, username: value });
  };
};
