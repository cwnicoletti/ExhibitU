import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

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
