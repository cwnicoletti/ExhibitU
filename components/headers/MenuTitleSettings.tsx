import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import Menu from "./headers_components/Menu";
import Settings from "./headers_components/Settings";
import Title from "./headers_components/Title";
import FeatherHeaderButton from "../UI_general/header_buttons/FeatherHeaderButton";
import IoniconsHeaderButton from "../UI_general/header_buttons/IoniconsHeaderButton";

const MenuTitleSettings = ({ navigation }) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  return (
    <View>
      <View
        style={{
          padding: 23,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Menu
          darkModeValue={darkModeValue}
          navigation={navigation}
          HeaderButton={IoniconsHeaderButton}
          HeaderButtons={HeaderButtons}
          Item={Item}
          View={View}
          Platform={Platform}
        />
        <Title
          View={View}
          Image={Image}
          Text={Text}
          darkModeValue={darkModeValue}
        />
        <Settings
          darkModeValue={darkModeValue}
          navigation={navigation}
          HeaderButton={FeatherHeaderButton}
          HeaderButtons={HeaderButtons}
          Item={Item}
          View={View}
          Platform={Platform}
        />
      </View>
    </View>
  );
};

export default MenuTitleSettings;
