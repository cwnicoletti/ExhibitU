import React, { useEffect, useReducer } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../../hooks";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        error: action.error,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    error: props.errorText,
    isValid: props.initiallyValid,
    touched: false,
  });
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  const { onInputChange, id } = props;

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    let error = props.errorText;
    const realUndefined = void 0;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min !== realUndefined && +text < props.min) {
      isValid = false;
    }
    if (props.max !== realUndefined && +text > props.max) {
      isValid = false;
    }
    if (
      props.confirmPassword !== realUndefined &&
      props.confirmPassword !== text
    ) {
      isValid = false;
      error = "Passwords don't match!";
    }
    if (props.minLength !== realUndefined && text.length < props.minLength) {
      isValid = false;
      error = "Password not long enough!";
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid,
      error,
    });
  };

  const lostFocusHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.label, ...props.textLabel }}>{props.label}</Text>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          color: darkModeValue ? "white" : "black",
          backgroundColor: darkModeValue ? "#222222" : "#eeeeee",
          ...props.styleInput,
        }}
        value={inputState.value}
        placeholder={props.placeholder ? props.placeholder : "type here..."}
        placeholderTextColor={"grey"}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        ref={props.inputRef}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{inputState.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 2,
    paddingLeft: 15,
    color: "white",
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  errorContainer: {
    marginVertical: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default Input;
