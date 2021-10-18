import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getBase64FromUrl from "../../../helper/getBase64FromUrl";
import {
  ADD_TEMP_POST_PICTURE,
  ADD_TEMP_PROJECT_PICTURE,
  ADD_USER_POST,
  ADD_USER_PROJECT,
  CHANGE_PROFILE_COLUMNS,
  CHANGE_PROFILE_PICTURE,
  CHANGE_PROJECT_COLUMNS,
  CHANGE_PROJECT_PICTURE,
  CHEER_OWN_FEED_POST,
  CHEER_OWN_PROFILE_POST,
  CHEER_POST,
  CHEER_UPDATE_POSTS,
  FOLLOW_USER,
  GET_SWITCHES,
  GET_UPDATES,
  GET_USER_DATA,
  GET_USER_FEED,
  HIDE_EXHIBITS,
  HIDE_FOLLOWERS,
  HIDE_FOLLOWING,
  HIDE_PROFILE_FOOTER,
  OFF_SCREEN,
  ON_SCREEN,
  REFRESH_PROFILE,
  REFRESH_NOTIFICATIONS,
  REMOVE_USER_POST,
  REMOVE_USER_PROJECT,
  RESET_SCROLL,
  RETURN_FROM_SHOWCASING,
  SET_DARKMODE,
  SHOWCASE_PROFILE,
  SHOW_CHEERING,
  UNCHEER_OWN_FEED_POST,
  UNCHEER_OWN_PROFILE_POST,
  UNCHEER_POST,
  UNCHEER_UPDATE_POSTS,
  UNFOLLOW_USER,
  UPDATE_ALL_POSTS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROJECT,
  SET_TUTORIALING,
  SET_TUTORIALING_PROMPT,
  UserState,
} from "./types";

export const getUserData = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userDocData");
    const transformedData = JSON.parse(userData);

    let followers = [];
    let following = [];
    let advocates = [];
    let cheeredPosts = [];
    let profileExhibits = {};
    let profileLinks = {};
    let userFeed = {};
    let updates = {};
    let notifications = [];

    if (transformedData.followers) {
      followers = transformedData.followers;
    }
    if (transformedData.following) {
      following = transformedData.following;
    }
    if (transformedData.cheeredPosts) {
      cheeredPosts = transformedData.cheeredPosts;
    }
    if (transformedData.profileExhibits) {
      profileExhibits = transformedData.profileExhibits;
    }
    if (transformedData.profileLinks) {
      profileLinks = transformedData.profileLinks;
    }
    if (transformedData.userFeed) {
      userFeed = transformedData.userFeed;
    }
    if (transformedData.updates) {
      updates = transformedData.updates;
    }
    if (transformedData.notifications) {
      notifications = transformedData.notifications;
    }

    await dispatch({
      type: GET_USER_DATA,
      ExhibitUId: transformedData.ExhibitUId,
      email: transformedData.email,
      profilePictureId: transformedData.profilePictureId,
      profilePictureUrl: transformedData.profilePictureUrl,
      profilePictureBase64: transformedData.profilePictureBase64,
      exhibitTempCoverPhotoId: transformedData.exhibitTempCoverPhotoId,
      exhibitTempCoverPhotoUrl: transformedData.exhibitTempCoverPhotoUrl,
      exhibitTempCoverPhotoBase64: transformedData.exhibitTempCoverPhotoBase64,
      tempPhotoPostId: transformedData.tempPhotoPostId,
      tempPhotoPostUrl: transformedData.tempPhotoPostUrl,
      tempPhotoPostBase64: transformedData.tempPhotoPostBase64,
      fullname: transformedData.fullname,
      jobTitle: transformedData.jobTitle,
      username: transformedData.username,
      profileBiography: transformedData.profileBiography,
      numberOfFollowers: transformedData.numberOfFollowers,
      numberOfFollowing: transformedData.numberOfFollowing,
      profileColumns: transformedData.profileColumns,
      darkMode: transformedData.darkMode,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideExhibits: transformedData.hideExhibits,
      tutorialing: transformedData.tutorialing,
      tutorialPrompt: transformedData.tutorialPrompt,
      tutorialScreen: transformedData.tutorialScreen,
      followers,
      following,
      advocates,
      cheeredPosts,
      profileExhibits,
      profileLinks,
      userFeed,
      updates,
      notifications,
    });

    await dispatch({
      type: GET_SWITCHES,
      darkMode: transformedData.darkMode,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideExhibits: transformedData.hideExhibits,
    });
  };
};

