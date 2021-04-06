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

export const refreshProfile = (localId) => {
  return async (dispatch) => {
    const downloadForm = {
      localId: localId,
    };

    const profileInfo = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/refreshProfile`,
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

    await AsyncStorage.getItem("userDocData").then((data) => {
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
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: REFRESH_PROFILE,
      numberOfFollowers: profileInfo.data.data.numberOfFollowers,
      numberOfFollowing: profileInfo.data.data.numberOfFollowing,
      numberOfAdvocates: profileInfo.data.data.numberOfAdvocates,
      numberOfAdvocating: profileInfo.data.data.numberOfAdvocating,
      followers: followers,
      following: following,
      advocates: advocates,
      advocating: advocating,
      projectsAdvocating: projectsAdvocating,
      cheeredPosts: cheeredPosts,
    });

    console.log("Successfully uploaded an updated version of user!");
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
      showcaseId: transformedData.showcaseId,
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
      followers: followers,
      following: following,
      advocates: advocates,
      advocating: advocating,
      projectsAdvocating: projectsAdvocating,
      cheeredPosts: cheeredPosts,
      profileProjects: profileProjects,
      profileLinks: profileLinks,
      userFeed: userFeed,
      updates: updates,
    });

    await dispatch({
      type: GET_SWITCHES,
      darkMode: transformedData.darkMode,
      showcaseLocalMode: transformedData.showcaseLocalMode,
      showResume: transformedData.showResume,
      showCheering: transformedData.showCheering,
      hideFollowing: transformedData.hideFollowing,
      hideFollowers: transformedData.hideFollowers,
      hideAdvocates: transformedData.hideAdvocates,
    });
  };
};

export const uploadUpdateUserProfile = (
  showcaseId,
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
      showcaseId: showcaseId,
      localId: localId,
      fullname: fullname,
      jobTitle: jobTitle,
      username: username,
      bio: bio,
      resumeLink: resumeLink,
      showResumeValue: showResumeValue,
      links: links,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/updateProfile`,
      uploadForm
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.fullname = fullname;
      data.jobTitle = jobTitle;
      data.username = username;
      data.profileBiography = bio;
      data.resumeLink = resumeLink;
      data.showResumeValue = showResumeValue;
      data.profileLinks = links;
      if (Object.keys(data.userFeed) > 0) {
        feedPosts = Object.keys(data.userFeed);
        for (post of feedPosts) {
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
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UPDATE_USER_PROFILE,
      fullname: fullname,
      jobTitle: jobTitle,
      username: username,
      bio: bio,
      resumeLink: resumeLink,
      showResumeValue: showResumeValue,
      profileLinks: links,
    });

    console.log("Successfully uploaded an updated version of user!");
  };
};

export const uploadNewProject = (
  showcaseId,
  localId,
  projectTempCoverPhotoId,
  projectTempCoverPhotoBase64,
  projectTitle,
  projectDescription,
  links
) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectTempCoverPhotoId: projectTempCoverPhotoId,
      projectTempCoverPhotoBase64: projectTempCoverPhotoBase64,
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      links: links,
    };

    const newProjectResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadNewProject`,
      uploadForm
    );
    AsyncStorage.getItem("userDocData").then((data) => {
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
          projectTitle: projectTitle,
          projectDescription: projectDescription,
          projectColumns: 2,
          projectPosts: {},
          projectLinks: links,
        },
      };
      for (const post in data.userFeed) {
        if (data.userFeed[post].showcaseId === showcaseId) {
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
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });
    dispatch({
      type: ADD_USER_PROJECT,
      showcaseId: showcaseId,
      projectId: newProjectResponse.data.projectId,
      projectCoverPhotoId: newProjectResponse.data.photoId,
      projectCoverPhotoUrl: newProjectResponse.data.url,
      projectCoverPhotoBase64: projectTempCoverPhotoBase64,
      projectDateCreated: newProjectResponse.data.time,
      projectLastUpdated: newProjectResponse.data.time,
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      projectLinks: links,
    });
    console.log("Successfully uploaded your updated project!");
  };
};

export const uploadUpdatedProject = (
  showcaseId,
  localId,
  projectId,
  projectTempCoverPhotoUrl,
  projectTitle,
  projectDescription,
  links
) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
      url: projectTempCoverPhotoUrl,
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      links: links,
    };

    const updatedProjectResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadUpdatedProject`,
      uploadForm
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectLastUpdated: updatedProjectResponse.data.time,
          projectTitle: projectTitle,
          projectCoverPhotoUrl: projectTempCoverPhotoUrl,
          projectDescription: projectDescription,
          projectLinks: links,
        },
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UPDATE_USER_PROJECT,
      projectId: projectId,
      projectLastUpdated: updatedProjectResponse.data.time,
      projectTitle: projectTitle,
      projectCoverPhotoUrl: projectTempCoverPhotoUrl,
      projectDescription: projectDescription,
      projectLinks: links,
    });
    console.log("Successfully uploaded a new updated project!");
  };
};

