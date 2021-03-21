import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";

import ExploreUserTitle from "./ExploreUserTitle";
import LinkButton from "../UI/LinkButton";

const ExploreProfileHeader = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const followingValue = props.hideFollowing;
  const followersValue = props.hideFollowers;
  const advocatesValue = props.hideAdvocates;
  const showResumeValue = props.showResumeValue;
  const links = props.links;

  const userDataProfileHeader = {
    resumeLink: props.resumeLink,
    numberOfFollowers: props.numberOfFollowers,
    numberOfFollowing: props.numberOfFollowing,
    numberOfAdvocates: props.numberOfAdvocates,
    followers: props.followers,
    following: props.following,
    advocates: props.advocates,
  };

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const handleLinkOnPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View>
      <View
        style={{
          ...styles.container,
          ...props.containerStyle,
        }}
      >
        <ExploreUserTitle {...props} />
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}
        >
          {!followersValue ? (
            <TouchableCmp
              style={{
                flex: 1,
                borderColor: darkModeValue ? "gray" : "#c9c9c9",
                alignItems: "center",
              }}
              onPress={props.followersOnPress}
            >
              <View
                style={{
                  flex: 1,
                  borderColor: darkModeValue ? "gray" : "#c9c9c9",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    margin: 5,
                    color: darkModeValue ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  Followers
                </Text>
                <Text
                  style={{
                    marginBottom: 5,
                    color: darkModeValue ? "white" : "black",
                  }}
                >
                  {userDataProfileHeader.numberOfFollowers}
                </Text>
              </View>
            </TouchableCmp>
          ) : null}
          {!followingValue ? (
            <TouchableCmp
              style={{
                flex: 1,
                borderColor: darkModeValue ? "gray" : "#c9c9c9",
                alignItems: "center",
              }}
              onPress={props.followingOnPress}
            >
              <View
                style={{
                  flex: 1,
                  borderColor: darkModeValue ? "gray" : "#c9c9c9",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    margin: 5,
                    color: darkModeValue ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  Following
                </Text>
                <Text
                  style={{
                    marginBottom: 5,
                    color: darkModeValue ? "white" : "black",
                    fontSize: 15,
                  }}
                >
                  {userDataProfileHeader.numberOfFollowing}
                </Text>
              </View>
            </TouchableCmp>
          ) : null}
          {!advocatesValue ? (
            <TouchableCmp
              style={{
                flex: 1,
                borderColor: darkModeValue ? "gray" : "#c9c9c9",
                alignItems: "center",
              }}
              onPress={props.advocatesOnPress}
            >
              <View
                style={{
                  flex: 1,
                  borderColor: darkModeValue ? "gray" : "#c9c9c9",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    margin: 5,
                    color: darkModeValue ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  Advocates
                </Text>
                <Text
                  style={{
                    marginBottom: 5,
                    color: darkModeValue ? "white" : "black",
                    fontSize: 15,
                  }}
                >
                  {userDataProfileHeader.numberOfAdvocates}
                </Text>
              </View>
            </TouchableCmp>
          ) : null}
        </View>
        {showResumeValue ? (
          <TouchableCmp
            style={{
              ...styles.resumeLink,
              ...props.resumeLink,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            onPress={() => handleLinkOnPress(linktoresume)}
          >
            <View
              style={{
                flexDirection: "row",
                width: "96%",
                alignItems: "center",
                justifyContent: "center",
                ...props.resumeLink,
                borderColor: darkModeValue ? "gray" : "#c9c9c9",
              }}
            >
              <Ionicons
                name="ios-paper"
                size={24}
                color={props.iconResumeStyle}
              />
              <Text style={{ ...styles.resumeText, ...props.resumeText }}>
                Resume
              </Text>
            </View>
          </TouchableCmp>
        ) : null}
        {props.description ? (
          <Text style={props.descriptionStyle}>{props.description}</Text>
        ) : null}
        <FlatList
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
                    ? "46%"
                    : "28%",
              }}
              imageStyle={{
                backgroundColor: "white",
                borderRadius: 5,
              }}
              onPress={() =>
                handleLinkOnPress(
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
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  thirdContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  showCaseLocalImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  resumeLink: {
    flexDirection: "row",
    borderWidth: 1,
    width: "96%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  resumeText: {
    margin: 10,
  },
});

export default ExploreProfileHeader;
