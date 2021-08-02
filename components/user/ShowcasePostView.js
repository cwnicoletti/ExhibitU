import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { useAppSelector } from "react-redux";
import LinkButton from "../UI/LinkButton";
import toDateTime from "../../helper/toDateTime";
import TimeStamp from "../UI/TimeStamp";

const ExhibitUPostView = (props) => {
  const [photoHeight, setHeight] = useState(null);
  const [photoWidth, setWidth] = useState(null);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const showCheering = useAppSelector((state) => state.user.showCheering);
  const defaultPostIcon = require("../../assets/default-profile-icon.jpg");
  const source = resolveAssetSource(defaultPostIcon);
  const links = props.links;
  const postDateCreated = toDateTime(props.postDateCreated);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    Image.getSize(props.image ? props.image : source, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const screenHeight = Dimensions.get("window").height;

      const scaleFactor = width / screenWidth;
      let imageHeight = height / scaleFactor;

      if (imageHeight > screenHeight / 1.6) {
        imageHeight = screenHeight / 1.6;
      }
      setHeight(imageHeight);
      setWidth(screenWidth);
    });
  }, [Image]);

  return (
    <View style={{ ...styles.project, ...props.projectContainer }}>
      <TouchableWithoutFeedback>
        <View>
          <ImageBackground
            style={{
              height: photoHeight,
              width: photoWidth,
            }}
            source={
              props.image
                ? { uri: props.image }
                : require("../../assets/default-post-icon.png")
            }
          ></ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      {Object.keys(links).length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <FlatList
            data={Object.values(links)}
            keyExtractor={(item) => item.linkId}
            numColumns={1}
            renderItem={(itemData) => (
              <LinkButton
                imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
                title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                textStyle={{ color: darkModeValue ? "white" : "black" }}
                linkContainer={{
                  width: "100%",
                }}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    itemData.item[`linkUrl${itemData.item.linkId}`]
                  )
                }
              />
            )}
          />
          {showCheering ? (
            props.numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.pictureCheerNumber,
                      ...props.pictureCheerNumber,
                    }}
                  >
                    {props.numberOfCheers}
                  </Text>
                  <Text
                    style={{
                      ...styles.pictureCheerText,
                      ...props.pictureCheerText,
                    }}
                  >
                    cheering
                  </Text>
                </View>
              </TouchableCmp>
            ) : null
          ) : null}
        </View>
      ) : (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
          }}
        >
          <FlatList
            data={Object.values(links)}
            keyExtractor={(item) => item.linkId}
            numColumns={Object.keys(links).length === 2 ? 2 : 3}
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={(itemData) => (
              <LinkButton
                imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
                title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                textStyle={{ color: darkModeValue ? "white" : "black" }}
                linkContainer={{
                  width: Object.keys(links).length === 2 ? "46%" : "28%",
                }}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    itemData.item[`linkUrl${itemData.item.linkId}`]
                  )
                }
              />
            )}
          />
          {showCheering ? (
            props.numberOfCheers >= 1 ? (
              <TouchableCmp onPress={props.onSelectCheering}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.pictureCheerNumber,
                      ...props.pictureCheerNumber,
                    }}
                  >
                    {props.numberOfCheers}
                  </Text>
                  <Text
                    style={{
                      ...styles.pictureCheerText,
                      ...props.pictureCheerText,
                    }}
                  >
                    cheering
                  </Text>
                </View>
              </TouchableCmp>
            ) : null
          ) : null}
        </View>
      )}
      <View style={{ ...styles.captionContainer, ...props.captionContainer }}>
        <Text
          style={{
            ...styles.caption,
            ...props.captionStyle,
          }}
        >
          {props.caption}
        </Text>
      </View>
      <TimeStamp
        postDateCreated={postDateCreated}
        dateContainer={props.dateContainer}
        dateStyle={props.dateStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  project: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caption: {
    textAlign: "center",
    margin: 10,
    fontSize: 13,
  },
  pictureCheerContainer: {
    padding: 10,
  },
  pictureCheerNumber: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
    marginTop: 5,
  },
  pictureCheerText: {
    fontSize: 15,
    marginLeft: 3,
    marginTop: 5,
  },
  captionContainer: {
    justifyContent: "center",
  },
  clapContainer: {
    marginRight: 15,
  },
  commentContainer: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
});

export default ExhibitUPostView;
