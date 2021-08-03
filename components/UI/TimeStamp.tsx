import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TimeStamp = (props) => {
  let timeStamp = {};

  switch (props.dateLength) {
    case "short":
      timeStamp = {
        weekday: "long",
      };
    default:
      timeStamp = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
  }

  return (
    <View style={{ ...styles.dateContainer, ...props.dateContainer }}>
      <Text
        style={{ ...styles.date, ...props.dateStyle, flexDirection: "row" }}
      >
        {`${props.postDateCreated.toLocaleString("UTC", timeStamp)}`}
        {", "}
        {`${props.postDateCreated.toLocaleString("UTC", {
          hour: "numeric",
          minute: "numeric",
        })}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    margin: 10,
    fontSize: 13,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
});

export default TimeStamp;
