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
    <View style={{ flexDirection: "row", ...props.nameContainer }}>
      <View
        style={{
          flex: 1,
          marginVertical: 5,
        }}
      >
        <TouchableCmp onPress={props.onSelectProfile}>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
            }}
          >
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
    justifyContent: "center",
  },

  caption: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: "10%",
    fontSize: 13,
  },
});

export default FeedItemHeader;