export const refreshProfile = (localId: string) => {
  return async (dispatch) => {
    const downloadForm = { localId };

    const profileInfo = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/refreshProfile",
      downloadForm
    );

    let followers = [];
    let following = [];
    let cheeredPosts = [];
    let profileExhibits = {};
    let profileLinks = {};

    if (profileInfo.data.data.followers) {
      followers = profileInfo.data.data.followers;
    }
    if (profileInfo.data.data.following) {
      following = profileInfo.data.data.following;
    }
    if (profileInfo.data.data.cheeredPosts) {
      cheeredPosts = profileInfo.data.data.cheeredPosts;
    }
    if (profileInfo.data.data.profileExhibits) {
      profileExhibits = profileInfo.data.data.profileExhibits;
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
        }
      }
    }
    if (profileInfo.data.data.profileLinks) {
      profileLinks = profileInfo.data.data.profileLinks;
    }

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.numberOfFollowers = profileInfo.data.data.numberOfFollowers;
      parsedData.numberOfFollowing = profileInfo.data.data.numberOfFollowing;
      parsedData.followers = followers;
      parsedData.following = following;
      parsedData.profileLinks = profileLinks;
      parsedData.cheeredPosts = cheeredPosts;
      parsedData.profileExhibits = profileExhibits;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: REFRESH_PROFILE,
      numberOfFollowers: profileInfo.data.data.numberOfFollowers,
      numberOfFollowing: profileInfo.data.data.numberOfFollowing,
      numberOfAdvocates: profileInfo.data.data.numberOfAdvocates,
      numberOfAdvocating: profileInfo.data.data.numberOfAdvocating,
      followers,
      following,
      cheeredPosts,
      profileExhibits,
      profileLinks,
    });
  };
};

export const refreshNotifications = (localId: string) => {
  return async (dispatch) => {
    const downloadForm = { localId };

    const profileInfo = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/refreshNotifications",
      downloadForm
    );

    let notifications = [];

    if (profileInfo.data.data.notifications) {
      notifications = profileInfo.data.data.notifications;
    }

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.notifications = profileInfo.data.data.notifications;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: REFRESH_NOTIFICATIONS,
      notifications: profileInfo.data.data.notifications,
    });
  };
};

export const uploadUpdateUserProfile = (
  ExhibitUId: string,
  localId: string,
  fullname: string,
  jobTitle: string,
  username: string,
  bio: string,
  links: object
) => {
  return async (dispatch) => {
    const uploadForm = {
      ExhibitUId,
      localId,
      fullname,
      jobTitle,
      username,
      bio,
      links,
    };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/updateProfile",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.fullname = fullname;
      parsedData.jobTitle = jobTitle;
      parsedData.username = username;
      parsedData.profileBiography = bio;
      parsedData.profileLinks = links;
      if (Object.keys(parsedData.userFeed).length > 0) {
        const feedPosts = Object.keys(parsedData.userFeed);
        for (const post of feedPosts) {
          parsedData.userFeed = {
            [post]: {
              ...parsedData.userFeed[post],
              fullname: parsedData.fullname,
              jobTitle: parsedData.jobTitle,
              username: parsedData.username,
              profileBiography: bio,
              profileLinks: links,
            },
          };
        }
      }
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({
      type: UPDATE_USER_PROFILE,
      fullname,
      jobTitle,
      username,
      bio,
      profileLinks: links,
    });
  };
};

export const uploadNewExhibit = (
  ExhibitUId: string,
  localId: string,
  exhibitTempCoverPhotoId: string,
  exhibitTempCoverPhotoBase64: string,
  exhibitTitle: string,
  exhibitDescription: string,
  links: object
) => {
  return async (dispatch) => {
    const uploadForm = {
      ExhibitUId,
      localId,
      exhibitTempCoverPhotoId,
      exhibitTempCoverPhotoBase64,
      exhibitTitle,
      exhibitDescription,
      links,
    };

    const newExhibitResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadNewExhibit",
      uploadForm
    );
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [newExhibitResponse.data.exhibitId]: {
          exhibitId: newExhibitResponse.data.exhibitId,
          exhibitCoverPhotoId: newExhibitResponse.data.photoId,
          exhibitCoverPhotoUrl: newExhibitResponse.data.url,
          exhibitCoverPhotoBase64: exhibitTempCoverPhotoBase64,
          exhibitDateCreated: newExhibitResponse.data.time,
          exhibitLastUpdated: newExhibitResponse.data.time,
          exhibitTitle,
          exhibitDescription,
          exhibitColumns: 2,
          exhibitPosts: {},
          exhibitLinks: links,
        },
      };
      for (const post in parsedData.userFeed) {
        if (parsedData.userFeed[post].ExhibitUId === ExhibitUId) {
          parsedData.userFeed = {
            ...parsedData.userFeed,
            [post]: {
              ...parsedData.userFeed[post],
              profileExhibits: {
                ...parsedData.profileExhibits,
              },
            },
          };
        }
      }
      parsedData.exhibitTempCoverPhotoUrl = "";
      parsedData.exhibitTempCoverPhotoBase64 = "";
      parsedData.exhibitTempCoverPhotoId = "";
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });
    dispatch({
      type: ADD_USER_PROJECT,
      ExhibitUId,
      exhibitId: newExhibitResponse.data.exhibitId,
      exhibitCoverPhotoId: newExhibitResponse.data.photoId,
      exhibitCoverPhotoUrl: newExhibitResponse.data.url,
      exhibitCoverPhotoBase64: exhibitTempCoverPhotoBase64,
      exhibitDateCreated: newExhibitResponse.data.time,
      exhibitLastUpdated: newExhibitResponse.data.time,
      exhibitTitle,
      exhibitDescription,
      exhibitLinks: links,
    });
  };
};

