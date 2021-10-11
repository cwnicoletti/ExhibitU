import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";

const NotificationCard = (props) => {
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
            <View style={{ ...props.imageContainer }}>
              {profileImageIsLoading ? (
                <AnimatedGradient
                  style={{
                    top: 0,
                    position: "absolute",
                    zIndex: 3,
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                  }}
                  colors={greyColorValues}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              ) : null}
              <Image
                style={styles.image}
                source={
                  props.image
                    ? { uri: props.image }
                    : require("../../assets/default-profile-icon.jpg")
                }
                onLoadStart={() => {
                  setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
                }}
                onLoadEnd={() => {
                  setProfileImageIsLoading(false);
                }}
              />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text style={{ ...styles.username, ...props.usernameStyle }}>
                {props.message}
              </Text>
            </View>
            {props.action === "follow" ? null : (
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Image
                  style={styles.postImage}
                  source={
                    props.postImage
                      ? { uri: props.postImage }
                      : require("../../assets/default-post-icon.png")
                  }
                  onLoadStart={() => {
                    setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
                  }}
                  onLoadEnd={() => {
                    setProfileImageIsLoading(false);
                  }}
                />
              </View>
            )}
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
    marginVertical: 2,
    width: "100%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    overflow: "hidden",
  },
  postImage: {
    height: 40,
    width: 40,
    overflow: "hidden",
  },
  username: {
    fontWeight: "500",
    fontSize: 14,
  },
  details: {
    marginLeft: 10,
    justifyContent: "center",
  },
  touchable: {
    overflow: "hidden",
  },
});

export default NotificationCard;
