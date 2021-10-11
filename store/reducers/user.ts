import { pushReturn, spliceRemoveReturn } from "../../helper/CoreFunctions";
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
  UNADVOCATE_FOR_USER,
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
  Action,
} from "../actions/user/types";

const intialState: UserState = {
  ExhibitUId: "",
  email: "",
  profilePictureId: "",
  profilePictureUrl: "",
  profilePictureBase64: "",
  exhibitTempCoverPhotoId: "",
  exhibitTempCoverPhotoUrl: "",
  exhibitTempCoverPhotoBase64: "",
  tempPhotoPostId: "",
  tempPhotoPostUrl: "",
  tempPhotoPostBase64: "",
  fullname: "",
  jobTitle: "",
  username: "",
  profileBiography: "",
  numberOfFollowers: 0,
  numberOfFollowing: 0,
  profileColumns: 2,
  followers: [],
  following: [],
  cheeredPosts: [],
  profileExhibits: {},
  profileLinks: {},
  userFeed: {},
  updates: {},
  notifications: [],
  resetScrollFeed: false,
  resetScrollExplore: false,
  resetScrollProfile: false,
  resetScrollNotifications: false,
  showcasingProfile: false,
  hiddenProfileFooter: false,
  onFeedScreen: true,
  onExploreScreen: true,
  onProfileScreen: true,
  onNotificationsScreen: true,
  darkMode: false,
  showCheering: true,
  hideFollowing: false,
  hideFollowers: false,
  hideExhibits: false,
  tutorialing: false,
  tutorialPrompt: false,
  tutorialScreen: "Start",
};

