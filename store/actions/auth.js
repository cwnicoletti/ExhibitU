import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
global.Buffer = global.Buffer || require("buffer").Buffer;

import { getUserData } from "./user";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, fullname, username, password) => {
  return async (dispatch) => {
    const signupForm = { email, fullname, username, password };

    const getSignupResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/signupUser`,
      signupForm
    );

    await saveDataToStorage(
      getSignupResponse.data.localId,
      getSignupResponse.data.idToken,
      getSignupResponse.data.introing
    );
    await saveUserDocumentToStorage(
      getSignupResponse.data.docData.DiamondCaseId,
      getSignupResponse.data.docData.email,
      getSignupResponse.data.docData.profilePictureUrl,
      "",
      getSignupResponse.data.docData.projectTempCoverPhotoId,
      getSignupResponse.data.docData.projectTempCoverPhotoUrl,
      "",
      getSignupResponse.data.docData.tempPhotoPostId,
      getSignupResponse.data.docData.tempPhotoPostUrl,
      "",
      getSignupResponse.data.docData.fullname,
      getSignupResponse.data.docData.jobTitle,
      getSignupResponse.data.docData.username,
      getSignupResponse.data.docData.resumeLinkUrl,
      getSignupResponse.data.docData.profileBiography,
      getSignupResponse.data.docData.numberOfFollowers,
      getSignupResponse.data.docData.numberOfFollowing,
      getSignupResponse.data.docData.numberOfAdvocates,
      getSignupResponse.data.docData.numberOfAdvocating,
      getSignupResponse.data.docData.profileColumns,
      getSignupResponse.data.docData.followers,
      getSignupResponse.data.docData.following,
      getSignupResponse.data.docData.advocates,
      getSignupResponse.data.docData.advocating,
      getSignupResponse.data.docData.projectsAdvocating,
      getSignupResponse.data.docData.cheeredPosts,
      getSignupResponse.data.docData.profileProjects,
      getSignupResponse.data.docData.profileLinks,
      getSignupResponse.data.docData.userFeed
        ? getSignupResponse.data.docData.userFeed
        : {},
      getSignupResponse.data.docData.darkMode,
      getSignupResponse.data.docData.DiamondCaseLocalMode,
      getSignupResponse.data.docData.showResume,
      getSignupResponse.data.docData.showCheering,
      getSignupResponse.data.docData.hideFollowing,
      getSignupResponse.data.docData.hideFollowers,
      getSignupResponse.data.docData.hideAdvocates,
      getSignupResponse.data.docData.updates
    );

    await dispatch(getUserData());
    await dispatch(
      authenticate(
        getSignupResponse.data.localId,
        getSignupResponse.data.idToken
      )
    );
  };
};

const getBase64FromUrl = async (url) => {
  if (url) {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const base64 = Buffer.from(await response.data, "base64").toString(
      "base64"
    );
    return `data:image/png;base64,${base64}`;
  } else {
    return "";
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    const loginForm = { email, password };

    const getLoginResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/loginUser`,
      loginForm
    );

    let profileProjects = await getLoginResponse.data.docData.profileProjects;

    if (profileProjects) {
      const projectKeys = Object.keys(profileProjects);
      for (const k of projectKeys) {
        const projectCoverPhotoBase64 = await getBase64FromUrl(
          profileProjects[k]["projectCoverPhotoUrl"]
        );
        profileProjects[k]["projectCoverPhotoBase64"] = projectCoverPhotoBase64;
        const postKeys = Object.keys(profileProjects[k].projectPosts);
        for (const id of postKeys) {
          const postPhotoBase64 = await getBase64FromUrl(
            profileProjects[k].projectPosts[id]["postPhotoUrl"]
          );
          profileProjects[k].projectPosts[id][
            "postPhotoBase64"
          ] = postPhotoBase64;
        }
      }
    }

    let userFeed = await getLoginResponse.data.docData.userFeed;
    if (userFeed) {
      const feedKeys = Object.keys(userFeed);
      for (const key of feedKeys) {
        const postPhotoBase64 = await getBase64FromUrl(
          userFeed[key]["postPhotoUrl"]
        );
        userFeed[key]["postPhotoBase64"] = postPhotoBase64;
        const feedProjectKeys = Object.keys(userFeed[key].profileProjects);
        for (const projectKey of feedProjectKeys) {
          const postKeys = Object.keys(
            userFeed[key].profileProjects[projectKey].projectPosts
          );
          const projectCoverPhotoBase64 = await getBase64FromUrl(
            userFeed[key].profileProjects[projectKey]["projectCoverPhotoUrl"]
          );
          userFeed[key].profileProjects[projectKey][
            "projectCoverPhotoBase64"
          ] = projectCoverPhotoBase64;
          for (const postKey of postKeys) {
            const postPhotoBase64 = await getBase64FromUrl(
              userFeed[key].profileProjects[projectKey].projectPosts[postKey][
                "postPhotoUrl"
              ]
            );
            userFeed[key].profileProjects[projectKey].projectPosts[postKey][
              "postPhotoBase64"
            ] = postPhotoBase64;
          }
        }
      }
    }

    const profilePictureBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.profilePictureUrl
    );

    const projectTempCoverPhotoBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.projectTempCoverPhotoUrl
    );

    const tempPhotoPostBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.tempPhotoPostUrl
    );

    await saveUserDocumentToStorage(
      getLoginResponse.data.docData.DiamondCaseId,
      getLoginResponse.data.docData.email,
      getLoginResponse.data.docData.profilePictureUrl,
      profilePictureBase64,
      getLoginResponse.data.docData.projectTempCoverPhotoId,
      getLoginResponse.data.docData.projectTempCoverPhotoUrl,
      projectTempCoverPhotoBase64,
      getLoginResponse.data.docData.tempPhotoPostId,
      getLoginResponse.data.docData.tempPhotoPostUrl,
      tempPhotoPostBase64,
      getLoginResponse.data.docData.fullname,
      getLoginResponse.data.docData.jobTitle,
      getLoginResponse.data.docData.username,
      getLoginResponse.data.docData.resumeLinkUrl,
      getLoginResponse.data.docData.profileBiography,
      getLoginResponse.data.docData.numberOfFollowers,
      getLoginResponse.data.docData.numberOfFollowing,
      getLoginResponse.data.docData.numberOfAdvocates,
      getLoginResponse.data.docData.numberOfAdvocating,
      getLoginResponse.data.docData.profileColumns,
      getLoginResponse.data.docData.followers,
      getLoginResponse.data.docData.following,
      getLoginResponse.data.docData.advocates,
      getLoginResponse.data.docData.advocating,
      getLoginResponse.data.docData.projectsAdvocating,
      getLoginResponse.data.docData.cheeredPosts,
      profileProjects ? profileProjects : {},
      getLoginResponse.data.docData.profileLinks,
      userFeed ? userFeed : {},
      getLoginResponse.data.docData.darkMode,
      getLoginResponse.data.docData.DiamondCaseLocalMode,
      getLoginResponse.data.docData.showResume,
      getLoginResponse.data.docData.showCheering,
      getLoginResponse.data.docData.hideFollowing,
      getLoginResponse.data.docData.hideFollowers,
      getLoginResponse.data.docData.hideAdvocates,
      getLoginResponse.data.docData.updates
    );
    await saveDataToStorage(
      getLoginResponse.data.localId,
      getLoginResponse.data.idToken,
      getLoginResponse.data.introing
    );

    await dispatch(getUserData());
    await dispatch(
      await authenticate(
        getLoginResponse.data.localId,
        getLoginResponse.data.idToken
      )
    );
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userLoginData");
  AsyncStorage.removeItem("userDocData");
  return { type: LOGOUT };
};

