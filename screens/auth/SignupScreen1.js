import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setEmail } from "../../store/actions/signup";

import { Fontisto } from "@expo/vector-icons";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updateValues,
    };
  }
  return state;
};

const SignupScreen1 = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    await dispatch(setEmail(formState.inputValues.email));
    await setIsLoading(false);
    await props.navigation.navigate("Signup2");
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        extraHeight={200}
      >
        <View style={styles.inner}>
          <Text style={styles.text}>Enter your email</Text>
          <Fontisto
            name="email"
            size={100}
            color="white"
            style={{ margin: 10 }}
          />
          <Card style={styles.authContainer}>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
              placeholder="example@example.com"
              autoFocus={true}
              blurOnSubmit={false}
              initiallyValid={false}
              onSubmitEditing={() => {
                if (formState.formIsValid === true) {
                  authHandler();
                }
              }}
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isLoading ? (
              <View style={styles.activityContainer}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <TouchableCmp
                style={{
                  borderColor:
                    formState.formIsValid === false ? "gray" : "#007AFF",
                  borderWidth: 1,
                  margin: 10,
                  alignItems: "center",
                }}
                onPress={authHandler}
                disabled={formState.formIsValid === false}
              >
                <Text
                  style={{
                    margin: 10,
                    color: formState.formIsValid === false ? "gray" : "#007AFF",
                    fontSize: 16,
                  }}
                >
                  Next
                </Text>
              </TouchableCmp>
            )}
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

SignupScreen1.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/showcase_icon_transparent_white.png")}
        />
        <Text
          style={{
            ...styles.logoTitle,
            color: "white",
          }}
        >
          Showcase
        </Text>
      </View>
    ),
    headerTitleStyle: {
      color: "white",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "black",
    },
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Back"
          iconName={"ios-arrow-back"}
          color={"white"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
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
    fontSize: 22,
  },
  text: {
    color: "white",
    marginTop: 20,
    fontSize: 22,
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

export default SignupScreen1;
