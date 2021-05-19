import React from "react";
import { View, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import Title from "../headers_components/Title";

const TitleOnlyHeader = () => {
  const darkModeValue = useSelector((state) => state.user.darkMode);

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
