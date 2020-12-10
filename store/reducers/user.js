import {
  GET_USER_DATA,
  UPDATE_PROFILE_LINKS,
  UPDATE_USER_PROFILE,
  ADD_USER_PROJECT,
  UPDATE_PROJECT_LINKS,
  UPDATE_USER_PROJECT,
  REMOVE_USER_PROJECT,
} from "../actions/user";

const intialState = {
  showcaseId: "",
  email: "",
  fullname: "",
  jobTitle: "",
  username: "",
  resumeLinkUrl: "",
  profileBiography: "",
  numberOfFollowers: 0,
  numberOfFollowing: 0,
  numberOfAdvocates: 0,
  darkModeValue: false,
  showcaseLocally: false,
  showResumeValue: false,
  followers: {},
  following: {},
  advocates: {},
  profileProjects: {},
  profileLinks: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        showcaseId: action.showcaseId,
        email: action.email,
        fullname: action.fullname,
        jobTitle: action.jobTitle,
        username: action.username,
        resumeLinkUrl: action.resumeLinkUrl,
        profileBiography: action.profileBiography,
        numberOfFollowers: action.numberOfFollowers,
        numberOfFollowing: action.numberOfFollowing,
        numberOfAdvocates: action.numberOfAdvocates,
        darkModeValue: action.darkModeValue,
        showResumeValue: action.showResumeValue,
        showcaseLocally: action.showcaseLocally,
        followers: action.followers,
        following: action.following,
        advocates: action.advocates,
        profileProjects: action.profileProjects,
        profileLinks: action.profileLinks,
      };
    case UPDATE_PROFILE_LINKS:
      return {
        ...state,
        profileLinks: action.updatedProfileLinks,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        fullname: action.fullname,
        jobTitle: action.jobTitle,
        username: action.username,
        profileBiography: action.bio,
        resumeLinkUrl: action.resumeLink,
        showResumeValue: action.showResumeValue,
      };
    case ADD_USER_PROJECT:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectId: action.projectId,
            projectDateCreated: action.projectDateCreated,
            projectLastUpdated: action.projectLastUpdated,
            projectTitle: action.projectTitle,
            projectImageUrl: action.projectImageUrl,
            projectDescription: action.projectDescription,
            projectPictures: action.projectPictures,
          },
        },
      };
    case UPDATE_USER_PROJECT:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectLastUpdated: action.projectLastUpdated,
            projectTitle: action.projectTitle,
            projectImageUrl: action.projectImageUrl,
            projectDescription: action.projectDescription,
          },
        },
      };
    case REMOVE_USER_PROJECT:
      return {
        ...state,
        profileProjects: Object.fromEntries(
          Object.entries(state.profileProjects).filter(
            ([projectId, v]) => projectId !== action.projectId
          )
        ),
      };
    case UPDATE_PROJECT_LINKS:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectLinks: action.updatedProjectLinks,
          },
        },
      };
  }
  return state;
};
