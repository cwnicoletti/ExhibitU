import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const UpdatesHeader = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.updatesTitle, ...props.updatesTitle }}>
        Future ExhibitU Updates
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  updatesTitle: {
    margin: 20,
    fontSize: 26,
  },
});

export default UpdatesHeader;
