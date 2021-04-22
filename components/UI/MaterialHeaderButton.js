import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

const MaterialHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} />
  );
};

export default MaterialHeaderButton;