export const uploadUpdatedExhibit = (
  ExhibitUId: string,
  localId: string,
  exhibitId: string,
  exhibitTempCoverPhotoUrl: string,
  exhibitTitle: string,
  exhibitDescription: string,
  links: object
) => {
  return async (dispatch) => {
    const uploadForm = {
      ExhibitUId,
      localId,
      exhibitId,
      url: exhibitTempCoverPhotoUrl,
      exhibitTitle,
      exhibitDescription,
      links,
    };

    const updatedExhibitResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadUpdatedExhibit",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitLastUpdated: updatedExhibitResponse.data.time,
          exhibitCoverPhotoUrl: exhibitTempCoverPhotoUrl,
          exhibitTitle,
          exhibitDescription,
          exhibitLinks: links,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({
      type: UPDATE_USER_PROJECT,
      exhibitId,
      exhibitLastUpdated: updatedExhibitResponse.data.time,
      exhibitCoverPhotoUrl: exhibitTempCoverPhotoUrl,
      exhibitTitle,
      exhibitDescription,
      exhibitLinks: links,
    });
  };
};

export const uploadRemoveExhibit = (
  ExhibitUId: string,
  localId: string,
  exhibitId: string
) => {
  return async (dispatch) => {
    const uploadForm = { ExhibitUId, localId, exhibitId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemoveExhibit",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      const postIds = Object.keys(
        parsedData.profileExhibits[exhibitId].exhibitPosts
      );
      delete parsedData.profileExhibits[exhibitId];
      for (const post in parsedData.userFeed) {
        if (postIds.includes(post)) {
          delete parsedData.userFeed[post];
        }
      }
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({
      type: REMOVE_USER_PROJECT,
      exhibitId,
    });
  };
};

export const uploadRemovePost = (
  ExhibitUId: string,
  localId: string,
  exhibitId: string,
  postId: string
) => {
  return async (dispatch) => {
    const uploadForm = { ExhibitUId, localId, exhibitId, postId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemovePost",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      delete parsedData.profileExhibits[exhibitId].exhibitPosts[postId];
      delete parsedData.userFeed[postId];
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: REMOVE_USER_POST,
      exhibitId,
      postId,
    });
  };
};

export const followUser = (
  exploredExhibitUId: string,
  ExhibitUId: string,
  localId: string
) => {
  return async (dispatch) => {
    const user = { exploredExhibitUId, ExhibitUId, localId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/followUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.following.push(exploredExhibitUId);
      parsedData.numberOfFollowing = parsedData.numberOfFollowing + 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: FOLLOW_USER,
      exploredExhibitUId,
    });
  };
};

export const unfollowUser = (
  exploredExhibitUId: string,
  ExhibitUId: string,
  localId: string
) => {
  return async (dispatch) => {
    const user = { exploredExhibitUId, ExhibitUId, localId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/unfollowUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.following.splice(
        parsedData.following.indexOf(exploredExhibitUId),
        1
      );
      parsedData.numberOfFollowing = parsedData.numberOfFollowing - 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNFOLLOW_USER,
      exploredExhibitUId,
    });
  };
};

export const uploadChangeProfilePicture = (
  base64: string,
  ExhibitUId: string,
  localId: string,
  profilePictureId: string
) => {
  return async (dispatch) => {
    const picture = { base64, ExhibitUId, localId, profilePictureId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProfilePicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profilePictureId = uploadedPictureUrlResponse.data.pictureId;
      parsedData.profilePictureUrl = uploadedPictureUrlResponse.data.url;
      parsedData.profilePictureBase64 = base64;

      if (parsedData.userFeed) {
        Object.entries(parsedData.userFeed).map(([id, value]) => {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            parsedData.userFeed[id].profilePictureUrl =
              parsedData.profilePictureUrl;
          }
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHANGE_PROFILE_PICTURE,
      profilePictureId: uploadedPictureUrlResponse.data.pictureId,
      profilePictureUrl: uploadedPictureUrlResponse.data.url,
      profilePictureBase64: base64,
      ExhibitUId,
    });
  };
};

export const uploadAddTempExhibitCoverPicture = (
  base64: string,
  ExhibitUId: string,
  localId: string,
  exhibitTempCoverPhotoId: string
) => {
  return async (dispatch) => {
    const picture = { base64, ExhibitUId, localId, exhibitTempCoverPhotoId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempExhibitCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.exhibitTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      parsedData.exhibitTempCoverPhotoId =
        uploadedPictureUrlResponse.data.photoId;
      parsedData.exhibitTempCoverPhotoBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: ADD_TEMP_PROJECT_PICTURE,
      exhibitTempCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
      exhibitTempCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
      exhibitTempCoverPhotoBase64: base64,
    });
  };
};

