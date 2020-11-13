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
          <View>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text style={{ ...styles.title, ...props.titleStyle }}>
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
    width: 50,
    borderWidth: 1,
    borderColor: "gray",
    width: "49%",
    margin: '0.5%'
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
