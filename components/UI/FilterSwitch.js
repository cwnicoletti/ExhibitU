import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const FilterSwitch = (props) => {
  return (
    <View style={{ ...props.viewStyle }}>
      <Text style={{ ...props.labelStyle }}>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.onChange}></Switch>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FilterSwitch;
