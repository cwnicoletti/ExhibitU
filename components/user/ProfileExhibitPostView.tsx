import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import Cheerfill from "../../assets/Icons/clap-fill.svg";
import Cheer from "../../assets/Icons/clap.svg";
import {
  cheerOwnProfilePost,
  uncheerOwnProfilePost,
} from "../../store/actions/user/user";
import toDateTime from "../../helper/toDateTime";
import TimeStamp from "../UI/TimeStamp";
import useDidMountEffect from "../../helper/useDidMountEffect";
import LinksList from "../UI/LinksList";

const ProfileExhibitPostView = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const [showClapping, setShowClapping] = useState(false);
  const [loadingCheer, setLoadingCheer] = useState(false);
  const [numberOfCheers, setNumberOfCheers] = useState(props.numberOfCheers);
  const [processingWholeCheer, setProcessingWholeCheer] = useState(false);
  const [clap, setClap] = useState(false);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(true);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const localId = useAppSelector((state) => state.auth.userId);
  const posterExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const links = Object.values(props.links);
  const postId = props.postId;
  const exhibitId = props.exhibitId;
  const fullname = props.fullname;
  const username = props.username;
  const jobTitle = props.jobTitle;
  const postDateCreated = toDateTime(props.postDateCreated);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Post background-picture width, height
  const photoWidth = Dimensions.get("window").width;
  const scaleFactor = 500 / photoWidth;
  let imageHeight = 500 / scaleFactor;
  const photoHeight = imageHeight;

  let secondnow = null;
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
  }, [profileImageIsLoading]);

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
            exhibitId,
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
          exhibitId,
          postId,
          posterExhibitUId
        )
      );
      setNumberOfCheers((prevState) => prevState - 1);
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
                        borderWidth: 1,
                        borderColor: "white",
                        position: "absolute",
                        zIndex: 3,
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
                      fontSize: 12,
                    }}
                  >
                    {fullname}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: 12,
                      marginLeft: 5,
                    }}
                  >
                    {jobTitle}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 11,
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
            <LinksList links={links} />
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

export default ProfileExhibitPostView;
