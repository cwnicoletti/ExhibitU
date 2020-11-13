import React, { useEffect } from "react";
import { Button, StyleSheet, FlatList, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct } from "../../store/actions/projects";

const NotificationsSettingsScreen = (props) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "desctructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProjects.length === 0) {
    return (
      <View
        style={{
          ...styles.screen,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: darkModeValue ? "white" : "black",
          }}
        >
          AHHHHHHHHHHHHHHHHHHHHHHHH
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    ></View>
  );
};

NotificationsSettingsScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: "Notification Settings",
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
});

export default NotificationsSettingsScreen;
