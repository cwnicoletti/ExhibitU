import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";

const ExhibitPictures = (props) => {
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
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View>
          <View style={{ ...props.imageContainer }}>
            {imageIsLoading && (
              <AnimatedGradient
                style={styles.animatedGradient}
                colors={greyColorValues}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            )}
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
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
    height: 300,
  },
  animatedGradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  touchable: {
    overflow: "hidden",
  },
});

export default ExhibitPictures;
