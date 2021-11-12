import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getBase64FromUrl from "../../../helper/getBase64FromUrl";
import { getUserData, getUserFeed } from "../user/user";
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
      getSignupResponse.data.docData.exhibitTempCoverPhotoId,
      getSignupResponse.data.docData.exhibitTempCoverPhotoUrl,
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
      getSignupResponse.data.docData.profileColumns,
      getSignupResponse.data.docData.followers,
      getSignupResponse.data.docData.following,
      getSignupResponse.data.docData.cheeredPosts,
      getSignupResponse.data.docData.profileExhibits,
      getSignupResponse.data.docData.profileLinks,
      getSignupResponse.data.docData.userFeed
        ? getSignupResponse.data.docData.userFeed
        : {},
      getSignupResponse.data.docData.darkMode,
      getSignupResponse.data.docData.showCheering,
      getSignupResponse.data.docData.hideFollowing,
      getSignupResponse.data.docData.hideFollowers,
      getSignupResponse.data.docData.hideExhibits,
      getSignupResponse.data.docData.updates,
      getSignupResponse.data.docData.notifications
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
      return [authenticated, undefined];
    }

    const profilePictureBase64 = await getBase64FromUrl(
      getLoginResponse.data.docData.profilePictureUrl
    );

    let profileExhibits = await getLoginResponse.data.docData.profileExhibits;

    if (profileExhibits) {
      const exhibitKeys = Object.keys(profileExhibits);
      for (const k of exhibitKeys) {
        const exhibitCoverPhotoBase64 = await getBase64FromUrl(
          profileExhibits[k]["exhibitCoverPhotoUrl"]
        );
        profileExhibits[k]["exhibitCoverPhotoBase64"] = exhibitCoverPhotoBase64;
        const postKeys = Object.keys(profileExhibits[k].exhibitPosts);
        for (const id of postKeys) {
          const postPhotoBase64 = await getBase64FromUrl(
            profileExhibits[k].exhibitPosts[id]["postPhotoUrl"]
          );
          profileExhibits[k].exhibitPosts[id]["postPhotoBase64"] =
            postPhotoBase64;
          profileExhibits[k].exhibitPosts[id]["profilePictureBase64"] =
            profilePictureBase64;
        }
      }
    }

    let userFeed = await getLoginResponse.data.docData.userFeed;

    await saveUserDocumentToStorage(
      getLoginResponse.data.docData.ExhibitUId,
      getLoginResponse.data.docData.email,
      getLoginResponse.data.docData.profilePictureId,
      getLoginResponse.data.docData.profilePictureUrl,
      profilePictureBase64,
      getLoginResponse.data.docData.exhibitTempCoverPhotoId,
      getLoginResponse.data.docData.exhibitTempCoverPhotoUrl,
      getLoginResponse.data.docData.exhibitTempCoverPhotoBase64,
      getLoginResponse.data.docData.tempPhotoPostId,
      getLoginResponse.data.docData.tempPhotoPostUrl,
      getLoginResponse.data.docData.tempPhotoPostBase64,
      getLoginResponse.data.docData.fullname,
      getLoginResponse.data.docData.jobTitle,
      getLoginResponse.data.docData.username,
      getLoginResponse.data.docData.profileBiography,
      getLoginResponse.data.docData.numberOfFollowers,
      getLoginResponse.data.docData.numberOfFollowing,
      getLoginResponse.data.docData.profileColumns,
      getLoginResponse.data.docData.followers,
      getLoginResponse.data.docData.following,
      getLoginResponse.data.docData.cheeredPosts,
      profileExhibits ? profileExhibits : {},
      getLoginResponse.data.docData.profileLinks
        ? getLoginResponse.data.docData.profileLinks
        : {},
      userFeed ? userFeed : {},
      getLoginResponse.data.docData.darkMode,
      getLoginResponse.data.docData.showCheering,
      getLoginResponse.data.docData.hideFollowing,
      getLoginResponse.data.docData.hideFollowers,
      getLoginResponse.data.docData.hideExhibits,
      getLoginResponse.data.docData.updates,
      getLoginResponse.data.docData.notifications
    );
    await saveDataToStorage(
      getLoginResponse.data.localId,
      getLoginResponse.data.idToken
    );
    await dispatch(getUserData());
    await dispatch(
      getUserFeed(
        getLoginResponse.data.localId,
        getLoginResponse.data.docData.ExhibitUId
      )
    );
    await dispatch(
      await authenticate(
        getLoginResponse.data.localId,
        getLoginResponse.data.idToken
      )
    );
    return [authenticated, getLoginResponse.data.localId];
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
  exhibitTempCoverPhotoId: string,
  exhibitTempCoverPhotoUrl: string,
  exhibitTempCoverPhotoBase64: string,
  tempPhotoPostId: string,
  tempPhotoPostUrl: string,
  tempPhotoPostBase64: string,
  fullname: string,
  jobTitle: string,
  username: string,
  profileBiography: string,
  numberOfFollowers: number,
  numberOfFollowing: number,
  profileColumns: number,
  followers: string[],
  following: string[],
  cheeredPosts: string[],
  profileExhibits: object,
  profileLinks: object,
  userFeed: object,
  darkMode: boolean,
  showCheering: boolean,
  hideFollowing: boolean,
  hideFollowers: boolean,
  hideExhibits: boolean,
  updates: object,
  notifications: object[]
) => {
  await AsyncStorage.setItem(
    "userDocData",
    JSON.stringify({
      ExhibitUId,
      email,
      profilePictureId,
      profilePictureUrl,
      profilePictureBase64,
      exhibitTempCoverPhotoId,
      exhibitTempCoverPhotoUrl,
      exhibitTempCoverPhotoBase64,
      tempPhotoPostId,
      tempPhotoPostUrl,
      tempPhotoPostBase64,
      fullname,
      jobTitle,
      username,
      profileBiography,
      numberOfFollowers,
      numberOfFollowing,
      profileColumns,
      followers,
      following,
      cheeredPosts,
      profileExhibits,
      profileLinks,
      userFeed,
      darkMode,
      showCheering,
      hideFollowing,
      hideFollowers,
      hideExhibits,
      updates,
      notifications,
    })
  );
};
