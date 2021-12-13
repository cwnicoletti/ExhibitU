import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import EditButton from "../../UI_general/EditButton";

const ProfileUserTitleEdit = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.firstContainer}>
      <View style={{ ...styles.secondContainer }}>
        <View style={{ ...styles.thirdContainer }}>
          <Text style={props.fullnameStyle}>{props.fullname}</Text>
          {props.jobTitle ? (
            <Text style={{ textAlign: "center", ...props.jobTitleStyle }}>
              {props.jobTitle}
            </Text>
          ) : null}
          <Text style={props.usernameStyle}>{props.username}</Text>
        </View>
        <View>
          <Image
            style={{ ...styles.image, ...props.style }}
            source={
              props.imgSource
                ? { uri: props.imgSource }
                : require("../../../assets/default-profile-icon.jpg")
            }
            defaultSource={
              props.imgSource
                ? { uri: props.imgSource }
                : require("../../../assets/default-profile-icon.jpg")
            }
          />
        </View>
      </View>
      <EditButton editText="Edit profile" onPress={props.onEditProfilePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: 5,
  },

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

export default ProfileUserTitleEdit;
