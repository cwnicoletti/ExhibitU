import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ShowcasePostView from "../../components/user/ShowcasePostView";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

import { LogBox } from "react-native";

const ShowcasePictureScreen = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const userData = props.navigation.getParam("userData");

  const postPhotoUrl = props.navigation.getParam("postPhotoUrl");
  const postPhotoBase64 = props.navigation.getParam("postPhotoBase64");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const postDateCreated = props.navigation.getParam("postDateCreated");
  const postLinks = props.navigation.getParam("postLinks")
    ? props.navigation.getParam("postLinks")
    : {};

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.push("CheeringScreen", {
      ExhibitUId: ExhibitUId,
      projectId: projectId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ShowcaseProfile", {
      ExhibitUId: userData.ExhibitUId,
      profilePictureUrl: userData.profilePictureUrl,
      fullname: userData.fullname,
      username: userData.username,
      jobTitle: userData.jobTitle,
      resumeLinkUrl: userData.resumeLinkUrl,
      profileBiography: userData.profileBiography,
      numberOfFollowers: userData.numberOfFollowers,
      numberOfFollowing: userData.numberOfFollowing,
      numberOfAdvocates: userData.numberOfAdvocates,
      showResume: userData.showResume,
      hideFollowing: userData.hideFollowing,
      hideFollowers: userData.hideFollowers,
      hideAdvocates: userData.hideAdvocates,
      followers: userData.followers,
      following: userData.following,
      advocates: userData.advocates,
      profileProjects: userData.profileProjects,
      profileLinks: userData.profileLinks,
      projectLinks: userData.projectLinks,
      profileColumns: userData.profileColumns,
      showCheering: userData.showCheering,
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ android: android });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

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
        image={postPhotoBase64 ? postPhotoBase64 : postPhotoUrl}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        caption={caption}
        profileImageSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={postLinks}
        postDateCreated={postDateCreated}
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
        dateContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        dateStyle={{
          color: "gray",
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
          viewProfileHandler();
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
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
            fontFamily: "CormorantUpright",
          }}
        >
          ExhibitU
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
    fontSize: 26,
  },
  details: {
    height: 0,
  },
});

export default ShowcasePictureScreen;
