import * as WebBrowser from "expo-web-browser";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "../UI/LinkButton";
import ProfileStats from "../UI/ProfileStats";
import UserTitleShowcaseLocal from "../user/UserTitleShowcaseLocal";

const FeedProfileHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = props.links;

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
          followersValue={props.hideFollowing}
          followingValue={props.hideFollowers}
          advocatesValue={props.hideAdvocates}
          followersOnPress={props.followersOnPress}
          followingOnPress={props.followingOnPress}
          advocatesOnPress={props.advocatesOnPress}
          numberOfFollowers={props.numberOfFollowers}
          numberOfFollowing={props.numberOfFollowing}
          numberOfAdvocates={props.numberOfAdvocates}
        />
        {props.description ? (
          <Text style={props.descriptionStyle}>{props.description}</Text>
        ) : null}
        <FlatList<any>
          data={Object.values(links)}
          keyExtractor={(item) => item.linkId}
          columnWrapperStyle={
            Object.keys(links).length > 1 ? { justifyContent: "center" } : null
          }
          numColumns={
            Object.keys(links).length === 1
              ? 1
              : Object.keys(links).length === 2
              ? 2
              : 3
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
                    ? "46%"
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
});

export default FeedProfileHeader;
