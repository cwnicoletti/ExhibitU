import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import useDidMountEffect from "../helper/useDidMountEffect";
import { useAppDispatch } from "../hooks";
import { authenticate } from "../store/actions/auth/auth";
import { getUserData } from "../store/actions/user/user";

const StartupScreen = (props) => {
  const dispatch = useAppDispatch();
  let [progress, setProgress] = useState(0);

  const progressBarHandler = () => {
    setProgress(1);
  };

  useEffect(() => {
    progressBarHandler();
  }, []);

  useDidMountEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userLoginData");
      const introingData = await AsyncStorage.getItem("introing");
      const permissionsData = await AsyncStorage.getItem("gettingPermissions");

      const transformedIntroing = JSON.parse(introingData);
      const transformedPermissions = JSON.parse(permissionsData);
      const transformedData = JSON.parse(userData);

      let [localId, token, gettingPermissions, introing] = [
        "",
        "",
        false,
        true,
      ];
      if (transformedPermissions) {
        [{ gettingPermissions }] = [transformedPermissions];
      }
      if (transformedIntroing) {
        [{ introing }] = [transformedIntroing];
      }

      if (transformedData) {
        [{ localId, token }] = [transformedData];
      }

      if (!transformedData && !introing && !gettingPermissions) {
        props.navigation.navigate("StartAuth");
        return;
      }

      if ((!token || !localId) && !introing) {
        props.navigation.navigate("StartAuth");
        return;
      }
      if (introing) {
        props.navigation.navigate("MainNavigator");
        return;
      }

      if (gettingPermissions === true) {
        await dispatch(getUserData());
        await dispatch(authenticate(localId, token));
        props.navigation.navigate("PermissionsStack");
      } else {
        await dispatch(getUserData());
        await dispatch(authenticate(localId, token));
        await props.navigation.navigate("Exhibit");
      }
    };

    if (progress === 1) {
      setTimeout(() => {
        tryLogin();
      }, 700);
    }
  }, [progress]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="white" style={{ padding: 30 }} />
      <Progress.Bar
        progress={progress}
        width={200}
        height={5}
        color={"white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default StartupScreen;
