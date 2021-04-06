import {
  GET_USER_DATA,
  GET_USER_FEED,
  UPDATE_PROFILE_LINKS,
  UPDATE_USER_PROFILE,
  ADD_USER_PROJECT,
  UPDATE_PROJECT_LINKS,
  UPDATE_USER_PROJECT,
  REMOVE_USER_PROJECT,
  REMOVE_USER_POST,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CHANGE_PROFILE_PICTURE,
  CHANGE_PROJECT_PICTURE,
  ADD_TEMP_PROJECT_PICTURE,
  CLEAR_TEMP_PROJECT_PICTURE,
  ADD_TEMP_POST_PICTURE,
  CLEAR_TEMP_POST_PICTURE,
  ADD_USER_POST,
  UPDATE_ALL_POSTS,
  CHEER_POST,
  CHEER_UPDATE_POSTS,
  CHEER_OWN_FEED_POST,
  CHEER_OWN_PROFILE_POST,
  UNCHEER_OWN_FEED_POST,
  UNCHEER_OWN_PROFILE_POST,
  UNCHEER_POST,
  UNCHEER_UPDATE_POSTS,
  ADVOCATE_FOR_USER,
  UNADVOCATE_FOR_USER,
  UPLOAD_FEEDBACK,
  UPLOAD_REPORT_BUG,
  CHANGE_PROFILE_COLUMNS,
  CHANGE_PROJECT_COLUMNS,
  GET_UPDATES,
  REFRESH_PROFILE,
  RESET_SCROLL,
  SHOWCASE_LOCALLY,
  ON_SCREEN,
  OFF_SCREEN,
  RETURN_FROM_SHOWCASING,
} from "../actions/user";

