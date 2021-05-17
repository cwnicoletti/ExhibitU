import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import Feed from "../footers_components/Feed";
import Explore from "../footers_components/Explore";
import Profile from "../footers_components/Profile";

const FeedBottomTab = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Feed
          parentProps={props}
          darkModeValue={darkModeValue}
          isCurrentScreen={true}
        />
        <Explore
          parentProps={props}
          darkModeValue={darkModeValue}
          isCurrentScreen={false}
        />
        <Profile
          parentProps={props}
          darkModeValue={darkModeValue}
          isCurrentScreen={false}
        />
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
    </View>
  );
};

export default FeedBottomTab;
