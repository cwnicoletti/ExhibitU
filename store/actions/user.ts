import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getBase64FromUrl from "../../helper/getBase64FromUrl";

export const FORCE_SEARCH = "FORCE_SEARCH";
export const RESET_SCROLL = "RESET_SCROLL";
export const SHOWCASE_PROFILE = "SHOWCASE_PROFILE";
export const RETURN_FROM_SHOWCASING = "RETURN_FROM_SHOWCASING";
export const HIDE_PROFILE_FOOTER = "HIDE_PROFILE_FOOTER";
export const ON_SCREEN = "ON_SCREEN";
export const OFF_SCREEN = "OFF_SCREEN";

export const GET_SWITCHES = "GET_SWITCHES";
export const SET_DARKMODE = "SET_DARKMODE";
export const SHOW_CHEERING = "SHOW_CHEERING";
export const HIDE_FOLLOWING = "HIDE_FOLLOWING";
export const HIDE_FOLLOWERS = "HIDE_FOLLOWERS";
export const HIDE_ADVOCATES = "HIDE_ADVOCATES";

export const CHEER_POST = "CHEER_POST";
export const CHEER_UPDATE_POSTS = "CHEER_UPDATE_POSTS";
export const CHEER_OWN_FEED_POST = "CHEER_OWN_FEED_POST";
export const CHEER_OWN_PROFILE_POST = "CHEER_OWN_PROFILE_POST";
export const UNCHEER_POST = "UNCHEER_POST";
export const UNCHEER_UPDATE_POSTS = "UNCHEER_UPDATE_POSTS";
export const UNCHEER_OWN_FEED_POST = "UNCHEER_OWN_FEED_POST";
export const UNCHEER_OWN_PROFILE_POST = "UNCHEER_OWN_PROFILE_POST";

export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_FEED = "GET_USER_FEED";
export const GET_UPDATES = "GET_UPDATES";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const ADVOCATE_FOR_USER = "ADVOCATE_FOR_USER";
export const UNADVOCATE_FOR_USER = "UNADVOCATE_FOR_USER";

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const REFRESH_PROFILE = "REFRESH_PROFILE";
export const UPDATE_PROFILE_LINKS = "UPDATE_PROFILE_LINKS";
export const UPDATE_PROJECT_LINKS = "UPDATE_PROJECT_LINKS";
export const UPDATE_USER_PROJECT = "UPDATE_USER_PROJECT";

export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";
export const CHANGE_PROFILE_COLUMNS = "CHANGE_PROFILE_COLUMNS";
export const CHANGE_PROJECT_PICTURE = "CHANGE_PROJECT_PICTURE";
export const CHANGE_PROJECT_COLUMNS = "CHANGE_PROJECT_COLUMNS";

export const REMOVE_USER_PROJECT = "REMOVE_USER_PROJECT";
export const REMOVE_USER_POST = "REMOVE_USER_POST";
export const CLEAR_TEMP_PROJECT_PICTURE = "CLEAR_TEMP_PROJECT_PICTURE";
export const CLEAR_TEMP_POST_PICTURE = "CLEAR_TEMP_POST_PICTURE";

export const ADD_TEMP_PROJECT_PICTURE = "ADD_TEMP_PROJECT_PICTURE";
export const ADD_TEMP_POST_PICTURE = "ADD_TEMP_POST_PICTURE";
export const ADD_USER_PROJECT = "ADD_USER_PROJECT";
export const ADD_USER_POST = "ADD_USER_POST";
export const UPDATE_ALL_POSTS = "UPDATE_ALL_POSTS";

export const UPLOAD_FEEDBACK = "UPLOAD_FEEDBACK";
export const UPLOAD_REPORT_BUG = "UPLOAD_REPORT_BUG";

export const SET_TUTORIALING = "SET_TUTORIALING";
export const SET_TUTORIALING_PROMPT = "SET_TUTORIALING_PROMPT";

