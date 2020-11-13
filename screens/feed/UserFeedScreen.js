import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import FeedItem from "../../components/projectItems/FeedItem";
import HeaderButton from "../../components/UI/HeaderButton";

const UserFeedScreen = (props) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const editProducthandler = (id) => {
    props.navigation.navigate("ViewFeedProject", { productId: id });
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FlatList
        data={userProjects}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <FeedItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            projectContainer={{
              marginBottom: 10,
            }}
            onSelect={() => {
              editProducthandler(itemData.item.id);
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
