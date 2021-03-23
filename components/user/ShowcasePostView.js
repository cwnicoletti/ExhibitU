import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Cheer from "../../assets/Icons/clap.svg";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import LinkButton from "../UI/LinkButton";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import { LogBox } from "react-native";

const ShowcasePostView = (props) => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [doubleTapped, setDoubleTapped] = useState(false);
  const [showClapping, setShowClapping] = useState(false);
  const [clap, setClap] = useState(false);
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const showCheering = useSelector((state) => state.switches.showCheering);
  const fullname = useSelector((state) => state.user.fullname);
  const defaultPostIcon = require("../../assets/default-profile-icon.jpg");
  const source = resolveAssetSource(defaultPostIcon);
  const links = props.links;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  let secondnow = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    Image.getSize(props.image ? props.image : source, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const screenHeight = Dimensions.get("window").height;

      const scaleFactor = width / screenWidth;
      let imageHeight = height / scaleFactor;

      if (imageHeight > screenHeight / 1.6) {
        imageHeight = screenHeight / 1.6;
      }
      setHeight(imageHeight);
      setWidth(screenWidth);
    });
  }, [Image]);

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -height / 2,
      duration: 750,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
  };

  let clapCount = 0;
  const update = () => {
    setClap((prevState) => !prevState);
    const maxClap = 20;

    if (clapCount < maxClap) {
      setTimeout(() => {
        window.requestAnimationFrame(update);
        clapCount += 1;
      }, 75);
    } else {
      clapCount = 0;
    }
  };

  const handleToubleTap = () => {
    const now = Date.now();
    if (now - secondnow < 200) {
      setDoubleTapped(true);
      setShowClapping(true);

      fadeIn();
      slideUp();
      update();
      setTimeout(() => {
        fadeOut();
      }, 750);

      setTimeout(() => {
        setShowClapping(false);
      }, 1500);
    } else {
      secondnow = now;
    }
  };

  const unCheer = () => {
    setDoubleTapped((prevState) => !prevState);
  };

  return (
    <View style={{ ...styles.project, ...props.projectContainer }}>
      <TouchableWithoutFeedback onPress={handleToubleTap}>
        <View>
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
          >
            {showClapping ? (
              <Animated.View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                {clap ? (
                  <Cheerfill
                    style={{
                      marginTop: height,
                      ...props.clapContainer,
                    }}
                    height={height / 5}
                    width={width / 5}
                    fill="white"
                  />
                ) : (
                  <Cheer
                    style={{
                      marginTop: height,
                      ...props.clapContainer,
                      transform: [{ rotate: "5deg" }],
                    }}
                    height={height / 5}
                    width={width / 5}
                    fill="white"
                  />
                )}
              </Animated.View>
            ) : null}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <TouchableCmp onPress={props.onSelectProfile}>
                    <View
                      style={{
                        marginLeft: 15,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                        }}
                      >
                        <Image
                          style={{
                            ...styles.profileImage,
                            ...props.profileImageStyle,
                          }}
                          source={
                            props.profileImageSource
                              ? { uri: props.profileImageSource }
                              : require("../../assets/default-profile-icon.jpg")
                          }
                        />
                      </View>
                      <Text
                        style={{
                          color: darkModeValue ? "white" : "black",
                          marginTop: 3,
                          textAlign: "center",
                        }}
                      >
                        {fullname.split(" ")[0].length > 10
                          ? fullname.substring(0, 10) + "..."
                          : fullname.split(" ")[0]}
                      </Text>
                    </View>
                  </TouchableCmp>
                </View>
                {!doubleTapped ? (
                  <TouchableWithoutFeedback onPress={unCheer}>
                    <View>
                      <Cheer
                        style={{
                          ...styles.clapContainer,
                          ...props.clapContainer,
                        }}
                        height={30}
                        width={30}
                        fill="white"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback onPress={unCheer}>
                    <View>
                      <Cheerfill
                        style={{
                          ...styles.clapContainer,
                          ...props.clapContainer,
                        }}
                        height={30}
                        width={30}
                        fill="white"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      {Object.keys(links).length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {showCheering ? (
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
          ) : null}
          <View style={{ justifyContent: "center" }}>
            <FlatList
              data={Object.values(links)}
              keyExtractor={(item) => item.linkId}
              numColumns={
                Object.keys(links).length <= 1
                  ? 1
                  : Object.keys(links).length === 2
                  ? 2
                  : 3
              }
              renderItem={(itemData) => (
                <LinkButton
                  imageUrl={
                    itemData.item[`linkImageUrl${itemData.item.linkId}`]
                  }
                  title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                  textStyle={{ color: darkModeValue ? "white" : "black" }}
                  linkContainer={{
                    borderColor: "gray",
                    width:
                      Object.keys(links).length <= 1
                        ? "96%"
                        : Object.keys(links).length === 2
                        ? "46%"
                        : "28%",
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
      ) : (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <FlatList
            data={Object.values(links)}
            keyExtractor={(item) => item.linkId}
            numColumns={
              Object.keys(links).length <= 1
                ? 1
                : Object.keys(links).length === 2
                ? 2
                : 3
            }
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={(itemData) => (
              <LinkButton
                imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
                title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                textStyle={{ color: darkModeValue ? "white" : "black" }}
                linkContainer={{
                  borderColor: "gray",
                  width:
                    Object.keys(links).length <= 1
                      ? "96%"
                      : Object.keys(links).length === 2
                      ? "46%"
                      : "28%",
                }}
                onPress={() =>
                  handleLinkOnPress(
                    itemData.item[`linkUrl${itemData.item.linkId}`]
                  )
                }
              />
            )}
          />
          {showCheering ? (
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
    </View>
  );
};

const styles = StyleSheet.create({
  project: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: "white",
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  nameUsernameContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  nameStyle: {
    fontWeight: "bold",
  },
  usernameStyle: {
    marginTop: 2,
  },
  dotsContainer: {
    flex: 1,
    justifyContent: "flex-end",
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
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
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
  pictureCommentNumber: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
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

export default ShowcasePostView;
