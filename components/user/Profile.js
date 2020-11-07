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
    marginTop: 10
  },
  secondContainer: {
    flexDirection: "row",
  },
  thirdContainer: {
    marginRight: 30,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
});

export default Profile;
