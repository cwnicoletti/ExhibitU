import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
    FlatList, Image,



    Platform, StyleSheet, Text,




    TouchableNativeFeedback, TouchableOpacity, View
} from "react-native";
import { useSelector } from "react-redux";
import EditButton from "../UI/EditButton";
import LinkButton from "../UI/LinkButton";


const handleLinkOnPress = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};

const ProjectHeader = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const links = props.links;

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View>
      <View style={{ ...styles.container, ...props.containerStyle }}>
        <Image
          style={{ ...styles.image, ...props.style }}
          source={
            props.imgSource
              ? { uri: props.imgSource }
              : require("../../assets/default-post-icon.png")
          }
        />
        <EditButton
          editText="Edit Exhibit"
          onPress={props.onEditProfilePress}
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
                handleLinkOnPress(
                  itemData.item[`linkUrl${itemData.item.linkId}`]
                )
              }
            />
          )}
        />
      </View>
      <Text
        style={{
          color: darkModeValue ? "white" : "black",
          fontSize: 12,
        }}
      >
        Columns
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableCmp onPress={props.changeColumnToTwo}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              ...props.columnTwoStyle,
            }}
          >
            <View
              style={{
                width: 9,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 9,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
        <TouchableCmp onPress={props.changeColumnToThree}>
          <View
            style={{
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              ...props.columnThreeStyle,
            }}
          >
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 8,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
        <TouchableCmp onPress={props.changeColumnToFour}>
          <View
            style={{
              marginBottom: 20,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              borderWidth: 1,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              ...props.columnFourStyle,
            }}
          >
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
            <View
              style={{
                width: 7,
                marginHorizontal: 2,
                marginTop: 5,
                height: 12,
                backgroundColor: "gray",
              }}
            />
          </View>
        </TouchableCmp>
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

export default ProjectHeader;
