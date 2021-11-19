import React from "react";
import { Animated, View } from "react-native";
import { useAppSelector } from "../../hooks";
import MainBottomTabContainer from "./footers_components/MainBottomTabContainer";

const ProfileBottomTab = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const showcasingProfile = useAppSelector(
    (state) => state.user.showcasingProfile
  );

  return (
    <View>
      {!showcasingProfile ? (
        <Animated.View>
          <MainBottomTabContainer
            parentProps={props}
            darkModeValue={darkModeValue}
            screen={"Profile"}
          />
          <View
            style={{
              padding: 8,
              backgroundColor: darkModeValue ? "black" : "white",
            }}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default ProfileBottomTab;
