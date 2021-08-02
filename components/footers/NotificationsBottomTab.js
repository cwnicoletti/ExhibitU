import React from "react";
import { View } from "react-native";
import { useAppSelector } from "react-redux";
import MainBottomTabContainer from "../footers_components/MainBottomTabContainer";

const NotificationBottomTab = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  return (
    <View>
      <MainBottomTabContainer
        parentProps={props}
        darkModeValue={darkModeValue}
        screen={"Notifications"}
      />
      <View
        style={{
          padding: 8,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
    </View>
  );
};

export default NotificationBottomTab;
