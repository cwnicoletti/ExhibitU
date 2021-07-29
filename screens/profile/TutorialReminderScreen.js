import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const IntroScreen = (props) => {
  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const continueToProfileHandler = async () => {
    await props.navigation.navigate("Project");
  };

  return (
    <View style={styles.screen}>
      <AntDesign name="exclamationcircle" size={100} color={"white"} />
      <Text>
        Just a reminder before you start, you can start the tutorial at any time on
        the right sidebar menu
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableCmp
          style={{
            borderColor: "#007AFF",
            borderWidth: 1,
            alignItems: "center",
          }}
          onPress={continueToProfileHandler}
        >
          <Text
            style={{
              margin: 10,
              color: "#007AFF",
              fontSize: 16,
            }}
          >
            Thank you, continue to profile.
          </Text>
        </TouchableCmp>
      </View>
    </View>
  );
};

IntroScreen.navigationOptions = (navData) => {
  return {
    headerMode: "none",
    headerVisible: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    padding: 10,
  },
});

export default IntroScreen;
