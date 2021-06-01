import {
  ADD_TEMP_POST_PICTURE,
  ADD_TEMP_PROJECT_PICTURE,
  ADD_USER_POST,
  ADD_USER_PROJECT,
  ADVOCATE_FOR_USER,
  CHANGE_PROFILE_COLUMNS,
  CHANGE_PROFILE_PICTURE,
  CHANGE_PROJECT_COLUMNS,
  CHANGE_PROJECT_PICTURE,
  CHEER_OWN_FEED_POST,
  CHEER_OWN_PROFILE_POST,
  CHEER_POST,
  CHEER_UPDATE_POSTS,
  CLEAR_TEMP_POST_PICTURE,
  CLEAR_TEMP_PROJECT_PICTURE,
  FOLLOW_USER,
  GET_SWITCHES,
  GET_UPDATES,
  GET_USER_DATA,
  GET_USER_FEED,
  HIDE_ADVOCATES,
  HIDE_FOLLOWERS,
  HIDE_FOLLOWING,
  HIDE_PROFILE_FOOTER,
  OFF_SCREEN,
  ON_SCREEN,
  REFRESH_PROFILE,
  REMOVE_USER_POST,
  REMOVE_USER_PROJECT,
  RESET_SCROLL,
  RETURN_FROM_SHOWCASING,
  SET_DARKMODE,
  SHOWCASE_PROFILE,
  SHOW_CHEERING,
  SHOW_RESUME,
  UNADVOCATE_FOR_USER,
  UNCHEER_OWN_FEED_POST,
  UNCHEER_OWN_PROFILE_POST,
  UNCHEER_POST,
  UNCHEER_UPDATE_POSTS,
  UNFOLLOW_USER,
  UPDATE_ALL_POSTS,
  UPDATE_PROFILE_LINKS,
  UPDATE_PROJECT_LINKS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROJECT,
  UPLOAD_FEEDBACK,
  UPLOAD_REPORT_BUG,
} from "../actions/user";

