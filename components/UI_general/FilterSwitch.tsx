import React from "react";
import { Switch, Text, View } from "react-native";

const FilterSwitch = (props) => {
  return (
    <View style={{ ...props.viewStyle }}>
      <Text style={{ ...props.labelStyle }}>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.onChange}></Switch>
    </View>
  );
};

export default FilterSwitch;
