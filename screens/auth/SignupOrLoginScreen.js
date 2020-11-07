import React from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignupOrLoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>Showcase</Text>
      <Image
        style={styles.image}
        source={require("../../assets/showcase_icon.png")}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonText}>Signup with Email</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>----------- OR -----------</Text>
      <Text style={styles.text}>Already have showcase?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  },
  buttonContainer: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
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
});

export default SignupOrLoginScreen;
