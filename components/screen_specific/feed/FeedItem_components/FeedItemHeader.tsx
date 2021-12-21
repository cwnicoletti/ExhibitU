import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import CheerIcon from "./FeedItemHeader_components/CheerIcon";
import ProfilePicture from "./FeedItemHeader_components/ProfilePicture";
import UserTitle from "./FeedItemHeader_components/UserTitle";

const FeedItemHeader = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.container, ...props.nameContainer }}>
      <View style={styles.profileContentContainer}>
        {props.profileClickable ? (
          <TouchableCmp onPress={props.onSelectProfile}>
            <View style={styles.profileContent}>
              <ProfilePicture
                profileImageIsLoading={props.profileImageIsLoading}
                greyColorValues={props.greyColorValues}
                profileImageStyle={props.profileImageStyle}
                profileImageSource={props.profileImageSource}
                setProfileImageIsLoading={props.setProfileImageIsLoading}
              />
              <UserTitle
                darkModeValue={props.darkModeValue}
                fullname={props.fullname}
                jobTitle={props.jobTitle}
                username={props.username}
              />
            </View>
          </TouchableCmp>
        ) : (
          <View style={styles.profileContent}>
            <ProfilePicture
              profileImageIsLoading={props.profileImageIsLoading}
              greyColorValues={props.greyColorValues}
              profileImageStyle={props.profileImageStyle}
              profileImageSource={props.profileImageSource}
              setProfileImageIsLoading={props.setProfileImageIsLoading}
            />
            <UserTitle
              darkModeValue={props.darkModeValue}
              fullname={props.fullname}
              jobTitle={props.jobTitle}
              username={props.username}
            />
          </View>
        )}
      </View>
      <CheerIcon
        loadingCheer={props.loadingCheer}
        darkModeValue={props.darkModeValue}
        ExhibitUId={props.ExhibitUId}
        cheering={props.cheering}
        unCheer={() => props.unCheer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  profileContentContainer: {
    flex: 1,
    marginVertical: 5,
  },

  profileContent: {
    marginLeft: 10,
    flexDirection: "row",
  },
});

export default FeedItemHeader;
