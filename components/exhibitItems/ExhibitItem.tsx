import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";

const ExhibitItem = (props) => {
  const profileColumns = useAppSelector((state) => state.user.profileColumns);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={{
        ...styles.exhibit,
        ...props.exhibitContainer,
        width:
          profileColumns === 2
            ? "50%"
            : profileColumns === 3
            ? "33.33%"
            : profileColumns === 4
            ? "25%"
            : "25%",
        aspectRatio: profileColumns === 1 ? null : 2 / 3,
      }}
    >
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              {imageIsLoading ? (
                <AnimatedGradient
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 3,
                  }}
                  colors={greyColorValues}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              ) : null}
              <Image
                style={styles.image}
                source={{ uri: props.image }}
                onLoadStart={() => {
                  setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
                }}
                onLoadEnd={() => {
                  setImageIsLoading(false);
                }}
              />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text
                style={{
                  ...styles.title,
                  ...props.titleStyle,
                }}
                adjustsFontSizeToFit={true}
              >
                {props.title}
              </Text>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
    height: "25%",
    width: "100%",
    padding: 10,
  },
  touchable: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "75%",
    overflow: "hidden",
  },
});

export default ExhibitItem;
