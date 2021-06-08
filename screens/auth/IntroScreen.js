import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions, Image,





    Platform, StyleSheet,

    Text,

    TouchableNativeFeedback, TouchableOpacity, View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { default as exampleImage1, default as exampleImage2, default as exampleImage3 } from "../../assets/ExhibitU_icon_transparent_white.png";
import CarouselCardItem from "../../components/UI/CarouselCardItem";
import { setIntroing } from "../../store/actions/signup";



const IntroScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const isCarousel = React.useRef(null);
  const exampleImage1Uri = Image.resolveAssetSource(exampleImage1).uri;
  const exampleImage2Uri = Image.resolveAssetSource(exampleImage2).uri;
  const exampleImage3Uri = Image.resolveAssetSource(exampleImage3).uri;

  useEffect(() => {
    dispatch(setIntroing(localId, ExhibitUId, true));
  }, []);

  const data = [
    {
      title: "",
      body:
        "Welcome to ExhibitU!\n\nThis platform is designed to help you showcase your projects, talents, and skills",
      imgUrl1: exampleImage1Uri,
      useImg1: true,
    },
    {
      title: "",
      body:
        "ExhibitU is also a platform to cheer on your friends, family, and peers as they build their own creations",
      imgUrl2: exampleImage2Uri,
      useImg2: true,
    },
    {
      title: "",
      body:
        "Since ExhibitU is a form of social media you can follow your friends and family to stay up to date on their projects",
      useImg3: true,
    },
    {
      title: "",
      body:
        "We also have a unique feature within ExhibitU that allows you to 'advocate' for a user's creation as a way of showing your contribution to a creation",
      useImg4: true,
    },
    {
      title: "",
      body:
        "Our goal is to build a universal, encouraging and healthy community for those looking to build or present their creations!",
      useImg5: true,
    },
  ];

  const WIDTH = Dimensions.get("window").width;

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const authHandler = async () => {
    await setIsLoading(true);
    await dispatch(setIntroing(localId, ExhibitUId, false));
    await setIsLoading(false);
    await props.navigation.navigate("Project");
  };

  return (
    <View style={styles.screen}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        onSnapToItem={(index) => setSliderIndex(index)}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
      />
      <View style={{ flexDirection: "row", alignSelf: "center", margin: 10 }}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: sliderIndex === 0 ? "white" : "gray",
            borderRadius: "50%",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: sliderIndex === 1 ? "white" : "gray",
            borderRadius: "50%",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: sliderIndex === 2 ? "white" : "gray",
            borderRadius: "50%",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: sliderIndex === 3 ? "white" : "gray",
            borderRadius: "50%",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: sliderIndex === 4 ? "white" : "gray",
            borderRadius: "50%",
            marginHorizontal: 10,
          }}
        />
      </View>
      {isLoading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <TouchableCmp
          style={{
            borderColor: "#007AFF",
            borderWidth: 1,
            margin: 10,
            marginBottom: 60,
            alignItems: "center",
          }}
          onPress={authHandler}
        >
          <Text
            style={{
              margin: 10,
              color: "#007AFF",
              fontSize: 16,
            }}
          >
            Start
          </Text>
        </TouchableCmp>
      )}
    </View>
  );
};

IntroScreen.navigationOptions = (navData) => {
  return {
    headerMode: "none",
    headerVisible: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  inner: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  logoImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 26,
  },
  text: {
    color: "white",
    padding: 10,
  },
  authContainer: {
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowRadius: null,
    elevation: null,
    borderRadius: null,
    backgroundColor: "black",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
  loadingAuth: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#00B7DB",
    borderRadius: 10,
  },
  activityContainer: {
    marginTop: 10,
  },
  buttonText: {
    color: "#00B7DB",
  },
  buttonLinkedInContainer: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  buttons: {
    alignItems: "center",
    paddingVertical: 10,
    color: "#00B7DB",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  track: {
    backgroundColor: "#ccc",
    overflow: "hidden",
    height: 2,
  },
  bar: {
    backgroundColor: "#5294d6",
    height: 2,
  },
});

export default IntroScreen;
