import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const FORCE_SEARCH = "FORCE_SEARCH";
export const RESET_SCROLL = "RESET_SCROLL";
export const SHOWCASE_LOCALLY = "SHOWCASE_LOCALLY";
export const RETURN_FROM_SHOWCASING = "RETURN_FROM_SHOWCASING";
export const ON_SCREEN = "ON_SCREEN";
export const OFF_SCREEN = "OFF_SCREEN";

export const GET_SWITCHES = "GET_SWITCHES";

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

export const refreshProfile = (localId) => {
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

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.numberOfFollowers = profileInfo.data.data.numberOfFollowers;
      data.numberOfFollowing = profileInfo.data.data.numberOfFollowing;
      data.numberOfAdvocates = profileInfo.data.data.numberOfAdvocates;
      data.numberOfAdvocating = profileInfo.data.data.numberOfAdvocating;
      data.followers = followers;
      data.following = following;
      data.advocates = advocates;
      data.advocating = advocating;
      data.projectsAdvocating = projectsAdvocating;
      data.cheeredPosts = cheeredPosts;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
      DiamondCaseId: transformedData.DiamondCaseId,
      email: transformedData.email,
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
      resumeLinkUrl: transformedData.resumeLinkUrl,
      profileBiography: transformedData.profileBiography,
      numberOfFollowers: transformedData.numberOfFollowers,
      numberOfFollowing: transformedData.numberOfFollowing,
      numberOfAdvocates: transformedData.numberOfAdvocates,
      numberOfAdvocating: transformedData.numberOfAdvocating,
      profileColumns: transformedData.profileColumns,
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
      DiamondCaseLocalMode: transformedData.DiamondCaseLocalMode,
      showResume: transformedData.showResume,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideAdvocates: transformedData.hideAdvocates,
    });
  };
};

export const uploadUpdateUserProfile = (
  DiamondCaseId,
  localId,
  fullname,
  jobTitle,
  username,
  bio,
  resumeLink,
  showResumeValue,
  links
) => {
  return async (dispatch) => {
    const uploadForm = {
      DiamondCaseId,
      localId,
      fullname,
      jobTitle,
      username,
      bio,
      resumeLink,
      showResumeValue,
      links,
    };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/updateProfile",
      uploadForm
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.fullname = fullname;
      data.jobTitle = jobTitle;
      data.username = username;
      data.profileBiography = bio;
      data.resumeLink = resumeLink;
      data.showResumeValue = showResumeValue;
      data.profileLinks = links;
      if (Object.keys(data.userFeed) > 0) {
        const feedPosts = Object.keys(data.userFeed);
        for (const post of feedPosts) {
          data.userFeed = {
            [post]: {
              ...data.userFeed[post],
              fullname: data.fullname,
              jobTitle: data.jobTitle,
              username: data.username,
              profileBiography: data.bio,
              resumeLink: data.resumeLink,
              showResumeValue: data.showResumeValue,
              profileLinks: data.links,
            },
          };
        }
      }
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UPDATE_USER_PROFILE,
      fullname,
      jobTitle,
      username,
      bio,
      resumeLink,
      showResumeValue,
      profileLinks: links,
    });
  };
};

