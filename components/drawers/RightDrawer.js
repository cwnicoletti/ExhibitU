import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const RightDrawer = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    props.navData.navigation.setParams({ darkMode: darkModeValue });

    // Calling navigation options within useEffect since to
    // make sure it is called once darkModeValue is defined
    props.component.navigationOptions = (navData) => {
      const darkModeValue = navData.navigation.getParam("darkMode");
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
    <View forceInset={{ top: "always", horizontal: "never" }}
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
            margin: 10,
          }}
        >
          <Entypo name="notification" size={20} color="#007AFF" />
          <Button title="Notifications" onPress={props.notificationsOnPress} />
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 10,
        }}
      >
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              title="Logout"
              color="#007AFF"
              onPress={props.logoutOnPress}
            />
            <MaterialCommunityIcons name="logout" size={20} color="#007AFF" />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RightDrawer;