export const uploadAddTempPostPicture = (
  base64: string,
  exhibitId: string,
  ExhibitUId: string,
  localId: string
) => {
  return async (dispatch) => {
    const picture = { base64, exhibitId, ExhibitUId, localId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempPostPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.tempPhotoPostId = uploadedPictureUrlResponse.data.photoId;
      parsedData.tempPhotoPostUrl = uploadedPictureUrlResponse.data.url;
      parsedData.tempPhotoPostBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: ADD_TEMP_POST_PICTURE,
      tempPhotoPostId: uploadedPictureUrlResponse.data.photoId,
      tempPhotoPostUrl: uploadedPictureUrlResponse.data.url,
      tempPhotoPostBase64: base64,
    });
  };
};

export const uploadChangeExhibitCoverPicture = (
  base64: string,
  exhibitId: string,
  ExhibitUId: string,
  localId: string,
  exhibitCoverPhotoId: string
) => {
  return async (dispatch) => {
    const picture = {
      base64,
      exhibitId,
      ExhibitUId,
      localId,
      exhibitCoverPhotoId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeExhibitCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.exhibitTempCoverPhotoId =
        uploadedPictureUrlResponse.data.photoId;
      parsedData.exhibitTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      parsedData.exhibitTempCoverPhotoBase64 = base64;
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
          exhibitCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
          exhibitCoverPhotoBase64: base64,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHANGE_PROJECT_PICTURE,
      exhibitId,
      exhibitCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
      exhibitCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
      exhibitCoverPhotoBase64: base64,
    });
  };
};

