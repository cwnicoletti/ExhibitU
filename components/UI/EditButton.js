import React from "react";
import {
    Platform, StyleSheet, Text,


    TouchableNativeFeedback, TouchableOpacity, View
} from "react-native";
import { useSelector } from "react-redux";

const EditButton = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onPress}>
      <View
        style={{
          marginTop: 10,
          marginBottom: 5,
          paddingHorizontal: "20%",
          borderColor: darkModeValue ? "gray" : "#c9c9c9",
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 7,
            color: darkModeValue ? "white" : "black",
          }}
        >
          {props.editText}
        </Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({});

export default EditButton;
