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
    await props.navigation.navigate("TutorialHome");
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
  inner: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  logoImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 26,
  },
  text: {
    color: "white",
    padding: 10,
  },
  authContainer: {
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowRadius: null,
    elevation: null,
    borderRadius: null,
    backgroundColor: "black",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
  loadingAuth: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#00B7DB",
    borderRadius: 10,
  },
  activityContainer: {
    marginTop: 10,
  },
  buttonText: {
    color: "#00B7DB",
  },
  buttonLinkedInContainer: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  buttons: {
    alignItems: "center",
    paddingVertical: 10,
    color: "#00B7DB",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  track: {
    backgroundColor: "#ccc",
    overflow: "hidden",
    height: 2,
  },
  bar: {
    backgroundColor: "#5294d6",
    height: 2,
  },
});

export default IntroScreen;