export const addUserPost = (
  ExhibitUId: string,
  localId: string,
  exhibitId: string,
  fullname: string,
  username: string,
  jobTitle: string,
  numberOfFollowers: number,
  numberOfFollowing: number,
  numberOfAdvocates: number,
  followingValue: boolean,
  followersValue: boolean,
  exhibitsValue: boolean,
  profileBiography: string,
  exhibitTitle: string,
  exhibitCoverPhotoUrl: string,
  exhibitDateCreated: string,
  exhibitLastUpdated: string,
  exhibitDescription: string,
  profilePictureUrl: string,
  profilePictureBase64: string,
  tempPhotoPostId: string,
  tempPhotoPostUrl: string,
  tempPhotoPostBase64: string,
  caption: string,
  profileLinks: object,
  exhibitLinks: object,
  links: object,
  profileColumns: number
) => {
  return async (dispatch) => {
    const picture = {
      ExhibitUId,
      localId,
      exhibitId,
      fullname,
      username,
      jobTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      followingValue,
      followersValue,
      exhibitsValue,
      profileBiography,
      exhibitTitle,
      exhibitCoverPhotoUrl,
      exhibitDateCreated,
      exhibitLastUpdated,
      exhibitDescription,
      profilePictureUrl,
      postId: tempPhotoPostId,
      postUrl: tempPhotoPostUrl,
      caption,
      profileLinks,
      exhibitLinks,
      links,
      profileColumns,
    };

    const uploadedUserPost = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddUserPost",
      picture
    );

    const retrievedPostId = uploadedUserPost.data.postId;
    const time = uploadedUserPost.data.time;

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.tempPhotoPostId = "";
      parsedData.tempPhotoPostUrl = "";
      parsedData.tempPhotoPostBase64 = "";
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitPosts: {
            ...parsedData.profileExhibits[exhibitId].exhibitPosts,
            [retrievedPostId]: {
              postId: retrievedPostId,
              ExhibitUId,
              exhibitId,
              fullname,
              username,
              jobTitle,
              numberOfFollowers,
              numberOfFollowing,
              numberOfAdvocates,
              profileBiography,
              exhibitTitle,
              profilePictureUrl,
              profilePictureBase64,
              postDateCreated: time,
              postLastUpdated: time,
              postPhotoPostId: tempPhotoPostId,
              postPhotoUrl: tempPhotoPostUrl,
              postPhotoBase64: tempPhotoPostBase64,
              caption,
              numberOfComments: 0,
              numberOfCheers: 0,
              cheering: [],
              comments: {},
              profileLinks,
              exhibitLinks,
              postLinks: links,
            },
          },
        },
      };

      parsedData.userFeed = {
        ...parsedData.userFeed,
        [retrievedPostId]: {
          postId: retrievedPostId,
          ExhibitUId,
          exhibitId,
          fullname,
          username,
          jobTitle,
          numberOfFollowers,
          numberOfFollowing,
          numberOfAdvocates,
          followingValue,
          followersValue,
          exhibitsValue,
          profileBiography,
          profileExhibits: {
            ...parsedData.profileExhibits,
            [exhibitId]: {
              ...parsedData.profileExhibits[exhibitId],
              exhibitPosts: {
                ...parsedData.profileExhibits[exhibitId].exhibitPosts,
                [retrievedPostId]: {
                  postId: retrievedPostId,
                  ExhibitUId,
                  exhibitId,
                  fullname,
                  username,
                  jobTitle,
                  numberOfFollowers,
                  numberOfFollowing,
                  numberOfAdvocates,
                  followingValue,
                  followersValue,
                  exhibitsValue,
                  profileBiography,
                  exhibitTitle,
                  profilePictureUrl,
                  profilePictureBase64,
                  postDateCreated: time,
                  postLastUpdated: time,
                  postPhotoPostId: tempPhotoPostId,
                  postPhotoUrl: tempPhotoPostUrl,
                  postPhotoBase64: tempPhotoPostBase64,
                  caption: caption,
                  numberOfComments: 0,
                  numberOfCheers: 0,
                  cheering: [],
                  comments: {},
                  profileLinks,
                  exhibitLinks,
                  postLinks: links,
                  profileColumns,
                },
              },
            },
          },
          exhibitTitle,
          profilePictureUrl,
          profilePictureBase64,
          postDateCreated: time,
          postLastUpdated: time,
          postPhotoUrl: tempPhotoPostUrl,
          postPhotoBase64: tempPhotoPostBase64,
          caption: caption,
          numberOfComments: 0,
          numberOfCheers: 0,
          cheering: [],
          comments: {},
          profileLinks,
          exhibitLinks,
          postLinks: links,
          profileColumns,
        },
      };
      Object.entries(parsedData.userFeed).map(([id, value]) => {
        if (id !== retrievedPostId) {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            Object.assign(
              parsedData.userFeed[id].profileExhibits,
              parsedData.userFeed[retrievedPostId].profileExhibits
            );
          }
        }
      });
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: ADD_USER_POST,
      fullname,
      username,
      jobTitle,
      ExhibitUId,
      profileBiography,
      exhibitTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      followingValue,
      followersValue,
      exhibitsValue,
      profilePictureUrl,
      profilePictureBase64,
      exhibitId,
      postId: retrievedPostId,
      postDateCreated: time,
      postLastUpdated: time,
      postPhotoPostId: tempPhotoPostId,
      postPhotoUrl: tempPhotoPostUrl,
      postPhotoBase64: tempPhotoPostBase64,
      caption,
      profileLinks,
      exhibitLinks,
      postLinks: links,
      profileColumns,
    });

    await dispatch({
      type: UPDATE_ALL_POSTS,
      ExhibitUId,
      postId: retrievedPostId,
    });
  };
};

export const getUserFeed = (localId: string, ExhibitUId: string) => {
  return async (dispatch) => {
    const userFeedGet = { localId, ExhibitUId };

    const uploadedUserPost = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/getUserFeed",
      userFeedGet
    );

    let returnData = uploadedUserPost.data.returnData;

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.userFeed = { ...returnData };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({ type: GET_USER_FEED, feedData: returnData });
  };
};

export const cheerPost = (
  localId: string,
  ExhibitUId: string,
  exhibitId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      ExhibitUId,
      exhibitId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost",
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      if (parsedData.userFeed[postId]) {
        parsedData.userFeed[postId].cheering.push(ExhibitUId);
        parsedData.userFeed[postId].profileExhibits[exhibitId].exhibitPosts[
          postId
        ].cheering.push(ExhibitUId);

        parsedData.userFeed[postId].numberOfCheers += 1;
        parsedData.userFeed[postId].profileExhibits[exhibitId].exhibitPosts[
          postId
        ].numberOfCheers += 1;

        parsedData.cheeredPosts.push(postId);

        Object.entries(parsedData.userFeed).map(([id, value]) => {
          Object.entries(parsedData.userFeed[id].profileExhibits).map(
            ([projId, value]) => {
              if (
                Object.keys(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts
                ).includes(postId) &&
                postId === id
              ) {
                Object.assign(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                    postId
                  ].numberOfCheers,
                  parsedData.userFeed[postId].numberOfCheers
                );
                Object.assign(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                    postId
                  ].cheering,
                  parsedData.userFeed[postId].cheering
                );
              }
            }
          );
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({ type: CHEER_POST, ExhibitUId, exhibitId, postId });
    await dispatch({ type: CHEER_UPDATE_POSTS, exhibitId, postId });
  };
};

