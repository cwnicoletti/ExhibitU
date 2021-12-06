import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

const SignupOrLoginScreen = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useFonts({
    CormorantUpright: require("../../assets/fonts/CormorantUpright-Regular.ttf"),
  });

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(fadeInAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          opacity: fadeInAnim,
        }}
      >
        <Text style={{ ...styles.titleText, fontFamily: "CormorantUpright" }}>
          ExhibitU
        </Text>
        <Image
          style={styles.image}
          resizeMode={"contain"}
          source={require("../../assets/ExhibitU_icon_transparent_white.png")}
        />
        <TouchableCmp
          onPress={() => {
            props.navigation.navigate("Signup1");
          }}
        >
          <View
            style={{
              borderColor: "#00a0db",
              borderWidth: 1,
              margin: 10,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: "20%",
              borderRadius: 15,
            }}
          >
            <Fontisto
              name="email"
              size={24}
              color="#38c9ff"
              style={{ marginVertical: 10 }}
            />
            <Text style={{ margin: 10, color: "#00a0db" }}>
              Signup with Email
            </Text>
          </View>
        </TouchableCmp>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: "white",
              width: 100,
            }}
          />
          <Text style={{ ...styles.text }}>OR</Text>
          <View
            style={{
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: "white",
              width: 100,
            }}
          />
        </View>
        <Text style={styles.text}>Already have ExhibitU?</Text>
        <TouchableCmp
          style={{
            alignItems: "center",
            width: "80%",
          }}
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderColor: "#00a0db",
              borderWidth: 1,
              margin: 10,
              alignItems: "center",
              width: "80%",
              borderRadius: 15,
            }}
          >
            <MaterialIcons
              name="person-outline"
              size={24}
              color="#38c9ff"
              style={{ marginVertical: 10 }}
            />
            <Text style={{ margin: 10, color: "#00a0db" }}>Login</Text>
          </View>
        </TouchableCmp>
      </Animated.View>
    </View>
  );
};

SignupOrLoginScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  titleText: {
    color: "white",
    fontSize: 60,
  },
  image: {
    height: "35%",
    margin: 40,
  },
  text: {
    color: "white",
    padding: 10,
  },
});

export default SignupOrLoginScreen;
