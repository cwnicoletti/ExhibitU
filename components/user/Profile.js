import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import LinkButton from "../../components/UI/LinkButton";
const Profile = (props) => {
  const userLinks = useSelector((state) => state.projects.userLinks);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  const handleLinkOnPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <View style={{ ...styles.secondContainer }}>
        <View style={{ ...styles.thirdContainer }}>
          <Text style={props.titleStyle}>{props.title}</Text>
          <Text style={props.usernameStyle}>{props.username}</Text>
        </View>
        <Image
          style={{ ...styles.image, ...props.style }}
          source={props.imgSource}
        />
        <View
          style={{
            borderColor: darkModeValue ? "white" : "black",
            borderWidth: 1,
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={props.onEditProfilePress}
          >
            <Text style={{ color: darkModeValue ? "white" : "black" }}>
              Edit{"\n"}Profile
            </Text>
          </TouchableOpacity>
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
            linkContainer={{ borderColor: darkModeValue ? "white" : "black" }}
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
    marginTop: 10,
  },
  secondContainer: {
    flexDirection: "row",
  },
  thirdContainer: {
    marginRight: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
});

export default Profile;
