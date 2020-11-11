import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const LinkButton = (props) => {
  const imageUrl = require("../../assets/showcase_icon.png");
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.linkContainer }}
      onPress={props.onPress}
    >
      <Image
        style={{ ...styles.image, ...props.imageStyle }}
        source={{ uri: imageUrl, uri: props.imageUrl }}
      />
      <Text style={{ ...styles.textStyle, ...props.textStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: "46%",
    marginBottom: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    margin: 5,
    height: 20,
    width: 20,
  },
  textStyle: {
    fontSize: 12,
    margin: 10,
  },
});

export default LinkButton;