export const cheerOwnFeedPost = (
  ExhibitUId: string,
  exhibitId: string,
  postId: string
) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits[exhibitId].exhibitPosts[postId].cheering.push(
        postId
      );
      parsedData.profileExhibits[exhibitId].exhibitPosts[
        postId
      ].numberOfCheers += 1;

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHEER_OWN_FEED_POST,
      ExhibitUId,
      exhibitId,
      postId,
    });
  };
};

export const cheerOwnProfilePost = (
  localId: string,
  ExhibitUId: string,
  exhibitId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      ExhibitUId,
      exhibitId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost",
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitPosts: {
            ...parsedData.profileExhibits[exhibitId].exhibitPosts,
            [postId]: {
              ...parsedData.profileExhibits[exhibitId].exhibitPosts[postId],
              numberOfCheers:
                parsedData.profileExhibits[exhibitId].exhibitPosts[postId]
                  .numberOfCheers + 1,
              cheering: [
                ...parsedData.profileExhibits[exhibitId].exhibitPosts[postId]
                  .cheering,
                ExhibitUId,
              ],
            },
          },
        },
      };

      parsedData.userFeed = {
        ...parsedData.userFeed,
        [postId]: {
          ...parsedData.userFeed[postId],
          profileExhibits: {
            ...parsedData.userFeed[postId].profileExhibits,
            [exhibitId]: {
              ...parsedData.userFeed[postId].profileExhibits[exhibitId],
              exhibitPosts: {
                ...parsedData.userFeed[postId].profileExhibits[exhibitId]
                  .exhibitPosts,
                [postId]: {
                  ...parsedData.userFeed[postId].profileExhibits[exhibitId]
                    .exhibitPosts[postId],
                  numberOfCheers:
                    parsedData.userFeed[postId].profileExhibits[exhibitId]
                      .exhibitPosts[postId].numberOfCheers + 1,
                  cheering: [
                    ...parsedData.userFeed[postId].profileExhibits[exhibitId]
                      .exhibitPosts[postId].cheering,
                    ExhibitUId,
                  ],
                },
              },
            },
          },
          numberOfCheers: parsedData.userFeed[postId].numberOfCheers + 1,
          cheering: [...parsedData.userFeed[postId].cheering, ExhibitUId],
        },
      };

      Object.entries(parsedData.userFeed).map(([id, value]) => {
        Object.entries(parsedData.userFeed[id].profileExhibits).map(
          ([projId, value]) => {
            if (
              Object.keys(
                parsedData.userFeed[id].profileExhibits[projId].exhibitPosts
              ).includes(postId) &&
              postId === id
            ) {
              parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                postId
              ].numberOfCheers = parsedData.userFeed[postId].numberOfCheers;
              Object.assign(
                parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                  postId
                ].cheering,
                parsedData.userFeed[postId].cheering
              );
            }
          }
        );
      });

      parsedData.cheeredPosts = [...parsedData.cheeredPosts, postId];
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHEER_OWN_PROFILE_POST,
      ExhibitUId,
      exhibitId,
      postId,
    });

    await dispatch({ type: CHEER_UPDATE_POSTS, exhibitId, postId });
  };
};

export const uncheerPost = (
  localId: string,
  ExhibitUId: string,
  exhibitId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      ExhibitUId,
      exhibitId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost",
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      if (parsedData.userFeed[postId]) {
        parsedData.userFeed[postId].cheering.splice(
          parsedData.userFeed[postId].cheering.indexOf(ExhibitUId),
          1
        );
        parsedData.userFeed[postId].profileExhibits[exhibitId].exhibitPosts[
          postId
        ].cheering.splice(
          parsedData.userFeed[postId].profileExhibits[exhibitId].exhibitPosts[
            postId
          ].cheering.indexOf(ExhibitUId),
          1
        );

        parsedData.userFeed[postId].numberOfCheers -= 1;
        parsedData.userFeed[postId].profileExhibits[exhibitId].exhibitPosts[
          postId
        ].numberOfCheers -= 1;

        parsedData.cheeredPosts.splice(
          parsedData.cheeredPosts.indexOf(postId),
          1
        );

        Object.entries(parsedData.userFeed).map(([id, value]) => {
          Object.entries(parsedData.userFeed[id].profileExhibits).map(
            ([projId, value]) => {
              if (
                Object.keys(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts
                ).includes(postId) &&
                postId === id
              ) {
                Object.assign(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                    postId
                  ].numberOfCheers,
                  parsedData.userFeed[postId].numberOfCheers
                );
                Object.assign(
                  parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                    postId
                  ].cheering,
                  parsedData.userFeed[postId].cheering
                );
              }
            }
          );
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNCHEER_POST,
      ExhibitUId,
      exhibitId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, exhibitId, postId });
  };
};