export const uploadNewProject = (
  DiamondCaseId,
  localId,
  projectTempCoverPhotoId,
  projectTempCoverPhotoBase64,
  projectTitle,
  projectDescription,
  links
) => {
  return async (dispatch) => {
    const uploadForm = {
      DiamondCaseId,
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
    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
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
      for (const post in data.userFeed) {
        if (data.userFeed[post].DiamondCaseId === DiamondCaseId) {
          data.userFeed = {
            ...data.userFeed,
            [post]: {
              ...data.userFeed[post],
              profileProjects: {
                ...data.profileProjects,
              },
            },
          };
        }
      }
      data.projectTempCoverPhotoUrl = "";
      data.projectTempCoverPhotoBase64 = "";
      data.projectTempCoverPhotoId = "";
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });
    dispatch({
      type: ADD_USER_PROJECT,
      DiamondCaseId,
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
  DiamondCaseId,
  localId,
  projectId,
  projectTempCoverPhotoUrl,
  projectTitle,
  projectDescription,
  links
) => {
  return async (dispatch) => {
    const uploadForm = {
      DiamondCaseId,
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

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectLastUpdated: updatedProjectResponse.data.time,
          projectCoverPhotoUrl: projectTempCoverPhotoUrl,
          projectTitle,
          projectDescription,
          projectLinks: links,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
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

export const uploadRemoveProject = (DiamondCaseId, localId, projectId) => {
  return async (dispatch) => {
    const uploadForm = { DiamondCaseId, localId, projectId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemoveProject",
      uploadForm
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      const postIds = Object.keys(data.profileProjects[projectId].projectPosts);
      delete data.profileProjects[projectId];
      for (const post in data.userFeed) {
        if (postIds.includes(post)) {
          delete data.userFeed[post];
        }
      }
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: REMOVE_USER_PROJECT,
      projectId,
    });
  };
};

export const uploadRemovePost = (DiamondCaseId, localId, projectId, postId) => {
  return async (dispatch) => {
    const uploadForm = { DiamondCaseId, localId, projectId, postId };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemovePost",
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      delete data.profileProjects[projectId].projectPosts[postId];
      delete data.userFeed[postId];
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: REMOVE_USER_POST,
      projectId,
      postId,
    });
  };
};

export const followUser = (exploredDiamondCaseId, DiamondCaseId, localId) => {
  return async (dispatch) => {
    const user = { exploredDiamondCaseId, DiamondCaseId, localId };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/followUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.following = data.following.concat(exploredDiamondCaseId);
      data.numberOfFollowing = data.numberOfFollowing + 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: FOLLOW_USER,
      exploredDiamondCaseId,
    });
  };
};

export const unfollowUser = (exploredDiamondCaseId, DiamondCaseId, localId) => {
  return async (dispatch) => {
    const user = { exploredDiamondCaseId, DiamondCaseId, localId };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/unfollowUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.following = data.following.filter(
        (user) => user !== exploredDiamondCaseId
      );
      data.numberOfFollowing = data.numberOfFollowing - 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNFOLLOW_USER,
      exploredDiamondCaseId,
    });
  };
};

export const advocateForUser = (
  exploredDiamondCaseId,
  DiamondCaseId,
  localId,
  projectId
) => {
  return async (dispatch) => {
    const user = { exploredDiamondCaseId, DiamondCaseId, localId, projectId };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/advocateForUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.advocating = data.advocating.concat(exploredDiamondCaseId);
      data.projectsAdvocating = data.projectsAdvocating.concat(projectId);
      data.numberOfAdvocating = data.numberOfAdvocating + 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: ADVOCATE_FOR_USER,
      exploredDiamondCaseId,
      projectId,
    });
  };
};

export const unadvocateForUser = (
  exploredDiamondCaseId,
  DiamondCaseId,
  localId,
  projectId
) => {
  return async (dispatch) => {
    const user = { exploredDiamondCaseId, DiamondCaseId, localId, projectId };

    await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/unadvocateForUser",
      user
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.advocating = data.advocating.filter(
        (user) => user !== exploredDiamondCaseId
      );
      data.projectsAdvocating = data.projectsAdvocating.filter(
        (user) => user !== projectId
      );
      data.numberOfAdvocating = data.numberOfAdvocating - 1;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNADVOCATE_FOR_USER,
      exploredDiamondCaseId,
      projectId,
    });
  };
};

export const uploadChangeProfilePicture = (base64, DiamondCaseId, localId) => {
  return async (dispatch) => {
    const picture = { base64, DiamondCaseId, localId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProfilePicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profilePictureUrl = uploadedPictureUrlResponse.data.url;
      data.profilePictureBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHANGE_PROFILE_PICTURE,
      profilePictureUrl: uploadedPictureUrlResponse.data.url,
      profilePictureBase64: base64,
    });
  };
};

