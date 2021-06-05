import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { useDispatch, useSelector } from "react-redux";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import Cheer from "../../assets/Icons/clap.svg";
import {
  cheerOwnFeedPost,
  cheerPost,
  uncheerOwnFeedPost,
  uncheerPost,
} from "../../store/actions/user";
import LinkButton from "../UI/LinkButton";

const toDateTime = (seconds) => {
  let t = new Date(0); // Epoch
  t.setUTCSeconds(seconds);
  return t;
};

const handleLinkOnPress = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};

const FeedItem = (props) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [processingWholeCheer, setProcessingWholeCheer] = useState(false);
  const [loadingCheer, setLoadingCheer] = useState(false);
  const [showClapping, setShowClapping] = useState(false);
  const [clap, setClap] = useState(false);
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const cheeredPosts = useSelector((state) => state.user.cheeredPosts);
  const showCheering = useSelector((state) => state.user.showCheering);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const projectId = props.projectId;
  const postId = props.postId;
  const posterExhibitUId = props.posterExhibitUId;
  const currentUsersPost = ExhibitUId === posterExhibitUId ? true : false;
  const links = props.links ? props.links : {};
  const fullname = props.fullname;
  const defaultPostIcon = require("../../assets/default-profile-icon.jpg");
  const source = resolveAssetSource(defaultPostIcon);
  const postDateCreated = toDateTime(props.postDateCreated);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useEffect(() => {
    if (cheeredPosts.includes(postId)) {
      setClap(true);
    } else {
      setClap(false);
    }
  }, [cheeredPosts]);

  useEffect(() => {
    Image.getSize(props.image ? props.image : source, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;

      const scaleFactor = width / screenWidth;
      let imageHeight = height / scaleFactor;

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

  let secondnow = null;
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
          cheerPost(localId, ExhibitUId, projectId, postId, posterExhibitUId)
        );
        if (ExhibitUId === posterExhibitUId) {
          await dispatch(cheerOwnFeedPost(ExhibitUId, projectId, postId));
        }
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
        uncheerPost(localId, ExhibitUId, projectId, postId, posterExhibitUId)
      );
      if (ExhibitUId === posterExhibitUId) {
        await dispatch(uncheerOwnFeedPost(ExhibitUId, projectId, postId));
      }
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
                          color: "white",
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
                    style={{ marginRight: 10 }}
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
                              flex: 1,
                            }}
                            height={28}
                            width={28}
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
                              flex: 1,
                            }}
                            height={28}
                            width={28}
                            fill="white"
                          />
                        </View>
                      </TouchableCmp>
                    )}
                  </View>
                )}
              </View>
            </View>
            <TouchableCmp onPress={props.onSelect}>
              <LinearGradient
                style={{
                  ...styles.titleContainer,
                  ...props.titleContainer,
                }}
                colors={props.projectTitleColors}
              >
                <View style={styles.balance} />
                <View style={styles.titleTextContainer}>
                  <Text style={{ ...styles.title, ...props.titleStyle }}>
                    {props.projectTitle}
                  </Text>
                </View>
                <AntDesign
                  style={{ marginRight: 5 }}
                  name="arrowright"
                  size={28}
                  color={props.arrowColor}
                />
              </LinearGradient>
            </TouchableCmp>
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
          {currentUsersPost ? (
            showCheering && props.numberOfCheers >= 1 ? (
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
          ) : props.numberOfCheers >= 1 ? (
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
          <View style={{ alignItems: "center" }}>
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
          <View style={{ alignItems: "center" }}>
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
                  imageUrl={
                    itemData.item[`linkImageUrl${itemData.item.linkId}`]
                  }
                  title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                  textStyle={{ color: darkModeValue ? "white" : "black" }}
                  linkContainer={{
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
          {showCheering && props.numberOfCheers >= 1 ? (
            <TouchableCmp onPress={props.onSelectCheering}>
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
            </TouchableCmp>
          ) : null}
        </View>
      )}
      {props.caption ? (
        <View style={{ ...styles.captionContainer, ...props.captionContainer }}>
          <Text style={{ ...styles.caption, ...props.captionStyle }}>
            {props.caption}
          </Text>
        </View>
      ) : null}
      <View style={{ ...styles.dateContainer, ...props.dateContainer }}>
        <Text
          style={{ ...styles.date, ...props.dateStyle, flexDirection: "row" }}
        >
          {`${postDateCreated.toLocaleString("UTC", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
          {", "}
          {`${postDateCreated.toLocaleString("UTC", {
            hour: "numeric",
            minute: "numeric",
          })}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  project: {},
  profileImage: {
    borderWidth: 1,
    borderColor: "white",
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
    marginTop: 5,
    marginLeft: 3,
  },
  pictureCommentNumber: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 3,
  },
  pictureCheerText: {
    fontSize: 15,
    marginLeft: 3,
    marginTop: 5,
  },
  captionContainer: {
    justifyContent: "center",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  clapContainer: {
    marginRight: 10,
  },
  commentContainer: {
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
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

export default FeedItem;
