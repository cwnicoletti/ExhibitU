import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { useAppDispatch, useAppSelector } from "../hooks";
import LeftDrawer from "../components/drawers/LeftDrawer";
import RightDrawer from "../components/drawers/RightDrawer";
import ProfileHeader from "../components/headers/ProfileHeader";
import TitleOnlyHeader from "../components/headers/TitleOnlyHeader";

import IntroScreen from "../screens/auth/IntroScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupOrLoginScreen from "../screens/auth/SignupOrLoginScreen";
import SignupScreen1 from "../screens/auth/SignupScreen1";
import SignupScreen2 from "../screens/auth/SignupScreen2";
import SignupScreen3 from "../screens/auth/SignupScreen3";
import PhotoPermissionsScreen from "../screens/auth/PhotoPermissionsScreen";
import NotificationPermissionsScreen from "../screens/auth/NotificationPermissionsScreen";
import SignupScreen4 from "../screens/auth/SignupScreen4";

import ShowcaseSettingsScreen from "../screens/drawers/ShowcaseSettingsScreen";
import VoteUpdatesSettingsScreen from "../screens/drawers/VoteUpdatesSettingsScreen";

import ExploreCheeringScreen from "../screens/explore/ExploreCheeringScreen";
import ExploreFollowersScreen from "../screens/explore/ExploreFollowersScreen";
import ExploreFollowingScreen from "../screens/explore/ExploreFollowingScreen";
import ExplorePictureScreen from "../screens/explore/ExplorePictureScreen";
import ExploreProfileScreen from "../screens/explore/ExploreProfileScreen";
import ExploreExhibitScreen from "../screens/explore/ExploreExhibitScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";

import FeedCheeringScreen from "../screens/feed/FeedCheeringScreen";
import FeedPictureScreen from "../screens/feed/FeedPictureScreen";
import FeedFollowersScreen from "../screens/feed/FeedFollowersScreen";
import FeedFollowingScreen from "../screens/feed/FeedFollowingScreen";
import FeedProfileScreen from "../screens/feed/FeedProfileScreen";
import FeedExhibitScreen from "../screens/feed/FeedExhibitScreen";
import FeedScreen from "../screens/feed/FeedScreen";

import AddPictureScreen from "../screens/profile/AddPictureScreen";
import AddExhibitScreen from "../screens/profile/AddExhibitScreen";
import CheeringScreen from "../screens/profile/CheeringScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import EditExhibitScreen from "../screens/profile/EditExhibitScreen";
import FollowersScreen from "../screens/profile/FollowersScreen";
import FollowingScreen from "../screens/profile/FollowingScreen";
import PictureScreen from "../screens/profile/PictureScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ExhibitScreen from "../screens/profile/ExhibitScreen";
import ShowcasePictureScreen from "../screens/profile/ShowcasePictureScreen";
import ShowcaseProfileScreen from "../screens/profile/ShowcaseProfileScreen";
import ShowcaseExhibitScreen from "../screens/profile/ShowcaseExhibitScreen";

import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import NotificationsProfileScreen from "../screens/notifications/NotificationsProfileScreen";
import NotificationsExhibitScreen from "../screens/notifications/NotificationsExhibitScreen";
import NotificationsPictureScreen from "../screens/notifications/NotificationsPictureScreen";
import NotificationsFollowingScreen from "../screens/notifications/NotificationsFollowingScreen";
import NotificationsFollowersScreen from "../screens/notifications/NotificationsFollowersScreen";
import NotificationsCheeringScreen from "../screens/notifications/NotificationsCheeringScreen";

import ProfileBottomTab from "../components/footers/ProfileBottomTab";
import NotificationsBottomTab from "../components/footers/NotificationsBottomTab";
import FeedBottomTab from "../components/footers/FeedBottomTab";
import ExploreBottomTab from "../components/footers/ExploreBottomTab";
import StartupScreen from "../screens/StartupScreen";
import { logout } from "../store/actions/auth/auth";

