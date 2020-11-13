import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import LinkButton from "../UI/LinkButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = (props) => {
  const userLinks = useSelector((state) => state.projects.userLinks);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  const handleLinkOnPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...props.containerStyle,
      }}
    >
      <View style={{ ...styles.secondContainer }}>
        <View style={{ ...styles.thirdContainer }}>
          <Text style={props.titleStyle}>{props.title}</Text>
          <Text style={props.usernameStyle}>{props.username}</Text>
        </View>
        <Image
          style={{ ...styles.image, ...props.style }}
          source={props.imgSource}
        />
        <TouchableOpacity
          style={{
            margin: 10,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onPress={props.onEditProfilePress}
        >
          <Text
            style={{
              margin: 10,
              color: darkModeValue ? "white" : "black",
            }}
          >
            Edit{"\n"}Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            borderColor: "gray",
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              margin: 5,
              color: darkModeValue ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            Network
          </Text>
          <Text
            style={{
              marginBottom: 5,
              color: darkModeValue ? "white" : "black",
            }}
          >
            323
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderColor: "gray",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              margin: 5,
              color: darkModeValue ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            Advocates
          </Text>
          <Text
            style={{
              marginBottom: 5,
              color: darkModeValue ? "white" : "black",
              fontSize: 15,
            }}
          >
            36
          </Text>
        </View>
      </View>
      <Text style={props.descriptionStyle}>{props.description}</Text>
      <FlatList
        data={userLinks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(itemData) => (
          <LinkButton
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            textStyle={{ color: darkModeValue ? "white" : "black" }}
            linkContainer={{ borderColor: "gray" }}
            imageStyle={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
            onPress={() => handleLinkOnPress(itemData.item.linkUrl)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  thirdContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
});

export default Profile;
