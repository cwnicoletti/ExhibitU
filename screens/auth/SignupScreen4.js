import React, { useCallback, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Input from "../../components/UI_general/Input";
import IoniconsHeaderButton from "../../components/UI_general/header_buttons/IoniconsHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { signup } from "../../store/actions/auth/auth";
import MainHeaderTitle from "../../components/UI_general/MainHeaderTitle";
import { setGettingPermissions } from "../../store/actions/signup/signup";

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
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const email = useAppSelector((state) => state.signup.email);
  const fullname = useAppSelector((state) => state.signup.fullname);
  const username = useAppSelector((state) => state.signup.username);

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      password: "",
      confirmpassword: "",
    },
    inputValidities: {
      password: false,
      confirmpassword: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    if (
      formState.inputValues.password === formState.inputValues.confirmpassword
    ) {
      await dispatch(
        signup(email, fullname, username, formState.inputValues.password)
      );
      dispatch(setGettingPermissions(true));
      await setIsLoading(false);
      await props.navigation.navigate("PermissionsStack");
    } else {
      await setIsLoading(false);
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={require("../../assets/default-profile-icon.jpg")}
          />
          <Text style={styles.fullname}>{fullname}</Text>
          <Text style={styles.username}>@{username}</Text>
          <View style={styles.authContainer}>
            <Input
              id="password"
              placeholder="New password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoFocus={true}
              autoCorrect={false}
              initiallyValid={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmpassword.focus();
              }}
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
              styleInput={{
                color: "white",
                backgroundColor: "#222222",
              }}
            />
            <Input
              id="confirmpassword"
              placeholder="Confirm password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCorrect={false}
              initiallyValid={false}
              confirmPassword={formState.inputValues.password}
              returnKeyType="done"
              inputRef={(ref) => (confirmpassword = ref)}
              autoCapitalize="none"
              onSubmitEditing={() => {
                if (formState.formIsValid === true) {
                  authHandler();
                }
              }}
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
              styleInput={{
                color: "white",
                backgroundColor: "#222222",
                marginBottom: 10,
              }}
            />
            <Text style={styles.text}>
              By continuing, you agree to our Terms of Use, and Privacy Policy
            </Text>
            {isLoading ? (
              <View
                style={{
                  margin: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    margin: 10,
                  }}
                >
                  Signing up...
                </Text>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <TouchableCmp
                onPress={authHandler}
                disabled={formState.formIsValid === false}
              >
                <View
                  style={{
                    borderColor:
                      formState.formIsValid === false ? "gray" : "#007AFF",
                    borderWidth: 1,
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      margin: 10,
                      marginRight: 5,
                      color:
                        formState.formIsValid === false ? "gray" : "#007AFF",
                      fontSize: 16,
                    }}
                  >
                    Confirm Signup
                  </Text>
                  <Ionicons
                    name="ios-checkmark"
                    size={16}
                    color={formState.formIsValid === false ? "gray" : "#007AFF"}
                  />
                </View>
              </TouchableCmp>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

SignupScreen2.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <MainHeaderTitle
        darkModeValue={true}
        fontFamily={"CormorantUpright"}
        titleName={"ExhibitU"}
      />
    ),
    headerStyle: {
      backgroundColor: "black",
    },
    headerLeft: () => (
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
    width: 100,
    height: 100,
  },
  fullname: {
    color: "white",
    padding: 5,
    fontSize: 20,
    fontWeight: "500",
  },
  username: {
    color: "white",
    padding: 5,
    fontSize: 16,
    fontWeight: "300",
  },
  text: {
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  authContainer: {
    backgroundColor: "black",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
});

export default SignupScreen2;