export const uncheerOwnFeedPost = (
  ExhibitUId: string,
  exhibitId: string,
  postId: string
) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits[exhibitId].exhibitPosts[
        postId
      ].cheering.splice(
        parsedData.profileExhibits[exhibitId].exhibitPosts[
          postId
        ].cheering.indexOf(ExhibitUId),
        1
      );
      parsedData.profileExhibits[exhibitId].exhibitPosts[
        postId
      ].numberOfCheers -= 1;

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNCHEER_OWN_FEED_POST,
      ExhibitUId,
      exhibitId,
      postId,
    });
  };
};

export const uncheerOwnProfilePost = (
  localId: string,
  ExhibitUId: string,
  exhibitId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      ExhibitUId,
      exhibitId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost",
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitPosts: {
            ...parsedData.profileExhibits[exhibitId].exhibitPosts,
            [postId]: {
              ...parsedData.profileExhibits[exhibitId].exhibitPosts[postId],
              numberOfCheers:
                parsedData.profileExhibits[exhibitId].exhibitPosts[postId]
                  .numberOfCheers - 1,
              cheering: parsedData.profileExhibits[exhibitId].exhibitPosts[
                postId
              ].cheering.filter(
                (listExhibitUId) => listExhibitUId !== ExhibitUId
              ),
            },
          },
        },
      };
      parsedData.userFeed = {
        ...parsedData.userFeed,
        [postId]: {
          ...parsedData.userFeed[postId],
          profileExhibits: {
            ...parsedData.userFeed[postId].profileExhibits,
            [exhibitId]: {
              ...parsedData.userFeed[postId].profileExhibits[exhibitId],
              exhibitPosts: {
                ...parsedData.userFeed[postId].profileExhibits[exhibitId]
                  .exhibitPosts,
                [postId]: {
                  ...parsedData.userFeed[postId].profileExhibits[exhibitId]
                    .exhibitPosts[postId],
                  numberOfCheers:
                    parsedData.userFeed[postId].profileExhibits[exhibitId]
                      .exhibitPosts[postId].numberOfCheers - 1,
                  cheering: parsedData.userFeed[postId].profileExhibits[
                    exhibitId
                  ].exhibitPosts[postId].cheering.filter(
                    (listExhibitUId) => listExhibitUId !== ExhibitUId
                  ),
                },
              },
            },
          },
          numberOfCheers: parsedData.userFeed[postId].numberOfCheers - 1,
          cheering: parsedData.userFeed[postId].cheering.filter(
            (listExhibitUId) => listExhibitUId !== ExhibitUId
          ),
        },
      };
      Object.entries(parsedData.userFeed).map(([id, value]) => {
        Object.entries(parsedData.userFeed[id].profileExhibits).map(
          ([projId, value]) => {
            if (
              Object.keys(
                parsedData.userFeed[id].profileExhibits[projId].exhibitPosts
              ).includes(postId) &&
              postId === id
            ) {
              Object.assign(
                parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                  postId
                ].numberOfCheers,
                parsedData.userFeed[postId].numberOfCheers
              );
              Object.assign(
                parsedData.userFeed[id].profileExhibits[projId].exhibitPosts[
                  postId
                ].cheering,
                parsedData.userFeed[postId].cheering
              );
            }
          }
        );
      });
      parsedData.cheeredPosts = parsedData.cheeredPosts.filter(
        (post) => post !== postId
      );
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNCHEER_OWN_PROFILE_POST,
      ExhibitUId,
      exhibitId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, exhibitId, postId });
  };
};

export const sendNotification = (
  username: string,
  ExhibitUId: string,
  exhibitId: string,
  postId: string,
  posterExhibitUId: string,
  profilePictureUrl: string,
  postImage: string,
  notificationType: string
) => {
  return async () => {
    const notificationForm = {
      username,
      ExhibitUId,
      exhibitId,
      postId,
      posterExhibitUId,
      notificationType,
      profilePictureUrl,
      postImage,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/sendNotification",
      notificationForm
    );
  };
};

export const sendFollowNotification = (
  username: string,
  ExhibitUId: string,
  posterExhibitUId: string,
  profilePictureUrl: string
) => {
  return async () => {
    const notificationForm = {
      username,
      ExhibitUId,
      posterExhibitUId,
      profilePictureUrl,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/sendFollowNotification",
      notificationForm
    );
  };
};

