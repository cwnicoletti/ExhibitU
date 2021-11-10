import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import Cheer from "../../assets/Icons/clap.svg";
import TimeStamp from "../UI/TimeStamp";
import {
  cheerOwnFeedPost,
  cheerPost,
  uncheerOwnFeedPost,
  uncheerPost,
} from "../../store/actions/user/user";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import useDidMountEffect from "../../helper/useDidMountEffect";
import toDateTime from "../../helper/toDateTime";
import LinksList from "../UI/LinksList";

const ExplorePostView = (props) => {
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
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const cheering = props.cheering;
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const posterExhibitUId = props.posterExhibitUId;
  const currentUsersPost = ExhibitUId === posterExhibitUId ? true : false;
  const links = props.links ? Object.values(props.links) : {};
  const postId = props.postId;
  const exhibitId = props.exhibitId;
  const fullname = props.fullname;
  const jobTitle = props.jobTitle;
  const username = props.username;
  const postDateCreated = toDateTime(props.postDateCreated);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

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

      if (!cheering.includes(ExhibitUId)) {
        await setLoadingCheer(true);
        await dispatch(
          await cheerPost(
            localId,
            ExhibitUId,
            exhibitId,
            postId,
            posterExhibitUId
          )
        );
        if (currentUsersPost) {
          await dispatch(await cheerOwnFeedPost(ExhibitUId, exhibitId, postId));
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
        await uncheerPost(
          localId,
          ExhibitUId,
          exhibitId,
          postId,
          posterExhibitUId
        )
      );
      if (currentUsersPost) {
        await dispatch(await uncheerOwnFeedPost(ExhibitUId, exhibitId, postId));
      }
      await setLoadingCheer(false);
    }
  };

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!processingWholeCheer) {
            handleToubleTap();
          }
        }}
      >
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
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
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
              {loadingCheer ? (
                <ActivityIndicator
                  size="small"
                  color="white"
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
                          fill="white"
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
                          fill="white"
                        />
                      </View>
                    </TouchableCmp>
                  )}
                </View>
              )}
            </View>
          </View>
          {imageIsLoading ? (
            <AnimatedGradient
              style={{
                height: photoHeight,
                width: "100%",
                position: "absolute",
                zIndex: 3,
              }}
              colors={greyColorValues}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ) : null}
          <ImageBackground
            style={{
              height: photoHeight,
              width: photoWidth,
            }}
            source={props.image}
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
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.pictureCheerContainer,
          ...props.pictureCheerContainer,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <LinksList links={links} />
        </View>
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
  exhibit: {},
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
});

export default ExplorePostView;
