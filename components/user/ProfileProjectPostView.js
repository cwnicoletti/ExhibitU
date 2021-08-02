import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import Cheer from "../../assets/Icons/clap.svg";
import {
  cheerOwnProfilePost,
  uncheerOwnProfilePost,
} from "../../store/actions/user";
import LinkButton from "../UI/LinkButton";
import toDateTime from "../../helper/toDateTime";
import * as WebBrowser from "expo-web-browser";
import TimeStamp from "../UI/TimeStamp";

const ProfileProjectPostView = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const [photoHeight, setHeight] = useState(null);
  const [photoWidth, setWidth] = useState(null);
  const [showClapping, setShowClapping] = useState(false);
  const [loadingCheer, setLoadingCheer] = useState(false);
  const [numberOfCheers, setNumberOfCheers] = useState(props.numberOfCheers);
  const [processingWholeCheer, setProcessingWholeCheer] = useState(false);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [clap, setClap] = useState(false);
  const localId = useAppSelector((state) => state.auth.userId);
  const posterExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const defaultPostIcon = require("../../assets/default-profile-icon.jpg");
  const source = resolveAssetSource(defaultPostIcon);
  const links = props.links;
  const postId = props.postId;
  const projectId = props.projectId;
  const postDateCreated = toDateTime(props.postDateCreated);

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
      toValue: -photoHeight / 2,
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
            ExhibitUId,
            projectId,
            postId,
            posterExhibitUId
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
          ExhibitUId,
          projectId,
          postId,
          posterExhibitUId
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
              height: photoHeight,
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
                      marginTop: photoHeight,
                      ...props.clapContainer,
                    }}
                    height={photoHeight / 5}
                    width={photoWidth / 5}
                    fill="white"
                  />
                ) : (
                  <Cheer
                    style={{
                      marginTop: photoHeight,
                      ...props.clapContainer,
                      transform: [{ rotate: "5deg" }],
                    }}
                    height={photoHeight / 5}
                    width={photoWidth / 5}
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
          }}
        >
          <FlatList
            data={Object.values(links)}
            keyExtractor={(item) => item.linkId}
            numColumns={1}
            renderItem={(itemData) => (
              <LinkButton
                imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
                title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                textStyle={{ color: darkModeValue ? "white" : "black" }}
                linkContainer={{
                  width: "100%",
                }}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    itemData.item[`linkUrl${itemData.item.linkId}`]
                  )
                }
              />
            )}
          />
          {showCheering ? (
            numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
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
          <View style={{ alignItems: "center" }}>
            <FlatList
              data={Object.values(links)}
              keyExtractor={(item) => item.linkId}
              numColumns={Object.keys(links).length === 2 ? 2 : 3}
              columnWrapperStyle={{ justifyContent: "center" }}
              renderItem={(itemData) => (
                <LinkButton
                  imageUrl={
                    itemData.item[`linkImageUrl${itemData.item.linkId}`]
                  }
                  title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                  textStyle={{ color: darkModeValue ? "white" : "black" }}
                  linkContainer={{
                    width: Object.keys(links).length === 2 ? "46%" : "28%",
                  }}
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
                      itemData.item[`linkUrl${itemData.item.linkId}`]
                    )
                  }
                />
              )}
            />
          </View>
          {showCheering && numberOfCheers >= 1 ? (
            <TouchableCmp onPress={props.onSelectCheering}>
              <View style={{ flexDirection: "row", padding: 10 }}>
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
  date: {
    margin: 10,
    fontSize: 13,
  },
  caption: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: "10%",
    fontSize: 13,
  },
  pictureCheerContainer: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  pictureCheerNumber: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 3,
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
  dateContainer: {
    alignItems: "flex-end",
  },
});

export default ProfileProjectPostView;
