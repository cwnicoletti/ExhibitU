import React, { useReducer, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setFullname } from "../../store/actions/signup";

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

const SignupScreen2 = (props) => {
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
      fullname: "",
    },
    inputValidities: {
      fullname: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    await dispatch(setFullname(formState.inputValues.fullname));
    await setIsLoading(false);
    await props.navigation.navigate("Signup3");
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
          <Text style={styles.text}>Enter your name</Text>
          <Image
            style={styles.image}
            source={require("../../assets/default-profile-icon.jpg")}
          />
          <Card style={styles.authContainer}>
            <Input
              id="fullname"
              label="Full Name"
              keyboardType="default"
              required
              minLength={2}
              autoFocus={true}
              blurOnSubmit={false}
              initiallyValid={false}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={() => {
                if (formState.formIsValid === true) {
                  authHandler();
                }
              }}
              placeholder="e.g. Christian Nicoletti"
              errorText="Please enter a valid name"
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

SignupScreen2.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/DiamondCase_icon_transparent_white.png")}
        />
        <Text
          style={{
            ...styles.logoTitle,
            color: "white",
          }}
        >
          Diamond Case
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
  smallerText: {
    color: "white",
    paddingBottom: 10,
    fontSize: 12,
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
});

export default SignupScreen2;
