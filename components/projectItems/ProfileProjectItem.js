import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";

import Card from "../UI/Card";

const ProjectItem = (props) => {
  const profileColumns = useSelector((state) => state.user.profileColumns);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card
      style={{
        ...styles.project,
        ...props.projectContainer,
        width:
          profileColumns === 2
            ? "50%"
            : profileColumns === 3
            ? "33.33%"
            : profileColumns === 4
            ? "25%"
            : "25%",
        aspectRatio: profileColumns === 1 ? null : 2 / 3,
      }}
    >
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text
                style={{
                  ...styles.title,
                  ...props.titleStyle,
                }}
                adjustsFontSizeToFit={true}
              >
                {props.title}
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
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
    height: "25%",
    width: "100%",
    padding: 10,
  },
  touchable: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "75%",
    overflow: "hidden",
  },
});

export default ProjectItem;
