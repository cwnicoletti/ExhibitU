import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LinkButton from "../UI/LinkButton";
import { useSelector } from "react-redux";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import { AntDesign } from "@expo/vector-icons";
import Cheer from "../../assets/Icons/clap.svg";

import { LogBox } from "react-native";

const toDateTime = (seconds) => {
  let t = new Date(0); // Epoch
  t.setUTCSeconds(seconds);
  return t;
};

const ProjectItem = (props) => {
  const [height, setHeight] = useState(null);
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const fullname = useSelector((state) => state.user.fullname);
  const defaultPostIcon = require("../../assets/default-post-icon.png");
  const source = resolveAssetSource(defaultPostIcon);
  const links = props.links;
  const currentTime = toDateTime(
    Math.floor(Date.now() / 1000)
  ).toLocaleString();

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

      const scaleFactor = width / screenWidth;
      let imageHeight = height / scaleFactor;

      setHeight(imageHeight);
    });
  }, [Image]);

  return (
    <View style={{ ...styles.project, ...props.projectContainer }}>
      <View>
        <ImageBackground
          style={{
            height: height,
            width: "100%",
          }}
          source={
            props.image
              ? { uri: props.image }
              : require("../../assets/default-post-icon.png")
          }
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                }}
              >
                <TouchableCmp onPress={props.onSelectProfile}>
                  <View
                    style={{
                      marginLeft: 15,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                      }}
                    >
                      <Image
                        style={{
                          ...styles.profileImage,
                          ...props.profileImageStyle,
                        }}
                        source={
                          props.profileImageSource
                            ? { uri: props.profileImageSource }
                            : require("../../assets/default-profile-icon.jpg")
                        }
                      />
                    </View>
                    <Text
                      style={{
                        color: darkModeValue ? "white" : "black",
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      {fullname.split(" ")[0].length > 10
                        ? fullname.substring(0, 10) + "..."
                        : fullname.split(" ")[0]}
                    </Text>
                  </View>
                </TouchableCmp>
              </View>
              <View>
                <Cheer
                  style={{
                    ...styles.clapContainer,
                    ...props.clapContainer,
                  }}
                  height={28}
                  width={28}
                  fill="white"
                />
              </View>
            </View>
          </View>
          <LinearGradient
            style={{
              ...styles.titleContainer,
              ...props.titleContainer,
            }}
            colors={props.projectTitleColors}
          >
            <View style={styles.balance} />
            <View style={styles.titleTextContainer}>
              <Text style={{ ...styles.title, ...props.titleStyle }}>
                {props.projectTitle}
              </Text>
            </View>
            <AntDesign
              style={{ marginRight: 5 }}
              name="arrowright"
              size={28}
              color={props.arrowColor}
            />
          </LinearGradient>
        </ImageBackground>
      </View>
      {Object.keys(links).length <= 1 ? (
        <View
          style={{
            ...styles.pictureCheerContainer,
            ...props.pictureCheerContainer,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
          <View style={{ justifyContent: "center" }}>
            <FlatList
              data={Object.values(links)}
              keyExtractor={(item) => item.linkId}
              numColumns={
                Object.keys(links).length <= 1
                  ? 1
                  : Object.keys(links).length === 2
                  ? 2
                  : 3
              }
              renderItem={(itemData) => (
                <LinkButton
                  imageUrl={
                    itemData.item[`linkImageUrl${itemData.item.linkId}`]
                  }
                  title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                  textStyle={{ color: darkModeValue ? "white" : "black" }}
                  linkContainer={{
                    width:
                      Object.keys(links).length <= 1
                        ? "96%"
                        : Object.keys(links).length === 2
                        ? "46%"
                        : "28%",
                  }}
                />
              )}
            />
          </View>
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
            key={Object.keys(links).length}
            numColumns={
              Object.keys(links).length <= 1
                ? 1
                : Object.keys(links).length === 2
                ? 2
                : 3
            }
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={(itemData) => (
              <LinkButton
                imageUrl={itemData.item[`linkImageUrl${itemData.item.linkId}`]}
                title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                textStyle={{ color: darkModeValue ? "white" : "black" }}
                linkContainer={{
                  width:
                    Object.keys(links).length <= 1
                      ? "96%"
                      : Object.keys(links).length === 2
                      ? "46%"
                      : "28%",
                }}
              />
            )}
          />
          <View style={{ flexDirection: "row", padding: 10 }}>
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
        </View>
      )}
      {props.caption ? (
        <View
          style={{
            ...styles.captionContainer,
            ...props.captionContainer,
          }}
        >
          <Text style={{ ...styles.caption, ...props.captionStyle }}>
            {props.caption}
          </Text>
        </View>
      ) : null}
      <View style={{ ...styles.dateContainer, ...props.dateContainer }}>
        <Text style={{ ...styles.date, ...props.dateStyle }}>
          {`${currentTime}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  project: {
    borderWidth: 1,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  nameStyle: {
    fontWeight: "bold",
  },
  usernameStyle: {
    marginTop: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caption: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: "10%",
    fontSize: 13,
  },
  date: {
    margin: 10,
    fontSize: 13,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
  },
  pictureCheerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  pictureCheerNumber: {
    fontWeight: "bold",
    fontSize: 15,
  },
  pictureCheerText: {
    fontSize: 15,
    marginLeft: 3,
  },
  captionContainer: {
    justifyContent: "center",
  },
  clapContainer: {
    marginRight: 10,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  balance: {
    width: 24,
    height: "100%",
  },
});

export default ProjectItem;
