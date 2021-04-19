import React from "react";
import { useDispatch } from "react-redux";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";

import ProfileScreen from "../screens/profile/ProfileScreen";
import ShowcaseSettingsScreen from "../screens/drawers/ShowcaseSettingsScreen";
import VoteUpdatesSettingsScreen from "../screens/drawers/VoteUpdatesSettingsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SignupOrLoginScreen from "../screens/auth/SignupOrLoginScreen";
import SignupScreen1 from "../screens/auth/SignupScreen1";
import SignupScreen2 from "../screens/auth/SignupScreen2";
import SignupScreen3 from "../screens/auth/SignupScreen3";
import SignupScreen4 from "../screens/auth/SignupScreen4";
import IntroScreen from "../screens/auth/IntroScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import StartupScreen from "../screens/StartupScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";
import ExploreFollowersScreen from "../screens/explore/ExploreFollowersScreen";
import ExploreFollowingScreen from "../screens/explore/ExploreFollowingScreen";
import ExploreAdvocatesScreen from "../screens/explore/ExploreAdvocatesScreen";
import ExploreProfileScreen from "../screens/explore/ExploreProfileScreen";
import ExploreProjectScreen from "../screens/explore/ExploreProjectScreen";
import ExplorePictureScreen from "../screens/explore/ExplorePictureScreen";
import ExploreCheeringScreen from "../screens/explore/ExploreCheeringScreen";
import FeedScreen from "../screens/feed/FeedScreen";
import FeedCommentsScreen from "../screens/feed/FeedCommentsScreen";
import FeedCheeringScreen from "../screens/feed/FeedCheeringScreen";
import FeedProfileScreen from "../screens/feed/FeedProfileScreen";
import FeedProjectScreen from "../screens/feed/FeedProjectScreen";
import FeedAdvocatesScreen from "../screens/feed/FeedAdvocatesScreen";
import FeedFollowersScreen from "../screens/feed/FeedFollowersScreen";
import FeedFollowingScreen from "../screens/feed/FeedFollowingScreen";
import ProjectScreen from "../screens/profile/ProjectScreen";
import AddProjectScreen from "../screens/profile/AddProjectScreen";
import AddPictureScreen from "../screens/profile/AddPictureScreen";
import EditProjectScreen from "../screens/profile/EditProjectScreen";
import AdvocatesScreen from "../screens/profile/AdvocatesScreen";
import FollowersScreen from "../screens/profile/FollowersScreen";
import FollowingScreen from "../screens/profile/FollowingScreen";
import PictureScreen from "../screens/profile/PictureScreen";
import CheeringScreen from "../screens/profile/CheeringScreen";
import ShowcaseProfileScreen from "../screens/profile/ShowcaseProfileScreen";
import ShowcaseProjectScreen from "../screens/profile/ShowcaseProjectScreen";
import ShowcasePictureScreen from "../screens/profile/ShowcasePictureScreen";

import LeftDrawer from "../components/drawers/LeftDrawer";
import RightDrawer from "../components/drawers/RightDrawer";

import FeedBottomTab from "../components/footers/FeedBottomTab";
import ExploreBottomTab from "../components/footers/ExploreBottomTab";
import ProfileBottomTab from "../components/footers/ProfileBottomTab";

import ProfileHeader from "../components/headers/ProfileHeader";
import TitleOnlyHeader from "../components/headers/TitleOnlyHeader";

import { logout } from "../store/actions/auth";

const FeedandViewNavigator = createStackNavigator(
  {
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
  }
);

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
      const dispatch = useDispatch();
      return (
        <RightDrawer
          navData={navData}
          component={FeedNavigator}
          showcaseOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("ShowcaseSettings");
          }}
          updatesOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Updates");
          }}
          feedbackOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Feedback");
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

const ExploreNavigator = createStackNavigator(
  {
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
  }
);

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
      const dispatch = useDispatch();
      return (
        <RightDrawer
          navData={navData}
          component={ProfileNavigator}
          showcaseOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("ShowcaseSettings");
          }}
          updatesOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Updates");
          }}
          feedbackOnPress={() => {
            navData.navigation.closeRightDrawer();
            navData.navigation.navigate("Feedback");
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
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: () => ({
      tabBarComponent: ({ navigation }) => {
        return <ProfileBottomTab navigation={navigation} />;
      },
    }),
  },
};

const FullAppNavigator = createBottomTabNavigator(tabScreenConfig, {
  lazy: false,
});

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
  StartAuth: StartSignup,
  Intro: IntroStack,
  Project: FullAppNavigator,
});

export default createAppContainer(MainNavigator);