export const uploadRemoveProject = (showcaseId, localId, projectId) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemoveProject`,
      uploadForm
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      const postIds = Object.keys(data.profileProjects[projectId].projectPosts);
      delete data.profileProjects[projectId];
      for (const post in data.userFeed) {
        if (postIds.includes(post)) {
          delete data.userFeed[post];
        }
      }
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: REMOVE_USER_PROJECT,
      projectId: projectId,
    });
    console.log("Successfully removed project!");
  };
};

export const uploadRemovePost = (showcaseId, localId, projectId, postId) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
      postId: postId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemovePost`,
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      delete data.profileProjects[projectId].projectPosts[postId];
      delete data.userFeed[postId];
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: REMOVE_USER_POST,
      projectId: projectId,
      postId: postId,
    });
    console.log("Successfully removed post!");
  };
};

export const followUser = (exploredShowcaseId, showcaseId, localId) => {
  return async (dispatch) => {
    const user = {
      exploredShowcaseId: exploredShowcaseId,
      showcaseId: showcaseId,
      localId: localId,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/followUser`,
      user
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.following = data.following.concat(exploredShowcaseId);
      data.numberOfFollowing = data.numberOfFollowing + 1;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: FOLLOW_USER,
      exploredShowcaseId: exploredShowcaseId,
    });
  };
};

export const unfollowUser = (exploredShowcaseId, showcaseId, localId) => {
  return async (dispatch) => {
    const user = {
      exploredShowcaseId: exploredShowcaseId,
      showcaseId: showcaseId,
      localId: localId,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/unfollowUser`,
      user
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.following = data.following.filter(
        (user) => user !== exploredShowcaseId
      );
      data.numberOfFollowing = data.numberOfFollowing - 1;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UNFOLLOW_USER,
      exploredShowcaseId: exploredShowcaseId,
    });
  };
};

export const advocateForUser = (
  exploredShowcaseId,
  showcaseId,
  localId,
  projectId
) => {
  return async (dispatch) => {
    const user = {
      exploredShowcaseId: exploredShowcaseId,
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/advocateForUser`,
      user
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.advocating = data.advocating.concat(exploredShowcaseId);
      data.projectsAdvocating = data.projectsAdvocating.concat(projectId);
      data.numberOfAdvocating = data.numberOfAdvocating + 1;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: ADVOCATE_FOR_USER,
      exploredShowcaseId: exploredShowcaseId,
      projectId: projectId,
    });
  };
};

export const unadvocateForUser = (
  exploredShowcaseId,
  showcaseId,
  localId,
  projectId
) => {
  return async (dispatch) => {
    const user = {
      exploredShowcaseId: exploredShowcaseId,
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/unadvocateForUser`,
      user
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.advocating = data.advocating.filter(
        (user) => user !== exploredShowcaseId
      );
      data.projectsAdvocating = data.projectsAdvocating.filter(
        (user) => user !== projectId
      );
      data.numberOfAdvocating = data.numberOfAdvocating - 1;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UNADVOCATE_FOR_USER,
      exploredShowcaseId: exploredShowcaseId,
      projectId: projectId,
    });
  };
};

