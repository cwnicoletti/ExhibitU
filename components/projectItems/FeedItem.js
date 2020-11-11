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

const ProjectItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.details}>
            <Text style={{ ...styles.title, ...props.titleStyle }}>
              {props.title}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 13,
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    width: "100%",
    padding: 10,
  },
  touchable: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
  },
});

export default ProjectItem;