const intialState = {
  showcaseId: "",
  email: "",
  profilePictureUrl: "",
  profilePictureBase64: "",
  projectTempCoverPhotoId: "",
  projectTempCoverPhotoUrl: "",
  projectTempCoverPhotoBase64: "",
  tempPhotoPostId: "",
  tempPhotoPostUrl: "",
  tempPhotoPostBase64: "",
  fullname: "",
  jobTitle: "",
  username: "",
  resumeLinkUrl: "",
  profileBiography: "",
  numberOfFollowers: 0,
  numberOfFollowing: 0,
  numberOfAdvocates: 0,
  numberOfAdvocating: 0,
  profileColumns: 2,
  followers: [],
  following: [],
  advocates: [],
  advocating: [],
  projectsAdvocating: [],
  cheeredPosts: [],
  profileProjects: {},
  profileLinks: {},
  userFeed: {},
  updates: {},
  showcasingLocally: false,
  returnFromShowcasing: false,
  resetScrollFeed: false,
  resetScrollExplore: false,
  resetScrollProfile: false,
  onFeedScreen: true,
  onExploreScreen: true,
  onProfileScreen: true,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        showcaseId: action.showcaseId,
        email: action.email,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
        projectTempCoverPhotoId: action.projectTempCoverPhotoId,
        projectTempCoverPhotoUrl: action.projectTempCoverPhotoUrl,
        projectTempCoverPhotoBase64: action.projectTempCoverPhotoBase64,
        tempPhotoPostUrl: action.tempPhotoPostUrl,
        tempPhotoPostBase64: action.tempPhotoPostBase64,
        fullname: action.fullname,
        jobTitle: action.jobTitle,
        username: action.username,
        resumeLinkUrl: action.resumeLinkUrl,
        profileBiography: action.profileBiography,
        numberOfFollowers: action.numberOfFollowers,
        numberOfFollowing: action.numberOfFollowing,
        numberOfAdvocates: action.numberOfAdvocates,
        numberOfAdvocating: action.numberOfAdvocating,
        profileColumns: action.profileColumns,
        followers: action.followers,
        following: action.following,
        advocates: action.advocates,
        advocating: action.advocating,
        projectsAdvocating: action.projectsAdvocating,
        cheeredPosts: action.cheeredPosts,
        profileProjects: action.profileProjects,
        profileLinks: action.profileLinks,
        userFeed: action.userFeed,
        updates: action.updates,
      };
    case GET_USER_FEED:
      return {
        ...state,
        userFeed: {
          ...action.feedData,
        },
      };
    case REFRESH_PROFILE:
      return {
        ...state,
        numberOfFollowers: action.numberOfFollowers,
        numberOfFollowing: action.numberOfFollowing,
        numberOfAdvocates: action.numberOfAdvocates,
        numberOfAdvocating: action.numberOfAdvocating,
        followers: action.followers,
        following: action.following,
        advocates: action.advocates,
        advocating: action.advocating,
        projectsAdvocating: action.projectsAdvocating,
        cheeredPosts: action.cheeredPosts,
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
        profileLinks: action.profileLinks,
      };
    case CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
      };
    case CHANGE_PROJECT_PICTURE:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectCoverPhotoUrl: action.projectCoverPhotoUrl,
            projectCoverPhotoId: action.projectCoverPhotoId,
            projectTempCoverPhotoBase64: action.projectTempCoverPhotoBase64,
          },
        },
      };
    case ADD_TEMP_PROJECT_PICTURE:
      return {
        ...state,
        projectTempCoverPhotoUrl: action.projectTempCoverPhotoUrl,
        projectTempCoverPhotoId: action.projectTempCoverPhotoId,
        projectTempCoverPhotoBase64: action.projectTempCoverPhotoBase64,
      };
    case CLEAR_TEMP_PROJECT_PICTURE:
      return {
        ...state,
        projectTempCoverPhotoUrl: action.projectTempCoverPhotoUrl,
        projectTempCoverPhotoId: action.projectTempCoverPhotoId,
        projectCoverPhotoBase64: action.projectCoverPhotoBase64,
      };
    case ADD_TEMP_POST_PICTURE:
      return {
        ...state,
        tempPhotoPostId: action.tempPhotoPostId,
        tempPhotoPostUrl: action.tempPhotoPostUrl,
        tempPhotoPostBase64: action.tempPhotoPostBase64,
      };
    case CLEAR_TEMP_POST_PICTURE:
      return {
        ...state,
        tempPhotoPostUrl: intialState.tempPhotoPostUrl,
        tempPhotoPostBase64: intialState.tempPhotoPostBase64,
      };
    case ADD_USER_PROJECT:
      Object.entries(state.userFeed).map(([id, value]) => {
        if (state.userFeed[id].showcaseId === action.showcaseId) {
          Object.assign(state.userFeed[id].profileProjects, {
            ...state.profileProjects,
            [action.projectId]: {
              ...state.profileProjects[action.projectId],
              projectId: action.projectId,
              projectCoverPhotoId: action.projectCoverPhotoId,
              projectCoverPhotoUrl: action.projectCoverPhotoUrl,
              projectCoverPhotoBase64: action.projectCoverPhotoBase64,
              projectDateCreated: action.projectDateCreated,
              projectLastUpdated: action.projectLastUpdated,
              projectTitle: action.projectTitle,
              projectDescription: action.projectDescription,
              projectLinks: action.projectLinks,
              projectColumns: 2,
              projectPosts: {},
            },
          });
        }
      });
      return {
        ...state,
        projectTempCoverPhotoUrl: intialState.projectTempCoverPhotoUrl,
        projectTempCoverPhotoBase64: intialState.projectTempCoverPhotoBase64,
        projectTempCoverPhotoId: intialState.projectTempCoverPhotoId,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectId: action.projectId,
            projectCoverPhotoId: action.projectCoverPhotoId,
            projectCoverPhotoUrl: action.projectCoverPhotoUrl,
            projectCoverPhotoBase64: action.projectCoverPhotoBase64,
            projectDateCreated: action.projectDateCreated,
            projectLastUpdated: action.projectLastUpdated,
            projectTitle: action.projectTitle,
            projectDescription: action.projectDescription,
            projectLinks: action.projectLinks,
            projectColumns: 2,
            projectPosts: {},
          },
        },
      };
    case ADD_USER_POST:
      return {
        ...state,
        tempPhotoPostUrl: intialState.tempPhotoPostId,
        tempPhotoPostUrl: intialState.tempPhotoPostUrl,
        tempPhotoPostBase64: intialState.tempPhotoPostBase64,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: {
              ...state.profileProjects[action.projectId].projectPosts,
              [action.postId]: {
                postId: action.postId,
                showcaseId: action.showcaseId,
                projectId: action.projectId,
                fullname: action.fullname,
                username: action.username,
                jobTitle: action.jobTitle,
                numberOfFollowers: action.numberOfFollowers,
                numberOfFollowing: action.numberOfFollowing,
                numberOfAdvocates: action.numberOfAdvocates,
                profileBiography: action.profileBiography,
                projectTitle: action.projectTitle,
                profilePictureUrl: action.profilePictureUrl,
                postDateCreated: action.postDateCreated,
                postLastUpdated: action.postLastUpdated,
                postPhotoUrl: action.postPhotoUrl,
                postPhotoBase64: action.postPhotoBase64,
                caption: action.caption,
                numberOfComments: 0,
                numberOfCheers: 0,
                cheering: [],
                profileLinks: action.profileLinks,
                projectLinks: action.projectLinks,
                postLinks: action.postLinks,
              },
            },
          },
        },
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            postId: action.postId,
            showcaseId: action.showcaseId,
            projectId: action.projectId,
            fullname: action.fullname,
            username: action.username,
            jobTitle: action.jobTitle,
            numberOfFollowers: action.numberOfFollowers,
            numberOfFollowing: action.numberOfFollowing,
            numberOfAdvocates: action.numberOfAdvocates,
            profileBiography: action.profileBiography,
            profileProjects: {
              ...state.profileProjects,
              [action.projectId]: {
                ...state.profileProjects[action.projectId],
                projectPosts: {
                  ...state.profileProjects[action.projectId].projectPosts,
                  [action.postId]: {
                    postId: action.postId,
                    showcaseId: action.showcaseId,
                    projectId: action.projectId,
                    fullname: action.fullname,
                    username: action.username,
                    jobTitle: action.jobTitle,
                    numberOfFollowers: action.numberOfFollowers,
                    numberOfFollowing: action.numberOfFollowing,
                    numberOfAdvocates: action.numberOfAdvocates,
                    profileBiography: action.profileBiography,
                    projectTitle: action.projectTitle,
                    profilePictureUrl: action.profilePictureUrl,
                    postDateCreated: action.postDateCreated,
                    postLastUpdated: action.postLastUpdated,
                    postPhotoUrl: action.postPhotoUrl,
                    postPhotoBase64: action.postPhotoBase64,
                    caption: action.caption,
                    numberOfComments: 0,
                    numberOfCheers: 0,
                    cheering: [],
                    profileLinks: action.profileLinks,
                    projectLinks: action.projectLinks,
                    postLinks: action.postLinks,
                    profileColumns: action.profileColumns,
                  },
                },
              },
            },
            projectTitle: action.projectTitle,
            profilePictureUrl: action.profilePictureUrl,
            postDateCreated: action.postDateCreated,
            postLastUpdated: action.postLastUpdated,
            postPhotoUrl: action.postPhotoUrl,
            postPhotoBase64: action.postPhotoBase64,
            caption: action.caption,
            numberOfComments: 0,
            numberOfCheers: 0,
            cheering: [],
            profileLinks: action.profileLinks,
            projectLinks: action.projectLinks,
            postLinks: action.postLinks,
            profileColumns: action.profileColumns,
          },
        },
      };
    case UPDATE_ALL_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        if (id !== action.postId) {
          if (state.userFeed[id].showcaseId === action.showcaseId) {
            Object.assign(
              state.userFeed[id].profileProjects,
              state.userFeed[action.postId].profileProjects
            );
          }
        }
      });
      return state;
    case UPDATE_USER_PROJECT:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectLastUpdated: action.projectLastUpdated,
            projectTitle: action.projectTitle,
            projectCoverPhotoUrl: action.projectCoverPhotoUrl,
            projectDescription: action.projectDescription,
            projectLinks: action.projectLinks,
          },
        },
      };
    case REMOVE_USER_PROJECT:
      const postIds = Object.keys(
        state.profileProjects[action.projectId].projectPosts
      );
      return {
        ...state,
        profileProjects: Object.fromEntries(
          Object.entries(state.profileProjects).filter(
            ([projectId, v]) => projectId !== action.projectId
          )
        ),
        userFeed: Object.fromEntries(
          Object.entries(state.userFeed).filter(
            ([postId, v]) => !postIds.includes(postId)
          )
        ),
      };
    case REMOVE_USER_POST:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: Object.fromEntries(
              Object.entries(
                state.profileProjects[action.projectId].projectPosts
              ).filter(([postId, v]) => postId !== action.postId)
            ),
          },
        },
        userFeed: Object.fromEntries(
          Object.entries(state.userFeed).filter(
            ([postId, v]) => postId !== action.postId
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
    case FOLLOW_USER:
      return {
        ...state,
        following: state.following.concat(action.exploredShowcaseId),
        numberOfFollowing: state.numberOfFollowing + 1,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (user) => user !== action.exploredShowcaseId
        ),
        numberOfFollowing: state.numberOfFollowing - 1,
      };
    case ADVOCATE_FOR_USER:
      return {
        ...state,
        advocating: state.advocating.concat(action.exploredShowcaseId),
        projectsAdvocating: state.projectsAdvocating.concat(action.projectId),
        numberOfAdvocating: state.numberOfAdvocating + 1,
      };
    case UNADVOCATE_FOR_USER:
      return {
        ...state,
        advocating: state.advocating.filter(
          (user) => user !== action.exploredShowcaseId
        ),
        projectsAdvocating: state.projectsAdvocating.filter(
          (user) => user !== action.projectId
        ),
        numberOfAdvocating: state.numberOfAdvocating - 1,
      };
    case CHEER_POST:
      return {
        ...state,
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileProjects: {
              ...state.userFeed[action.postId].profileProjects,
              [action.projectId]: {
                ...state.userFeed[action.postId].profileProjects[
                  action.projectId
                ],
                projectPosts: {
                  ...state.userFeed[action.postId].profileProjects[
                    action.projectId
                  ].projectPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId],
                    cheering: [
                      ...state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].cheering,
                      action.showcaseId,
                    ],
                    numberOfCheers:
                      state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].numberOfCheers + 1,
                  },
                },
              },
            },
            cheering: [
              ...state.userFeed[action.postId].cheering,
              action.showcaseId,
            ],
            numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
          },
        },
        cheeredPosts: [...state.cheeredPosts, action.postId],
      };
    case CHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        state.userFeed[id].profileProjects[action.projectId].projectPosts[
          action.postId
        ].numberOfCheers =
          state.userFeed[action.postId].profileProjects[
            action.projectId
          ].projectPosts[action.postId].numberOfCheers;
        Object.assign(
          state.userFeed[id].profileProjects[action.projectId].projectPosts[
            action.postId
          ].cheering,
          state.userFeed[action.postId].profileProjects[action.projectId]
            .projectPosts[action.postId].cheering
        );
      });
      return state;
    case CHEER_OWN_FEED_POST:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: {
              ...state.profileProjects[action.projectId].projectPosts,
              [action.postId]: {
                ...state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].numberOfCheers + 1,
                cheering: [
                  ...state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].cheering,
                  action.showcaseId,
                ],
              },
            },
          },
        },
      };
    case CHEER_OWN_PROFILE_POST:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: {
              ...state.profileProjects[action.projectId].projectPosts,
              [action.postId]: {
                ...state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].numberOfCheers + 1,
                cheering: [
                  ...state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].cheering,
                  action.showcaseId,
                ],
              },
            },
          },
        },
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileProjects: {
              ...state.userFeed[action.postId].profileProjects,
              [action.projectId]: {
                ...state.userFeed[action.postId].profileProjects[
                  action.projectId
                ],
                projectPosts: {
                  ...state.userFeed[action.postId].profileProjects[
                    action.projectId
                  ].projectPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId],
                    cheering: [
                      ...state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].cheering,
                      action.showcaseId,
                    ],
                    numberOfCheers:
                      state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].numberOfCheers + 1,
                  },
                },
              },
            },
            cheering: [
              ...state.userFeed[action.postId].cheering,
              action.showcaseId,
            ],
            numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
          },
        },
        cheeredPosts: [...state.cheeredPosts, action.postId],
      };
    case UNCHEER_POST:
      return {
        ...state,
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileProjects: {
              ...state.userFeed[action.postId].profileProjects,
              [action.projectId]: {
                ...state.userFeed[action.postId].profileProjects[
                  action.projectId
                ],
                projectPosts: {
                  ...state.userFeed[action.postId].profileProjects[
                    action.projectId
                  ].projectPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId],
                    cheering: state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId].cheering.filter(
                      (showcaseId) => showcaseId !== action.showcaseId
                    ),
                    numberOfCheers:
                      state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].numberOfCheers - 1,
                  },
                },
              },
            },
            cheering: state.userFeed[action.postId].cheering.filter(
              (showcaseId) => showcaseId !== action.showcaseId
            ),
            numberOfCheers: state.userFeed[action.postId].numberOfCheers - 1,
          },
        },
        cheeredPosts: state.cheeredPosts.filter(
          (post) => post !== action.postId
        ),
      };
    case UNCHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        state.userFeed[id].profileProjects[action.projectId].projectPosts[
          action.postId
        ].numberOfCheers =
          state.userFeed[action.postId].profileProjects[
            action.projectId
          ].projectPosts[action.postId].numberOfCheers;
        Object.assign(
          state.userFeed[id].profileProjects[action.projectId].projectPosts[
            action.postId
          ].cheering,
          state.userFeed[action.postId].profileProjects[action.projectId]
            .projectPosts[action.postId].cheering
        );
      });
      return state;
    case UNCHEER_OWN_FEED_POST:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: {
              ...state.profileProjects[action.projectId].projectPosts,
              [action.postId]: {
                ...state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].numberOfCheers - 1,
                cheering: state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ].cheering.filter(
                  (listShowcaseId) => listShowcaseId !== action.showcaseId
                ),
              },
            },
          },
        },
      };
    case UNCHEER_OWN_PROFILE_POST:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectPosts: {
              ...state.profileProjects[action.projectId].projectPosts,
              [action.postId]: {
                ...state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileProjects[action.projectId].projectPosts[
                    action.postId
                  ].numberOfCheers - 1,
                cheering: state.profileProjects[action.projectId].projectPosts[
                  action.postId
                ].cheering.filter(
                  (listShowcaseId) => listShowcaseId !== action.showcaseId
                ),
              },
            },
          },
        },
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileProjects: {
              ...state.userFeed[action.postId].profileProjects,
              [action.projectId]: {
                ...state.userFeed[action.postId].profileProjects[
                  action.projectId
                ],
                projectPosts: {
                  ...state.userFeed[action.postId].profileProjects[
                    action.projectId
                  ].projectPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId],
                    cheering: state.userFeed[action.postId].profileProjects[
                      action.projectId
                    ].projectPosts[action.postId].cheering.filter(
                      (showcaseId) => showcaseId !== action.showcaseId
                    ),
                    numberOfCheers:
                      state.userFeed[action.postId].profileProjects[
                        action.projectId
                      ].projectPosts[action.postId].numberOfCheers - 1,
                  },
                },
              },
            },
            cheering: state.userFeed[action.postId].cheering.filter(
              (showcaseId) => showcaseId !== action.showcaseId
            ),
            numberOfCheers: state.userFeed[action.postId].numberOfCheers - 1,
          },
        },
        cheeredPosts: state.cheeredPosts.filter(
          (post) => post !== action.postId
        ),
      };
    case UPLOAD_FEEDBACK:
      return {
        ...state,
        feedback: action.feedback,
      };
    case UPLOAD_REPORT_BUG:
      return {
        ...state,
        bugs: action.bug,
      };
    case CHANGE_PROFILE_COLUMNS:
      return {
        ...state,
        profileColumns: action.number,
      };
    case CHANGE_PROJECT_COLUMNS:
      return {
        ...state,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectColumns: action.number,
          },
        },
      };
    case GET_UPDATES:
      return {
        ...state,
        updates: action.updateData,
      };
    case RESET_SCROLL:
      return {
        ...state,
        [`resetScroll${action.tab}`]: !state[`resetScroll${action.tab}`],
      };
    case ON_SCREEN:
      return {
        ...state,
        [`on${action.tab}Screen`]: true,
      };
    case OFF_SCREEN:
      return {
        ...state,
        [`on${action.tab}Screen`]: false,
      };
    case SHOWCASE_LOCALLY:
      return {
        ...state,
        showcasingLocally: !state.showcasingLocally,
      };
    case RETURN_FROM_SHOWCASING:
      return {
        ...state,
        returnFromShowcasing: !state.returnFromShowcasing,
      };
  }
  return state;
};
