import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../../hooks";
import MainBottomTabContainer from "./footers_components/MainBottomTabContainer";

const ExploreBottomTab = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  return (
    <View>
      <MainBottomTabContainer
        parentProps={props}
        darkModeValue={darkModeValue}
        screen={"Explore"}
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

export default ExploreBottomTab;