export const uploadChangeProfilePicture = (base64, showcaseId, localId) => {
  return async (dispatch) => {
    const picture = {
      base64: base64,
      showcaseId: showcaseId,
      localId: localId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProfilePicture`,
      picture
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.profilePictureUrl = uploadedPictureUrlResponse.data.url;
      data.profilePictureBase64 = base64;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  showcaseId,
  localId,
  projectTempCoverPhotoId
) => {
  return async (dispatch) => {
    const picture = {
      base64: base64,
      showcaseId: showcaseId,
      localId: localId,
      projectTempCoverPhotoId: projectTempCoverPhotoId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempProjectCoverPicture`,
      picture
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.projectTempCoverPhotoUrl = uploadedPictureUrlResponse.data.url;
      data.projectTempCoverPhotoId = uploadedPictureUrlResponse.data.photoId;
      data.projectTempCoverPhotoBase64 = base64;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  showcaseId,
  localId
) => {
  return async (dispatch) => {
    const picture = {
      base64: base64,
      projectId: projectId,
      showcaseId: showcaseId,
      localId: localId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddTempPostPicture`,
      picture
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.tempPhotoPostId = uploadedPictureUrlResponse.data.photoId;
      data.tempPhotoPostUrl = uploadedPictureUrlResponse.data.url;
      data.tempPhotoPostBase64 = base64;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
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
  showcaseId,
  localId,
  projectCoverPhotoId
) => {
  return async (dispatch) => {
    const picture = {
      base64: base64,
      projectId: projectId,
      showcaseId: showcaseId,
      localId: localId,
      projectCoverPhotoId: projectCoverPhotoId,
    };

    const uploadedPictureUrlResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadChangeProjectCoverPicture`,
      picture
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
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
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHANGE_PROJECT_PICTURE,
      projectId: projectId,
      projectCoverPhotoUrl: uploadedPictureUrlResponse.data.url,
      projectCoverPhotoId: uploadedPictureUrlResponse.data.photoId,
      projectCoverPhotoBase64: base64,
    });
  };
};

export const addUserPost = (
  showcaseId,
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
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
      fullname: fullname,
      username: username,
      jobTitle: jobTitle,
      numberOfFollowers: numberOfFollowers,
      numberOfFollowing: numberOfFollowing,
      numberOfAdvocates: numberOfAdvocates,
      profileBiography: profileBiography,
      projectTitle: projectTitle,
      projectCoverPhotoUrl: projectCoverPhotoUrl,
      projectDateCreated: projectDateCreated,
      projectLastUpdated: projectLastUpdated,
      projectDescription: projectDescription,
      profilePictureUrl: profilePictureUrl,
      postId: tempPhotoPostId,
      postUrl: tempPhotoPostUrl,
      caption: caption,
      profileLinks: profileLinks,
      projectLinks: projectLinks,
      links: links,
      profileColumns: profileColumns,
    };

    const uploadedUserPost = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadAddUserPost`,
      picture
    );

    const postId = uploadedUserPost.data.postId;
    const time = uploadedUserPost.data.time;

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.tempPhotoPostId = "";
      data.tempPhotoPostUrl = "";
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectPosts: {
            ...data.profileProjects[projectId].projectPosts,
            [postId]: {
              postId: postId,
              showcaseId: showcaseId,
              projectId: projectId,
              fullname: fullname,
              username: username,
              jobTitle: jobTitle,
              numberOfFollowers: numberOfFollowers,
              numberOfFollowing: numberOfFollowing,
              numberOfAdvocates: numberOfAdvocates,
              profileBiography: profileBiography,
              projectTitle: projectTitle,
              profilePictureUrl: profilePictureUrl,
              postDateCreated: time,
              postLastUpdated: time,
              postPhotoUrl: tempPhotoPostUrl,
              postPhotoBase64: tempPhotoPostBase64,
              caption: caption,
              numberOfComments: 0,
              numberOfCheers: 0,
              cheering: [],
              comments: {},
              profileLinks: profileLinks,
              projectLinks: projectLinks,
              postLinks: links,
            },
          },
        },
      };

      data.userFeed = {
        ...data.userFeed,
        [postId]: {
          postId: postId,
          showcaseId: showcaseId,
          projectId: projectId,
          fullname: fullname,
          username: username,
          jobTitle: jobTitle,
          numberOfFollowers: numberOfFollowers,
          numberOfFollowing: numberOfFollowing,
          numberOfAdvocates: numberOfAdvocates,
          profileBiography: profileBiography,
          profileProjects: {
            ...data.profileProjects,
            [projectId]: {
              ...data.profileProjects[projectId],
              projectPosts: {
                ...data.profileProjects[projectId].projectPosts,
                [postId]: {
                  postId: postId,
                  showcaseId: showcaseId,
                  projectId: projectId,
                  fullname: fullname,
                  username: username,
                  jobTitle: jobTitle,
                  numberOfFollowers: numberOfFollowers,
                  numberOfFollowing: numberOfFollowing,
                  numberOfAdvocates: numberOfAdvocates,
                  profileBiography: profileBiography,
                  projectTitle: projectTitle,
                  profilePictureUrl: profilePictureUrl,
                  postDateCreated: time,
                  postLastUpdated: time,
                  postPhotoUrl: tempPhotoPostUrl,
                  postPhotoBase64: tempPhotoPostBase64,
                  caption: caption,
                  numberOfComments: 0,
                  numberOfCheers: 0,
                  cheering: [],
                  comments: {},
                  profileLinks: profileLinks,
                  projectLinks: projectLinks,
                  postLinks: links,
                  profileColumns: profileColumns,
                },
              },
            },
          },
          projectTitle: projectTitle,
          profilePictureUrl: profilePictureUrl,
          postDateCreated: time,
          postLastUpdated: time,
          postPhotoUrl: tempPhotoPostUrl,
          postPhotoBase64: tempPhotoPostBase64,
          caption: caption,
          numberOfComments: 0,
          numberOfCheers: 0,
          cheering: [],
          comments: {},
          profileLinks: profileLinks,
          projectLinks: projectLinks,
          postLinks: links,
          profileColumns: profileColumns,
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        if (id !== postId) {
          if (data.userFeed[id].showcaseId === showcaseId) {
            Object.assign(
              data.userFeed[id].profileProjects,
              data.userFeed[postId].profileProjects
            );
          }
        }
      });
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: ADD_USER_POST,
      fullname: fullname,
      username: username,
      jobTitle: jobTitle,
      showcaseId: showcaseId,
      profileBiography: profileBiography,
      projectTitle: projectTitle,
      numberOfFollowers: numberOfFollowers,
      numberOfFollowing: numberOfFollowing,
      numberOfAdvocates: numberOfAdvocates,
      profilePictureUrl: profilePictureUrl,
      projectId: projectId,
      postId: postId,
      postDateCreated: time,
      postLastUpdated: time,
      postPhotoUrl: tempPhotoPostUrl,
      postPhotoBase64: tempPhotoPostBase64,
      caption: caption,
      profileLinks: profileLinks,
      projectLinks: projectLinks,
      postLinks: links,
      profileColumns: profileColumns,
    });
    await dispatch({
      type: UPDATE_ALL_POSTS,
      postId: postId,
    });
  };
};

export const getUserFeed = (localId, showcaseId) => {
  return async (dispatch) => {
    const userFeedGet = {
      localId: localId,
      showcaseId: showcaseId,
    };

    const uploadedUserPost = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/getUserFeed`,
      userFeedGet
    );

    const returnData = uploadedUserPost.data.returnData;

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.userFeed = {
        ...returnData,
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: GET_USER_FEED,
      feedData: returnData,
    });
  };
};

