import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { login } from "../../store/actions/auth";

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

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    action = login(formState.inputValues.email, formState.inputValues.password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Project");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
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
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon.png")}
          />
          <Card style={styles.authContainer}>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <View style={styles.loadingAuth}>
                  <Button color="white" title="Login" onPress={authHandler} />
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <Button color="white" title="Login" onPress={authHandler} />
              )}
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

LoginScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Showcase",
    headerTitleStyle: {
      color: "white",
    },
    headerStyle: {
      backgroundColor: "black",
    },
    headerBackTitle: "Back",
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#00B7DB",
    borderRadius: 10,
  },
});

export default LoginScreen;