export interface UserState {
  ExhibitUId: string;
  email: string;
  profilePictureId: string;
  profilePictureUrl: string;
  profilePictureBase64: string;
  projectTempCoverPhotoId: string;
  projectTempCoverPhotoUrl: string;
  projectTempCoverPhotoBase64: string;
  tempPhotoPostId: string;
  tempPhotoPostUrl: string;
  tempPhotoPostBase64: string;
  fullname: string;
  jobTitle: string;
  username: string;
  profileBiography: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfAdvocates: number;
  numberOfAdvocating: number;
  profileColumns: number;
  followers: string[];
  following: string[];
  advocates: string[];
  advocating: string[];
  projectsAdvocating: string[];
  cheeredPosts: string[];
  profileProjects: object;
  profileLinks: object;
  userFeed: object;
  darkMode: boolean;
  showCheering: boolean;
  hideFollowing: boolean;
  hideFollowers: boolean;
  hideAdvocates: boolean;
  updates: object;
  resetScrollFeed: boolean;
  resetScrollExplore: boolean;
  resetScrollProfile: boolean;
  showcasingProfile: boolean;
  hiddenProfileFooter: boolean;
  onFeedScreen: boolean;
  onExploreScreen: boolean;
  onProfileScreen: boolean;
  tutorialing: boolean;
  tutorialPrompt: boolean;
  tutorialScreen: string;
}

export const refreshProfile = (localId: string) => {
  return async (dispatch) => {
    const downloadForm = { localId };

    const profileInfo = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/refreshProfile",
      downloadForm
    );

    let followers = [];
    let following = [];
    let advocates = [];
    let advocating = [];
    let projectsAdvocating = [];
    let cheeredPosts = [];
    let profileProjects = {};
    let profileLinks = {};

    if (profileInfo.data.data.followers) {
      followers = profileInfo.data.data.followers;
    }
    if (profileInfo.data.data.following) {
      following = profileInfo.data.data.following;
    }
    if (profileInfo.data.data.advocates) {
      advocates = profileInfo.data.data.advocates;
    }
    if (profileInfo.data.data.advocating) {
      advocating = profileInfo.data.data.advocating;
    }
    if (profileInfo.data.data.projectsAdvocating) {
      projectsAdvocating = profileInfo.data.data.projectsAdvocating;
    }
    if (profileInfo.data.data.cheeredPosts) {
      cheeredPosts = profileInfo.data.data.cheeredPosts;
    }
    if (profileInfo.data.data.profileProjects) {
      profileProjects = profileInfo.data.data.profileProjects;
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
      parsedData.numberOfAdvocates = profileInfo.data.data.numberOfAdvocates;
      parsedData.numberOfAdvocating = profileInfo.data.data.numberOfAdvocating;
      parsedData.followers = followers;
      parsedData.following = following;
      parsedData.advocates = advocates;
      parsedData.advocating = advocating;
      parsedData.projectsAdvocating = projectsAdvocating;
      parsedData.profileLinks = profileLinks;
      parsedData.cheeredPosts = cheeredPosts;
      parsedData.profileProjects = profileProjects;
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
      advocates,
      advocating,
      projectsAdvocating,
      cheeredPosts,
      profileProjects,
      profileLinks,
    });
  };
};

