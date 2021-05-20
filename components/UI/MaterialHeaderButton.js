import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

const MaterialHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} />
  );
};

export default MaterialHeaderButton;
