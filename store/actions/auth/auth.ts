import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getBase64FromUrl from "../../../helper/getBase64FromUrl";
import { getUserData } from "../user/user";
import { AuthenticationResponse, AUTHENTICATE, LOGOUT } from "./types";

export const authenticate = (userId: string, token: string) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (
  email: string,
  fullname: string,
  username: string,
  password: string
) => {
  return async (dispatch) => {
    const signupForm = { email, fullname, username, password };

    const getSignupResponse: AuthenticationResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/signupUser`,
      signupForm
    );

    await saveDataToStorage(
      getSignupResponse.data.localId,
      getSignupResponse.data.idToken
    );
    await saveUserDocumentToStorage(
      getSignupResponse.data.docData.ExhibitUId,
      getSignupResponse.data.docData.email,
      getSignupResponse.data.docData.profilePictureId,
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
      getSignupResponse.data.docData.showCheering,
      getSignupResponse.data.docData.hideFollowing,
      getSignupResponse.data.docData.hideFollowers,
      getSignupResponse.data.docData.hideAdvocates,
      getSignupResponse.data.docData.updates,
      getSignupResponse.data.docData.tutorialing,
      getSignupResponse.data.docData.tutorialPrompt,
      getSignupResponse.data.docData.tutorialScreen
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

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    const loginForm = { email, password };

    let authenticated = false;
    let getLoginResponse: AuthenticationResponse;

    try {
      getLoginResponse = await axios.post(
        `https://us-central1-showcase-79c28.cloudfunctions.net/loginUser`,
        loginForm
      );
      authenticated = true;
    } catch (err) {
      console.log(err);
      return authenticated;
    }

    const profilePictureBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.profilePictureUrl
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
          profileProjects[k].projectPosts[id]["postPhotoBase64"] =
            postPhotoBase64;
          profileProjects[k].projectPosts[id]["profilePictureBase64"] =
            profilePictureBase64;
        }
      }
    }

    let userFeed = await getLoginResponse.data.docData.userFeed;
    // if (userFeed) {
    //   const feedKeys = Object.keys(userFeed);
    //   for (const key of feedKeys) {
    //     const postPhotoBase64 = await getBase64FromUrl(
    //       userFeed[key]["postPhotoUrl"]
    //     );
    //     userFeed[key]["postPhotoBase64"] = postPhotoBase64;
    //     if (
    //       userFeed[key].ExhibitUId === getLoginResponse.data.docData.ExhibitUId
    //     ) {
    //       userFeed[key]["profilePictureBase64"] = profilePictureBase64;
    //     } else {
    //       userFeed[key]["profilePictureBase64"] = await getBase64FromUrl(
    //         userFeed[key]["profilePictureUrl"]
    //       );
    //     }
    //     const feedProjectKeys = Object.keys(userFeed[key].profileProjects);
    //     for (const projectKey of feedProjectKeys) {
    //       const postKeys = Object.keys(
    //         userFeed[key].profileProjects[projectKey].projectPosts
    //       );
    //       const projectCoverPhotoBase64 = await getBase64FromUrl(
    //         userFeed[key].profileProjects[projectKey]["projectCoverPhotoUrl"]
    //       );
    //       userFeed[key].profileProjects[projectKey]["projectCoverPhotoBase64"] =
    //         projectCoverPhotoBase64;
    //       for (const postKey of postKeys) {
    //         const postPhotoBase64 = await getBase64FromUrl(
    //           userFeed[key].profileProjects[projectKey].projectPosts[postKey][
    //             "postPhotoUrl"
    //           ]
    //         );
    //         userFeed[key].profileProjects[projectKey].projectPosts[postKey][
    //           "postPhotoBase64"
    //         ] = postPhotoBase64;
    //         if (
    //           userFeed[key].ExhibitUId ===
    //           getLoginResponse.data.docData.ExhibitUId
    //         ) {
    //           userFeed[key].profileProjects[projectKey].projectPosts[postKey][
    //             "profilePictureBase64"
    //           ] = profilePictureBase64;
    //         }
    //       }
    //     }
    //   }
    // }

    const projectTempCoverPhotoBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.projectTempCoverPhotoUrl
    );

    const tempPhotoPostBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.tempPhotoPostUrl
    );

    await saveUserDocumentToStorage(
      getLoginResponse.data.docData.ExhibitUId,
      getLoginResponse.data.docData.email,
      getLoginResponse.data.docData.profilePictureId,
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
      getLoginResponse.data.docData.profileLinks
        ? getLoginResponse.data.docData.profileLinks
        : {},
      userFeed ? userFeed : {},
      getLoginResponse.data.docData.darkMode,
      getLoginResponse.data.docData.showCheering,
      getLoginResponse.data.docData.hideFollowing,
      getLoginResponse.data.docData.hideFollowers,
      getLoginResponse.data.docData.hideAdvocates,
      getLoginResponse.data.docData.updates,
      getLoginResponse.data.docData.tutorialing,
      getLoginResponse.data.docData.tutorialPrompt,
      getLoginResponse.data.docData.tutorialScreen
    );
    await saveDataToStorage(
      getLoginResponse.data.localId,
      getLoginResponse.data.idToken
    );
    await dispatch(getUserData());
    await dispatch(
      await authenticate(
        getLoginResponse.data.localId,
        getLoginResponse.data.idToken
      )
    );
    return authenticated;
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userLoginData");
  AsyncStorage.removeItem("userDocData");
  return { type: LOGOUT };
};

const saveDataToStorage = async (localId: string, token: string) => {
  await AsyncStorage.setItem(
    "userLoginData",
    JSON.stringify({ localId, token })
  );
};

const saveUserDocumentToStorage = async (
  ExhibitUId: string,
  email: string,
  profilePictureId: string,
  profilePictureUrl: string,
  profilePictureBase64: string,
  projectTempCoverPhotoId: string,
  projectTempCoverPhotoUrl: string,
  projectTempCoverPhotoBase64: string,
  tempPhotoPostId: string,
  tempPhotoPostUrl: string,
  tempPhotoPostBase64: string,
  fullname: string,
  jobTitle: string,
  username: string,
  profileBiography: string,
  numberOfFollowers: number,
  numberOfFollowing: number,
  numberOfAdvocates: number,
  numberOfAdvocating: number,
  profileColumns: number,
  followers: string[],
  following: string[],
  advocates: string[],
  advocating: string[],
  projectsAdvocating: string[],
  cheeredPosts: string[],
  profileProjects: object,
  profileLinks: object,
  userFeed: object,
  darkMode: boolean,
  showCheering: boolean,
  hideFollowing: boolean,
  hideFollowers: boolean,
  hideAdvocates: boolean,
  updates: object,
  tutorialing: boolean,
  tutorialPrompt: boolean,
  tutorialScreen: string
) => {
  await AsyncStorage.setItem(
    "userDocData",
    JSON.stringify({
      ExhibitUId,
      email,
      profilePictureId,
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
      showCheering,
      hideFollowing,
      hideFollowers,
      hideAdvocates,
      updates,
      tutorialing,
      tutorialPrompt,
      tutorialScreen,
    })
  );
};
