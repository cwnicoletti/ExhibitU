import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import LinkButton from "../UI/LinkButton";
import EditButton from "../UI/EditButton";

const FeedProjectHeader = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const links = props.links;

  const handleLinkOnPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Image
        style={{ ...styles.image, ...props.style }}
        source={
          props.imgSource
            ? { uri: props.imgSource }
            : require("../../assets/default-post-icon.png")
        }
      />
      <View
        style={{
          alignItems: "center",
          borderBottomColor: darkModeValue ? "white" : "black",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            color: darkModeValue ? "white" : "black",
            fontWeight: "bold",
            fontSize: 18,
            margin: 10,
          }}
        >
          {props.title}
        </Text>
      </View>
      <Text style={props.descriptionStyle}>{props.description}</Text>
      <FlatList
        data={Object.values(links)}
        keyExtractor={(item) => item.linkId}
        numColumns={Object.keys(links).length > 1 ? 2 : 1}
        renderItem={(itemData) => (
          <LinkButton
            imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
            title={itemData.item[`linkTitle${itemData.item.linkId}`]}
            textStyle={{ color: darkModeValue ? "white" : "black" }}
            linkContainer={{
              borderColor: "gray",
              width: Object.keys(links).length > 1 ? "46%" : "96%",
            }}
            imageStyle={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
            onPress={() =>
              handleLinkOnPress(itemData.item[`linkUrl${itemData.item.linkId}`])
            }
          />
        )}
      />
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

export default FeedProjectHeader;