export const cheerPost = (
  localId,
  showcaseId,
  projectId,
  postId,
  posterShowcaseId
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId: localId,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      posterShowcaseId: posterShowcaseId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost`,
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
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
                    showcaseId,
                  ],
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers + 1,
          cheering: [...data.userFeed[postId].cheering, showcaseId],
        },
      };

      Object.entries(data.userFeed).map(([id, value]) => {
        data.userFeed[id].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers = data.userFeed[postId].numberOfCheers;
        Object.assign(
          data.userFeed[id].profileProjects[projectId].projectPosts[postId]
            .cheering,
          data.userFeed[postId].cheering
        );
      });

      data.cheeredPosts = [...data.cheeredPosts, postId];

      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });
    await dispatch({
      type: CHEER_UPDATE_POSTS,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const cheerOwnFeedPost = (showcaseId, projectId, postId) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then((data) => {
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
                showcaseId,
              ],
            },
          },
        },
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_OWN_FEED_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const cheerOwnProfilePost = (
  localId,
  showcaseId,
  projectId,
  postId,
  posterShowcaseId
) => {
  return async (dispatch) => {
    const cheeringForm = {
      localId: localId,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      posterShowcaseId: posterShowcaseId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/cheerPost`,
      cheeringForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
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
                showcaseId,
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
                    showcaseId,
                  ],
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers + 1,
          cheering: [...data.userFeed[postId].cheering, showcaseId],
        },
      };

      Object.entries(data.userFeed).map(([id, value]) => {
        data.userFeed[id].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers = data.userFeed[postId].numberOfCheers;
        Object.assign(
          data.userFeed[id].profileProjects[projectId].projectPosts[postId]
            .cheering,
          data.userFeed[postId].cheering
        );
      });

      data.cheeredPosts = [...data.cheeredPosts, postId];
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: CHEER_OWN_PROFILE_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });

    await dispatch({
      type: CHEER_UPDATE_POSTS,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const uncheerPost = (
  localId,
  showcaseId,
  projectId,
  postId,
  posterShowcaseId
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId: localId,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      posterShowcaseId: posterShowcaseId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost`,
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
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
                    (listShowcaseId) => listShowcaseId !== showcaseId
                  ),
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers - 1,
          cheering: data.userFeed[postId].cheering.filter(
            (listShowcaseId) => listShowcaseId !== showcaseId
          ),
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        data.userFeed[id].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers =
          data.userFeed[postId].profileProjects[projectId].projectPosts[
            postId
          ].numberOfCheers;
        Object.assign(
          data.userFeed[id].profileProjects[projectId].projectPosts[postId]
            .cheering,
          data.userFeed[postId].profileProjects[projectId].projectPosts[postId]
            .cheering
        );
      });
      data.cheeredPosts = data.cheeredPosts.filter((post) => post !== postId);
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });
    await dispatch({
      type: UNCHEER_UPDATE_POSTS,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const uncheerOwnFeedPost = (showcaseId, projectId, postId) => {
  return async (dispatch) => {
    await AsyncStorage.getItem("userDocData").then((data) => {
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
                (listShowcaseId) => listShowcaseId !== showcaseId
              ),
            },
          },
        },
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_OWN_FEED_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const uncheerOwnProfilePost = (
  localId,
  showcaseId,
  projectId,
  postId,
  posterShowcaseId
) => {
  return async (dispatch) => {
    const uncheeringForm = {
      localId: localId,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      posterShowcaseId: posterShowcaseId,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uncheerPost`,
      uncheeringForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
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
                (listShowcaseId) => listShowcaseId !== showcaseId
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
                    (listShowcaseId) => listShowcaseId !== showcaseId
                  ),
                },
              },
            },
          },
          numberOfCheers: data.userFeed[postId].numberOfCheers - 1,
          cheering: data.userFeed[postId].cheering.filter(
            (listShowcaseId) => listShowcaseId !== showcaseId
          ),
        },
      };
      Object.entries(data.userFeed).map(([id, value]) => {
        data.userFeed[id].profileProjects[projectId].projectPosts[
          postId
        ].numberOfCheers =
          data.userFeed[postId].profileProjects[projectId].projectPosts[
            postId
          ].numberOfCheers;
        Object.assign(
          data.userFeed[id].profileProjects[projectId].projectPosts[postId]
            .cheering,
          data.userFeed[postId].profileProjects[projectId].projectPosts[postId]
            .cheering
        );
      });
      data.cheeredPosts = data.cheeredPosts.filter((post) => post !== postId);
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UNCHEER_OWN_PROFILE_POST,
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
    });
    await dispatch({
      type: UNCHEER_UPDATE_POSTS,
      projectId: projectId,
      postId: postId,
    });
  };
};

