import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { resetScroll, onScreen } from "../../store/actions/user";
import { useSelector, useDispatch } from "react-redux";

const Feed = (props) => {
  const dispatch = useDispatch();
  const onFeedScreen = useSelector((state) => state.user.onFeedScreen);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.isFeedScreen) {
          if (onFeedScreen) {
            dispatch(resetScroll("Feed"));
          } else {
            dispatch(onScreen("Feed"));
          }
          props.parentProps.navigation.navigate("Feed");
        } else {
          props.parentProps.navigation.navigate("Feed");
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
          name="ios-home"
          size={25}
          color={props.darkModeValue ? "white" : "black"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Feed;
