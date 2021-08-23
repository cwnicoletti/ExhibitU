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
import { useAppDispatch, useAppSelector } from "../../hooks";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import Cheer from "../../assets/Icons/clap.svg";
import {
  cheerOwnFeedPost,
  cheerPost,
  uncheerOwnFeedPost,
  uncheerPost,
} from "../../store/actions/user/user";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import LinkButton from "../UI/LinkButton";
import toDateTime from "../../helper/toDateTime";
import TimeStamp from "../UI/TimeStamp";
import useDidMountEffect from "../../helper/useDidMountEffect";

const FeedItem = (props) => {
  const dispatch = useAppDispatch();
  const [processingWholeCheer, setProcessingWholeCheer] = useState(false);
  const [loadingCheer, setLoadingCheer] = useState(false);
  const [showClapping, setShowClapping] = useState(false);
  const [clap, setClap] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exhibitId = props.exhibitId;
  const postId = props.postId;
  const posterExhibitUId = props.posterExhibitUId;
  const currentUsersPost = ExhibitUId === posterExhibitUId ? true : false;
  const links = props.links ? props.links : {};
  const fullname = props.fullname;
  const postDateCreated = toDateTime(props.postDateCreated);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Post background-picture width, height
  const width = Dimensions.get("window").width;
  const scaleFactor = 500 / width;
  let imageHeight = 500 / scaleFactor;
  const height = imageHeight;

  let TouchableCmp: any = TouchableOpacity;
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

  useDidMountEffect(() => {
    setGreyColorValues(["rgba(50,50,50,1)", "rgba(0,0,0,1)"]);
  }, [imageIsLoading, profileImageIsLoading]);

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -height,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  let clapCount = 0;
  const updateClap = () => {
    setClap((prevState) => !prevState);
    const maxClap = 30;

    if (clapCount < maxClap) {
      setTimeout(() => {
        window.requestAnimationFrame(updateClap);
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
      await updateClap();
      await setTimeout(() => {
        fadeOut();
      }, 750);

      await setTimeout(async () => {
        await setShowClapping(false);
      }, 1500);

      if (!cheeredPosts.includes(postId)) {
        await setLoadingCheer(true);
        await dispatch(
          cheerPost(localId, ExhibitUId, exhibitId, postId, posterExhibitUId)
        );
        if (ExhibitUId === posterExhibitUId) {
          await dispatch(cheerOwnFeedPost(ExhibitUId, exhibitId, postId));
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
        uncheerPost(localId, ExhibitUId, exhibitId, postId, posterExhibitUId)
      );
      if (ExhibitUId === posterExhibitUId) {
        await dispatch(uncheerOwnFeedPost(ExhibitUId, exhibitId, postId));
      }
      await setLoadingCheer(false);
    }
  };

  return (
    <View style={{ ...props.exhibitContainer }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!processingWholeCheer) {
            handleToubleTap();
          }
        }}
      >
        <View>
          {imageIsLoading ? (
            <AnimatedGradient
              style={{
                height: height,
                width: "100%",
                position: "absolute",
                zindex: 3,
              }}
              colors={greyColorValues}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ) : null}
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
            onLoadStart={() => {
              setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
            }}
            onLoadEnd={() => {
              setImageIsLoading(false);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  style={{
                    ...styles.profilePictureContainer,
                    ...props.profilePictureContainer,
                  }}
                  colors={props.profilePictureColors}
                >
                  <View
                    style={{
                      flex: 1,
                      marginVertical: 10,
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
                          {profileImageIsLoading ? (
                            <AnimatedGradient
                              style={{
                                borderWidth: 1,
                                borderColor: "white",
                                position: "absolute",
                                zindex: 3,
                                height: 50,
                                width: 50,
                                borderRadius: 50 / 2,
                              }}
                              colors={greyColorValues}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                            />
                          ) : null}
                          <Image
                            style={{
                              borderWidth: 1,
                              borderColor: "white",
                              height: 50,
                              width: 50,
                              borderRadius: 50 / 2,
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
                </LinearGradient>
              </View>
            </View>
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
            <TouchableCmp onPress={props.onSelect}>
              <LinearGradient
                style={{
                  ...styles.titleContainer,
                  ...props.titleContainer,
                }}
                colors={props.exhibitTitleColors}
              >
                <View style={styles.balance} />
                <View style={styles.titleTextContainer}>
                  <Text style={{ ...styles.title, ...props.titleStyle }}>
                    {props.exhibitTitle}
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
          }}
        >
          <FlatList<any>
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
          {currentUsersPost ? (
            showCheering && props.numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
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
        </View>
      ) : (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <FlatList<any>
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
      <TimeStamp
        postDateCreated={postDateCreated}
        dateContainer={props.dateContainer}
        dateStyle={props.dateStyle}
        dateLength={"short"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  profilePictureContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
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
