import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { resetScroll, onScreen } from "../../store/actions/user";

const ExploreBottomTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const onExploreScreen = useSelector((state) => state.user.onExploreScreen);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Feed");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
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
                navigation.isFocused()
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
            navigation.navigate("Explore");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
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
            navigation.navigate("Profile");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
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
                navigation.isFocused()
                  ? "gray"
                  : [darkModeValue ? "white" : "black"]
              }
            />
          </View>
        </TouchableWithoutFeedback>
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

export default ExploreBottomTab;
