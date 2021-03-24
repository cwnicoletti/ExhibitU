import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

const ExploreUserTitle = (props) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ ...styles.showCaseLocalImage, ...props.style }}
        source={
          props.imgSource
            ? { uri: props.imgSource }
            : require("../../assets/default-profile-icon.jpg")
        }
      />
      <Text style={props.fullnameStyle}>{props.fullname}</Text>
      {props.jobTitle ? (
        <Text style={props.jobTitleStyle}>{props.jobTitle}</Text>
      ) : null}
      {props.username ? (
        <Text style={props.usernameStyle}>{props.username}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  showCaseLocalImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
});

export default ExploreUserTitle;