const FeedandViewNavigator = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => <TitleOnlyHeader navigation={navigation} />,
    }),
  },
  ViewCheering: FeedCheeringScreen,
  ViewFeedPicture: FeedPictureScreen,
  ViewProfile: FeedProfileScreen,
  ViewFollowers: FeedFollowersScreen,
  ViewFollowing: FeedFollowingScreen,
  ViewFeedExhibit: FeedExhibitScreen,
  ViewFeedProfileExhibit: FeedExhibitScreen,
});

const RightFeedDrawerNavigator = createDrawerNavigator(
  {
    "My Profile": FeedandViewNavigator,
  },
  {
    drawerPosition: "left",
    contentComponent: (navData) => {
      return <LeftDrawer navData={navData} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openLeftDrawer: () => DrawerActions.openDrawer({ key }),
      closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const FeedNavigator = createDrawerNavigator(
  {
    RightDrawer: RightFeedDrawerNavigator,
  },
  {
    drawerPosition: "right",
    contentComponent: (navData) => {
      const dispatch = useAppDispatch();
      const localId = useAppSelector((state) => state.auth.userId);
      const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
      return (
        <RightDrawer
          navData={navData}
          component={FeedNavigator}
          ShowcaseOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("ShowcaseSettings");
          }}
          updatesOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Updates");
          }}
          logoutOnPress={() => {
            dispatch(logout());
            navData.navigation.navigate("SignupOrLogin");
          }}
        />
      );
    },
    getCustomActionCreators: (_route, key) => ({
      openRightDrawer: () => DrawerActions.openDrawer({ key }),
      closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const ExploreNavigator = createStackNavigator({
  Explore: {
    screen: ExploreScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => <TitleOnlyHeader navigation={navigation} />,
    }),
  },
  ExploreProfile: ExploreProfileScreen,
  ViewExploredProfileExhibit: ExploreExhibitScreen,
  ViewExploredProfileExhibitPicture: ExplorePictureScreen,
  ExploreCheering: ExploreCheeringScreen,
  ExploreFollowers: ExploreFollowersScreen,
  ExploreFollowing: ExploreFollowingScreen,
});

const RightExploreDrawerNavigator = createDrawerNavigator(
  {
    "My Profile": ExploreNavigator,
  },
  {
    drawerPosition: "left",
    contentComponent: (navData) => {
      return <LeftDrawer navData={navData} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openLeftDrawer: () => DrawerActions.openDrawer({ key }),
      closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const ExplorerNavigator = createDrawerNavigator({
  RightDrawer: RightExploreDrawerNavigator,
});

const NotificationNavigator = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => <TitleOnlyHeader navigation={navigation} />,
    }),
  },
  NotificationsProfile: NotificationsProfileScreen,
  ViewNotificationsProfileExhibit: NotificationsExhibitScreen,
  ViewNotificationsProfileExhibitPicture: NotificationsPictureScreen,
  NotificationsFollowing: NotificationsFollowingScreen,
  NotificationsFollowers: NotificationsFollowersScreen,
  NotificationsCheering: NotificationsCheeringScreen,
});

const RightNotificationsDrawerNavigator = createDrawerNavigator(
  {
    "My Profile": NotificationNavigator,
  },
  {
    drawerPosition: "left",
    contentComponent: (navData) => {
      return <LeftDrawer navData={navData} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openLeftDrawer: () => DrawerActions.openDrawer({ key }),
      closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const NotificationsNavigator = createDrawerNavigator({
  RightDrawer: RightNotificationsDrawerNavigator,
});

const ProfileandSettingsNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => <ProfileHeader navigation={navigation} />,
    }),
  },
  ViewProfileExhibit: ExhibitScreen,
  PictureScreen: PictureScreen,
  ShowcaseProfile: ShowcaseProfileScreen,
  ShowcaseExhibit: ShowcaseExhibitScreen,
  ShowcasePictureScreen: ShowcasePictureScreen,
  EditProfile: EditProfileScreen,
  ShowcaseSettings: ShowcaseSettingsScreen,
  Updates: VoteUpdatesSettingsScreen,
  Following: FollowingScreen,
  Followers: FollowersScreen,
  AddExhibit: AddExhibitScreen,
  CheeringScreen: CheeringScreen,
  EditExhibitScreen: EditExhibitScreen,
  AddPicture: AddPictureScreen,
});

