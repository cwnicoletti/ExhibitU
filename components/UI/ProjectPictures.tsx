import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const ProjectItem = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={{ ...props.imageContainer }}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
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
