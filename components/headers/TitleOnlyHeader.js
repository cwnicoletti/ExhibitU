import React from "react";
import { View, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import Title from "../headers_components/Title";

const ProfileHeader = () => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);

  return (
    <View>
      <View
        style={{
          padding: 20,
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

export default ProfileHeader;
