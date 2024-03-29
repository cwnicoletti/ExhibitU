import React, { useRef, useState } from "react";
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
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  cheerOwnFeedPost,
  cheerPost,
  uncheerOwnFeedPost,
  uncheerPost,
  sendNotification,
} from "../../../store/actions/user/user";
import { AnimatedGradient } from "../../custom/AnimatedGradient/AnimatedGradient";
import toDateTime from "../../../helper/toDateTime";
import TimeStamp from "../../UI_general/TimeStamp";
import useDidMountEffect from "../../../helper/useDidMountEffect";
import LinksList from "../../UI_general/LinksList";
import Caption from "./FeedItem_components/Caption";
import FeedItemHeader from "./FeedItem_components/FeedItemHeader";
import FeedItemExhibitButton from "./FeedItem_components/FeedItemExhibitButton";
import DoubleTappedClapAnim from "./FeedItem_components/DoubleTappedClapAnim";

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
    <View style={{ ...props.exhibitContainer }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!processingWholeCheer) {
            handleToubleTap();
          }
        }}
      >
        <View>
          <FeedItemHeader
            profileImageIsLoading={profileImageIsLoading}
            greyColorValues={greyColorValues}
            profileImageStyle={props.profileImageStyle}
            profileImageSource={props.profileImageSource}
            onSelectProfile={props.onSelectProfile}
            setProfileImageIsLoading={setProfileImageIsLoading}
            darkModeValue={darkModeValue}
            fullname={fullname}
            jobTitle={jobTitle}
            username={username}
            loadingCheer={loadingCheer}
            ExhibitUId={ExhibitUId}
            cheering={cheering}
            unCheer={unCheer}
            profileClickable
          />
          {imageIsLoading && (
            <View>
              <AnimatedGradient
                style={{
                  height: height,
                  width: "100%",
                  position: "absolute",
                }}
                colors={greyColorValues}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          )}
          <ImageBackground
            style={{
              height: height,
              width: "100%",
            }}
            source={
              props.image
                ? { uri: props.image }
                : require("../../../assets/default-post-icon.png")
            }
            onLoadStart={() => {
              setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
            }}
            onLoadEnd={() => {
              setImageIsLoading(false);
            }}
          >
            {showClapping && (
              <DoubleTappedClapAnim
                darkModeValue={darkModeValue}
                clap={clap}
                fadeAnim={fadeAnim}
                slideAnim={slideAnim}
                height={height}
                width={width}
                clapContainer={props.clapContainer}
              />
            )}
            <View style={{ flex: 1 }} />
            <FeedItemExhibitButton
              exhibitTitleColors={props.exhibitTitleColors}
              exhibitTitle={props.exhibitTitle}
              arrowColor={props.arrowColor}
              titleContainer={props.titleContainer}
              titleStyle={props.titleStyle}
              onSelect={props.onSelect}
            />
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
          {currentUsersPost
            ? showCheering &&
              props.numberOfCheers >= 1 && (
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
              )
            : props.numberOfCheers >= 1 && (
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
              )}
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
          {showCheering && props.numberOfCheers >= 1 && (
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
          )}
        </View>
      )}
      {props.caption && (
        <Caption
          captionContainer={props.captionContainer}
          captionStyle={props.captionStyle}
          caption={props.caption}
        />
      )}
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
});

export default FeedItem;
