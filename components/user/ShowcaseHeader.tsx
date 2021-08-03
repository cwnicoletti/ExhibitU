import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "../UI/LinkButton";
import ProfileStats from "../UI/ProfileStats";
import UserTitleShowcaseLocal from "./UserTitleShowcaseLocal";

const ExhibitUHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = props.links;
  const followingValue = props.followingValue;
  const followersValue = props.followersValue;
  const advocatesValue = props.advocatesValue;

  const userDataProfileHeader = {
    numberOfFollowers: props.numberOfFollowers,
    numberOfFollowing: props.numberOfFollowing,
    numberOfAdvocates: props.numberOfAdvocates,
  };

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View>
      <View
        style={{
          ...styles.container,
          ...props.containerStyle,
        }}
      >
        <UserTitleShowcaseLocal {...props} />
        <ProfileStats
          darkModeValue={darkModeValue}
          followersValue={followersValue}
          followingValue={followingValue}
          advocatesValue={advocatesValue}
          followersOnPress={props.followersOnPress}
          followingOnPress={props.followingOnPress}
          advocatesOnPress={props.advocatesOnPress}
          numberOfFollowers={userDataProfileHeader.numberOfFollowers}
          numberOfFollowing={userDataProfileHeader.numberOfFollowing}
          numberOfAdvocates={userDataProfileHeader.numberOfAdvocates}
        />
        {props.description ? (
          <Text style={props.descriptionStyle}>{props.description}</Text>
        ) : null}
        <FlatList<any>
          data={Object.values(links)}
          keyExtractor={(item) => item.linkId}
          numColumns={
            Object.keys(links).length === 1
              ? 1
              : Object.keys(links).length === 2
              ? 2
              : 3
          }
          columnWrapperStyle={
            Object.keys(links).length > 1 ? { justifyContent: "center" } : null
          }
          renderItem={(itemData) => (
            <LinkButton
              imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
              title={itemData.item[`linkTitle${itemData.item.linkId}`]}
              textStyle={{ color: darkModeValue ? "white" : "black" }}
              linkContainer={{
                borderColor: "gray",
                width:
                  Object.keys(links).length === 1
                    ? "96%"
                    : Object.keys(links).length === 2
                    ? "48%"
                    : "28%",
              }}
              imageStyle={{
                backgroundColor: "white",
                borderRadius: 5,
              }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  itemData.item[`linkUrl${itemData.item.linkId}`]
                )
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
});

export default ExhibitUHeader;
