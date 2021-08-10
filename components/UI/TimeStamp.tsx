import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TimeStamp = (props) => {
  let timeStamp = {};
  switch (props.dateLength) {
    case "short":
      timeStamp = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      break;
    default:
      timeStamp = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      break;
  }

  return (
    <View style={{ ...styles.dateContainer, ...props.dateContainer }}>
      <Text style={{ ...styles.date, ...props.dateStyle }}>
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
    flexDirection: "row",
    margin: 10,
    fontSize: 13,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
});

export default TimeStamp;
