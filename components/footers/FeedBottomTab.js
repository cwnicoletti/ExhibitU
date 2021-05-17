import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import Feed from "../footers_components/Feed";

const FeedBottomTab = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Feed
          parentProps={props}
          darkModeValue={darkModeValue}
          isFeedScreen={true}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Explore");
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
            props.navigation.navigate("Profile");
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
                props.navigation.isFocused()
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

export default FeedBottomTab;
