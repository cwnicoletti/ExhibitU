import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { resetScroll, onScreen } from "../../store/actions/user";

const ExploreTab = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const onExploreScreen = useSelector((state) => state.user.onExploreScreen);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Feed");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              paddingBottom: 35,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-home"
              size={25}
              color={
                props.navigation.isFocused()
                  ? "gray"
                  : [darkModeValue ? "white" : "black"]
              }
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (onExploreScreen) {
              dispatch(resetScroll("Explore"));
            } else {
              dispatch(onScreen("Explore"));
            }
            props.navigation.navigate("Explore");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              paddingBottom: 35,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-search"
              size={25}
              color={darkModeValue ? "white" : "black"}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              paddingBottom: 35,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons
              name="trophy"
              size={25}
              color={
                props.navigation.isFocused()
                  ? "gray"
                  : [darkModeValue ? "white" : "black"]
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExploreTab;
