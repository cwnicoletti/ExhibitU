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
export const UPDATE_USER_PROJECT = "UPDATE_USER_PROJECT";

export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";
export const CHANGE_PROFILE_COLUMNS = "CHANGE_PROFILE_COLUMNS";
export const CHANGE_PROJECT_PICTURE = "CHANGE_PROJECT_PICTURE";
export const CHANGE_PROJECT_COLUMNS = "CHANGE_PROJECT_COLUMNS";

export const REMOVE_USER_PROJECT = "REMOVE_USER_PROJECT";
export const REMOVE_USER_POST = "REMOVE_USER_POST";

export const ADD_TEMP_PROJECT_PICTURE = "ADD_TEMP_PROJECT_PICTURE";
export const ADD_TEMP_POST_PICTURE = "ADD_TEMP_POST_PICTURE";
export const ADD_USER_PROJECT = "ADD_USER_PROJECT";
export const ADD_USER_POST = "ADD_USER_POST";
export const UPDATE_ALL_POSTS = "UPDATE_ALL_POSTS";

export const SET_TUTORIALING = "SET_TUTORIALING";
export const SET_TUTORIALING_PROMPT = "SET_TUTORIALING_PROMPT";

export interface UserState {
  ExhibitUId: string;
  email: string;
  profilePictureId: string;
  profilePictureUrl: string;
  profilePictureBase64: string;
  exhibitTempCoverPhotoId: string;
  exhibitTempCoverPhotoUrl: string;
  exhibitTempCoverPhotoBase64: string;
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
  exhibitsAdvocating: string[];
  cheeredPosts: string[];
  profileExhibits: object;
  profileLinks: object;
  userFeed: object;
  notifications: object;
  darkMode: boolean;
  showCheering: boolean;
  hideFollowing: boolean;
  hideFollowers: boolean;
  hideAdvocates: boolean;
  updates: object;
  resetScrollFeed: boolean;
  resetScrollExplore: boolean;
  resetScrollProfile: boolean;
  resetScrollNotifications: boolean;
  showcasingProfile: boolean;
  hiddenProfileFooter: boolean;
  onFeedScreen: boolean;
  onExploreScreen: boolean;
  onProfileScreen: boolean;
  onNotificationsScreen: boolean;
  tutorialing: boolean;
  tutorialPrompt: boolean;
  tutorialScreen: string;
}

