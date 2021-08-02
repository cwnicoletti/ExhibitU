import React from "react";
import {
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";

const EditButton = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

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

export default EditButton;
