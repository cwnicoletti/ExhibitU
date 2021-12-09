import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AnimatedGradient } from "../../custom/AnimatedGradient/AnimatedGradient";

const ExploreUserTitle = (props) => {
  const sourceImg = props.imgSource
    ? { uri: props.imgSource }
    : require("../../../assets/default-profile-icon.jpg");

  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);

  return (
    <View style={styles.userTitleContainer}>
      {profileImageIsLoading && (
        <AnimatedGradient
          style={styles.loadingGradient}
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
          setProfileImageIsLoading(false);
        }}
      />
      <Text style={props.fullnameStyle}>{props.fullname}</Text>
      {props.jobTitle && (
        <Text style={props.jobTitleStyle}>{props.jobTitle}</Text>
      )}
      {props.username && (
        <Text style={props.usernameStyle}>{props.username}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  loadingGradient: {
    top: 0,
    position: "absolute",
    zIndex: 3,
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },

  showCaseLocalImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
});

export default ExploreUserTitle;
