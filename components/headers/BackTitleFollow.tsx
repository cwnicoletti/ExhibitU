import React from "react";
import { Image, Platform, Text, View, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import Back from "../headers_components/Back";
import Follow from "../headers_components/Follow";
import Title from "../headers_components/Title";
import IoniconsHeaderButton from "../UI/header_buttons/IoniconsHeaderButton";
import SimpleLineIconsHeaderButton from "../../components/UI/header_buttons/SimpleLineIconsHeaderButton";

const BackTitleFollow = ({ navigation }) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const isfollowing = navigation.getParam("isfollowing");
  const isLoading = navigation.getParam("isLoading");
  const ExhibitUId = navigation.getParam("ExhibitUId");
  const exploredExhibitUId = navigation.getParam("exploredExhibitUId");
  const followFn = navigation.getParam("followFn");
  const unfollowFn = navigation.getParam("unfollowFn");

  return (
    <View>
      <View
        style={{
          padding: 23,
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
        <Follow
          darkModeValue={darkModeValue}
          navigation={navigation}
          HeaderButton={SimpleLineIconsHeaderButton}
          HeaderButtons={HeaderButtons}
          Item={Item}
          View={View}
          ActivityIndicator={ActivityIndicator}
          Platform={Platform}
          isfollowing={isfollowing}
          isLoading={isLoading}
          ExhibitUId={ExhibitUId}
          exploredExhibitUId={exploredExhibitUId}
          followFn={followFn}
          unfollowFn={unfollowFn}
        />
      </View>
    </View>
  );
};

export default BackTitleFollow;
