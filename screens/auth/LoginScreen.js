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
  Alert,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
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
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    const authenticated = await dispatch(
      await login(formState.inputValues.email, formState.inputValues.password)
    );
    await setIsLoading(false);
    if (authenticated) {
      await props.navigation.navigate("Project");
    } else {
      Alert.alert("Invalid Credentials", "Invalid username or password", [
        {
          text: "Dismiss",
          onPress: () => console.log("Ask me later pressed"),
        },
      ]);
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
            source={require("../../assets/ExhibitU_icon_transparent_white.png")}
          />
          <Card style={styles.authContainer}>
            <Input
              id="email"
              placeholder="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              autoFocus={true}
              initiallyValid={false}
              returnKeyType="next"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
              onSubmitEditing={() => {
                password.focus();
              }}
              styleInput={{
                color: "white",
                backgroundColor: "#222222",
              }}
            />
            <Input
              id="password"
              placeholder="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              returnKeyType="done"
              inputRef={(ref) => (password = ref)}
              initiallyValid={false}
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
                  Logging in...
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
                    Login
                  </Text>
                  <SimpleLineIcons
                    name="login"
                    size={16}
                    color={formState.formIsValid === false ? "gray" : "#007AFF"}
                  />
                </View>
              </TouchableCmp>
            )}
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

LoginScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        <Text
          style={{
            ...styles.logoTitle,
            color: "white",
            fontFamily: "CormorantUpright",
          }}
        >
          ExhibitU
        </Text>
      </View>
    ),
    headerTitleStyle: {
      color: "white",
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
    margin: 20,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 26,
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
});

export default LoginScreen;
