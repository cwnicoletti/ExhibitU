import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Profile = (props) => {
  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <View style={{ ...styles.secondContainer }}>
        <View style={{ ...styles.thirdContainer }}>
          <Text style={props.titleStyle}>{props.title}</Text>
          <Text style={props.usernameStyle}>{props.username}</Text>
        </View>
        <Image
          style={{ ...styles.image, ...props.style }}
          source={props.imgSource}
        />
      </View>
      <Text style={props.descriptionStyle}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
  },
  thirdContainer: {
    marginRight: 30,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
  },
});

export default Profile;
