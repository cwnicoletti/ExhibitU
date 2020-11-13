import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";

import LinkButton from "../UI/LinkButton";

const ProjectHeader = (props) => {
  const userProjectLinks = useSelector(
    (state) => state.projects.userProjectLinks
  );
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  const handleLinkOnPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Image
        style={{ ...styles.image, ...props.style }}
        source={props.imgSource}
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
        data={userProjectLinks}
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
