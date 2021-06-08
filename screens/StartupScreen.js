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
      if (!userData) {
        props.navigation.navigate("StartAuth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { localId, token, introing } = transformedData;

      if (!token || !localId) {
        props.navigation.navigate("StartAuth");
        return;
      }

      if (introing) {
        await dispatch(getUserData());
        await dispatch(authenticate(localId, token));
        await props.navigation.navigate("Intro");
      } else {
        await dispatch(getUserData());
        await dispatch(authenticate(localId, token));
        await props.navigation.navigate("Project");
      }
    };

    tryLogin();
  }, [dispatch]);

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
