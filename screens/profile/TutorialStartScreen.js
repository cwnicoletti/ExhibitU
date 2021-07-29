import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { setTutorialing } from "../../store/actions/user";

const IntroScreen = (props) => {
  const dispatch = useDispatch();

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const startTutorialHandler = async () => {
    await setIsLoading(true);
    await dispatch(setTutorialing(true));
    await setIsLoading(false);
    await props.navigation.navigate("Project");
  };

  const continueToReminderHandler = () => {
    props.navigation.navigate("TutorialReminder");
  };

  return (
    <View style={styles.screen}>
      <MaterialIcons name="live-help" size={100} color={"white"} />
      <Text>Before you start, would you like a tutorial?</Text>
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
          onPress={startTutorialHandler}
        >
          <Text
            style={{
              margin: 10,
              color: "#007AFF",
              fontSize: 16,
            }}
          >
            Sure, start the tutorial!
          </Text>
        </TouchableCmp>
        <TouchableCmp
          style={{
            borderColor: "#007AFF",
            borderWidth: 1,
            alignItems: "center",
          }}
          onPress={continueToReminderHandler}
        >
          <Text
            style={{
              margin: 10,
              color: "#007AFF",
              fontSize: 16,
            }}
          >
            No thanks!
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
