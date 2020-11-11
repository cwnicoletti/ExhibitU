import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Profile from "../../components/user/Profile";

const ProfileScreen = (props) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (id) => {
    props.navigation.navigate("ViewProject", { productId: id });
  };

  const topHeader = () => {
    return (
      <Profile
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        usernameStyle={{
          ...styles.profileUsernameStyle,
          color: darkModeValue ? "white" : "black",
        }}
        titleStyle={{
          ...styles.profileTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title="Christian Nicoletti"
        username="@christnicoletti"
        imgSource={require("../../assets/me.png")}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        description="Cognitive Science student soon to graduate with extensive knowledge in field research, as well as Computer Science and Machine Learning. This means that on top of completing upper division Psychology courses required from the University of California, Santa Cruz, I have also completed upper division Computer Science courses including courses that emphasized Machine Learning."
      />
    );
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
        ListHeaderComponent={topHeader}
        numColumns={2}
        renderItem={(itemData) => (
          <ProjectItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderBottomWidth: 1,
              borderBottomColor: "white",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProjectHandler(itemData.item.id);
            }}
          />
        )}
      />
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View style={styles.logo}>
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
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  profileTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
  },
  profileUsernameStyle: {
    fontSize: 18,
    paddingTop: 10,
  },
  profileDescriptionStyle: {
    padding: 20,
  },
  profileContainerStyle: {
    borderBottomWidth: 1,
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

export default ProfileScreen;
