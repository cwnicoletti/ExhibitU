import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import Add from "./headers_components/Add";
import Back from "./headers_components/Back";
import Title from "./headers_components/Title";
import IoniconsHeaderButton from "../UI_general/header_buttons/IoniconsHeaderButton";

const BackTitleAdd = ({ navigation }) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const exhibitIdParam = navigation.getParam("exhibitId");
  const exhibitTitleParam = navigation.getParam("exhibitTitle");
  const exhibitCoverPhotoUrlParam = navigation.getParam("exhibitCoverPhotoUrl");
  const exhibitDateCreatedParam = navigation.getParam("exhibitDateCreated");
  const exhibitLastUpdatedParam = navigation.getParam("exhibitLastUpdated");
  const exhibitDescriptionParam = navigation.getParam("exhibitDescription");
  const exhibitLinksParam = navigation.getParam("exhibitLinks");

  return (
    <View>
      <View
        style={{
          padding: Platform.OS === "ios" ? 23 : 0,
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
        <Add
          darkModeValue={darkModeValue}
          navigation={navigation}
          HeaderButton={IoniconsHeaderButton}
          HeaderButtons={HeaderButtons}
          Item={Item}
          View={View}
          Platform={Platform}
          exhibitIdParam={exhibitIdParam}
          exhibitTitleParam={exhibitTitleParam}
          exhibitCoverPhotoUrlParam={exhibitCoverPhotoUrlParam}
          exhibitDateCreatedParam={exhibitDateCreatedParam}
          exhibitLastUpdatedParam={exhibitLastUpdatedParam}
          exhibitDescriptionParam={exhibitDescriptionParam}
          exhibitLinksParam={exhibitLinksParam}
        />
      </View>
    </View>
  );
};

export default BackTitleAdd;
