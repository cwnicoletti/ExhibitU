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

import Card from "./Card";

const ProjectItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              <Image style={styles.image} source={{ uri: props.image }} />
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
  touchable: {
    overflow: "hidden",
  },
});

export default ProjectItem;
