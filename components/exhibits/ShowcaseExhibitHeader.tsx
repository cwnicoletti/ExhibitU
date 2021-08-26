import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "../UI/LinkButton";

const ExhibitUExhibitHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);

  const linksList = () => {
    return links.map((item) => (
      <LinkButton
        key={item["linkId"]}
        imageUrl={item[`linkImageUrl${item["linkId"]}`]}
        title={item[`linkTitle${item["linkId"]}`]}
        textStyle={{ color: darkModeValue ? "white" : "black" }}
        linkContainer={{
          width:
            Object.keys(links).length === 1
              ? "96%"
              : Object.keys(links).length === 2
              ? "46%"
              : "28%",
        }}
        onPress={() =>
          WebBrowser.openBrowserAsync(item[`linkUrl${item["linkId"]}`])
        }
      />
    ));
  };

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Image
        style={{ ...styles.image, ...props.style }}
        source={{ uri: props.imgSource }}
      />
      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            margin: 10,
            color: darkModeValue ? "white" : "black",
          }}
        >
          {props.title}
        </Text>
      </View>
      <Text style={props.descriptionStyle}>{props.description}</Text>
      <View
        style={{
          marginVertical: 5,
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {linksList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
