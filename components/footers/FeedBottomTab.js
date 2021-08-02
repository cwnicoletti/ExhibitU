import React from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import MainBottomTabContainer from "../footers_components/MainBottomTabContainer";

const FeedBottomTab = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const onFeedScreen = useAppSelector((state) => state.user.onFeedScreen);

  return (
    <View>
      <MainBottomTabContainer
        parentProps={props}
        darkModeValue={darkModeValue}
        screen={"Feed"}
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

export default FeedBottomTab;