export const uploadAddTempProjectCoverPicture = (
  base64,
  DiamondCaseId,
  localId,
  projectTempCoverPhotoId
) => {
  return async (dispatch) => {
    const picture = { base64, DiamondCaseId, localId, projectTempCoverPhotoId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempProjectCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.projectTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      data.projectTempCoverPhotoId = uploadedPictureUrlResponse.data.photoId;
      data.projectTempCoverPhotoBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  base64,
  projectId,
  DiamondCaseId,
  localId
) => {
  return async (dispatch) => {
    const picture = { base64, projectId, DiamondCaseId, localId };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempPostPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.tempPhotoPostId = uploadedPictureUrlResponse.data.photoId;
      data.tempPhotoPostUrl = uploadedPictureUrlResponse.data.url;
      data.tempPhotoPostBase64 = base64;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  base64,
  projectId,
  DiamondCaseId,
  localId,
  projectCoverPhotoId
) => {
  return async (dispatch) => {
    const picture = {
      base64,
      projectId,
      DiamondCaseId,
      localId,
      projectCoverPhotoId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProjectCoverPicture",
      picture
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
          projectCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
          projectCoverPhotoBase64: base64,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  DiamondCaseId,
  localId,
  projectId,
  fullname,
  username,
  jobTitle,
  numberOfFollowers,
  numberOfFollowing,
  numberOfAdvocates,
  profileBiography,
  projectTitle,
  projectCoverPhotoUrl,
  projectDateCreated,
  projectLastUpdated,
  projectDescription,
  profilePictureUrl,
  tempPhotoPostId,
  tempPhotoPostUrl,
  tempPhotoPostBase64,
  caption,
  profileLinks,
  projectLinks,
  links,
  profileColumns
) => {
  return async (dispatch) => {
    const picture = {
      DiamondCaseId,
      localId,
      projectId,
      fullname,
      username,
      jobTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
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
      data = JSON.parse(data);
      data.tempPhotoPostId = "";
      data.tempPhotoPostUrl = "";
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [retrievedPostId]: {
              postId: retrievedPostId,
              DiamondCaseId,
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
              postDateCreated: time,
              postLastUpdated: time,
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

      data.userFeed = {
        ...data.userFeed,
        [retrievedPostId]: {
          postId: retrievedPostId,
          DiamondCaseId,
          projectId,
          fullname,
          username,
          jobTitle,
          numberOfFollowers,
          numberOfFollowing,
          numberOfAdvocates,
          profileBiography,
          profileProjects: {
            ...data.profileProjects,
            [projectId]: {
              ...data.profileProjects[projectId],
              projectPosts: {
                ...data.profileProjects[projectId].projectPosts,
                [retrievedPostId]: {
                  postId: retrievedPostId,
                  DiamondCaseId,
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
              },
            },
          },
          projectTitle,
          profilePictureUrl,
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
      Object.entries(data.userFeed).map(([id, value]) => {
        if (id !== retrievedPostId) {
          if (data.userFeed[id].DiamondCaseId === DiamondCaseId) {
            Object.assign(
              data.userFeed[id].profileProjects,
              data.userFeed[retrievedPostId].profileProjects
            );
          }
        }
      });
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: ADD_USER_POST,
      fullname,
      username,
      jobTitle,
      DiamondCaseId,
      profileBiography,
      projectTitle,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      profilePictureUrl,
      projectId,
      postId: retrievedPostId,
      postDateCreated: time,
      postLastUpdated: time,
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

export const getUserFeed = (localId, DiamondCaseId) => {
  return async (dispatch) => {
    const userFeedGet = { localId, DiamondCaseId };

    const uploadedUserPost = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/getUserFeed",
      userFeedGet
    );

    let returnData = uploadedUserPost.data.returnData;

    if (returnData) {
      for (const key of Object.keys(returnData)) {
        const postPhotoBase64 = await getBase64FromUrl(
          returnData[key]["postPhotoUrl"]
        );
        const profilePictureBase64 = await getBase64FromUrl(
          returnData[key]["profilePictureUrl"]
        );
        returnData[key]["postPhotoBase64"] = postPhotoBase64;
        returnData[key]["profilePictureBase64"] = profilePictureBase64;
        for (const projectKey of Object.keys(returnData[key].profileProjects)) {
          const projectCoverPhotoBase64 = await getBase64FromUrl(
            returnData[key].profileProjects[projectKey]["projectCoverPhotoUrl"]
          );
          returnData[key].profileProjects[projectKey][
            "projectCoverPhotoBase64"
          ] = projectCoverPhotoBase64;
          for (const postKey of Object.keys(
            returnData[key].profileProjects[projectKey].projectPosts
          )) {
            const postPhotoBase64 = await getBase64FromUrl(
              returnData[key].profileProjects[projectKey].projectPosts[postKey][
                "postPhotoUrl"
              ]
            );
            returnData[key].profileProjects[projectKey].projectPosts[postKey][
              "postPhotoBase64"
            ] = postPhotoBase64;
          }
        }
      }
    }

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.userFeed = { ...returnData };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({ type: GET_USER_FEED, feedData: returnData });
  };
};

export const cheerPost = (
  localId,
  DiamondCaseId,
  projectId,
  postId,
  posterDiamondCaseId
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      DiamondCaseId,
      projectId,
      postId,
      posterDiamondCaseId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost",
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.userFeed = {
        ...data.userFeed,
        [postId]: {
          ...data.userFeed[postId],
          profileProjects: {
            ...data.userFeed[postId].profileProjects,
            [projectId]: {
              ...data.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...data.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...data.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers + 1,
                  cheering: [
                    ...data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].cheering,
                    DiamondCaseId,
                  ],
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers + 1,
          cheering: [...data.userFeed[postId].cheering, DiamondCaseId],
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        Object.entries(data.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                data.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId)
            ) {
              data.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = data.userFeed[postId].numberOfCheers;
              Object.assign(
                data.userFeed[id].profileProjects[projId].projectPosts[postId]
                  .cheering,
                data.userFeed[postId].cheering
              );
            }
          }
        );
      });

      data.cheeredPosts = [...data.cheeredPosts, postId];

      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_POST,
      DiamondCaseId,
      projectId,
      postId,
    });

    await dispatch({ type: CHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const cheerOwnFeedPost = (DiamondCaseId, projectId, postId) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [postId]: {
              ...data.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                data.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers + 1,
              cheering: [
                ...data.profileProjects[projectId].projectPosts[postId]
                  .cheering,
                DiamondCaseId,
              ],
            },
          },
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_OWN_FEED_POST,
      DiamondCaseId,
      projectId,
      postId,
    });
  };
};

export const cheerOwnProfilePost = (
  localId,
  DiamondCaseId,
  projectId,
  postId,
  posterDiamondCaseId
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId,
      DiamondCaseId,
      projectId,
      postId,
      posterDiamondCaseId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost",
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [postId]: {
              ...data.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                data.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers + 1,
              cheering: [
                ...data.profileProjects[projectId].projectPosts[postId]
                  .cheering,
                DiamondCaseId,
              ],
            },
          },
        },
      };

      data.userFeed = {
        ...data.userFeed,
        [postId]: {
          ...data.userFeed[postId],
          profileProjects: {
            ...data.userFeed[postId].profileProjects,
            [projectId]: {
              ...data.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...data.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...data.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers + 1,
                  cheering: [
                    ...data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].cheering,
                    DiamondCaseId,
                  ],
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers + 1,
          cheering: [...data.userFeed[postId].cheering, DiamondCaseId],
        },
      };

      Object.entries(data.userFeed).map(([id, value]) => {
        Object.entries(data.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                data.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId)
            ) {
              data.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = data.userFeed[postId].numberOfCheers;
              Object.assign(
                data.userFeed[id].profileProjects[projId].projectPosts[postId]
                  .cheering,
                data.userFeed[postId].cheering
              );
            }
          }
        );
      });

      data.cheeredPosts = [...data.cheeredPosts, postId];
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_OWN_PROFILE_POST,
      DiamondCaseId,
      projectId,
      postId,
    });

    await dispatch({ type: CHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const uncheerPost = (
  localId,
  DiamondCaseId,
  projectId,
  postId,
  posterDiamondCaseId
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      DiamondCaseId,
      projectId,
      postId,
      posterDiamondCaseId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost",
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.userFeed = {
        ...data.userFeed,
        [postId]: {
          ...data.userFeed[postId],
          profileProjects: {
            ...data.userFeed[postId].profileProjects,
            [projectId]: {
              ...data.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...data.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...data.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers - 1,
                  cheering: data.userFeed[postId].profileProjects[
                    projectId
                  ].projectPosts[postId].cheering.filter(
                    (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
                  ),
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers - 1,
          cheering: data.userFeed[postId].cheering.filter(
            (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
          ),
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        Object.entries(data.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                data.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId)
            ) {
              data.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = data.userFeed[postId].numberOfCheers;
              Object.assign(
                data.userFeed[id].profileProjects[projId].projectPosts[postId]
                  .cheering,
                data.userFeed[postId].cheering
              );
            }
          }
        );
      });
      data.cheeredPosts = data.cheeredPosts.filter((post) => post !== postId);
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_POST,
      DiamondCaseId,
      projectId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const uncheerOwnFeedPost = (DiamondCaseId, projectId, postId) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [postId]: {
              ...data.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                data.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers - 1,
              cheering: data.profileProjects[projectId].projectPosts[
                postId
              ].cheering.filter(
                (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
              ),
            },
          },
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_OWN_FEED_POST,
      DiamondCaseId,
      projectId,
      postId,
    });
  };
};

