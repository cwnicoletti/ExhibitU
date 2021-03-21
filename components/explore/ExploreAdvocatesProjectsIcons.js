import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";

import Card from "../UI/Card";

const ExploreAdvocatesProjectsIcons = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View>
        <Image style={styles.image} source={props.image} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 40,
    borderWidth: 1,
    width: 40,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ExploreAdvocatesProjectsIcons;
