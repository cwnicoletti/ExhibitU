import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useAppDispatch } from "../../hooks";
import {
  default as exampleImage1,
  default as exampleImage2,
} from "../../assets/ExhibitU_icon_transparent_white.png";
import CarouselCardItem from "../../components/UI/CarouselCardItem";
import { setIntroing } from "../../store/actions/signup";

const IntroScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const isCarousel = React.useRef(null);
  const exampleImage1Uri = Image.resolveAssetSource(exampleImage1).uri;
  const exampleImage2Uri = Image.resolveAssetSource(exampleImage2).uri;

  const data = [
    {
      title: "",
      body: "Welcome to ExhibitU!\n\nThis platform is designed to help you showcase your projects, talents, and skills",
      imgUrl1: exampleImage1Uri,
      useImg1: true,
    },
    {
      title: "",
      body: "ExhibitU is also a platform to cheer on your friends, family, and peers as they build their own creations",
      imgUrl2: exampleImage2Uri,
      useImg2: true,
    },
    {
      title: "",
      body: "Since ExhibitU is a form of social media you can follow your friends and family to stay up to date on their projects",
      useImg3: true,
    },
    {
      title: "",
      body: "We also have a unique feature within ExhibitU that allows you to 'advocate' for a user's creation as a way of showing your contribution to a creation",
      useImg4: true,
    },
    {
      title: "",
      body: "Our goal is to build a universal, encouraging and healthy community for those looking to build or present their creations!",
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
    await dispatch(setIntroing(false));
    await setIsLoading(false);
    await props.navigation.navigate("StartAuth");
  };

  return (
    <View style={styles.screen}>
      {sliderIndex === 0 ? (
        <TouchableCmp
          style={{ paddingTop: 75, paddingRight: 50, alignSelf: "flex-end" }}
          onPress={authHandler}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Skip</Text>
        </TouchableCmp>
      ) : (
        <TouchableCmp
          style={{ paddingTop: 75, paddingRight: 50, alignSelf: "flex-end" }}
        >
          <Text style={{ fontSize: 16 }}>Placeholder</Text>
        </TouchableCmp>
      )}
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        onSnapToItem={(index) => setSliderIndex(index)}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          margin: 10,
        }}
      >
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
        <View style={{ margin: 10, marginBottom: 60 }}>
          {sliderIndex === 4 ? (
            <TouchableCmp
              style={{
                borderColor: "#007AFF",
                borderWidth: 1,
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
          ) : (
            <View
              style={{
                borderWidth: 1,
                alignItems: "center",
              }}
              onPress={authHandler}
            >
              <Text
                style={{
                  margin: 10,
                  fontSize: 16,
                }}
              >
                Start
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

IntroScreen.navigationOptions = () => {
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
  image: {
    width: 150,
    height: 150,
  },
  text: {
    color: "white",
    padding: 10,
  },
  activityContainer: {
    marginTop: 10,
  },
});

export default IntroScreen;
