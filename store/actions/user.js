import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const GET_USER_DATA = "GET_USER_DATA";
export const FOLLOW_USER = "FOLLOW_USER";

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_PROFILE_LINKS = "UPDATE_PROFILE_LINKS";

export const UPDATE_PROJECT_LINKS = "UPDATE_PROJECT_LINKS";
export const UPDATE_USER_PROJECT = "UPDATE_USER_PROJECT";
export const REMOVE_USER_PROJECT = "REMOVE_USER_PROJECT";
export const ADD_USER_PROJECT = "ADD_USER_PROJECT";

export const getUserData = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userDocData");
    const transformedData = JSON.parse(userData);

    let profileProjects = {};
    let followers = {};
    let following = {};
    let advocates = {};
    let profileLinks = {};

    if (transformedData.profileProjects) {
      profileProjects = transformedData.profileProjects;
    }
    if (transformedData.followers) {
      followers = transformedData.followers;
    }
    if (transformedData.following) {
      following = transformedData.following;
    }
    if (transformedData.advocates) {
      advocates = transformedData.advocates;
    }
    if (transformedData.profileLinks) {
      profileLinks = transformedData.profileLinks;
    }

    dispatch({
      type: GET_USER_DATA,
      showcaseId: transformedData.showcaseId,
      email: transformedData.email,
      fullname: transformedData.fullname,
      jobTitle: transformedData.jobTitle,
      username: transformedData.username,
      resumeLinkUrl: transformedData.resumeLinkUrl,
      profileBiography: transformedData.profileBiography,
      numberOfFollowers: transformedData.numberOfFollowers,
      numberOfFollowing: transformedData.numberOfFollowing,
      numberOfAdvocates: transformedData.numberOfAdvocates,
      darkModeValue: transformedData.darkModeValue,
      showResumeValue: transformedData.showResumeValue,
      showcaseLocally: transformedData.showcaseLocally,
      followers: followers,
      following: following,
      advocates: advocates,
      profileLinks: profileLinks,
      profileProjects: profileProjects,
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
  showResumeValue
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
      data.bio = bio;
      data.resumeLink = resumeLink;
      data.showResumeValue = showResumeValue;
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
    });

    console.log("Successfully uploaded an updated version of user!");
  };
};

export const uploadNewProject = (
  showcaseId,
  localId,
  projectId,
  projectTitle,
  projectImageUrl,
  projectDescription
) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
      projectTitle: projectTitle,
      projectImageUrl: projectImageUrl,
      projectDescription: projectDescription,
    };

    const newProjectResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadNewProject`,
      uploadForm
    );

    console.log(newProjectResponse.data);

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      console.log(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          projectId: projectId,
          projectDateCreated: newProjectResponse.data.time,
          projectLastUpdated: newProjectResponse.data.time,
          projectTitle: projectTitle,
          projectImageUrl: projectImageUrl,
          projectDescription: projectDescription,
          projectPictures: {},
        },
      };
      console.log(data);
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: ADD_USER_PROJECT,
      projectId: projectId,
      projectDateCreated: newProjectResponse.data.time,
      projectLastUpdated: newProjectResponse.data.time,
      projectTitle: projectTitle,
      projectImageUrl: projectImageUrl,
      projectDescription: projectDescription,
      projectPictures: {},
    });
    console.log("Successfully uploaded your updated project!");
  };
};

export const uploadUpdatedProject = (
  showcaseId,
  localId,
  projectId,
  projectTitle,
  projectImageUrl,
  projectDescription
) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
      projectTitle: projectTitle,
      projectImageUrl: projectImageUrl,
      projectDescription: projectDescription,
    };

    const updatedProjectResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadUpdatedProject`,
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      console.log(data);
      data.profileProjects = {
        ...data.profileProjects,
        [projectId]: {
          ...data.profileProjects[projectId],
          projectLastUpdated: updatedProjectResponse.data.time,
          projectTitle: projectTitle,
          projectImageUrl: projectImageUrl,
          projectDescription: projectDescription,
        },
      };
      console.log(data);
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: UPDATE_USER_PROJECT,
      projectId: projectId,
      projectLastUpdated: updatedProjectResponse.data.time,
      projectTitle: projectTitle,
      projectImageUrl: projectImageUrl,
      projectDescription: projectDescription,
    });
    console.log("Successfully uploaded a new project!");
  };
};

export const uploadRemoveProject = (showcaseId, localId, projectId) => {
  return async (dispatch) => {
    const uploadForm = {
      showcaseId: showcaseId,
      localId: localId,
      projectId: projectId,
    };

    await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/uploadRemoveProject`,
      uploadForm
    );

    await AsyncStorage.getItem("userDocData").then((data) => {
      data = JSON.parse(data);
      console.log(data);
      delete data.profileProjects[projectId];
      console.log(data);
      AsyncStorage.setItem("userDocData", JSON.stringify(data));
    });

    dispatch({
      type: REMOVE_USER_PROJECT,
      projectId: projectId,
    });
    console.log("Successfully removed project!");
  };
};

export const setProfileLinks = (links) => {
  return {
    type: UPDATE_PROFILE_LINKS,
    updatedProfileLinks: links,
  };
};

export const setProjectLinks = (projectId, links) => {
  return {
    type: UPDATE_PROJECT_LINKS,
    projectId: projectId,
    updatedProjectLinks: links,
  };
};

export const followUser = (username) => {
  return async (dispatch) => {
    const user = {
      username: username,
      localId: localId,
    };

    const getFollowResponse = await axios.post(
      `https://us-central1-showcase-79c28.cloudfunctions.net/followUser`,
      user
    );

    dispatch({
      type: FOLLOW_USER,
      docData: getFollowResponse.data,
    });
  };
};
