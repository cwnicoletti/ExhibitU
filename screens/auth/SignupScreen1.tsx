import { Fontisto } from "@expo/vector-icons";
import React, { useCallback, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch } from "../../hooks";
import Input from "../../components/UI_general/Input";
import IoniconsHeaderButton from "../../components/UI_general/header_buttons/IoniconsHeaderButton";
import { Feather } from "@expo/vector-icons";
import { setEmail } from "../../store/actions/signup/signup";
import MainHeaderTitle from "../../components/UI_general/MainHeaderTitle";

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
      if (updatedValidities.hasOwnProperty(key)) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
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
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Text style={styles.text}>Enter your email</Text>
          <Text style={styles.textLogin}>
            (This will be used as your login)
          </Text>
          <Fontisto
            name="email"
            size={100}
            color="white"
            style={{ margin: 10 }}
          />
          <View style={styles.authContainer}>
            <Input
              id="email"
              label="Email"
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
              styleInput={{
                color: "white",
                backgroundColor: "#222222",
                marginVertical: 10,
              }}
            />
            {isLoading ? (
              <View style={styles.activityContainer}>
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
                    Next
                  </Text>
                  <Feather
                    name="arrow-right"
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

SignupScreen1.navigationOptions = (navData) => {
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="Back" iconName={"ios-arrow-back"} color={"black"} />
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

  text: {
    color: "white",
    marginTop: 20,
    fontSize: 22,
  },

  textLogin: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
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

  activityContainer: {
    marginTop: 10,
  },
});

export default SignupScreen1;
