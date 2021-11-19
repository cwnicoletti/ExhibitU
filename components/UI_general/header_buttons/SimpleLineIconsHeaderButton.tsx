import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

const SimpleLineIconsHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={SimpleLineIcons} iconSize={23} />
  );
};

export default SimpleLineIconsHeaderButton;
