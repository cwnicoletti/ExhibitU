import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { resetScroll, onScreen } from "../../store/actions/user";
import { useAppSelector, useAppDispatch } from "react-redux";

const Explore = (props) => {
  const dispatch = useAppDispatch();
  const onExploreScreen = useAppSelector((state) => state.user.onExploreScreen);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.isCurrentScreen) {
          if (onExploreScreen) {
            dispatch(resetScroll("Explore"));
          } else {
            dispatch(onScreen("Explore"));
          }
          props.parentProps.navigation.navigate("Explore");
        } else {
          props.parentProps.navigation.navigate("Explore");
        }
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
          borderTopWidth: 1,
          borderColor: "gray",
          backgroundColor: props.darkModeValue ? "black" : "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="ios-search"
          size={25}
          color={
            props.isCurrentScreen
              ? props.darkModeValue
                ? "white"
                : "black"
              : props.parentProps.navigation.isFocused()
              ? "gray"
              : [props.darkModeValue ? "white" : "black"]
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Explore;
