import React from "react";
import { View } from "react-native";
import Feed from "./Feed";
import Explore from "./Explore";
import Notifications from "./Notifications";
import Profile from "./Profile";

const MainBottomTabContainer = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Feed
        parentProps={props.parentProps}
        darkModeValue={props.darkModeValue}
        isCurrentScreen={props.screen === "Feed" ? true : false}
      />
      <Explore
        parentProps={props.parentProps}
        darkModeValue={props.darkModeValue}
        isCurrentScreen={props.screen === "Explore" ? true : false}
      />
      <Notifications
        parentProps={props.parentProps}
        darkModeValue={props.darkModeValue}
        isCurrentScreen={props.screen === "Notifications" ? true : false}
      />
      <Profile
        parentProps={props.parentProps}
        darkModeValue={props.darkModeValue}
        isCurrentScreen={props.screen === "Profile" ? true : false}
      />
    </View>
  );
};

export default MainBottomTabContainer;
