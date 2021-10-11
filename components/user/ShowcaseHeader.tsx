import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";
import LinksList from "../UI/LinksList";
import ProfileStats from "../UI/ProfileStats";
import UserTitleShowcaseLocal from "./UserTitleShowcaseLocal";

const ExhibitUHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);
  const followingValue = props.followingValue;
  const followersValue = props.followersValue;
  const exhibitsValue = props.exhibitsValue;
  const numberOfExhibits = props.numberOfExhibits;

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
          exhibitsValue={exhibitsValue}
          followersOnPress={props.followersOnPress}
          followingOnPress={props.followingOnPress}
          advocatesOnPress={props.advocatesOnPress}
          numberOfFollowers={userDataProfileHeader.numberOfFollowers}
          numberOfFollowing={userDataProfileHeader.numberOfFollowing}
          numberOfExhibits={numberOfExhibits}
        />
        {props.description ? (
          <Text style={props.descriptionStyle}>{props.description}</Text>
        ) : null}
        <LinksList links={links} />
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
