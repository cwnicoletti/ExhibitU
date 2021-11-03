import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import Back from "../headers_components/Back";
import FillEmptySpace from "../headers_components/FillEmptySpace";
import Title from "../headers_components/Title";
import IoniconsHeaderButton from "../UI/header_buttons/IoniconsHeaderButton";

const BackTitleFill = ({ navigation }) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  return (
    <View>
      <View
        style={{
          padding: 32,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Back
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
        <FillEmptySpace View={View} darkModeValue={darkModeValue} />
      </View>
    </View>
  );
};

export default BackTitleFill;
