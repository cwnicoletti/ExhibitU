import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import BackShowcasing from "./headers_components/BackShowcasing";
import FillEmptySpace from "./headers_components/FillEmptySpace";
import Title from "./headers_components/Title";
import IoniconsHeaderButton from "../UI/header_buttons/IoniconsHeaderButton";

const BackTitleFillShowcasing = ({ navigation }) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const dispatch = navigation.getParam("dispatch");
  const returnFn = navigation.getParam("returnFn");

  return (
    <View>
      <View
        style={{
          padding: 23,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <BackShowcasing
          darkModeValue={darkModeValue}
          dispatch={dispatch}
          returnFn={returnFn}
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

export default BackTitleFillShowcasing;
