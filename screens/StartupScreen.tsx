import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Animated } from "react-native";
import { useAppDispatch } from "../hooks";
import { authenticate } from "../store/actions/auth/auth";
import { getUserData } from "../store/actions/user/user";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";

const StartupScreen = (props) => {
  const dispatch = useAppDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const prepare = async () => {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem("userLoginData");
    const introingData = await AsyncStorage.getItem("introing");
    const permissionsData = await AsyncStorage.getItem("gettingPermissions");

    const transformedIntroing = JSON.parse(introingData);
    const transformedPermissions = JSON.parse(permissionsData);
    const transformedData = JSON.parse(userData);

    let [localId, token, gettingPermissions, introing] = ["", "", false, true];
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
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate("StartAuth");
      });
      return;
    }

    if ((!token || !localId) && !introing) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate("StartAuth");
      });
      return;
    }
    if (introing) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate("MainNavigator");
      });
      return;
    }

    if (gettingPermissions === true) {
      await dispatch(getUserData());
      await dispatch(authenticate(localId, token));
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate("PermissionsStack");
      });
    } else {
      await dispatch(getUserData());
      await dispatch(authenticate(localId, token));
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate("Exhibit");
      });
    }
  };

  useEffect(() => {
    prepare();
    tryLogin();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const cacheResourcesAsync = async () => {
    const images = [
      require("../assets/ExhibitU_icon_transparent_white_spaced.png"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={async () => {
          await cacheResourcesAsync();
        }}
        onFinish={async () => {
          await onLayoutRootView();
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <Animated.View style={{ ...styles.screen, opacity: fadeAnim }}>
      <Image
        source={require("../assets/ExhibitU_icon_transparent_white_spaced.png")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default StartupScreen;