export const uploadFeedback = (localId, title, feedback) => {
  return async (dispatch) => {
    const picture = {
      localId: localId,
      title: title,
      feedback: feedback,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadFeedback`,
      picture
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.feedback = feedback;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: UPLOAD_FEEDBACK,
      feedback: feedback,
    });
  };
};

export const changeProfileNumberOfColumns = (localId, showcaseId, number) => {
  return async (dispatch) => {
    const picture = {
      localId: localId,
      showcaseId: showcaseId,
      number: number,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/changeProfileNumberOfColumns`,
      picture
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.profileColumns = number;
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: CHANGE_PROFILE_COLUMNS,
      number: number,
    });
  };
};

export const changeProjectNumberOfColumns = (
  localId,
  showcaseId,
  projectId,
  number
) => {
  return async (dispatch) => {
    const picture = {
      localId: localId,
      showcaseId: showcaseId,
      projectId: projectId,
      number: number,
    };

    axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/changeProjectNumberOfColumns`,
      picture
    );

    AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectColumns: number,
        },
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: CHANGE_PROJECT_COLUMNS,
      projectId: projectId,
      number: number,
    });
  };
};

export const getUpdates = () => {
  return async (dispatch) => {
    const uploadedUserPost = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/getUpdates`
    );

    const returnData = uploadedUserPost.data.returnData;

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      data.updates = {
        ...returnData,
      };
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    await dispatch({
      type: GET_UPDATES,
      updateData: returnData,
    });
  };
};

export const showcaseLocally = () => {
  return async (dispatch) => {
    await dispatch({
      type: SHOWCASE_LOCALLY,
    });
  };
};

export const returnFromShowcasing = () => {
  return async (dispatch) => {
    await dispatch({
      type: RETURN_FROM_SHOWCASING,
    });
  };
};

export const resetScroll = (tab) => {
  return async (dispatch) => {
    await dispatch({
      type: RESET_SCROLL,
      tab: tab,
    });
  };
};

export const onScreen = (tab) => {
  return async (dispatch) => {
    await dispatch({
      type: ON_SCREEN,
      tab: tab,
    });
  };
};

export const offScreen = (tab) => {
  return async (dispatch) => {
    await dispatch({
      type: OFF_SCREEN,
      tab: tab,
    });
  };
};
