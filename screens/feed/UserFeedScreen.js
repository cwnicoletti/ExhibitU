import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import FeedItem from "../../components/projectItems/FeedItem";
import HeaderButton from "../../components/UI/IoniconsHeaderButton";

const UserFeedScreen = (props) => {
  const styleTypes = ["dark-content", "light-content"];

  const userProjectItems = useSelector(
    (state) => state.projects.userProjectItems
  );
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const projects = useSelector((state) => state.projects.userProjects);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (id) => {
    props.navigation.navigate("ViewFeedProject", { projectId: id });
  };

  const getProjectTitle = (itemId) => {
    const project = projects.filter((proj) => proj.id === itemId);
    return project[0].title;
  };

  const setStatusBarStyle = (darkModeValue) => {
    if (darkModeValue === true) {
      return styleTypes[1];
    } else {
      return styleTypes[0];
    }
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <StatusBar barStyle={setStatusBarStyle(darkModeValue)} />
      <FlatList
        data={userProjectItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <FeedItem
            image={itemData.item.imageUrl}
            profileImageSource={require("../../assets/me.png")}
            projectTitle={getProjectTitle(itemData.item.projectId)}
            pictureTitle={itemData.item.title}
            price={itemData.item.price}
            name="Christian Nicoletti"
            username="@christnicoletti"
            nameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            usernameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            projectContainer={{
              borderColor: darkModeValue ? "#616161" : "#e8e8e8",
              marginBottom: 10,
            }}
            titleContainer={{
              color: darkModeValue ? "white" : "black",
            }}
            threeDotsStyle={darkModeValue ? "white" : "black"}
            captionContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            titleStyle={{
              color: "white",
            }}
            nameTitleColors={["rgba(0,0,0,1)", "rgba(0,0,0,0.00)"]}
            projectTitleColors={["rgba(0,0,0,0.00)", "rgba(0,0,0,1)"]}
            pictureCheerContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            pictureCheerNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            pictureCheerText={{
              color: darkModeValue ? "white" : "black",
            }}
            numberOfCheers={itemData.item.cheerCount}
            pictureCommentNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            numberOfComments={itemData.item.commentCount}
            pictureTitleContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            pictureTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            captionStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            caption={itemData.item.description}
            arrowColor={"white"}
            onSelect={() => {
              viewProjectHandler(itemData.item.id);
            }}
          />
        )}
      />
    </View>
  );
};

UserFeedScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Showcase
        </Text>
      </View>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleLeftDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleRightDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 22,
  },
});

export default UserFeedScreen;