export const setToken = (localId: string, token: any) => {
  return async () => {
    const tokenForm = {
      localId,
      token,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/setToken",
      tokenForm
    );
  };
};

export const changeProfileNumberOfColumns = (
  localId: string,
  ExhibitUId: string,
  postIds: Array<string>,
  number: number
) => {
  return async (dispatch) => {
    const picture = { localId, ExhibitUId, postIds, number };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/changeProfileNumberOfColumns",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileColumns = number;

      if (parsedData.userFeed) {
        Object.entries(parsedData.userFeed).map(([id, value]) => {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            parsedData.userFeed[id].profileColumns = number;
          }
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: CHANGE_PROFILE_COLUMNS, number, ExhibitUId });
  };
};

export const changeExhibitNumberOfColumns = (
  localId: string,
  ExhibitUId: string,
  exhibitId: string,
  postIds: string[],
  number: number
) => {
  return async (dispatch) => {
    const picture = { localId, ExhibitUId, exhibitId, postIds, number };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/changeExhibitNumberOfColumns",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileExhibits = {
        ...parsedData.profileExhibits,
        [exhibitId]: {
          ...parsedData.profileExhibits[exhibitId],
          exhibitColumns: number,
        },
      };

      if (parsedData.userFeed) {
        Object.entries(parsedData.userFeed).map(([id, value]) => {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            parsedData.userFeed[id].profileExhibits[exhibitId].exhibitColumns =
              number;
          }
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: CHANGE_PROJECT_COLUMNS, ExhibitUId, exhibitId, number });
  };
};

export const getUpdates = () => {
  return async (dispatch) => {
    const uploadedUserPost = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/getUpdates"
    );
    const returnData = uploadedUserPost.data.returnData;

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.updates = { ...returnData };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({ type: GET_UPDATES, updateData: returnData });
  };
};

export const resetScroll = (tab: string) => {
  return async (dispatch) => {
    await dispatch({ type: RESET_SCROLL, tab });
  };
};

export const onScreen = (tab: string) => {
  return async (dispatch) => {
    await dispatch({ type: ON_SCREEN, tab });
  };
};

export const offScreen = (tab: string) => {
  return async (dispatch) => {
    await dispatch({ type: OFF_SCREEN, tab });
  };
};

export const showcaseProfile = () => {
  return async (dispatch) => {
    await dispatch({ type: SHOWCASE_PROFILE });
  };
};

export const returnFromShowcasing = () => {
  return async (dispatch) => {
    await dispatch({ type: RETURN_FROM_SHOWCASING });
  };
};

export const setHideProfileFooter = (value: boolean) => {
  return async (dispatch) => {
    await dispatch({ type: HIDE_PROFILE_FOOTER, value });
  };
};

export const setDarkMode = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const darkModeData = { localId, ExhibitUId, value, switchName: "darkMode" };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchCurrentUserOnly`,
      darkModeData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.darkMode = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: SET_DARKMODE, darkMode: value });
  };
};

export const setShowCheering = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const showCheeringData = {
      localId,
      ExhibitUId,
      value,
      switchName: "showCheering",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchPublicInfo`,
      showCheeringData
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.showCheering = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: SHOW_CHEERING, ExhibitUId, showCheering: value });
  };
};

export const setHideFollowing = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const hideFollowingData = {
      localId,
      ExhibitUId,
      value,
      switchName: "hideFollowing",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchPublicInfo`,
      hideFollowingData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.hideFollowing = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: HIDE_FOLLOWING, ExhibitUId, hideFollowingValue: value });
  };
};

export const setHideFollowers = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const hideFollowersData = {
      localId,
      ExhibitUId,
      value,
      switchName: "hideFollowers",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchPublicInfo`,
      hideFollowersData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.hideFollowers = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: HIDE_FOLLOWERS, ExhibitUId, hideFollowersValue: value });
  };
};

export const setHideExhibits = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const hideExhibitsData = {
      localId,
      ExhibitUId,
      value,
      switchName: "hideExhibits",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchPublicInfo`,
      hideExhibitsData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.hideExhibits = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: HIDE_EXHIBITS, ExhibitUId, hideExhibitsValue: value });
  };
};

export const setTutorialing = (
  localId: string,
  ExhibitUId: string,
  value: boolean,
  screen: string
) => {
  return async (dispatch) => {
    const tutorialingData = {
      localId,
      ExhibitUId,
      value,
      screen,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setTutorialing`,
      tutorialingData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.tutorialing = value;
      parsedData.tutorialScreen = screen;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: SET_TUTORIALING, value, screen });
  };
};

export const setTutorialPrompt = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const tutorialingData = {
      localId,
      ExhibitUId,
      value,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setTutorialPrompt`,
      tutorialingData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.tutorialPrompt = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: SET_TUTORIALING_PROMPT, value });
  };
};
