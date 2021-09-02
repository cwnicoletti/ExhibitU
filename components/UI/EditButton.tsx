import React from "react";
import {
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useAppSelector } from "../../hooks";

const EditButton = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onPress}>
      <View
        style={{
          ...styles.editContainer,
          borderColor: darkModeValue ? "gray" : "#c9c9c9",
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

const styles = StyleSheet.create({
  editContainer: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: "20%",
    borderWidth: 1,
    alignItems: "center",
  },
});

export default EditButton;