export const uncheerOwnProfilePost = (
  localId,
  DiamondCaseId,
  projectId,
  postId,
  posterDiamondCaseId
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId,
      DiamondCaseId,
      projectId,
      postId,
      posterDiamondCaseId,
    };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost",
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [postId]: {
              ...data.profileProjects[projectId].projectPosts[postId],
              numberOfCheers:
                data.profileProjects[projectId].projectPosts[postId]
                  .numberOfCheers - 1,
              cheering: data.profileProjects[projectId].projectPosts[
                postId
              ].cheering.filter(
                (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
              ),
            },
          },
        },
      };
      data.userFeed = {
        ...data.userFeed,
        [postId]: {
          ...data.userFeed[postId],
          profileProjects: {
            ...data.userFeed[postId].profileProjects,
            [projectId]: {
              ...data.userFeed[postId].profileProjects[projectId],
              projectPosts: {
                ...data.userFeed[postId].profileProjects[projectId]
                  .projectPosts,
                [postId]: {
                  ...data.userFeed[postId].profileProjects[projectId]
                    .projectPosts[postId],
                  numberOfCheers:
                    data.userFeed[postId].profileProjects[projectId]
                      .projectPosts[postId].numberOfCheers - 1,
                  cheering: data.userFeed[postId].profileProjects[
                    projectId
                  ].projectPosts[postId].cheering.filter(
                    (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
                  ),
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers - 1,
          cheering: data.userFeed[postId].cheering.filter(
            (listDiamondCaseId) => listDiamondCaseId !== DiamondCaseId
          ),
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        Object.entries(data.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                data.userFeed[id].profileProjects[projId].projectPosts
              ).includes(postId)
            ) {
              data.userFeed[id].profileProjects[projId].projectPosts[
                postId
              ].numberOfCheers = data.userFeed[postId].numberOfCheers;
              Object.assign(
                data.userFeed[id].profileProjects[projId].projectPosts[postId]
                  .cheering,
                data.userFeed[postId].cheering
              );
            }
          }
        );
      });
      data.cheeredPosts = data.cheeredPosts.filter((post) => post !== postId);
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_OWN_PROFILE_POST,
      DiamondCaseId,
      projectId,
      postId,
    });

    await dispatch({ type: UNCHEER_UPDATE_POSTS, projectId, postId });
  };
};