const RightProfileDrawerNavigator = createDrawerNavigator(
  {
    "My Profile": ProfileandSettingsNavigator,
  },
  {
    drawerPosition: "left",
    contentComponent: (navData) => {
      return <LeftDrawer navData={navData} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openLeftDrawer: () => DrawerActions.openDrawer({ key }),
      closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const ProfileNavigator = createDrawerNavigator(
  {
    RightDrawer: RightProfileDrawerNavigator,
  },
  {
    drawerPosition: "right",
    contentComponent: (navData) => {
      const dispatch = useAppDispatch();
      const localId = useAppSelector((state) => state.auth.userId);
      const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
      return (
        <RightDrawer
          navData={navData}
          component={ProfileNavigator}
          ShowcaseOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("ShowcaseSettings");
          }}
          updatesOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Updates");
          }}
          logoutOnPress={() => {
            dispatch(logout());
            navData.navigation.navigate("SignupOrLogin");
          }}
        />
      );
    },
    getCustomActionCreators: (_route, key) => ({
      openRightDrawer: () => DrawerActions.openDrawer({ key }),
      closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const tabScreenConfig = {
  Feed: {
    screen: FeedNavigator,
    navigationOptions: () => ({
      tabBarComponent: ({ navigation }) => {
        return <FeedBottomTab navigation={navigation} />;
      },
    }),
  },
  Explore: {
    screen: ExplorerNavigator,
    navigationOptions: () => ({
      tabBarComponent: ({ navigation }) => {
        return <ExploreBottomTab navigation={navigation} />;
      },
    }),
  },
  Notifications: {
    screen: NotificationsNavigator,
    navigationOptions: () => ({
      tabBarComponent: ({ navigation }) => {
        return <NotificationsBottomTab navigation={navigation} />;
      },
    }),
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: () => ({
      tabBarComponent: ({ navigation }) => {
        return <ProfileBottomTab navigation={navigation} />;
      },
    }),
  },
};

const FullAppNavigator = createBottomTabNavigator(tabScreenConfig);

const StartSignup = createStackNavigator({
  SignupOrLogin: SignupOrLoginScreen,
  Signup1: SignupScreen1,
  Signup2: SignupScreen2,
  Signup3: SignupScreen3,
  SignupPhotoPermissions: PhotoPermissionsScreen,
  SignupNotificationPermissions: NotificationPermissionsScreen,
  Signup4: SignupScreen4,
  Login: LoginScreen,
});

const Permissions = createStackNavigator({
  SignupPhotoPermissions: PhotoPermissionsScreen,
  SignupNotificationPermissions: NotificationPermissionsScreen,
});

const IntroStack = createStackNavigator(
  {
    IntroScreen: IntroScreen,
  },
  {
    headerMode: "none",
    headerShown: false,
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const MainNavigator = createStackNavigator({
  Intro: {
    screen: IntroStack,
    navigationOptions: {
      headerMode: "none",
      headerShown: false,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  StartAuth: {
    screen: StartSignup,
    navigationOptions: {
      headerMode: "none",
      headerShown: false,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  PermissionsStack: {
    screen: Permissions,
    navigationOptions: {
      headerMode: "none",
      headerShown: false,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  Exhibit: {
    screen: FullAppNavigator,
    navigationOptions: {
      headerMode: "none",
      headerShown: false,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
});

const StartUpNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: {
      headerMode: "none",
      headerShown: false,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
});

export default createAppContainer(StartUpNavigator);
