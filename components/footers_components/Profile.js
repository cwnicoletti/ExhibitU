import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { resetScroll, onScreen } from "../../store/actions/user";
import { useSelector, useDispatch } from "react-redux";

const Explore = (props) => {
  const dispatch = useDispatch();
  const onProfileScreen = useSelector((state) => state.user.onProfileScreen);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.isCurrentScreen) {
          if (onProfileScreen) {
            dispatch(resetScroll("Profile"));
          } else {
            dispatch(onScreen("Profile"));
          }
          props.parentProps.navigation.navigate("Profile");
        } else {
          props.parentProps.navigation.navigate("Profile");
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
        <SimpleLineIcons
          name="trophy"
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
