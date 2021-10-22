import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";
import toDateTime from "../../helper/toDateTime";
import LinksList from "../UI/LinksList";
import useDidMountEffect from "../../helper/useDidMountEffect";
import Cheer from "../../assets/Icons/clap.svg";

const ExhibitItem = (props) => {
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);
  const fullname = useAppSelector((state) => state.user.fullname);
  const username = useAppSelector((state) => state.user.username);
  const jobTitle = useAppSelector((state) => state.user.jobTitle);
  const links = Object.values(props.links);
  const currentTime = toDateTime(
    Math.floor(Date.now() / 1000)
  ).toLocaleString();

  // Post background-picture width, height
  const width = Dimensions.get("window").width;
  const scaleFactor = 500 / width;
  let imageHeight = 500 / scaleFactor;
  const height = imageHeight;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useDidMountEffect(() => {
    setGreyColorValues(["rgba(50,50,50,1)", "rgba(0,0,0,1)"]);
  }, [profileImageIsLoading]);

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
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
          <View style={{ justifyContent: "center" }}>
            <View>
              <Cheer
                style={{
                  ...styles.clapContainer,
                  ...props.clapContainer,
                  flex: 1,
                }}
                height={28}
                width={28}
                fill="white"
              />
            </View>
          </View>
        </View>
        <ImageBackground
          style={{
            height: height,
            width: width,
          }}
          source={
            props.image
              ? { uri: props.image }
              : require("../../assets/default-post-icon.png")
          }
        />
      </View>
      {links.length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
          <View style={{ justifyContent: "center" }}>
            <LinksList links={links} />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <LinksList links={links} />
          <View style={{ flexDirection: "row", padding: 10 }}>
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
        </View>
      )}
      {props.caption ? (
        <View
          style={{
            ...styles.captionContainer,
            ...props.captionContainer,
          }}
        >
          <Text style={{ ...styles.caption, ...props.captionStyle }}>
            {props.caption}
          </Text>
        </View>
      ) : null}
      <View style={{ ...styles.dateContainer, ...props.dateContainer }}>
        <Text style={{ ...styles.date, ...props.dateStyle }}>
          {`${currentTime}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
    borderWidth: 1,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caption: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: "10%",
    fontSize: 13,
  },
  date: {
    margin: 10,
    fontSize: 13,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
  },
  pictureCheerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  pictureCheerNumber: {
    fontWeight: "bold",
    fontSize: 15,
  },
  pictureCheerText: {
    fontSize: 15,
    marginLeft: 3,
  },
  captionContainer: {
    justifyContent: "center",
  },
  clapContainer: {
    marginRight: 10,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  balance: {
    width: 24,
    height: "100%",
  },
});

export default ExhibitItem;
