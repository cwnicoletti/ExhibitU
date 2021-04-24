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

import FeedPostView from "../../components/feed/FeedPostView";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

import { LogBox } from "react-native";

const FeedCommentsScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const userExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const ExhibitUId = props.navigation.getParam("ExhibitUId");
  const projectId = props.navigation.getParam("projectId");
  const postId = props.navigation.getParam("postId");
  const profileProjects =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.profileProjects)
      : props.navigation.getParam("profileProjects");
  const fullname =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.fullname)
      : props.navigation.getParam("fullname");
  const username =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.username)
      : props.navigation.getParam("username");
  const jobTitle =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.jobTitle)
      : props.navigation.getParam("jobTitle");
  const profileBiography =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.profileBiography)
      : props.navigation.getParam("profileBiography");
  const profilePictureBase64 = props.navigation.getParam(
    "profilePictureBase64"
  );
  const numberOfFollowers =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.numberOfFollowers)
      : props.navigation.getParam("numberOfFollowers");
  const numberOfFollowing =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.numberOfFollowing)
      : props.navigation.getParam("numberOfFollowing");
  const numberOfAdvocates =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.numberOfAdvocates)
      : props.navigation.getParam("numberOfAdvocates");
  const postPhoto = props.navigation.getParam("postPhotoBase64");
  const numberOfCheers =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].numberOfCheers
      : props.navigation.getParam("numberOfCheers");
  const numberOfComments =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].numberOfComments
      : props.navigation.getParam("numberOfComments");
  const caption =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].caption
      : props.navigation.getParam("caption");
  const hideFollowing =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].hideFollowing
      : props.navigation.getParam("hideFollowing");
  const hideFollowers =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].hideFollowers
      : props.navigation.getParam("hideFollowers");
  const hideAdvocates =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].hideAdvocates
      : props.navigation.getParam("hideAdvocates");
  const profileLinks =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.profileLinks)
      : props.navigation.getParam("profileLinks");
  const postLinks =
    userExhibitUId === ExhibitUId
      ? profileProjects[projectId].projectPosts[postId].postLinks
        ? profileProjects[projectId].projectPosts[postId].postLinks
        : {}
      : props.navigation.getParam("postLinks")
      ? props.navigation.getParam("postLinks")
      : {};
  const profileColumns =
    userExhibitUId === ExhibitUId
      ? useSelector((state) => state.user.profileColumns)
      : props.navigation.getParam("profileColumns");

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.push("ViewCheering", {
      ExhibitUId: ExhibitUId,
      projectId: projectId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = (
    ExhibitUId,
    projectId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureBase64,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    profileLinks,
    postLinks,
    profileColumns
  ) => {
    props.navigation.push("ViewProfile", {
      ExhibitUId,
      projectId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileProjects,
      profilePictureBase64,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      hideFollowing,
      hideFollowers,
      hideAdvocates,
      profileLinks,
      postLinks,
      profileColumns,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ android });
    props.navigation.setParams({ projectId: projectId });
  }, []);

  return (
    <ScrollView
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FeedPostView
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
        fullname={fullname}
        profileImageSource={profilePictureBase64}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        postId={postId}
        projectId={projectId}
        posterExhibitUId={ExhibitUId}
        links={postLinks}
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
            ExhibitUId,
            projectId,
            fullname,
            username,
            jobTitle,
            profileBiography,
            profileProjects,
            profilePictureBase64,
            numberOfFollowers,
            numberOfFollowing,
            numberOfAdvocates,
            hideFollowing,
            hideFollowers,
            hideAdvocates,
            profileLinks,
            postLinks,
            profileColumns
          );
        }}
      />
    </ScrollView>
  );
};

FeedCommentsScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");

  return {
    headerTitle: () => (
      <View style={styles.logo}>
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/ExhibitU_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/ExhibitU_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
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
    fontSize: 22,
  },
  details: {
    height: 0,
  },
});

export default FeedCommentsScreen;
