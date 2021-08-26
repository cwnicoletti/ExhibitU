import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinksList from "../UI/LinksList";

const ExhibitUExhibitHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Image
        style={{ ...styles.image, ...props.style }}
        source={{ uri: props.imgSource }}
      />
      <View
        style={{
          ...styles.exhibitTitleContainer,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <Text
          style={{
            ...styles.exhibitTitleText,
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
  exhibitTitleContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
  },
  exhibitTitleText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
  },
  descriptionStyle: {
    margin: 50,
  },
  image: {
    height: 350,
    width: "100%",
  },
});

export default ExhibitUExhibitHeader;
