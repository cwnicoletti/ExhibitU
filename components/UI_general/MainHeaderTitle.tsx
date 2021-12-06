import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MainHeaderTitle = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          ...styles.titleText,
          color: props.darkModeValue ? "white" : "black",
          fontFamily: props.fontFamily,
        }}
      >
        {props.titleName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 26,
  },
});

export default MainHeaderTitle;
