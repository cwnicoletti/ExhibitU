import { Feather } from "@expo/vector-icons";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

const FeatherHeaderButton = (props) => {
  return <HeaderButton {...props} IconComponent={Feather} iconSize={21} />;
};

export default FeatherHeaderButton;
