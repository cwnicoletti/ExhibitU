import React, { useState, useEffect } from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
  DrawerActions,
} from "react-navigation-drawer";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  Switch,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import SignupOrLoginScreen from "../screens/auth/SignupOrLoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import StartupScreen from "../screens/StartupScreen";
import ExploreScreen from "../screens/feed/ExploreScreen";
import UserFeedScreen from "../screens/feed/UserFeedScreen";

import { logout } from "../store/actions/auth";
import { setDarkMode } from "../store/actions/darkMode";

const FilterSwitch = (props) => {
  return (
    <View style={{ ...props.viewStyle }}>
      <Text style={{ ...props.labelStyle }}>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.onChange}></Switch>
    </View>
  );
};

const ProfileNavigator = createStackNavigator({
  Profile: ProfileScreen,
  Settings: SettingsScreen,
});

const ProjectNavigator = createDrawerNavigator(
  {
    "My Profile": ProfileNavigator,
  },
  {
    drawerPosition: "left",
    contentComponent: (props) => {
      const dispatch = useDispatch();

      const darkModeValue = useSelector((state) => state.darkMode.darkMode);

      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: darkModeValue ? "black" : "white",
            borderRightWidth: 0.3,
            borderRightColor: darkModeValue ? "white" : "black",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: darkModeValue ? "white" : "black",
            }}
          >
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                  source={require("../assets/me.png")}
                />
                <Text
                  style={{
                    color: darkModeValue ? "white" : "black",
                    margin: 10,
                  }}
                >
                  Christian Nicoletti
                </Text>
              </View>
            </SafeAreaView>
          </View>
          <View>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerNavigatorItems {...props} />
            </SafeAreaView>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <SafeAreaView>
              <FilterSwitch
                viewStyle={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                labelStyle={{
                  color: darkModeValue ? "white" : "black",
                }}
                label="Dark Mode"
                state={darkModeValue}
                onChange={(newValue) => {
                  dispatch(setDarkMode(newValue));
                }}
              />
            </SafeAreaView>
          </View>
        </View>
      );
    },
    getCustomActionCreators: (_route, key) => ({
      openLeftDrawer: () => DrawerActions.openDrawer({ key }),
      closeLeftDrawer: () => DrawerActions.closeDrawer({ key }),
      toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key }),
    }),
  }
);

const SettingsNavigator = createDrawerNavigator(
  {
    Projects: ProjectNavigator,
  },
  {
    drawerPosition: "right",
    contentComponent: (props) => {
      const dispatch = useDispatch();
      const darkModeValue = useSelector((state) => state.darkMode.darkMode);

      useEffect(() => {
        props.navigation.setParams({ darkMode: darkModeValue });

        // Calling navigation options within useEffect since to
        // make sure it is called once darkModeValue is defined
        SettingsNavigator.navigationOptions = (navData) => {
          const darkModeValue = navData.navigation.getParam("darkMode");
          console.log(`testing: ${darkModeValue}`);
          return {
            tabBarOptions: {
              activeTintColor: darkModeValue ? "white" : "black",
              inactiveTintColor: darkModeValue ? "#696969" : "#bfbfbf",
              tabStyle: {
                backgroundColor: darkModeValue ? "black" : "white",
              },
              style: {
                backgroundColor: darkModeValue ? "black" : "white",
              },
              showLabel: false,
            },
          };
        };
      }, [darkModeValue]);

      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: darkModeValue ? "black" : "white",
            borderLeftWidth: 0.3,
            borderLeftColor: darkModeValue ? "white" : "black",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: darkModeValue ? "white" : "black",
            }}
          >
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Ionicons
                  name="ios-settings"
                  size={20}
                  color={darkModeValue ? "white" : "black"}
                />
                <Text
                  style={{
                    color: darkModeValue ? "white" : "black",
                    margin: 10,
                    fontSize: 20,
                  }}
                >
                  Settings
                </Text>
              </View>
            </SafeAreaView>
          </View>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="edit" size={20} color="#007AFF" />
              <Button
                title="Edit Showcase"
                onPress={() => {
                  props.navigation.navigate("Settings");
                }}
              />
            </View>
          </SafeAreaView>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  title="Logout"
                  color="#007AFF"
                  onPress={() => {
                    dispatch(logout());
                    props.navigation.navigate("StartAuth");
                  }}
                />
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color="#007AFF"
                />
              </View>
            </SafeAreaView>
          </View>
        </View>
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
    screen: UserFeedScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
    },
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Profile: {
    screen: SettingsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />
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
