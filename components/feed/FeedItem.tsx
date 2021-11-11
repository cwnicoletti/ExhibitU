import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
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
  sendNotification,
} from "../../store/actions/user/user";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import toDateTime from "../../helper/toDateTime";
import TimeStamp from "../UI/TimeStamp";
import useDidMountEffect from "../../helper/useDidMountEffect";
import LinksList from "../UI/LinksList";

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
  const cheering = props.cheering;
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exhibitId = props.exhibitId;
  const postId = props.postId;
  const posterExhibitUId = props.posterExhibitUId;
  const currentUsersPost = ExhibitUId === posterExhibitUId ? true : false;
  const links = props.links ? Object.values(props.links) : [];
  const fullname = props.fullname;
  const username = props.username;
  const currentUsername = useAppSelector((state) => state.user.username);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );
  const jobTitle = props.jobTitle;
  const postUrl = props.postUrl;
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

  useDidMountEffect(() => {
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

      if (!cheering.includes(ExhibitUId)) {
        await setLoadingCheer(true);
        dispatch(
          sendNotification(
            currentUsername,
            ExhibitUId,
            exhibitId,
            postId,
            posterExhibitUId,
            profilePictureUrl,
            postUrl,
            "cheer"
          )
        );
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
    if (cheering.includes(ExhibitUId)) {
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
    <View style={{ ...styles.exhibitContainer, ...props.exhibitContainer }}>
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
                zIndex: 3,
              }}
              colors={greyColorValues}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ) : null}
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
                        color: darkModeValue ? "white" : "black",
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
                          color: darkModeValue ? "white" : "black",
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
              </TouchableCmp>
            </View>
            <View style={{ justifyContent: "center" }}>
              {loadingCheer ? (
                <ActivityIndicator
                  size="small"
                  color={darkModeValue ? "white" : "black"}
                  style={{ marginRight: 10 }}
                />
              ) : (
                <View>
                  {cheering.includes(ExhibitUId) ? (
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
                          fill={darkModeValue ? "white" : "black"}
                        />
                      </View>
                    </TouchableCmp>
                  ) : (
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
                          fill={darkModeValue ? "white" : "black"}
                        />
                      </View>
                    </TouchableCmp>
                  )}
                </View>
              )}
            </View>
          </View>
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
                    fill={darkModeValue ? "white" : "black"}
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
                    fill={darkModeValue ? "white" : "black"}
                  />
                )}
              </Animated.View>
            ) : null}
            <View style={{ flex: 1 }} />
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
      {links.length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <LinksList links={links} />
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
            <LinksList links={links} />
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
  exhibitContainer: {},
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
