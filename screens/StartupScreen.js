import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";
import { getUserData } from "../store/actions/user";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userLoginData");
      const introingData = await AsyncStorage.getItem("introing");

      const transformedIntroing = JSON.parse(introingData);
      const transformedData = JSON.parse(userData);

      let [localId, token, introing, tutorialing, tutorialScreen] = [
        false,
        false,
        true,
        false,
        "Start",
      ];
      [{ introing, tutorialing }] = [transformedIntroing];

      if (transformedData) {
        [{ localId, token }] = [transformedData];
      }

      if (!transformedData && !introing) {
        props.navigation.navigate("StartAuth");
        return;
      }

      if ((!token || !localId) && !introing) {
        props.navigation.navigate("StartAuth");
        return;
      }

      if (introing) {
        props.navigation.navigate("Intro");
      } else {
        if (!tutorialing) {
          await dispatch(getUserData());
          await dispatch(authenticate(localId, token));
          await props.navigation.navigate("Project");
        } else {
          props.navigation.navigate(`Tutorial${tutorialScreen}`);
        }
      }
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
