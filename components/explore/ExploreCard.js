import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const ExploreCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              <Image
                style={styles.image}
                source={
                  props.image
                    ? { uri: props.image }
                    : require("../../assets/default-profile-icon.jpg")
                }
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
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    marginVertical: 2,
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 70 / 2,
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
