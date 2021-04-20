import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const UpdateCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <Text style={{ ...styles.title, ...props.titleStyle }}>
          {props.updateTitle}
        </Text>
        <Text style={{ ...styles.body, ...props.bodyStyle }}>
          {props.updateBody}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 100,
    borderWidth: 1,
    width: "100%",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
  },
  title: {
    fontWeight: "500",
    fontSize: 12,
    margin: 20,
    marginBottom: 10,
  },
  body: {
    fontWeight: "300",
    fontSize: 12,
    marginHorizontal: 20,
  },
  touchable: {
    overflow: "hidden",
  },
});

export default UpdateCard;