export const getUserData = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userDocData");
    const transformedData = JSON.parse(userData);

    let followers = [];
    let following = [];
    let advocates = [];
    let advocating = [];
    let projectsAdvocating = [];
    let cheeredPosts = [];
    let profileProjects = {};
    let profileLinks = {};
    let userFeed = {};
    let updates = {};

    if (transformedData.followers) {
      followers = transformedData.followers;
    }
    if (transformedData.following) {
      following = transformedData.following;
    }
    if (transformedData.advocates) {
      advocates = transformedData.advocates;
    }
    if (transformedData.advocating) {
      advocating = transformedData.advocating;
    }
    if (transformedData.projectsAdvocating) {
      projectsAdvocating = transformedData.projectsAdvocating;
    }
    if (transformedData.cheeredPosts) {
      cheeredPosts = transformedData.cheeredPosts;
    }
    if (transformedData.profileProjects) {
      profileProjects = transformedData.profileProjects;
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

    await dispatch({
      type: GET_USER_DATA,
      ExhibitUId: transformedData.ExhibitUId,
      email: transformedData.email,
      profilePictureId: transformedData.profilePictureId,
      profilePictureUrl: transformedData.profilePictureUrl,
      profilePictureBase64: transformedData.profilePictureBase64,
      projectTempCoverPhotoId: transformedData.projectTempCoverPhotoId,
      projectTempCoverPhotoUrl: transformedData.projectTempCoverPhotoUrl,
      projectTempCoverPhotoBase64: transformedData.projectTempCoverPhotoBase64,
      tempPhotoPostId: transformedData.tempPhotoPostId,
      tempPhotoPostUrl: transformedData.tempPhotoPostUrl,
      tempPhotoPostBase64: transformedData.tempPhotoPostBase64,
      fullname: transformedData.fullname,
      jobTitle: transformedData.jobTitle,
      username: transformedData.username,
      profileBiography: transformedData.profileBiography,
      numberOfFollowers: transformedData.numberOfFollowers,
      numberOfFollowing: transformedData.numberOfFollowing,
      numberOfAdvocates: transformedData.numberOfAdvocates,
      numberOfAdvocating: transformedData.numberOfAdvocating,
      profileColumns: transformedData.profileColumns,
      darkMode: transformedData.darkMode,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideAdvocates: transformedData.hideAdvocates,
      tutorialing: transformedData.tutorialing,
      tutorialPrompt: transformedData.tutorialPrompt,
      tutorialScreen: transformedData.tutorialScreen,
      followers,
      following,
      advocates,
      advocating,
      projectsAdvocating,
      cheeredPosts,
      profileProjects,
      profileLinks,
      userFeed,
      updates,
    });

    await dispatch({
      type: GET_SWITCHES,
      darkMode: transformedData.darkMode,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideAdvocates: transformedData.hideAdvocates,
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

export const uploadNewProject = (
  ExhibitUId: string,
  localId: string,
  projectTempCoverPhotoId: string,
  projectTempCoverPhotoBase64: string,
  projectTitle: string,
  projectDescription: string,
  links: object
) => {
  return async (dispatch) => {
    const uploadForm = {
      ExhibitUId,
      localId,
      projectTempCoverPhotoId,
      projectTempCoverPhotoBase64,
      projectTitle,
      projectDescription,
      links,
    };

    const newProjectResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadNewProject",
      uploadForm
    );
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [newProjectResponse.data.projectId]: {
          projectId: newProjectResponse.data.projectId,
          projectCoverPhotoId: newProjectResponse.data.photoId,
          projectCoverPhotoUrl: newProjectResponse.data.url,
          projectCoverPhotoBase64: projectTempCoverPhotoBase64,
          projectDateCreated: newProjectResponse.data.time,
          projectLastUpdated: newProjectResponse.data.time,
          projectTitle,
          projectDescription,
          projectColumns: 2,
          projectPosts: {},
          projectLinks: links,
        },
      };
      for (const post in parsedData.userFeed) {
        if (parsedData.userFeed[post].ExhibitUId === ExhibitUId) {
          parsedData.userFeed = {
            ...parsedData.userFeed,
            [post]: {
              ...parsedData.userFeed[post],
              profileProjects: {
                ...parsedData.profileProjects,
              },
            },
          };
        }
      }
      parsedData.projectTempCoverPhotoUrl = "";
      parsedData.projectTempCoverPhotoBase64 = "";
      parsedData.projectTempCoverPhotoId = "";
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });
    dispatch({
      type: ADD_USER_PROJECT,
      ExhibitUId,
      projectId: newProjectResponse.data.projectId,
      projectCoverPhotoId: newProjectResponse.data.photoId,
      projectCoverPhotoUrl: newProjectResponse.data.url,
      projectCoverPhotoBase64: projectTempCoverPhotoBase64,
      projectDateCreated: newProjectResponse.data.time,
      projectLastUpdated: newProjectResponse.data.time,
      projectTitle,
      projectDescription,
      projectLinks: links,
    });
  };
};

export const uploadUpdatedProject = (
  ExhibitUId: string,
  localId: string,
  projectId: string,
  projectTempCoverPhotoUrl: string,
  projectTitle: string,
  projectDescription: string,
  links: object
) => {
  return async (dispatch) => {
    const uploadForm = {
      ExhibitUId,
      localId,
      projectId,
      url: projectTempCoverPhotoUrl,
      projectTitle,
      projectDescription,
      links,
    };

    const updatedProjectResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadUpdatedProject",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectLastUpdated: updatedProjectResponse.data.time,
          projectCoverPhotoUrl: projectTempCoverPhotoUrl,
          projectTitle,
          projectDescription,
          projectLinks: links,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({
      type: UPDATE_USER_PROJECT,
      projectId,
      projectLastUpdated: updatedProjectResponse.data.time,
      projectCoverPhotoUrl: projectTempCoverPhotoUrl,
      projectTitle,
      projectDescription,
      projectLinks: links,
    });
  };
};

