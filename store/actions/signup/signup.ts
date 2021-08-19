import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  INTROING,
  SIGNUP_EMAIL,
  SIGNUP_FULLNAME,
  SIGNUP_USERNAME,
} from "./types";

export const setIntroing = (value: boolean) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("introing", JSON.stringify({ introing: value }));

    await dispatch({ type: INTROING, introing: value });
  };
};

export const setEmail = (value: string) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_EMAIL, email: value });
  };
};

export const setFullname = (value: string) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_FULLNAME, fullname: value });
  };
};

export const setUsername = (value: string) => {
  return async (dispatch) => {
    await dispatch({ type: SIGNUP_USERNAME, username: value });
  };
};
