import AsyncStorage from "@react-native-async-storage/async-storage";

export const INTROING = "INTROING";
export const SIGNUP_EMAIL = "SIGNUP_EMAIL";
export const SIGNUP_FULLNAME = "SIGNUP_FULLNAME";
export const SIGNUP_USERNAME = "SIGNUP_USERNAME";
export const SIGNUP_PASSWORD = "SIGNUP_PASSWORD";

export interface SignUpState {
  introing: boolean;
  email: string;
  fullname: string;
  username: string;
}

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
