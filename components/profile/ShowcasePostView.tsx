import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../hooks";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import useDidMountEffect from "../../helper/useDidMountEffect";
import toDateTime from "../../helper/toDateTime";
import TimeStamp from "../UI/TimeStamp";
import LinksList from "../UI/LinksList";

const ExhibitUPostView = (props) => {
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const links = Object.values(props.links);
  const postDateCreated = toDateTime(props.postDateCreated);
  const fullname = props.fullname;
  const username = props.username;
  const jobTitle = props.jobTitle;

  // Post background-picture width, height
  const photoWidth = Dimensions.get("window").width;
  const scaleFactor = 500 / photoWidth;
  let imageHeight = 500 / scaleFactor;
  const photoHeight = imageHeight;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useDidMountEffect(() => {
    setGreyColorValues(["rgba(50,50,50,1)", "rgba(0,0,0,1)"]);
  }, [profileImageIsLoading]);

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      <TouchableWithoutFeedback>
        <View>
          <View style={{ flexDirection: "row", ...props.nameContainer }}>
            <View
              style={{
                flex: 1,
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 45 / 2,
                  }}
                >
                  {profileImageIsLoading ? (
                    <AnimatedGradient
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        height: 45,
                        width: 45,
                        borderRadius: 45 / 2,
                      }}
                      colors={greyColorValues}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    />
                  ) : null}
                  <Image
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 45 / 2,
                      ...props.profileImageStyle,
                    }}
                    source={
                      props.profileImageSource
                        ? { uri: props.profileImageSource }
                        : require("../../assets/default-profile-icon.jpg")
                    }
                    onLoadEnd={() => {
                      setProfileImageIsLoading(false);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",
                      marginLeft: 5,
                      fontSize: 11,
                    }}
                  >
                    {fullname}
                  </Text>
                  {jobTitle ? (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 11,
                        marginLeft: 5,
                      }}
                    >
                      {jobTitle}
                    </Text>
                  ) : null}
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    {username}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <ImageBackground
            style={{
              height: photoHeight,
              width: photoWidth,
            }}
            source={
              props.image
                ? { uri: props.image }
                : require("../../assets/default-post-icon.png")
            }
          />
        </View>
      </TouchableWithoutFeedback>
      {links.length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <LinksList links={links} />
          {showCheering ? (
            props.numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.pictureCheerNumber,
                      ...props.pictureCheerNumber,
                    }}
                  >
                    {props.numberOfCheers}
                  </Text>
                  <Text
                    style={{
                      ...styles.pictureCheerText,
                      ...props.pictureCheerText,
                    }}
                  >
                    cheering
                  </Text>
                </View>
              </TouchableCmp>
            ) : null
          ) : null}
        </View>
      ) : (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <LinksList links={links} />
          {showCheering ? (
            props.numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.pictureCheerNumber,
                      ...props.pictureCheerNumber,
                    }}
                  >
                    {props.numberOfCheers}
                  </Text>
                  <Text
                    style={{
                      ...styles.pictureCheerText,
                      ...props.pictureCheerText,
                    }}
                  >
                    cheering
                  </Text>
                </View>
              </TouchableCmp>
            ) : null
          ) : null}
        </View>
      )}
      <View style={{ ...styles.captionContainer, ...props.captionContainer }}>
        <Text
          style={{
            ...styles.caption,
            ...props.captionStyle,
          }}
        >
          {props.caption}
        </Text>
      </View>
      <TimeStamp
        postDateCreated={postDateCreated}
        dateContainer={props.dateContainer}
        dateStyle={props.dateStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caption: {
    textAlign: "center",
    margin: 10,
    fontSize: 13,
  },
  pictureCheerContainer: {
    padding: 10,
  },
  pictureCheerNumber: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
    marginTop: 5,
  },
  pictureCheerText: {
    fontSize: 15,
    marginLeft: 3,
    marginTop: 5,
  },
  captionContainer: {
    justifyContent: "center",
  },
  clapContainer: {
    marginRight: 15,
  },
  commentContainer: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
});

export default ExhibitUPostView;