export const changeProfileNumberOfColumns = (localId, DiamondCaseId, number) => {
  return async (dispatch) => {
    const picture = { localId, DiamondCaseId, number };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/changeProfileNumberOfColumns",
      picture
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileColumns = number;
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: CHANGE_PROFILE_COLUMNS, number });
  };
};

export const changeProjectNumberOfColumns = (
  localId,
  DiamondCaseId,
  projectId,
  number
) => {
  return async (dispatch) => {
    const picture = { localId, DiamondCaseId, projectId, number };

    axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/changeProjectNumberOfColumns",
      picture
    );

    AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectColumns: number,
        },
      };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({ type: CHANGE_PROJECT_COLUMNS, projectId, number });
  };
};

export const getUpdates = () => {
  return async (dispatch) => {
    const uploadedUserPost = await axios.post(
      "https://us-central1-showcase-79c28.cloudfunctions.net/getUpdates"
    );
    const returnData = uploadedUserPost.data.returnData;

    await AsyncStorage.getItem("userDocData").then(async (data) => {
      data = JSON.parse(data);
      data.updates = { ...returnData };
      await AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({ type: GET_UPDATES, updateData: returnData });
  };
};

export const resetScroll = (tab) => {
  return async (dispatch) => {
    await dispatch({ type: RESET_SCROLL, tab });
  };
};

export const onScreen = (tab) => {
  return async (dispatch) => {
    await dispatch({ type: ON_SCREEN, tab });
  };
};

export const offScreen = (tab) => {
  return async (dispatch) => {
    await dispatch({ type: OFF_SCREEN, tab });
  };
};
