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
import { Feather } from "@expo/vector-icons";
import { setUsername } from "../../store/actions/signup/signup";
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
  const fullname = useAppSelector((state) => state.signup.fullname);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
    },
    inputValidities: {
      username: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    await dispatch(setUsername(formState.inputValues.username));
    await setIsLoading(false);
    await props.navigation.navigate("Signup4");
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
          <Text style={styles.text}>Enter a username</Text>
          <Text style={styles.smallerText}>
            (You can change this at any time)
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/default-profile-icon.jpg")}
          />
          <Text style={styles.fullname}>{fullname}</Text>
          <View style={styles.authContainer}>
            <Input
              id="username"
              label="Username"
              keyboardType="default"
              required
              minLength={2}
              autoFocus={true}
              autoCorrect={false}
              blurOnSubmit={false}
              initiallyValid={false}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={() => {
                if (formState.formIsValid === true) {
                  authHandler();
                }
              }}
              placeholder="exampleusername123"
              errorText="Please enter a valid username"
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

  image: {
    width: 150,
    height: 150,
  },

  text: {
    color: "white",
    marginTop: 20,
    fontSize: 22,
  },

  fullname: {
    color: "white",
    padding: 5,
    fontSize: 20,
  },

  smallerText: {
    color: "white",
    padding: 5,
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

  activityContainer: {
    marginTop: 10,
  },
});

export default SignupScreen2;