const intialState = {
  ExhibitUId: "",
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
  resetScrollFeed: false,
  resetScrollExplore: false,
  resetScrollProfile: false,
  showcasingProfile: false,
  hiddenProfileFooter: false,
  onFeedScreen: true,
  onExploreScreen: true,
  onProfileScreen: true,
  darkMode: false,
  showResume: false,
  showCheering: true,
  hideFollowing: false,
  hideFollowers: false,
  hideAdvocates: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        ExhibitUId: action.ExhibitUId,
        email: action.email,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
        projectTempCoverPhotoId: action.projectTempCoverPhotoId,
        projectTempCoverPhotoUrl: action.projectTempCoverPhotoUrl,
        projectTempCoverPhotoBase64: action.projectTempCoverPhotoBase64,
        tempPhotoPostId: action.tempPhotoPostId,
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
        darkMode: action.darkMode,
        showResume: action.showResume,
        showCheering: action.showCheering,
        hideFollowing: action.hideFollowing,
        hideFollowers: action.hideFollowers,
        hideAdvocates: action.hideAdvocates,
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
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].profilePictureBase64 =
              action.profilePictureBase64;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.profileProjects[projectId].projectPosts[
                  id
                ].profilePictureBase64 = action.profilePictureBase64;
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].profilePictureBase64 = action.profilePictureBase64;
              }
            );
          }
        });
      }
      return {
        ...state,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
      };
    case CHANGE_PROJECT_PICTURE:
      return {
        ...state,
        projectTempCoverPhotoUrl: action.projectCoverPhotoUrl,
        projectTempCoverPhotoId: action.projectCoverPhotoId,
        projectTempCoverPhotoBase64: action.projectCoverPhotoBase64,
        profileProjects: {
          ...state.profileProjects,
          [action.projectId]: {
            ...state.profileProjects[action.projectId],
            projectCoverPhotoUrl: action.projectCoverPhotoUrl,
            projectCoverPhotoBase64: action.projectCoverPhotoBase64,
            projectCoverPhotoId: action.projectCoverPhotoId,
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
        if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
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
        tempPhotoPostId: intialState.tempPhotoPostId,
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
                ExhibitUId: action.ExhibitUId,
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
                profilePictureBase64: action.profilePictureBase64,
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
            ExhibitUId: action.ExhibitUId,
            projectId: action.projectId,
            fullname: action.fullname,
            username: action.username,
            jobTitle: action.jobTitle,
            numberOfFollowers: action.numberOfFollowers,
            numberOfFollowing: action.numberOfFollowing,
            numberOfAdvocates: action.numberOfAdvocates,
            followingValue: action.followingValue,
            followersValue: action.followersValue,
            advocatesValue: action.advocatesValue,
            profileBiography: action.profileBiography,
            profileProjects: {
              ...state.profileProjects,
              [action.projectId]: {
                ...state.profileProjects[action.projectId],
                projectPosts: {
                  ...state.profileProjects[action.projectId].projectPosts,
                  [action.postId]: {
                    postId: action.postId,
                    ExhibitUId: action.ExhibitUId,
                    projectId: action.projectId,
                    fullname: action.fullname,
                    username: action.username,
                    jobTitle: action.jobTitle,
                    numberOfFollowers: action.numberOfFollowers,
                    numberOfFollowing: action.numberOfFollowing,
                    numberOfAdvocates: action.numberOfAdvocates,
                    followingValue: action.followingValue,
                    followersValue: action.followersValue,
                    advocatesValue: action.advocatesValue,
                    profileBiography: action.profileBiography,
                    projectTitle: action.projectTitle,
                    profilePictureUrl: action.profilePictureUrl,
                    profilePictureBase64: action.profilePictureBase64,
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
            profilePictureBase64: action.profilePictureBase64,
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
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
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
        following: state.following.concat(action.exploredExhibitUId),
        numberOfFollowing: state.numberOfFollowing + 1,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (user) => user !== action.exploredExhibitUId
        ),
        numberOfFollowing: state.numberOfFollowing - 1,
      };
    case ADVOCATE_FOR_USER:
      return {
        ...state,
        advocating: state.advocating.concat(action.exploredExhibitUId),
        projectsAdvocating: state.projectsAdvocating.concat(action.projectId),
        numberOfAdvocating: state.numberOfAdvocating + 1,
      };
    case UNADVOCATE_FOR_USER:
      return {
        ...state,
        advocating: state.advocating.filter(
          (user) => user !== action.exploredExhibitUId
        ),
        projectsAdvocating: state.projectsAdvocating.filter(
          (user) => user !== action.projectId
        ),
        numberOfAdvocating: state.numberOfAdvocating - 1,
      };
    case CHEER_POST:
      if (state.userFeed[action.postId]) {
        return {
          ...state,
          userFeed: {
            ...state.userFeed,
            [action.postId]: {
              ...state.userFeed[action.postId],
              cheering: [
                ...state.userFeed[action.postId].cheering,
                action.ExhibitUId,
              ],
              numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
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
                        action.ExhibitUId,
                      ],
                      numberOfCheers:
                        state.userFeed[action.postId].profileProjects[
                          action.projectId
                        ].projectPosts[action.postId].numberOfCheers + 1,
                    },
                  },
                },
              },
            },
          },
          cheeredPosts: [...state.cheeredPosts, action.postId],
        };
      } else {
        return {
          ...state,
          cheeredPosts: [...state.cheeredPosts, action.postId],
        };
      }
    case CHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        Object.entries(state.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                state.userFeed[id].profileProjects[projId].projectPosts
              ).includes(action.postId)
            ) {
              state.userFeed[id].profileProjects[projId].projectPosts[
                action.postId
              ].numberOfCheers = state.userFeed[action.postId].numberOfCheers;
              Object.assign(
                state.userFeed[id].profileProjects[projId].projectPosts[
                  action.postId
                ].cheering,
                state.userFeed[action.postId].cheering
              );
            }
          }
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
                  action.ExhibitUId,
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
                  action.ExhibitUId,
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
                      action.ExhibitUId,
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
              action.ExhibitUId,
            ],
            numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
          },
        },
        cheeredPosts: [...state.cheeredPosts, action.postId],
      };
    case UNCHEER_POST:
      if (state.userFeed[action.postId]) {
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
                        (ExhibitUId) => ExhibitUId !== action.ExhibitUId
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
                (ExhibitUId) => ExhibitUId !== action.ExhibitUId
              ),
              numberOfCheers: state.userFeed[action.postId].numberOfCheers - 1,
            },
          },
          cheeredPosts: state.cheeredPosts.filter(
            (post) => post !== action.postId
          ),
        };
      } else {
        return {
          ...state,
          cheeredPosts: state.cheeredPosts.filter(
            (post) => post !== action.postId
          ),
        };
      }
    case UNCHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        Object.entries(state.userFeed[id].profileProjects).map(
          ([projId, value]) => {
            if (
              Object.keys(
                state.userFeed[id].profileProjects[projId].projectPosts
              ).includes(action.postId)
            ) {
              state.userFeed[id].profileProjects[projId].projectPosts[
                action.postId
              ].numberOfCheers = state.userFeed[action.postId].numberOfCheers;
              Object.assign(
                state.userFeed[id].profileProjects[projId].projectPosts[
                  action.postId
                ].cheering,
                state.userFeed[action.postId].cheering
              );
            }
          }
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
                  (listExhibitUId) => listExhibitUId !== action.ExhibitUId
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
                  (listExhibitUId) => listExhibitUId !== action.ExhibitUId
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
                      (ExhibitUId) => ExhibitUId !== action.ExhibitUId
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
              (ExhibitUId) => ExhibitUId !== action.ExhibitUId
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
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].profileColumns = action.number;
          }
        });
      }
      return {
        ...state,
        profileColumns: action.number,
      };
    case CHANGE_PROJECT_COLUMNS:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].profileProjects[
              action.projectId
            ].projectColumns = action.number;
          }
        });
      }

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
    case SHOWCASE_PROFILE:
      return {
        ...state,
        showcasingProfile: true,
      };
    case RETURN_FROM_SHOWCASING:
      return {
        ...state,
        showcasingProfile: false,
      };

    case HIDE_PROFILE_FOOTER:
      return {
        ...state,
        hiddenProfileFooter: action.value,
      };
    case SHOW_RESUME:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].showResumeValue = action.showResumeValue;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].showResumeValue = action.showResumeValue;
              }
            );
          }
        });
      }
      return {
        ...state,
        showResume: action.showResumeValue,
      };
    case SHOW_CHEERING:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].showCheering = action.showCheering;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].showCheering = action.showCheering;
              }
            );
          }
        });
      }
      return {
        ...state,
        showCheering: action.showCheering,
      };
    case HIDE_FOLLOWING:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].hideFollowing = action.hideFollowingValue;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].hideFollowing = action.hideFollowingValue;
              }
            );
          }
        });
      }
      return {
        ...state,
        hideFollowing: action.hideFollowingValue,
      };
    case HIDE_FOLLOWERS:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].hideFollowers = action.hideFollowersValue;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].hideFollowers = action.hideFollowersValue;
              }
            );
          }
        });
      }
      return {
        ...state,
        hideFollowers: action.hideFollowersValue,
      };
    case HIDE_ADVOCATES:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].hideAdvocates = action.hideAdvocatesValue;
            Object.entries(state.userFeed[id].profileProjects).map(
              ([projectId, value]) => {
                state.userFeed[id].profileProjects[projectId].projectPosts[
                  id
                ].hideAdvocates = action.hideAdvocatesValue;
              }
            );
          }
        });
      }
      return {
        ...state,
        hideAdvocates: action.hideAdvocatesValue,
      };
    case GET_SWITCHES:
      return {
        ...state,
        darkMode: action.darkMode,
        showResume: action.showResume,
        showCheering: action.showCheering,
        hideFollowing: action.hideFollowing,
        hideFollowers: action.hideFollowers,
        hideAdvocates: action.hideAdvocates,
      };
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
  }
  return state;
};
