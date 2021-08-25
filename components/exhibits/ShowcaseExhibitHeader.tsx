import * as WebBrowser from "expo-web-browser";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "../UI/LinkButton";

const ExhibitUExhibitHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
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

export default ExhibitUExhibitHeader;
