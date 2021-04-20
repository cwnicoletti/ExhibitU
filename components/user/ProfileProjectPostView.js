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
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Cheer from "../../assets/Icons/clap.svg";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import LinkButton from "../UI/LinkButton";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import {
  cheerOwnProfilePost,
  uncheerOwnProfilePost,
} from "../../store/actions/user";

import { LogBox } from "react-native";

const ProfileProjectPostView = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [showClapping, setShowClapping] = useState(false);
  const [loadingCheer, setLoadingCheer] = useState(false);
  const [numberOfCheers, setNumberOfCheers] = useState(props.numberOfCheers);
  const [processingWholeCheer, setProcessingWholeCheer] = useState(false);
  const showcaseId = useSelector((state) => state.user.showcaseId);
  const cheeredPosts = useSelector((state) => state.user.cheeredPosts);
  const fullname = useSelector((state) => state.user.fullname);
  const [clap, setClap] = useState(false);
  const localId = useSelector((state) => state.auth.userId);
  const posterShowcaseId = useSelector((state) => state.user.showcaseId);
  const defaultPostIcon = require("../../assets/default-profile-icon.jpg");
  const source = resolveAssetSource(defaultPostIcon);
  const links = props.links;
  const postId = props.postId;
  const projectId = props.projectId;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  let secondnow = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useEffect(() => {
    if (cheeredPosts.includes(postId)) {
      setClap(true);
    }
  }, [cheeredPosts]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
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

  const handleToubleTap = async () => {
    const now = Date.now();
    if (now - secondnow < 200) {
      await setProcessingWholeCheer(true);
      await setShowClapping(true);
      await fadeIn();
      await slideUp();
      await update();
      await setTimeout(() => {
        fadeOut();
      }, 750);

      await setTimeout(async () => {
        await setShowClapping(false);
      }, 1500);

      if (!cheeredPosts.includes(postId)) {
        await setLoadingCheer(true);
        await dispatch(
          cheerOwnProfilePost(
            localId,
            showcaseId,
            projectId,
            postId,
            posterShowcaseId
          )
        );
        setNumberOfCheers((prevState) => prevState + 1);
        await setLoadingCheer(false);
      }
      await setProcessingWholeCheer(false);
    } else {
      secondnow = now;
    }
  };

  const unCheer = async () => {
    if (cheeredPosts.includes(postId)) {
      await setLoadingCheer(true);
      await dispatch(
        uncheerOwnProfilePost(
          localId,
          showcaseId,
          projectId,
          postId,
          posterShowcaseId
        )
      );
      setNumberOfCheers((prevState) => prevState - 1);
      await setLoadingCheer(false);
    }
  };

  return (
    <View style={{ ...styles.project, ...props.projectContainer }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!processingWholeCheer) {
            handleToubleTap();
          }
        }}
      >
        <View>
          <ImageBackground
            style={{
              height: height,
              width: "100%",
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
                        alignSelf: "center",
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
                            alignSelf: "center",
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
                {loadingCheer ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{ marginRight: 20 }}
                  />
                ) : (
                  <View>
                    {!cheeredPosts.includes(postId) ? (
                      <TouchableCmp onPress={unCheer}>
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
                      </TouchableCmp>
                    ) : (
                      <TouchableCmp onPress={unCheer}>
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
                      </TouchableCmp>
                    )}
                  </View>
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
          <TouchableCmp onPress={props.onSelectCheering}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...styles.pictureCheerNumber,
                  ...props.pictureCheerNumber,
                }}
              >
                {numberOfCheers}
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
          <TouchableCmp onPress={props.onSelectCheering}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...styles.pictureCheerNumber,
                  ...props.pictureCheerNumber,
                }}
              >
                {numberOfCheers}
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
    marginRight: 10,
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

export default ProfileProjectPostView;
