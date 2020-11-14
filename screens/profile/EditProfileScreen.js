import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

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

const EditProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.projects.userProjects.find((prod) => prod.id === prodId)
  );
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: !!editedProduct ? editedProduct.title : "",
      imageUrl: !!editedProduct ? editedProduct.imageUrl : "",
      description: !!editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

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

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      return;
    }
    if (!!editedProduct && editedProduct.length > 0) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: darkModeValue ? "black" : "white" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 5,
          }}
        >
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
                source={require("../../assets/me.png")}
              />
              <Text
                style={{
                  color: darkModeValue ? "white" : "black",
                  fontSize: 16,
                  margin: 5,
                }}
              >
                Christian Nicoletti
              </Text>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.form}>
          <Input
            id="title"
            label="Name"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            intiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Username"
            errorText="Please enter a valid imageUrl!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            intiallyValid={!!editedProduct}
            required
          />
          <Input
            id="description"
            label="Bio"
            errorText="Please enter a valid description!"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            intiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          <Input
            id="description"
            label="Profile Link 1"
            errorText="Please enter a valid description!"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            intiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
        <Button title="Update" style={{ margin: 20 }} onPress={submitHandler} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Showcase
        </Text>
      </SafeAreaView>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
  },
  profileUsernameStyle: {
    fontSize: 18,
    paddingTop: 10,
  },
  profileDescriptionStyle: {
    padding: 20,
  },
  profileContainerStyle: {
    borderBottomWidth: 1,
  },
  text: {
    padding: 10,
  },
  image: {
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
});

export default EditProfileScreen;
