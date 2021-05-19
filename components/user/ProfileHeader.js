import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";

import UserTitleEdit from "./UserTitleEdit";
import LinkButton from "../UI/LinkButton";

const Profile = (props) => {
  const links = props.links;
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const followingValue = useSelector((state) => state.user.hideFollowing);
  const followersValue = useSelector((state) => state.user.hideFollowers);
  const advocatesValue = useSelector((state) => state.user.hideAdvocates);
  const showResumeValue = useSelector((state) => state.user.showResume);

  const userDataProfileHeader = {
    resumeLink: useSelector((state) => state.user.resumeLink),
    numberOfFollowers: useSelector((state) => state.user.numberOfFollowers),
    numberOfFollowing: useSelector((state) => state.user.numberOfFollowing),
    numberOfAdvocates: useSelector((state) => state.user.numberOfAdvocates),
  };

  const linktoresume = userDataProfileHeader.resumeLink;

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
        <UserTitleEdit {...props} />
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
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableCmp onPress={props.onAddNewProjectPress}>
          <View
            style={{
              margin: 20,
              marginTop: 10,
              paddingHorizontal: "20%",
              flexDirection: "row",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-add"
              size={14}
              color={darkModeValue ? "white" : "black"}
            />
            <Text
              style={{
                margin: 7,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Create exhibit
            </Text>
          </View>
        </TouchableCmp>
      </View>
      <Text
        style={{
          color: darkModeValue ? "white" : "black",
          fontSize: 12,
        }}
      >
        Columns
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableCmp onPress={props.changeColumnToTwo}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              ...props.columnTwoStyle,
            }}
          >
            <View
              style={{
                width: 9,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 9,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
        <TouchableCmp onPress={props.changeColumnToThree}>
          <View
            style={{
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              ...props.columnThreeStyle,
            }}
          >
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
        <TouchableCmp onPress={props.changeColumnToFour}>
          <View
            style={{
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              ...props.columnFourStyle,
            }}
          >
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
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

export default Profile;