const saveDataToStorage = async (localId, token, introing) => {
  await AsyncStorage.setItem(
    "userLoginData",
    JSON.stringify({ localId, token, introing })
  );
};

const saveUserDocumentToStorage = async (
  DiamondCaseId,
  email,
  profilePictureUrl,
  profilePictureBase64,
  projectTempCoverPhotoId,
  projectTempCoverPhotoUrl,
  projectTempCoverPhotoBase64,
  tempPhotoPostId,
  tempPhotoPostUrl,
  tempPhotoPostBase64,
  fullname,
  jobTitle,
  username,
  resumeLinkUrl,
  profileBiography,
  numberOfFollowers,
  numberOfFollowing,
  numberOfAdvocates,
  numberOfAdvocating,
  profileColumns,
  followers,
  following,
  advocates,
  advocating,
  projectsAdvocating,
  cheeredPosts,
  profileProjects,
  profileLinks,
  userFeed,
  darkMode,
  DiamondCaseLocalMode,
  showResume,
  showCheering,
  hideFollowing,
  hideFollowers,
  hideAdvocates,
  updates
) => {
  await AsyncStorage.setItem(
    "userDocData",
    JSON.stringify({
      DiamondCaseId,
      email,
      profilePictureUrl,
      profilePictureBase64,
      projectTempCoverPhotoId,
      projectTempCoverPhotoUrl,
      projectTempCoverPhotoBase64,
      tempPhotoPostId,
      tempPhotoPostUrl,
      tempPhotoPostBase64,
      fullname,
      jobTitle,
      username,
      resumeLinkUrl,
      profileBiography,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      numberOfAdvocating,
      profileColumns,
      followers,
      following,
      advocates,
      advocating,
      projectsAdvocating,
      cheeredPosts,
      profileProjects,
      profileLinks,
      userFeed,
      darkMode,
      DiamondCaseLocalMode,
      showResume,
      showCheering,
      hideFollowing,
      hideFollowers,
      hideAdvocates,
      updates,
    })
  );
};
