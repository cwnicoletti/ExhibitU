import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "../UI/LinkButton";
import { AnimatedGradient } from "../custom/AnimatedGradient/AnimatedGradient";

const ExploreProjectHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [greyColorValues, setGreyColorValues] = useState([
    "rgba(50,50,50,1)",
    "rgba(0,0,0,1)",
  ]);

  const links = props.links;

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      {imageIsLoading ? (
        <AnimatedGradient
          style={{
            width: "100%",
            height: 350,
            position: "absolute",
            zindex: 3,
          }}
          colors={greyColorValues}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      ) : null}
      <Image
        style={{ ...styles.image, ...props.style }}
        source={props.imgSource}
        onLoadStart={() => {
          setGreyColorValues(["rgba(0,0,0,1)", "rgba(50,50,50,1)"]);
        }}
        onLoadEnd={() => {
          setImageIsLoading(false);
        }}
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
      <FlatList<any>
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
              WebBrowser.openBrowserAsync(
                itemData.item[`linkUrl${itemData.item.linkId}`]
              )
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

export default ExploreProjectHeader;
