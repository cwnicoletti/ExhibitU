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
import SignupScreen4 from "../screens/auth/SignupScreen4";

import ShowcaseSettingsScreen from "../screens/drawers/ShowcaseSettingsScreen";
import VoteUpdatesSettingsScreen from "../screens/drawers/VoteUpdatesSettingsScreen";

import ExploreAdvocatesScreen from "../screens/explore/ExploreAdvocatesScreen";
import ExploreCheeringScreen from "../screens/explore/ExploreCheeringScreen";
import ExploreFollowersScreen from "../screens/explore/ExploreFollowersScreen";
import ExploreFollowingScreen from "../screens/explore/ExploreFollowingScreen";
import ExplorePictureScreen from "../screens/explore/ExplorePictureScreen";
import ExploreProfileScreen from "../screens/explore/ExploreProfileScreen";
import ExploreProjectScreen from "../screens/explore/ExploreProjectScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";

import FeedAdvocatesScreen from "../screens/feed/FeedAdvocatesScreen";
import FeedCheeringScreen from "../screens/feed/FeedCheeringScreen";
import FeedCommentsScreen from "../screens/feed/FeedCommentsScreen";
import FeedFollowersScreen from "../screens/feed/FeedFollowersScreen";
import FeedFollowingScreen from "../screens/feed/FeedFollowingScreen";
import FeedProfileScreen from "../screens/feed/FeedProfileScreen";
import FeedProjectScreen from "../screens/feed/FeedProjectScreen";
import FeedScreen from "../screens/feed/FeedScreen";

import AddPictureScreen from "../screens/profile/AddPictureScreen";
import AddProjectScreen from "../screens/profile/AddProjectScreen";
import AdvocatesScreen from "../screens/profile/AdvocatesScreen";
import CheeringScreen from "../screens/profile/CheeringScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import EditProjectScreen from "../screens/profile/EditProjectScreen";
import FollowersScreen from "../screens/profile/FollowersScreen";
import FollowingScreen from "../screens/profile/FollowingScreen";
import PictureScreen from "../screens/profile/PictureScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProjectScreen from "../screens/profile/ProjectScreen";
import ShowcasePictureScreen from "../screens/profile/ShowcasePictureScreen";
import ShowcaseProfileScreen from "../screens/profile/ShowcaseProfileScreen";
import ShowcaseProjectScreen from "../screens/profile/ShowcaseProjectScreen";

import NotificationsScreen from "../screens/notifications/NotificationsScreen";

import ProfileBottomTab from "../components/footers/ProfileBottomTab";
import NotificationsBottomTab from "../components/footers/NotificationsBottomTab";
import FeedBottomTab from "../components/footers/FeedBottomTab";
import ExploreBottomTab from "../components/footers/ExploreBottomTab";
import StartupScreen from "../screens/StartupScreen";
import { logout } from "../store/actions/auth/auth";
import { setTutorialing } from "../store/actions/user/user";

const FeedandViewNavigator = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => <TitleOnlyHeader navigation={navigation} />,
    }),
  },
  ViewCheering: FeedCheeringScreen,
  ViewComments: FeedCommentsScreen,
  ViewProfile: FeedProfileScreen,
  ViewFollowers: FeedFollowersScreen,
  ViewFollowing: FeedFollowingScreen,
  ViewAdvocates: FeedAdvocatesScreen,
  ViewFeedProject: FeedProjectScreen,
  ViewFeedProfileProject: FeedProjectScreen,
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
          tutorialOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Project");
            dispatch(setTutorialing(localId, ExhibitUId, true, "Start"));
          }}
          logoutOnPress={() => {
            dispatch(logout());
            navData.navigation.navigate("StartAuth");
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
  ViewExploredProfileProject: ExploreProjectScreen,
  ViewExploredProfileProjectPicture: ExplorePictureScreen,
  ExploreCheering: ExploreCheeringScreen,
  ExploreFollowers: ExploreFollowersScreen,
  ExploreFollowing: ExploreFollowingScreen,
  ExploreAdvocates: ExploreAdvocatesScreen,
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
  ViewProfileProject: ProjectScreen,
  PictureScreen: PictureScreen,
  ShowcaseProfile: ShowcaseProfileScreen,
  ShowcaseProject: ShowcaseProjectScreen,
  ShowcasePictureScreen: ShowcasePictureScreen,
  EditProfile: EditProfileScreen,
  ShowcaseSettings: ShowcaseSettingsScreen,
  Updates: VoteUpdatesSettingsScreen,
  Advocates: AdvocatesScreen,
  Following: FollowingScreen,
  Followers: FollowersScreen,
  AddProject: AddProjectScreen,
  CheeringScreen: CheeringScreen,
  EditProjectScreen: EditProjectScreen,
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
          tutorialOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Project");
            dispatch(setTutorialing(localId, ExhibitUId, true, "Start"));
          }}
          logoutOnPress={() => {
            dispatch(logout());
            navData.navigation.navigate("StartAuth");
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
  // Notifications: {
  //   screen: NotificationsNavigator,
  //   navigationOptions: () => ({
  //     tabBarComponent: ({ navigation }) => {
  //       return <NotificationsBottomTab navigation={navigation} />;
  //     },
  //   }),
  // },
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
  Signup4: SignupScreen4,
  Login: LoginScreen,
});

const IntroStack = createStackNavigator(
  {
    IntroScreen: IntroScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Intro: IntroStack,
  StartAuth: StartSignup,
  Project: FullAppNavigator,
});

export default createAppContainer(MainNavigator);
