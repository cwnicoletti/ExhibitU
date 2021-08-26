import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../hooks";
import LinksList from "../UI/LinksList";
import ProfileStats from "../UI/ProfileStats";
import UserTitleEdit from "./UserTitleEdit";

const Profile = (props) => {
  const links = Object.values(props.links);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const followingValue = useAppSelector((state) => state.user.hideFollowing);
  const followersValue = useAppSelector((state) => state.user.hideFollowers);
  const advocatesValue = useAppSelector((state) => state.user.hideAdvocates);
  const profileExhibits = useAppSelector((state) => state.user.profileExhibits);

  const userDataProfileHeader = {
    numberOfFollowers: useAppSelector((state) => state.user.numberOfFollowers),
    numberOfFollowing: useAppSelector((state) => state.user.numberOfFollowing),
    numberOfAdvocates: useAppSelector((state) => state.user.numberOfAdvocates),
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
        <UserTitleEdit {...props} />
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
        <LinksList links={links} />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableCmp onPress={props.onAddNewExhibitPress}>
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
      {Object.keys(profileExhibits).length > 0 ? (
        <View>
          <Text
            style={{
              color: darkModeValue ? "white" : "black",
              fontSize: 12,
            }}
          >
            Columns
          </Text>
          <View style={{ flexDirection: "row" }}>
            {!props.isLoadingTwoColumns ? (
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
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  width: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  ...props.columnTwoStyle,
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={darkModeValue ? "white" : "black"}
                />
              </View>
            )}
            {!props.isLoadingThreeColumns ? (
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
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  width: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  ...props.columnThreeStyle,
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={darkModeValue ? "white" : "black"}
                />
              </View>
            )}
            {!props.isLoadingFourColumns ? (
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
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  width: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  ...props.columnFourStyle,
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={darkModeValue ? "white" : "black"}
                />
              </View>
            )}
          </View>
        </View>
      ) : null}
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

export default Profile;
