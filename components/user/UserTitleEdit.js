import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import EditButton from "../UI/EditButton";

const UserTitleEdit = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: "100%" }}
    >
      <View style={{ ...styles.secondContainer }}>
        <View style={{ ...styles.thirdContainer }}>
          <Text style={props.fullnameStyle}>{props.fullname}</Text>
          {props.jobTitle ? (
            <Text style={{ ...props.jobTitleStyle, textAlign: "center" }}>
              {props.jobTitle}
            </Text>
          ) : null}
          <Text style={props.usernameStyle}>{props.username}</Text>
        </View>
        <View style={{ ...styles.imageContainer }}>
          <Image
            style={{ ...styles.image, ...props.style }}
            source={
              props.imgSource
                ? { uri: props.imgSource }
                : require("../../assets/default-profile-icon.jpg")
            }
          />
        </View>
      </View>
      <EditButton editText="Edit profile" onPress={props.onEditProfilePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  thirdContainer: {
    marginRight: 10,
    alignItems: "center",
    width: "60%",
  },
  image: {
    marginLeft: 10,
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
});

export default UserTitleEdit;
