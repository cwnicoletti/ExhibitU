import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ShowcasePostView from "../../components/user/ShowcasePostView";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

import { LogBox } from "react-native";

const ShowcasePictureScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const profileProjects = useSelector((state) => state.user.profileProjects);

  const showcaseId = props.navigation.getParam("showcaseId");
  const projectId = props.navigation.getParam("projectId");
  const postId = props.navigation.getParam("postId");
  const fullname = props.navigation.getParam("fullname");
  const username = props.navigation.getParam("username");
  const jobTitle = props.navigation.getParam("jobTitle");
  const profileBiography = props.navigation.getParam("profileBiography");
  const profilePictureBase64 = props.navigation.getParam("profilePictureBase64")
    ? props.navigation.getParam("profilePictureBase64")
    : useSelector((state) => state.user.profilePictureBase64);
  const postPhoto = props.navigation.getParam("postPhotoBase64")
    ? props.navigation.getParam("postPhotoBase64")
    : props.navigation.getParam("postPhotoUrl");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const links = props.navigation.getParam("links")
    ? props.navigation.getParam("links")
    : {};

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.push("CheeringScreen", {
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = (
    showcaseId,
    projectId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureBase64
  ) => {
    props.navigation.push("ViewProfile", {
      showcaseId,
      projectId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileProjects,
      profilePictureBase64,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
    props.navigation.setParams({ android: android });
  }, [darkModeValue, android]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <ShowcasePostView
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        image={postPhoto}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        caption={caption}
        profileImageSource={profilePictureBase64}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={links}
        nameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        usernameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        projectContainer={{
          borderColor: darkModeValue ? "#616161" : "#e8e8e8",
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
        pictureCommentNumber={{
          color: darkModeValue ? "white" : "black",
        }}
        pictureTitleContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        pictureTitleStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        captionStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        arrowColor={"white"}
        onSelectCheering={() => {
          viewCheeringHandler();
        }}
        onSelectProfile={() => {
          viewProfileHandler(
            showcaseId,
            projectId,
            fullname,
            username,
            jobTitle,
            profileBiography,
            profileProjects,
            profilePictureBase64
          );
        }}
      />
    </ScrollView>
  );
};

ShowcasePictureScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");

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
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Add"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.goBack();
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
  profileDescriptionStyle: {
    margin: 15,
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
  details: {
    height: 0,
  },
});

export default ShowcasePictureScreen;
