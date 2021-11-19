import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { AnimatedGradient } from "../../../../custom/AnimatedGradient/AnimatedGradient";

const ProfilePicture = (props) => {
  return (
    <View style={styles.container}>
      {props.profileImageIsLoading && (
        <AnimatedGradient
          style={styles.animatedGradient}
          colors={props.greyColorValues}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )}
      <Image
        style={styles.profileImage}
        source={
          props.profileImageSource
            ? { uri: props.profileImageSource }
            : require("../../../../assets/default-profile-icon.jpg")
        }
        onLoadEnd={() => {
          props.setProfileImageIsLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },

  animatedGradient: {
    position: "absolute",
    zIndex: 3,
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },

  profileImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
});

export default ProfilePicture;
