import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserTitle = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: props.darkModeValue ? "white" : "black",
          fontWeight: "700",
          marginLeft: 5,
          fontSize: 11,
        }}
      >
        {props.fullname}
      </Text>
      {props.jobTitle ? (
        <Text
          style={{
            color: props.darkModeValue ? "white" : "black",
            fontWeight: "500",
            fontSize: 11,
            marginLeft: 5,
          }}
        >
          {props.jobTitle}
        </Text>
      ) : null}
      <Text
        style={{
          color: "grey",
          fontSize: 10,
          marginLeft: 5,
        }}
      >
        {props.username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserTitle;
