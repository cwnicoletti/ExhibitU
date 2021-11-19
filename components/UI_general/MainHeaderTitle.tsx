import React from "react";
import { StyleSheet, Text } from "react-native";

const MainHeaderTitle = (props) => {
  return (
    <Text
      style={{
        ...styles.titleText,
        color: props.darkModeValue ? "white" : "black",
        fontFamily: props.fontFamily,
      }}
    >
      {props.titleName}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 26,
  },
});

export default MainHeaderTitle;
