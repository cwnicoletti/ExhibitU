import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Caption = (props) => {
  return (
    <View style={{ ...styles.container, ...props.captionContainer }}>
      <Text style={{ ...styles.caption, ...props.captionStyle }}>
        {props.caption}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  caption: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: "10%",
    fontSize: 13,
  },
});

export default Caption;
