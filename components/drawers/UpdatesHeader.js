import React from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";

const UpdatesHeader = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.updatesTitle, ...props.updatesTitle }}>
        Future Showcase Updates
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  updatesTitle: { margin: 20, fontSize: 26 },
});

export default UpdatesHeader;
