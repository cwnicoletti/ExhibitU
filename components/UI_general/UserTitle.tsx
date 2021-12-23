import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";

const UserTitle = (props) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);
  const sourceImg: string | any = props.imgSource
    ? { uri: props.imgSource }
    : require("../../assets/default-profile-icon.jpg");

  return (
    <View style={styles.container}>
      {imageIsLoading && (
        <AnimatedGradient
          style={styles.gradient}
          colors={greyColorValues}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )}
      <Image
        style={{ ...styles.showCaseLocalImage, ...props.style }}
        source={sourceImg}
        onLoadStart={() => {
          setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
        }}
        onLoadEnd={() => {
          setImageIsLoading(false);
        }}
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  gradient: {
    top: 0,
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    position: "absolute",
    zIndex: 3,
  },

  showCaseLocalImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
});

export default UserTitle;
