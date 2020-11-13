import React from "react";
import { useDispatch } from "react-redux";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import ProfileScreen from "../screens/profile/ProfileScreen";
import NotificationsSettingsScreen from "../screens/profile/NotificationsSettingsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SignupOrLoginScreen from "../screens/auth/SignupOrLoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import StartupScreen from "../screens/StartupScreen";
import ExploreScreen from "../screens/feed/ExploreScreen";
import UserFeedScreen from "../screens/feed/UserFeedScreen";
import ProjectScreen from "../screens/profile/ProjectScreen";

import LeftDrawer from "../components/drawers/LeftDrawer";
import RightDrawer from "../components/drawers/RightDrawer";

import { logout } from "../store/actions/auth";

const FeedandViewNavigator = createStackNavigator({
  Feed: UserFeedScreen,
  ViewFeedProject: ProjectScreen,
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
      return <RightDrawer navData={navData} component={FeedNavigator} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openRightDrawer: () => DrawerActions.openDrawer({ key }),
      closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const ExploreNavigator = createStackNavigator({
  Explore: ExploreScreen,
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

const ExplorerNavigator = createDrawerNavigator(
  {
    RightDrawer: RightExploreDrawerNavigator,
  },
  {
    drawerPosition: "right",
    contentComponent: (navData) => {
      return <RightDrawer navData={navData} component={ExplorerNavigator} />;
    },
    getCustomActionCreators: (_route, key) => ({
      openRightDrawer: () => DrawerActions.openDrawer({ key }),
      closeRightDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleRightDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const ProfileandSettingsNavigator = createStackNavigator({
  Profile: ProfileScreen,
  ViewProfileProject: ProjectScreen,
  EditProfile: EditProfileScreen,
  NotificationsSettings: NotificationsSettingsScreen,
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
          notificationsOnPress={() => {
            navData.navigation.navigate("NotificationsSettings");
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
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
    },
  },
  Explore: {
    screen: ExplorerNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <SimpleLineIcons name="trophy" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
};

const FullAppNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig)
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "black",
          inactiveTintColor: "#bfbfbf",
          tabStyle: {
            backgroundColor: "white",
          },
          style: {
            backgroundColor: "white",
          },
          showLabel: false,
        },
      });

const StartAuthNavigator = createStackNavigator({
  SignupOrLogin: SignupOrLoginScreen,
  Signup: SignupScreen,
  Login: LoginScreen,
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  StartAuth: StartAuthNavigator,
  Project: FullAppNavigator,
});

export default createAppContainer(MainNavigator);
