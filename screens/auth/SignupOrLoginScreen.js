import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Fontisto } from "@expo/vector-icons";

const SignupOrLoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>Showcase</Text>
      <Image
        style={styles.image}
        source={require("../../assets/showcase_icon.png")}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("Signup1");
        }}
      >
        <Fontisto name="email" size={24} color="#0040a8" />
        <Text style={{ ...styles.buttonText, marginHorizontal: 10 }}>
          Signup with Email
        </Text>
      </TouchableOpacity>
      <Text style={{ ...styles.text }}>----------- OR -----------</Text>
      <Text style={styles.text}>Already have showcase?</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

SignupOrLoginScreen.navigationOptions = (navData) => {
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
    width: 400,
    height: 400,
  },
  text: {
    color: "white",
    padding: 10,
  },
  buttonText: {
    color: "#00B7DB",
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 80,
  },
});

export default SignupOrLoginScreen;