export const uploadRemoveProject = (
  ExhibitUId: string,
  localId: string,
  projectId: string
) => {
  return async (dispatch) => {
    const uploadForm = { ExhibitUId, localId, projectId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemoveProject",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      const postIds = Object.keys(
        parsedData.profileProjects[projectId].projectPosts
      );
      delete parsedData.profileProjects[projectId];
      for (const post in parsedData.userFeed) {
        if (postIds.includes(post)) {
          delete parsedData.userFeed[post];
        }
      }
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({
      type: REMOVE_USER_PROJECT,
      projectId,
    });
  };
};

export const uploadRemovePost = (
  ExhibitUId: string,
  localId: string,
  projectId: string,
  postId: string
) => {
  return async (dispatch) => {
    const uploadForm = { ExhibitUId, localId, projectId, postId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemovePost",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      delete parsedData.profileProjects[projectId].projectPosts[postId];
      delete parsedData.userFeed[postId];
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: REMOVE_USER_POST,
      projectId,
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

export const advocateForUser = (
  exploredExhibitUId: string,
  ExhibitUId: string,
  localId: string,
  projectId: string
) => {
  return async (dispatch) => {
    const user = { exploredExhibitUId, ExhibitUId, localId, projectId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/advocateForUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.advocating.push(exploredExhibitUId);
      parsedData.projectsAdvocating.push(projectId);
      parsedData.numberOfAdvocating = parsedData.numberOfAdvocating + 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: ADVOCATE_FOR_USER,
      exploredExhibitUId,
      projectId,
    });
  };
};

export const unadvocateForUser = (
  exploredExhibitUId: string,
  ExhibitUId: string,
  localId: string,
  projectId: string
) => {
  return async (dispatch) => {
    const user = { exploredExhibitUId, ExhibitUId, localId, projectId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/unadvocateForUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.advocating.splice(
        parsedData.advocating.indexOf(exploredExhibitUId),
        1
      );
      parsedData.projectsAdvocating.splice(
        parsedData.projectsAdvocating.indexOf(projectId),
        1
      );
      parsedData.numberOfAdvocating = parsedData.numberOfAdvocating - 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNADVOCATE_FOR_USER,
      exploredExhibitUId,
      projectId,
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
            parsedData.userFeed[id].profilePictureBase64 =
              parsedData.profilePictureBase64;
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

export const uploadAddTempProjectCoverPicture = (
  base64: string,
  ExhibitUId: string,
  localId: string,
  projectTempCoverPhotoId: string
) => {
  return async (dispatch) => {
    const picture = { base64, ExhibitUId, localId, projectTempCoverPhotoId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempProjectCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.projectTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      parsedData.projectTempCoverPhotoId =
        uploadedPictureUrlResponse.data.photoId;
      parsedData.projectTempCoverPhotoBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: ADD_TEMP_PROJECT_PICTURE,
      projectTempCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
      projectTempCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
      projectTempCoverPhotoBase64: base64,
    });
  };
};

export const uploadAddTempPostPicture = (
  base64: string,
  projectId: string,
  ExhibitUId: string,
  localId: string
) => {
  return async (dispatch) => {
    const picture = { base64, projectId, ExhibitUId, localId };

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

export const uploadChangeProjectCoverPicture = (
  base64: string,
  projectId: string,
  ExhibitUId: string,
  localId: string,
  projectCoverPhotoId: string
) => {
  return async (dispatch) => {
    const picture = {
      base64,
      projectId,
      ExhibitUId,
      localId,
      projectCoverPhotoId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProjectCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.projectTempCoverPhotoId =
        uploadedPictureUrlResponse.data.photoId;
      parsedData.projectTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      parsedData.projectTempCoverPhotoBase64 = base64;
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
          projectCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
          projectCoverPhotoBase64: base64,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHANGE_PROJECT_PICTURE,
      projectId,
      projectCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
      projectCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
      projectCoverPhotoBase64: base64,
    });
  };
};

export const addUserPost = (
  ExhibitUId: string,
  localId: string,
  projectId: string,
  fullname: string,
  username: string,
  jobTitle: string,
  numberOfFollowers: number,
  numberOfFollowing: number,
  numberOfAdvocates: number,
  followingValue: boolean,
  followersValue: boolean,
  advocatesValue: boolean,
  profileBiography: string,
  projectTitle: string,
  projectCoverPhotoUrl: string,
  projectDateCreated: string,
  projectLastUpdated: string,
  projectDescription: string,
  profilePictureUrl: string,
  profilePictureBase64: string,
  tempPhotoPostId: string,
  tempPhotoPostUrl: string,
  tempPhotoPostBase64: string,
  caption: string,
  profileLinks: object,
  projectLinks: object,
  links: object,
  profileColumns: number
) => {
  return async (dispatch) => {
    const picture = {
      ExhibitUId,
      localId,
      projectId,
      fullname,
      username,
      jobTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      followingValue,
      followersValue,
      advocatesValue,
      profileBiography,
      projectTitle,
      projectCoverPhotoUrl,
      projectDateCreated,
      projectLastUpdated,
      projectDescription,
      profilePictureUrl,
      postId: tempPhotoPostId,
      postUrl: tempPhotoPostUrl,
      caption,
      profileLinks,
      projectLinks,
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
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectPosts: {
            ...parsedData.profileProjects[projectId].projectPosts,
            [retrievedPostId]: {
              postId: retrievedPostId,
              ExhibitUId,
              projectId,
              fullname,
              username,
              jobTitle,
              numberOfFollowers,
              numberOfFollowing,
              numberOfAdvocates,
              profileBiography,
              projectTitle,
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
              projectLinks,
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
          projectId,
          fullname,
          username,
          jobTitle,
          numberOfFollowers,
          numberOfFollowing,
          numberOfAdvocates,
          followingValue,
          followersValue,
          advocatesValue,
          profileBiography,
          profileProjects: {
            ...parsedData.profileProjects,
            [projectId]: {
              ...parsedData.profileProjects[projectId],
              projectPosts: {
                ...parsedData.profileProjects[projectId].projectPosts,
                [retrievedPostId]: {
                  postId: retrievedPostId,
                  ExhibitUId,
                  projectId,
                  fullname,
                  username,
                  jobTitle,
                  numberOfFollowers,
                  numberOfFollowing,
                  numberOfAdvocates,
                  followingValue,
                  followersValue,
                  advocatesValue,
                  profileBiography,
                  projectTitle,
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
                  projectLinks,
                  postLinks: links,
                  profileColumns,
                },
              },
            },
          },
          projectTitle,
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
          projectLinks,
          postLinks: links,
          profileColumns,
        },
      };
      Object.entries(parsedData.userFeed).map(([id, value]) => {
        if (id !== retrievedPostId) {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            Object.assign(
              parsedData.userFeed[id].profileProjects,
              parsedData.userFeed[retrievedPostId].profileProjects
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
      projectTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      followingValue,
      followersValue,
      advocatesValue,
      profilePictureUrl,
      profilePictureBase64,
      projectId,
      postId: retrievedPostId,
      postDateCreated: time,
      postLastUpdated: time,
      postPhotoPostId: tempPhotoPostId,
      postPhotoUrl: tempPhotoPostUrl,
      postPhotoBase64: tempPhotoPostBase64,
      caption,
      profileLinks,
      projectLinks,
      postLinks: links,
      profileColumns,
    });

    await dispatch({ type: UPDATE_ALL_POSTS, postId: retrievedPostId });
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

    // if (returnData) {
    //   for (const key of Object.keys(returnData)) {
    //     const postPhotoBase64 = await getBase64FromUrl(
    //       returnData[key]["postPhotoUrl"]
    //     );
    //     const profilePictureBase64 = await getBase64FromUrl(
    //       returnData[key]["profilePictureUrl"]
    //     );
    //     returnData[key]["postPhotoBase64"] = postPhotoBase64;
    //     returnData[key]["profilePictureBase64"] = profilePictureBase64;
    //     for (const projectKey of Object.keys(returnData[key].profileProjects)) {
    //       const projectCoverPhotoBase64 = await getBase64FromUrl(
    //         returnData[key].profileProjects[projectKey]["projectCoverPhotoUrl"]
    //       );
    //       returnData[key].profileProjects[projectKey][
    //         "projectCoverPhotoBase64"
    //       ] = projectCoverPhotoBase64;
    //       for (const postKey of Object.keys(
    //         returnData[key].profileProjects[projectKey].projectPosts
    //       )) {
    //         const postPhotoBase64 = await getBase64FromUrl(
    //           returnData[key].profileProjects[projectKey].projectPosts[postKey][
    //             "postPhotoUrl"
    //           ]
    //         );
    //         returnData[key].profileProjects[projectKey].projectPosts[postKey][
    //           "postPhotoBase64"
    //         ] = postPhotoBase64;
    //       }
    //     }
    //   }
    // }

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
  projectId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      ExhibitUId,
      projectId,
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
        parsedData.userFeed[postId].profileProjects[projectId].projectPosts[
          postId
        ].cheering.push(ExhibitUId);

        parsedData.userFeed[postId].numberOfCheers += 1;
        parsedData.userFeed[postId].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers += 1;

        parsedData.cheeredPosts.push(postId);

        Object.entries(parsedData.userFeed).map(([id, value]) => {
          Object.entries(parsedData.userFeed[id].profileProjects).map(
            ([projId, value]) => {
              if (
                Object.keys(
                  parsedData.userFeed[id].profileProjects[projId].projectPosts
                ).includes(postId) &&
                postId !== id
              ) {
                parsedData.userFeed[id].profileProjects[projId].projectPosts[
                  postId
                ].numberOfCheers = parsedData.userFeed[postId].numberOfCheers;
                Object.assign(
                  parsedData.userFeed[id].profileProjects[projId].projectPosts[
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

    await dispatch({ type: CHEER_POST, ExhibitUId, projectId, postId });
    await dispatch({ type: CHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const cheerOwnFeedPost = (
  ExhibitUId: string,
  projectId: string,
  postId: string
) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects[projectId].projectPosts[postId].cheering.push(
        postId
      );
      parsedData.profileProjects[projectId].projectPosts[
        postId
      ].numberOfCheers += 1;

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: CHEER_OWN_FEED_POST,
      ExhibitUId,
      projectId,
      postId,
    });
  };
};

export const cheerOwnProfilePost = (
  localId: string,
  ExhibitUId: string,
  projectId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      ExhibitUId,
      projectId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost",
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectPosts: {
            ...parsedData.profileProjects[projectId].projectPosts,
            [postId]: {
              ...parsedData.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                parsedData.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers + 1,
              cheering: [
                ...parsedData.profileProjects[projectId].projectPosts[postId]
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
          profileProjects: {
            ...parsedData.userFeed[postId].profileProjects,
            [projectId]: {
              ...parsedData.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...parsedData.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...parsedData.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    parsedData.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers + 1,
                  cheering: [
                    ...parsedData.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].cheering,
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
        Object.entries(parsedData.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                parsedData.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId) &&
              postId !== id
            ) {
              parsedData.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = parsedData.userFeed[postId].numberOfCheers;
              Object.assign(
                parsedData.userFeed[id].profileProjects[projId].projectPosts[
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
      projectId,
      postId,
    });

    await dispatch({ type: CHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const uncheerPost = (
  localId: string,
  ExhibitUId: string,
  projectId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      ExhibitUId,
      projectId,
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
        parsedData.userFeed[postId].profileProjects[projectId].projectPosts[
          postId
        ].cheering.splice(
          parsedData.userFeed[postId].profileProjects[projectId].projectPosts[
            postId
          ].cheering.indexOf(ExhibitUId),
          1
        );

        parsedData.userFeed[postId].numberOfCheers -= 1;
        parsedData.userFeed[postId].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers -= 1;

        parsedData.cheeredPosts.splice(
          parsedData.cheeredPosts.indexOf(postId),
          1
        );

        Object.entries(parsedData.userFeed).map(([id, value]) => {
          Object.entries(parsedData.userFeed[id].profileProjects).map(
            ([projId, value]) => {
              if (
                Object.keys(
                  parsedData.userFeed[id].profileProjects[projId].projectPosts
                ).includes(postId) &&
                postId !== id
              ) {
                parsedData.userFeed[id].profileProjects[projId].projectPosts[
                  postId
                ].numberOfCheers = parsedData.userFeed[postId].numberOfCheers;
                Object.assign(
                  parsedData.userFeed[id].profileProjects[projId].projectPosts[
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
      projectId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const uncheerOwnFeedPost = (
  ExhibitUId: string,
  projectId: string,
  postId: string
) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects[projectId].projectPosts[
        postId
      ].cheering.splice(
        parsedData.profileProjects[projectId].projectPosts[
          postId
        ].cheering.indexOf(ExhibitUId),
        1
      );
      parsedData.profileProjects[projectId].projectPosts[postId]
        .numberOfCheers - 1;

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    await dispatch({
      type: UNCHEER_OWN_FEED_POST,
      ExhibitUId,
      projectId,
      postId,
    });
  };
};

export const uncheerOwnProfilePost = (
  localId: string,
  ExhibitUId: string,
  projectId: string,
  postId: string,
  posterExhibitUId: string
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      ExhibitUId,
      projectId,
      postId,
      posterExhibitUId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost",
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectPosts: {
            ...parsedData.profileProjects[projectId].projectPosts,
            [postId]: {
              ...parsedData.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                parsedData.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers - 1,
              cheering: parsedData.profileProjects[projectId].projectPosts[
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
          profileProjects: {
            ...parsedData.userFeed[postId].profileProjects,
            [projectId]: {
              ...parsedData.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...parsedData.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...parsedData.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    parsedData.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers - 1,
                  cheering: parsedData.userFeed[postId].profileProjects[
                    projectId
                  ].projectPosts[postId].cheering.filter(
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
        Object.entries(parsedData.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                parsedData.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId) &&
              postId !== id
            ) {
              parsedData.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = parsedData.userFeed[postId].numberOfCheers;
              Object.assign(
                parsedData.userFeed[id].profileProjects[projId].projectPosts[
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
      projectId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, projectId, postId });
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

export const changeProjectNumberOfColumns = (
  localId: string,
  ExhibitUId: string,
  projectId: string,
  postIds: Array<string>,
  number: number
) => {
  return async (dispatch) => {
    const picture = { localId, ExhibitUId, projectId, postIds, number };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/changeProjectNumberOfColumns",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.profileProjects = {
        ...parsedData.profileProjects,
        [projectId]: {
          ...parsedData.profileProjects[projectId],
          projectColumns: number,
        },
      };

      if (parsedData.userFeed) {
        Object.entries(parsedData.userFeed).map(([id, value]) => {
          if (parsedData.userFeed[id].ExhibitUId === ExhibitUId) {
            parsedData.userFeed[id].profileProjects[projectId].projectColumns =
              number;
          }
        });
      }

      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: CHANGE_PROJECT_COLUMNS, ExhibitUId, projectId, number });
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

export const resetScroll = (tab: boolean) => {
  return async (dispatch) => {
    await dispatch({ type: RESET_SCROLL, tab });
  };
};

export const onScreen = (tab: boolean) => {
  return async (dispatch) => {
    await dispatch({ type: ON_SCREEN, tab });
  };
};

export const offScreen = (tab: boolean) => {
  return async (dispatch) => {
    await dispatch({ type: OFF_SCREEN, tab });
  };
};

export const showcaseProfile = () => {
  return async (dispatch) => {
    await dispatch({ type: SHOWCASE_PROFILE });
  };
};

export const returnFromShowcasing = (value: boolean) => {
  return async (dispatch) => {
    await dispatch({ type: RETURN_FROM_SHOWCASING, value });
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

export const setHideAdvocates = (
  localId: string,
  ExhibitUId: string,
  value: boolean
) => {
  return async (dispatch) => {
    const hideAdvocatesData = {
      localId,
      ExhibitUId,
      value,
      switchName: "hideAdvocates",
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/setSwitchPublicInfo`,
      hideAdvocatesData
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      let parsedData: UserState = JSON.parse(data);
      parsedData.hideAdvocates = value;
      await AsyncStorage.setItem("userDocData", JSON.stringify(parsedData));
    });

    dispatch({ type: HIDE_ADVOCATES, ExhibitUId, hideAdvocatesValue: value });
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