interface ActionRefreshProfile {
  type: typeof REFRESH_PROFILE;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfAdvocates: number;
  numberOfAdvocating: number;
  followers: string[];
  following: string[];
  advocates: string[];
  advocating: string[];
  exhibitsAdvocating: string[];
  cheeredPosts: string[];
  profileExhibits: object;
  profileLinks: object;
}
interface ActionGetUserData {
  type: typeof GET_USER_DATA;
  ExhibitUId: string;
  email: string;
  profilePictureId: string;
  profilePictureUrl: string;
  profilePictureBase64: string;
  exhibitTempCoverPhotoId: string;
  exhibitTempCoverPhotoUrl: string;
  exhibitTempCoverPhotoBase64: string;
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
  exhibitsAdvocating: string[];
  cheeredPosts: string[];
  profileExhibits: object;
  profileLinks: object;
  userFeed: object;
  darkMode: boolean;
  showCheering: boolean;
  hideFollowing: boolean;
  hideFollowers: boolean;
  hideAdvocates: boolean;
  updates: object;
  tutorialing: boolean;
  tutorialPrompt: boolean;
  tutorialScreen: string;
}
interface ActionGetSwitches {
  type: typeof GET_SWITCHES;
  darkMode: boolean;
  showCheering: boolean;
  hideFollowing: boolean;
  hideFollowers: boolean;
  hideAdvocates: boolean;
}
interface ActionUpdateUserProfile {
  type: typeof UPDATE_USER_PROFILE;
  fullname: string;
  jobTitle: string;
  username: string;
  bio: string;
  profileLinks: object;
}
interface ActionAddUserExhibit {
  type: typeof ADD_USER_PROJECT;
  ExhibitUId: string;
  exhibitId: string;
  exhibitCoverPhotoId: string;
  exhibitCoverPhotoUrl: string;
  exhibitCoverPhotoBase64: string;
  exhibitDateCreated: string;
  exhibitLastUpdated: string;
  exhibitTitle: string;
  exhibitDescription: string;
  exhibitLinks: object;
}
interface ActionUpdateUserExhibit {
  type: typeof UPDATE_USER_PROJECT;
  exhibitId: string;
  exhibitCoverPhotoUrl: string;
  exhibitLastUpdated: string;
  exhibitTitle: string;
  exhibitDescription: string;
  exhibitLinks: object;
}
interface ActionRemoveUserExhibit {
  type: typeof REMOVE_USER_PROJECT;
  exhibitId: string;
}
interface ActionRemoveUserPost {
  type: typeof REMOVE_USER_POST;
  exhibitId: string;
  postId: string;
}
interface ActionFollowUser {
  type: typeof FOLLOW_USER;
  exploredExhibitUId: string;
}
interface ActionUnfollowUser {
  type: typeof UNFOLLOW_USER;
  exploredExhibitUId: string;
}
interface ActionAdvocateForUser {
  type: typeof ADVOCATE_FOR_USER;
  exploredExhibitUId: string;
  exhibitId: string;
}
interface ActionUnadvocateForUser {
  type: typeof UNADVOCATE_FOR_USER;
  exploredExhibitUId: string;
  exhibitId: string;
}
interface ActionChangeProfilePicture {
  type: typeof CHANGE_PROFILE_PICTURE;
  profilePictureId: string;
  profilePictureUrl: string;
  profilePictureBase64: string;
  ExhibitUId: string;
}
interface ActionAddTempExhibitPicture {
  type: typeof ADD_TEMP_PROJECT_PICTURE;
  exhibitTempCoverPhotoUrl: string;
  exhibitTempCoverPhotoId: string;
  exhibitTempCoverPhotoBase64: string;
}
interface ActionAddTempPostPicture {
  type: typeof ADD_TEMP_POST_PICTURE;
  tempPhotoPostId: string;
  tempPhotoPostUrl: string;
  tempPhotoPostBase64: string;
}
interface ActionChangeExhibitPicture {
  type: typeof CHANGE_PROJECT_PICTURE;
  exhibitId: string;
  exhibitCoverPhotoUrl: string;
  exhibitCoverPhotoId: string;
  exhibitCoverPhotoBase64: string;
}
interface ActionAddUserPost {
  type: typeof ADD_USER_POST;
  fullname: string;
  username: string;
  jobTitle: string;
  ExhibitUId: string;
  profileBiography: string;
  exhibitTitle: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfAdvocates: number;
  followingValue: boolean;
  followersValue: boolean;
  advocatesValue: boolean;
  profilePictureUrl: string;
  profilePictureBase64: string;
  exhibitId: string;
  postId: string;
  postDateCreated: string;
  postLastUpdated: string;
  postPhotoPostId: string;
  postPhotoUrl: string;
  postPhotoBase64: string;
  caption: string;
  profileLinks: object;
  exhibitLinks: object;
  postLinks: object;
  profileColumns: number;
}
interface ActionUpdateAllPosts {
  type: typeof UPDATE_ALL_POSTS;
  ExhibitUId: string;
  postId: string;
}
interface ActionGetUserFeed {
  type: typeof GET_USER_FEED;
  feedData: object;
}
interface ActionCheerPost {
  type: typeof CHEER_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionCheerUpdatePosts {
  type: typeof CHEER_UPDATE_POSTS;
  exhibitId: string;
  postId: string;
}
interface ActionCheerOwnFeedPost {
  type: typeof CHEER_OWN_FEED_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionCheerOwnProfilePost {
  type: typeof CHEER_OWN_PROFILE_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionUncheerPost {
  type: typeof UNCHEER_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionUncheerUpdatePosts {
  type: typeof UNCHEER_UPDATE_POSTS;
  exhibitId: string;
  postId: string;
}
interface ActionUncheerOwnFeedPost {
  type: typeof UNCHEER_OWN_FEED_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionUncheerOwnProfilePost {
  type: typeof UNCHEER_OWN_PROFILE_POST;
  ExhibitUId: string;
  exhibitId: string;
  postId: string;
}
interface ActionChangeProfileColumns {
  type: typeof CHANGE_PROFILE_COLUMNS;
  number: number;
  ExhibitUId: string;
}
interface ActionChangeExhibitColumns {
  type: typeof CHANGE_PROJECT_COLUMNS;
  ExhibitUId: string;
  exhibitId: string;
  number: number;
}
interface ActionGetUpdates {
  type: typeof GET_UPDATES;
  updateData: object;
}
interface ActionResetScroll {
  type: typeof RESET_SCROLL;
  tab: boolean;
}
interface ActionOnScreen {
  type: typeof ON_SCREEN;
  tab: boolean;
}
interface ActionOffScreen {
  type: typeof OFF_SCREEN;
  tab: string;
}
interface ActionShowcaseProfile {
  type: typeof SHOWCASE_PROFILE;
}
interface ActionReturnFromShowcasing {
  type: typeof RETURN_FROM_SHOWCASING;
}
interface ActionHideProfileFooter {
  type: typeof HIDE_PROFILE_FOOTER;
  value: boolean;
}
interface ActionSetDarkMode {
  type: typeof SET_DARKMODE;
  darkMode: boolean;
}
interface ActionShowCheering {
  type: typeof SHOW_CHEERING;
  ExhibitUId: string;
  showCheering: boolean;
}
interface ActionHideFollowing {
  type: typeof HIDE_FOLLOWING;
  ExhibitUId: string;
  hideFollowingValue: boolean;
}
interface ActionHideFollowers {
  type: typeof HIDE_FOLLOWERS;
  ExhibitUId: string;
  hideFollowersValue: boolean;
}
interface ActionHideAdvocates {
  type: typeof HIDE_ADVOCATES;
  ExhibitUId: string;
  hideAdvocatesValue: boolean;
}
interface ActionSetTutorialing {
  type: typeof SET_TUTORIALING;
  value: boolean;
  screen: string;
}
interface ActionSetTutorialingPrompt {
  type: typeof SET_TUTORIALING_PROMPT;
  value: boolean;
}

export type Action =
  | ActionRefreshProfile
  | ActionGetUserData
  | ActionGetSwitches
  | ActionUpdateUserProfile
  | ActionAddUserExhibit
  | ActionUpdateUserExhibit
  | ActionRemoveUserExhibit
  | ActionRemoveUserPost
  | ActionFollowUser
  | ActionUnfollowUser
  | ActionAdvocateForUser
  | ActionUnadvocateForUser
  | ActionChangeProfilePicture
  | ActionAddTempExhibitPicture
  | ActionAddTempPostPicture
  | ActionChangeExhibitPicture
  | ActionAddUserPost
  | ActionUpdateAllPosts
  | ActionGetUserFeed
  | ActionCheerPost
  | ActionCheerUpdatePosts
  | ActionCheerOwnFeedPost
  | ActionCheerOwnProfilePost
  | ActionUncheerPost
  | ActionUncheerUpdatePosts
  | ActionUncheerOwnFeedPost
  | ActionUncheerOwnProfilePost
  | ActionChangeProfileColumns
  | ActionChangeExhibitColumns
  | ActionGetUpdates
  | ActionResetScroll
  | ActionOnScreen
  | ActionOffScreen
  | ActionShowcaseProfile
  | ActionReturnFromShowcasing
  | ActionHideProfileFooter
  | ActionSetDarkMode
  | ActionShowCheering
  | ActionHideFollowing
  | ActionHideFollowers
  | ActionHideAdvocates
  | ActionSetTutorialing
  | ActionSetTutorialingPrompt;
