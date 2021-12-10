import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";
import LinksList from "./LinksList";

const ExhibitHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);

  const links = props.links ? Object.values(props.links) : [];

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      {imageIsLoading ? (
        <AnimatedGradient
          style={styles.gradient}
          colors={greyColorValues}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      ) : null}
      <Image
        style={{ ...styles.image, ...props.style }}
        source={
          props.imgSource
            ? { uri: props.imgSource }
            : require("../../../assets/default-post-icon.png")
        }
        onLoadStart={() => {
          setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
        }}
        onLoadEnd={() => {
          setImageIsLoading(false);
        }}
      />
      <View
        style={{
          ...styles.titleContainer,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <Text
          style={{
            ...styles.titleText,
            color: darkModeValue ? "white" : "black",
          }}
        >
          {props.title}
        </Text>
      </View>
      <Text style={props.descriptionStyle}>{props.description}</Text>
      <LinksList links={links} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
  },

  descriptionStyle: {
    margin: 50,
  },

  titleContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
  },

  image: {
    height: 350,
    width: "100%",
  },
});

export default ExhibitHeader;
