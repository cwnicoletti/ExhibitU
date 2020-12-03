import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { getUserData } from "./user";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, fullname, username, password) => {
  return async (dispatch) => {
    const signupForm = {
      email: email,
      fullname: fullname,
      username: username,
      password: password,
    };
    const getSignupResponse = await axios.post(
      `https://us-central1-showcase-27b11.cloudfunctions.net/signupUser`,
      signupForm
    );

    console.log(getSignupResponse);

    saveDataToStorage(
      getSignupResponse.data.localId,
      getSignupResponse.data.idToken
    );
    saveUserDocumentToStorage(
      getSignupResponse.data.docData.email,
      getSignupResponse.data.docData.fullname,
      getSignupResponse.data.docData.jobTitle,
      getSignupResponse.data.docData.username,
      getSignupResponse.data.docData.resumeLinkUrl,
      getSignupResponse.data.docData.profileBiography,
      getSignupResponse.data.docData.numberOfFollowers,
      getSignupResponse.data.docData.numberOfFollowing,
      getSignupResponse.data.docData.numberOfAdvocates,
      getSignupResponse.data.docData.darkModeValue,
      getSignupResponse.data.docData.showResumeValue,
      getSignupResponse.data.docData.showcaseLocally,
      getSignupResponse.data.docData.followers,
      getSignupResponse.data.docData.following,
      getSignupResponse.data.docData.advocates,
      getSignupResponse.data.docData.profileProjects,
      getSignupResponse.data.docData.profileLinks
    );

    dispatch(getUserData());
    dispatch(
      authenticate(
        getSignupResponse.data.localId,
        getSignupResponse.data.idToken
      )
    );
    console.log("Successful signup!");
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const loginForm = {
      email: email,
      password: password,
    };
    const getLoginResponse = await axios.post(
      `https://us-central1-showcase-27b11.cloudfunctions.net/loginUser`,
      loginForm
    );

    console.log(getLoginResponse);

    console.log(getLoginResponse.data.docData);
    saveUserDocumentToStorage(
      getLoginResponse.data.docData.email,
      getLoginResponse.data.docData.fullname,
      getLoginResponse.data.docData.jobTitle,
      getLoginResponse.data.docData.username,
      getLoginResponse.data.docData.resumeLinkUrl,
      getLoginResponse.data.docData.profileBiography,
      getLoginResponse.data.docData.numberOfFollowers,
      getLoginResponse.data.docData.numberOfFollowing,
      getLoginResponse.data.docData.numberOfAdvocates,
      getLoginResponse.data.docData.darkModeValue,
      getLoginResponse.data.docData.showResumeValue,
      getLoginResponse.data.docData.showcaseLocally,
      getLoginResponse.data.docData.followers,
      getLoginResponse.data.docData.following,
      getLoginResponse.data.docData.advocates,
      getLoginResponse.data.docData.profileProjects,
      getLoginResponse.data.docData.profileLinks
    );
    saveDataToStorage(
      getLoginResponse.data.localId,
      getLoginResponse.data.idToken
    );

    dispatch(getUserData());
    dispatch(
      authenticate(getLoginResponse.data.localId, getLoginResponse.data.idToken)
    );
    console.log("Successful login!");
  };
};

export const logout = () => {
  // const logoutForm = {
  //   email: email,
  //   password: password,
  // };
  // const getLogoutResponse = await axios.post(
  //   `https://us-central1-showcase-27b11.cloudfunctions.net/logoutUserStore`,
  //   logoutForm
  // );
  AsyncStorage.removeItem("userLoginData");
  AsyncStorage.removeItem("userDocData");
  return { type: LOGOUT };
};

const saveDataToStorage = (localId, token) => {
  AsyncStorage.setItem(
    "userLoginData",
    JSON.stringify({
      localId: localId,
      token: token,
    })
  );
};

const saveUserDocumentToStorage = (
  email,
  fullname,
  jobTitle,
  username,
  resumeLinkUrl,
  profileBiography,
  numberOfFollowers,
  numberOfFollowing,
  numberOfAdvocates,
  darkModeValue,
  showResumeValue,
  showcaseLocally,
  followers,
  following,
  advocates,
  profileProjects,
  profileLinks
) => {
  AsyncStorage.setItem(
    "userDocData",
    JSON.stringify({
      email: email,
      fullname: fullname,
      jobTitle: jobTitle,
      username: username,
      resumeLinkUrl: resumeLinkUrl,
      profileBiography: profileBiography,
      numberOfFollowers: numberOfFollowers,
      numberOfFollowing: numberOfFollowing,
      numberOfAdvocates: numberOfAdvocates,
      darkModeValue: darkModeValue,
      showResumeValue: showResumeValue,
      showcaseLocally: showcaseLocally,
      followers: followers,
      following: following,
      advocates: advocates,
      profileProjects: profileProjects,
      profileLinks: profileLinks,
    })
  );
};
