import React from "react";
import { Image, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import Title from "../headers_components/Title";

const TitleOnlyHeader = () => {
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