export default (state = intialState, action: Action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        ExhibitUId: action.ExhibitUId,
        email: action.email,
        profilePictureId: action.profilePictureId,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
        exhibitTempCoverPhotoId: action.exhibitTempCoverPhotoId,
        exhibitTempCoverPhotoUrl: action.exhibitTempCoverPhotoUrl,
        exhibitTempCoverPhotoBase64: action.exhibitTempCoverPhotoBase64,
        tempPhotoPostId: action.tempPhotoPostId,
        tempPhotoPostUrl: action.tempPhotoPostUrl,
        tempPhotoPostBase64: action.tempPhotoPostBase64,
        fullname: action.fullname,
        jobTitle: action.jobTitle,
        username: action.username,
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
        exhibitsAdvocating: action.exhibitsAdvocating,
        cheeredPosts: action.cheeredPosts,
        profileExhibits: action.profileExhibits,
        notifications: action.notifications,
        profileLinks: action.profileLinks,
        userFeed: action.userFeed,
        updates: action.updates,
        darkMode: action.darkMode,
        showCheering: action.showCheering,
        hideFollowing: action.hideFollowing,
        hideFollowers: action.hideFollowers,
        hideExhibits: action.hideExhibits,
        tutorialing: action.tutorialing,
        tutorialPrompt: action.tutorialPrompt,
        tutorialScreen: action.tutorialScreen,
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
        exhibitsAdvocating: action.exhibitsAdvocating,
        cheeredPosts: action.cheeredPosts,
        profileExhibits: action.profileExhibits,
        profileLinks: action.profileLinks,
      };
    case REFRESH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        fullname: action.fullname,
        jobTitle: action.jobTitle,
        username: action.username,
        profileBiography: action.bio,
        profileLinks: action.profileLinks,
      };
    case CHANGE_PROFILE_PICTURE:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].profilePictureUrl = action.profilePictureUrl;
            Object.entries(state.userFeed[id].profileExhibits).map(
              ([exhibitId, value]) => {
                state.userFeed[id].profileExhibits[exhibitId].exhibitPosts[
                  id
                ].profilePictureUrl = action.profilePictureUrl;
              }
            );
          }
        });
      }
      return {
        ...state,
        profilePictureId: action.profilePictureId,
        profilePictureUrl: action.profilePictureUrl,
        profilePictureBase64: action.profilePictureBase64,
      };
    case CHANGE_PROJECT_PICTURE:
      return {
        ...state,
        exhibitTempCoverPhotoUrl: action.exhibitCoverPhotoUrl,
        exhibitTempCoverPhotoId: action.exhibitCoverPhotoId,
        exhibitTempCoverPhotoBase64: action.exhibitCoverPhotoBase64,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitCoverPhotoUrl: action.exhibitCoverPhotoUrl,
            exhibitCoverPhotoBase64: action.exhibitCoverPhotoBase64,
            exhibitCoverPhotoId: action.exhibitCoverPhotoId,
          },
        },
      };
    case ADD_TEMP_PROJECT_PICTURE:
      return {
        ...state,
        exhibitTempCoverPhotoUrl: action.exhibitTempCoverPhotoUrl,
        exhibitTempCoverPhotoId: action.exhibitTempCoverPhotoId,
        exhibitTempCoverPhotoBase64: action.exhibitTempCoverPhotoBase64,
      };
    case ADD_TEMP_POST_PICTURE:
      return {
        ...state,
        tempPhotoPostId: action.tempPhotoPostId,
        tempPhotoPostUrl: action.tempPhotoPostUrl,
        tempPhotoPostBase64: action.tempPhotoPostBase64,
      };
    case ADD_USER_PROJECT:
      Object.entries(state.userFeed).map(([id, value]) => {
        if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
          Object.assign(state.userFeed[id].profileExhibits, {
            ...state.profileExhibits,
            [action.exhibitId]: {
              ...state.profileExhibits[action.exhibitId],
              exhibitId: action.exhibitId,
              exhibitCoverPhotoId: action.exhibitCoverPhotoId,
              exhibitCoverPhotoUrl: action.exhibitCoverPhotoUrl,
              exhibitCoverPhotoBase64: action.exhibitCoverPhotoBase64,
              exhibitDateCreated: action.exhibitDateCreated,
              exhibitLastUpdated: action.exhibitLastUpdated,
              exhibitTitle: action.exhibitTitle,
              exhibitDescription: action.exhibitDescription,
              exhibitLinks: action.exhibitLinks,
              exhibitColumns: 2,
              exhibitPosts: {},
            },
          });
        }
      });
      return {
        ...state,
        exhibitTempCoverPhotoUrl: intialState.exhibitTempCoverPhotoUrl,
        exhibitTempCoverPhotoBase64: intialState.exhibitTempCoverPhotoBase64,
        exhibitTempCoverPhotoId: intialState.exhibitTempCoverPhotoId,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitId: action.exhibitId,
            exhibitCoverPhotoId: action.exhibitCoverPhotoId,
            exhibitCoverPhotoUrl: action.exhibitCoverPhotoUrl,
            exhibitCoverPhotoBase64: action.exhibitCoverPhotoBase64,
            exhibitDateCreated: action.exhibitDateCreated,
            exhibitLastUpdated: action.exhibitLastUpdated,
            exhibitTitle: action.exhibitTitle,
            exhibitDescription: action.exhibitDescription,
            exhibitLinks: action.exhibitLinks,
            exhibitColumns: 2,
            exhibitPosts: {},
          },
        },
      };
    case ADD_USER_POST:
      return {
        ...state,
        tempPhotoPostId: intialState.tempPhotoPostId,
        tempPhotoPostUrl: intialState.tempPhotoPostUrl,
        tempPhotoPostBase64: intialState.tempPhotoPostBase64,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: {
              ...state.profileExhibits[action.exhibitId].exhibitPosts,
              [action.postId]: {
                postId: action.postId,
                ExhibitUId: action.ExhibitUId,
                exhibitId: action.exhibitId,
                fullname: action.fullname,
                username: action.username,
                jobTitle: action.jobTitle,
                numberOfFollowers: action.numberOfFollowers,
                numberOfFollowing: action.numberOfFollowing,
                numberOfAdvocates: action.numberOfAdvocates,
                profileBiography: action.profileBiography,
                exhibitTitle: action.exhibitTitle,
                profilePictureUrl: action.profilePictureUrl,
                profilePictureBase64: action.profilePictureBase64,
                postDateCreated: action.postDateCreated,
                postLastUpdated: action.postLastUpdated,
                postPhotoPostId: action.postPhotoPostId,
                postPhotoUrl: action.postPhotoUrl,
                postPhotoBase64: action.postPhotoBase64,
                caption: action.caption,
                numberOfComments: 0,
                numberOfCheers: 0,
                cheering: [],
                profileLinks: action.profileLinks,
                exhibitLinks: action.exhibitLinks,
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
            exhibitId: action.exhibitId,
            fullname: action.fullname,
            username: action.username,
            jobTitle: action.jobTitle,
            numberOfFollowers: action.numberOfFollowers,
            numberOfFollowing: action.numberOfFollowing,
            numberOfAdvocates: action.numberOfAdvocates,
            followingValue: action.followingValue,
            followersValue: action.followersValue,
            exhibitsValue: action.exhibitsValue,
            profileBiography: action.profileBiography,
            profileExhibits: {
              ...state.profileExhibits,
              [action.exhibitId]: {
                ...state.profileExhibits[action.exhibitId],
                exhibitPosts: {
                  ...state.profileExhibits[action.exhibitId].exhibitPosts,
                  [action.postId]: {
                    postId: action.postId,
                    ExhibitUId: action.ExhibitUId,
                    exhibitId: action.exhibitId,
                    fullname: action.fullname,
                    username: action.username,
                    jobTitle: action.jobTitle,
                    numberOfFollowers: action.numberOfFollowers,
                    numberOfFollowing: action.numberOfFollowing,
                    numberOfAdvocates: action.numberOfAdvocates,
                    followingValue: action.followingValue,
                    followersValue: action.followersValue,
                    exhibitsValue: action.exhibitsValue,
                    profileBiography: action.profileBiography,
                    exhibitTitle: action.exhibitTitle,
                    profilePictureUrl: action.profilePictureUrl,
                    profilePictureBase64: action.profilePictureBase64,
                    postDateCreated: action.postDateCreated,
                    postLastUpdated: action.postLastUpdated,
                    postPhotoPostId: action.postPhotoPostId,
                    postPhotoUrl: action.postPhotoUrl,
                    postPhotoBase64: action.postPhotoBase64,
                    caption: action.caption,
                    numberOfComments: 0,
                    numberOfCheers: 0,
                    cheering: [],
                    profileLinks: action.profileLinks,
                    exhibitLinks: action.exhibitLinks,
                    postLinks: action.postLinks,
                    profileColumns: action.profileColumns,
                  },
                },
              },
            },
            exhibitTitle: action.exhibitTitle,
            profilePictureUrl: action.profilePictureUrl,
            profilePictureBase64: action.profilePictureBase64,
            postDateCreated: action.postDateCreated,
            postLastUpdated: action.postLastUpdated,
            postPhotoPostId: action.postPhotoPostId,
            postPhotoUrl: action.postPhotoUrl,
            postPhotoBase64: action.postPhotoBase64,
            caption: action.caption,
            numberOfComments: 0,
            numberOfCheers: 0,
            cheering: [],
            profileLinks: action.profileLinks,
            exhibitLinks: action.exhibitLinks,
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
              state.userFeed[id].profileExhibits,
              state.userFeed[action.postId].profileExhibits
            );
          }
        }
      });
      return state;
    case UPDATE_USER_PROJECT:
      return {
        ...state,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitLastUpdated: action.exhibitLastUpdated,
            exhibitTitle: action.exhibitTitle,
            exhibitCoverPhotoUrl: action.exhibitCoverPhotoUrl,
            exhibitDescription: action.exhibitDescription,
            exhibitLinks: action.exhibitLinks,
          },
        },
      };
    case REMOVE_USER_PROJECT:
      const postIds = Object.keys(
        state.profileExhibits[action.exhibitId].exhibitPosts
      );
      return {
        ...state,
        profileExhibits: Object.fromEntries(
          Object.entries(state.profileExhibits).filter(
            ([exhibitId, v]) => exhibitId !== action.exhibitId
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
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: Object.fromEntries(
              Object.entries(
                state.profileExhibits[action.exhibitId].exhibitPosts
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
    case FOLLOW_USER:
      return {
        ...state,
        following: pushReturn(state.following, action.exploredExhibitUId),
        numberOfFollowing: state.numberOfFollowing + 1,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: spliceRemoveReturn(
          state.following,
          action.exploredExhibitUId
        ),
        numberOfFollowing: state.numberOfFollowing - 1,
      };
    case CHEER_POST:
      if (state.userFeed[action.postId]) {
        return {
          ...state,
          userFeed: {
            ...state.userFeed,
            [action.postId]: {
              ...state.userFeed[action.postId],
              cheering: pushReturn(
                state.userFeed[action.postId].cheering,
                action.ExhibitUId
              ),
              numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
              profileExhibits: {
                ...state.userFeed[action.postId].profileExhibits,
                [action.exhibitId]: {
                  ...state.userFeed[action.postId].profileExhibits[
                    action.exhibitId
                  ],
                  exhibitPosts: {
                    ...state.userFeed[action.postId].profileExhibits[
                      action.exhibitId
                    ].exhibitPosts,
                    [action.postId]: {
                      ...state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId],
                      cheering: pushReturn(
                        state.userFeed[action.postId].profileExhibits[
                          action.exhibitId
                        ].exhibitPosts[action.postId].cheering,
                        action.ExhibitUId
                      ),
                      numberOfCheers:
                        state.userFeed[action.postId].profileExhibits[
                          action.exhibitId
                        ].exhibitPosts[action.postId].numberOfCheers + 1,
                    },
                  },
                },
              },
            },
          },
          cheeredPosts: pushReturn(state.cheeredPosts, action.postId),
        };
      } else {
        return {
          ...state,
          cheeredPosts: pushReturn(state.cheeredPosts, action.postId),
        };
      }
    case CHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        Object.entries(state.userFeed[id].profileExhibits).map(
          ([projId, value]) => {
            if (
              Object.keys(
                state.userFeed[id].profileExhibits[projId].exhibitPosts
              ).includes(action.postId) &&
              action.postId === id
            ) {
              Object.assign(
                state.userFeed[id].profileExhibits[projId].exhibitPosts[
                  action.postId
                ].numberOfCheers,
                state.userFeed[action.postId].numberOfCheers
              );
              Object.assign(
                state.userFeed[id].profileExhibits[projId].exhibitPosts[
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
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: {
              ...state.profileExhibits[action.exhibitId].exhibitPosts,
              [action.postId]: {
                ...state.profileExhibits[action.exhibitId].exhibitPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].numberOfCheers + 1,
                cheering: pushReturn(
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].cheering,
                  action.ExhibitUId
                ),
              },
            },
          },
        },
      };
    case CHEER_OWN_PROFILE_POST:
      return {
        ...state,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: {
              ...state.profileExhibits[action.exhibitId].exhibitPosts,
              [action.postId]: {
                ...state.profileExhibits[action.exhibitId].exhibitPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].numberOfCheers + 1,
                cheering: pushReturn(
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].cheering,
                  action.ExhibitUId
                ),
              },
            },
          },
        },
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileExhibits: {
              ...state.userFeed[action.postId].profileExhibits,
              [action.exhibitId]: {
                ...state.userFeed[action.postId].profileExhibits[
                  action.exhibitId
                ],
                exhibitPosts: {
                  ...state.userFeed[action.postId].profileExhibits[
                    action.exhibitId
                  ].exhibitPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileExhibits[
                      action.exhibitId
                    ].exhibitPosts[action.postId],
                    cheering: pushReturn(
                      state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId].cheering,
                      action.ExhibitUId
                    ),
                    numberOfCheers:
                      state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId].numberOfCheers + 1,
                  },
                },
              },
            },
            cheering: pushReturn(
              state.userFeed[action.postId].cheering,
              action.ExhibitUId
            ),
            numberOfCheers: state.userFeed[action.postId].numberOfCheers + 1,
          },
        },
        cheeredPosts: pushReturn(state.cheeredPosts, action.postId),
      };
    case UNCHEER_POST:
      if (state.userFeed[action.postId]) {
        return {
          ...state,
          userFeed: {
            ...state.userFeed,
            [action.postId]: {
              ...state.userFeed[action.postId],
              profileExhibits: {
                ...state.userFeed[action.postId].profileExhibits,
                [action.exhibitId]: {
                  ...state.userFeed[action.postId].profileExhibits[
                    action.exhibitId
                  ],
                  exhibitPosts: {
                    ...state.userFeed[action.postId].profileExhibits[
                      action.exhibitId
                    ].exhibitPosts,
                    [action.postId]: {
                      ...state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId],
                      cheering: spliceRemoveReturn(
                        state.userFeed[action.postId].profileExhibits[
                          action.exhibitId
                        ].exhibitPosts[action.postId].cheering,
                        action.ExhibitUId
                      ),
                      numberOfCheers:
                        state.userFeed[action.postId].profileExhibits[
                          action.exhibitId
                        ].exhibitPosts[action.postId].numberOfCheers - 1,
                    },
                  },
                },
              },
              cheering: spliceRemoveReturn(
                state.userFeed[action.postId].cheering,
                action.ExhibitUId
              ),
              numberOfCheers: state.userFeed[action.postId].numberOfCheers - 1,
            },
          },
          cheeredPosts: spliceRemoveReturn(state.cheeredPosts, action.postId),
        };
      } else {
        return {
          ...state,
          cheeredPosts: spliceRemoveReturn(state.cheeredPosts, action.postId),
        };
      }
    case UNCHEER_UPDATE_POSTS:
      Object.entries(state.userFeed).map(([id, value]) => {
        Object.entries(state.userFeed[id].profileExhibits).map(
          ([projId, value]) => {
            if (
              Object.keys(
                state.userFeed[id].profileExhibits[projId].exhibitPosts
              ).includes(action.postId) &&
              action.postId === id
            ) {
              Object.assign(
                state.userFeed[id].profileExhibits[projId].exhibitPosts[
                  action.postId
                ].numberOfCheers,
                state.userFeed[action.postId].numberOfCheers
              );
              Object.assign(
                state.userFeed[id].profileExhibits[projId].exhibitPosts[
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
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: {
              ...state.profileExhibits[action.exhibitId].exhibitPosts,
              [action.postId]: {
                ...state.profileExhibits[action.exhibitId].exhibitPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].numberOfCheers - 1,
                cheering: spliceRemoveReturn(
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].cheering,
                  action.ExhibitUId
                ),
              },
            },
          },
        },
      };
    case UNCHEER_OWN_PROFILE_POST:
      return {
        ...state,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitPosts: {
              ...state.profileExhibits[action.exhibitId].exhibitPosts,
              [action.postId]: {
                ...state.profileExhibits[action.exhibitId].exhibitPosts[
                  action.postId
                ],
                numberOfCheers:
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].numberOfCheers - 1,
                cheering: spliceRemoveReturn(
                  state.profileExhibits[action.exhibitId].exhibitPosts[
                    action.postId
                  ].cheering,
                  action.ExhibitUId
                ),
              },
            },
          },
        },
        userFeed: {
          ...state.userFeed,
          [action.postId]: {
            ...state.userFeed[action.postId],
            profileExhibits: {
              ...state.userFeed[action.postId].profileExhibits,
              [action.exhibitId]: {
                ...state.userFeed[action.postId].profileExhibits[
                  action.exhibitId
                ],
                exhibitPosts: {
                  ...state.userFeed[action.postId].profileExhibits[
                    action.exhibitId
                  ].exhibitPosts,
                  [action.postId]: {
                    ...state.userFeed[action.postId].profileExhibits[
                      action.exhibitId
                    ].exhibitPosts[action.postId],
                    cheering: spliceRemoveReturn(
                      state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId].cheering,
                      action.ExhibitUId
                    ),
                    numberOfCheers:
                      state.userFeed[action.postId].profileExhibits[
                        action.exhibitId
                      ].exhibitPosts[action.postId].numberOfCheers - 1,
                  },
                },
              },
            },
            cheering: spliceRemoveReturn(
              state.userFeed[action.postId].cheering,
              action.ExhibitUId
            ),
            numberOfCheers: state.userFeed[action.postId].numberOfCheers - 1,
          },
        },
        cheeredPosts: spliceRemoveReturn(state.cheeredPosts, action.postId),
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
            state.userFeed[id].profileExhibits[
              action.exhibitId
            ].exhibitColumns = action.number;
          }
        });
      }

      return {
        ...state,
        profileExhibits: {
          ...state.profileExhibits,
          [action.exhibitId]: {
            ...state.profileExhibits[action.exhibitId],
            exhibitColumns: action.number,
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
    case SHOW_CHEERING:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].showCheering = action.showCheering;
            Object.entries(state.userFeed[id].profileExhibits).map(
              ([exhibitId, value]) => {
                state.userFeed[id].profileExhibits[exhibitId].exhibitPosts[
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
            Object.entries(state.userFeed[id].profileExhibits).map(
              ([exhibitId, value]) => {
                state.userFeed[id].profileExhibits[exhibitId].exhibitPosts[
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
            Object.entries(state.userFeed[id].profileExhibits).map(
              ([exhibitId, value]) => {
                state.userFeed[id].profileExhibits[exhibitId].exhibitPosts[
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
    case HIDE_EXHIBITS:
      if (state.userFeed) {
        Object.entries(state.userFeed).map(([id, value]) => {
          if (state.userFeed[id].ExhibitUId === action.ExhibitUId) {
            state.userFeed[id].hideExhibits = action.hideExhibitsValue;
            Object.entries(state.userFeed[id].profileExhibits).map(
              ([exhibitId, value]) => {
                state.userFeed[id].profileExhibits[exhibitId].exhibitPosts[
                  id
                ].hideExhibits = action.hideExhibitsValue;
              }
            );
          }
        });
      }
      return {
        ...state,
        hideExhibits: action.hideExhibitsValue,
      };
    case GET_SWITCHES:
      return {
        ...state,
        darkMode: action.darkMode,
        showCheering: action.showCheering,
        hideFollowing: action.hideFollowing,
        hideFollowers: action.hideFollowers,
        hideExhibits: action.hideExhibits,
      };
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case SET_TUTORIALING:
      return {
        ...state,
        tutorialing: action.value,
        tutorialScreen: action.screen,
      };
    case SET_TUTORIALING_PROMPT:
      return {
        ...state,
        tutorialPrompt: action.value,
      };
    default:
      return state;
  }
};
