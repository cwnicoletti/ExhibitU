import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinksList from "../UI/LinksList";
import ProfileStats from "../UI/ProfileStats";
import UserTitleShowcaseLocal from "../user/UserTitleShowcaseLocal";

const FeedProfileHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);

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
          exhibitsValue={props.hideExhibits}
          followersOnPress={props.followersOnPress}
          followingOnPress={props.followingOnPress}
          numberOfFollowers={props.numberOfFollowers}
          numberOfFollowing={props.numberOfFollowing}
          numberOfExhibits={props.numberOfExhibits}
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
});

export default FeedProfileHeader;
