import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const LinkButton = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.linkContainer }}
      onPress={props.onPress}
    >
      <EvilIcons
        name="link"
        size={18}
        color={darkModeValue ? "white" : "black"}
      />
      <Text style={{ ...styles.textStyle }} adjustsFontSizeToFit={true}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 14,
    margin: 10,
    marginLeft: 5,
    color: "#24a0ed",
  },
});

export default LinkButton;
