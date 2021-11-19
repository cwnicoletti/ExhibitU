import React from "react";
import { Image, Text, View, StatusBar } from "react-native";
import { useAppSelector } from "../../hooks";
import Title from "./headers_components/Title";

const TitleOnlyHeader = () => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const styleTypes = ["dark-content", "light-content"];
  
  const setStatusBarStyle: any = (darkModeValue: boolean) => {
    if (darkModeValue === true) {
      return styleTypes[1];
    } else {
      return styleTypes[0];
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 23,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
      <StatusBar barStyle={setStatusBarStyle(darkModeValue)} />
      <View style={{ flexDirection: "row" }}>
        <Title
          View={View}
          Image={Image}
          Text={Text}
          darkModeValue={darkModeValue}
        />
      </View>
    </View>
  );
};

export default TitleOnlyHeader;
