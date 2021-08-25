import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const ExploreAdvocatesExhibitsIcons = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      <View>
        <Image style={styles.image} source={props.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
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

export default ExploreAdvocatesExhibitsIcons;
