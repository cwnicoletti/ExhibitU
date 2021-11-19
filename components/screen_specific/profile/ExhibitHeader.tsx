import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../../hooks";
import EditButton from "../../UI_general/EditButton";
import LinksList from "../../UI_general/LinksList";

const ExhibitHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);

  let TouchableCmp: any = TouchableOpacity;
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
              : require("../../../assets/default-post-icon.png")
          }
          defaultSource={
            props.imgSource
              ? { uri: props.imgSource }
              : require("../../../assets/default-post-icon.png")
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
        <LinksList links={links} />
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
        {!props.isLoadingTwoColumns ? (
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
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              ...props.columnTwoStyle,
            }}
          >
            <ActivityIndicator
              size="small"
              color={darkModeValue ? "white" : "black"}
            />
          </View>
        )}
        {!props.isLoadingThreeColumns ? (
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
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              ...props.columnThreeStyle,
            }}
          >
            <ActivityIndicator
              size="small"
              color={darkModeValue ? "white" : "black"}
            />
          </View>
        )}
        {!props.isLoadingFourColumns ? (
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
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              ...props.columnFourStyle,
            }}
          >
            <ActivityIndicator
              size="small"
              color={darkModeValue ? "white" : "black"}
            />
          </View>
        )}
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

export default ExhibitHeader;
