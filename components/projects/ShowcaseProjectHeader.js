import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import LinkButton from "../UI/LinkButton";

const handleLinkOnPress = (url) => {
  WebBrowser.openBrowserAsync(url);
};

const ShowcaseProjectHeader = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const links = props.links;

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Image
        style={{ ...styles.image, ...props.style }}
        source={{ uri: props.imgSource }}
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
        numColumns={
          Object.keys(links).length === 1
            ? 1
            : Object.keys(links).length === 2
            ? 2
            : 3
        }
        columnWrapperStyle={
          Object.keys(links).length > 1 ? { justifyContent: "center" } : null
        }
        renderItem={(itemData) => (
          <LinkButton
            imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
            title={itemData.item[`linkTitle${itemData.item.linkId}`]}
            textStyle={{ color: darkModeValue ? "white" : "black" }}
            linkContainer={{
              borderColor: "gray",
              width:
                Object.keys(links).length === 1
                  ? "96%"
                  : Object.keys(links).length === 2
                  ? "46%"
                  : "28%",
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

export default ShowcaseProjectHeader;
