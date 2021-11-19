import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.fullname,
          color: props.darkModeValue ? "white" : "black",
        }}
      >
        {props.fullname}
      </Text>
      {props.jobTitle && (
        <Text
          style={{
            ...styles.jobTitle,
            color: props.darkModeValue ? "white" : "black",
          }}
        >
          {props.jobTitle}
        </Text>
      )}
      <Text style={styles.username}>{props.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },

  fullname: {
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 11,
  },

  jobTitle: {
    fontWeight: "500",
    fontSize: 11,
    marginLeft: 5,
  },

  username: {
    color: "grey",
    fontSize: 10,
    marginLeft: 5,
  },
});

export default UserTitle;
