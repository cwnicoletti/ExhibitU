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

const ExploreCard = (props) => {
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
          <View style={{ flexDirection: "row", margin: 10 }}>
            <View style={{ ...props.imageContainer }}>
              {profileImageIsLoading ? (
                <AnimatedGradient
                  style={{
                    top: 0,
                    position: "absolute",
                    zindex: 3,
                    height: 60,
                    width: 60,
                    borderRadius: 60 / 2,
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
                  console.log("Hit2");
                  setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
                }}
                onLoadEnd={() => {
                  setProfileImageIsLoading(false);
                }}
              />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text style={{ ...styles.fullname, ...props.fullNameStyle }}>
                {props.fullname}
              </Text>
              {props.jobTitle ? (
                <Text style={{ ...styles.jobTitle, ...props.jobTitleStyle }}>
                  {props.jobTitle}
                </Text>
              ) : null}
              <Text style={{ ...styles.username, ...props.userNameStyle }}>
                {`@${props.username}`}
              </Text>
            </View>
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
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    overflow: "hidden",
  },
  fullname: {
    fontWeight: "800",
    fontSize: 14,
  },
  jobTitle: {
    fontWeight: "500",
    fontSize: 12,
  },
  username: {
    color: "gray",
    fontSize: 12,
  },
  details: {
    marginLeft: 10,
    justifyContent: "center",
  },
  touchable: {
    overflow: "hidden",
  },
});

export default ExploreCard;
