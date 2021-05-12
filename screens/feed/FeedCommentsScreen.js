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
  const postPhoto = props.navigation.getParam("postPhoto");

  const userData =
    userExhibitUId === ExhibitUId
      ? {
          profileProjects: useSelector((state) => state.user.profileProjects),
          fullname: useSelector((state) => state.user.fullname),
          username: useSelector((state) => state.user.username),
          jobTitle: useSelector((state) => state.user.jobTitle),
          profileBiography: useSelector((state) => state.user.profileBiography),
          profilePictureBase64:
            profileProjects[projectId].projectPosts[postId]
              .profilePictureBase64,
          numberOfFollowers: useSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useSelector(
            (state) => state.user.numberOfFollowing
          ),
          numberOfAdvocates: useSelector(
            (state) => state.user.numberOfAdvocates
          ),
          numberOfCheers:
            profileProjects[projectId].projectPosts[postId].numberOfCheers,
          numberOfComments:
            profileProjects[projectId].projectPosts[postId].numberOfComments,
          caption: profileProjects[projectId].projectPosts[postId].caption,
          hideFollowing:
            profileProjects[projectId].projectPosts[postId].hideFollowing,
          hideFollowers:
            profileProjects[projectId].projectPosts[postId].hideFollowers,
          hideAdvocates:
            profileProjects[projectId].projectPosts[postId].hideAdvocates,
          profileLinks: useSelector((state) => state.user.profileLinks)
            ? useSelector((state) => state.user.profileLinks)
            : {},
          postLinks: profileProjects[projectId].projectPosts[postId].postLinks
            ? profileProjects[projectId].projectPosts[postId].postLinks
            : {},
          profileColumns: useSelector((state) => state.user.profileColumns),
        }
      : {
          profileProjects: props.navigation.getParam("profileProjects"),
          fullname: props.navigation.getParam("fullname"),
          username: props.navigation.getParam("username"),
          jobTitle: props.navigation.getParam("jobTitle"),
          profilePictureBase64: props.navigation.getParam(
            "profilePictureBase64"
          ),
          numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
          numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
          numberOfAdvocates: props.navigation.getParam("numberOfAdvocates"),
          numberOfCheers: props.navigation.getParam("numberOfCheers"),
          numberOfComments: props.navigation.getParam("numberOfComments"),
          caption: props.navigation.getParam("caption"),
          hideFollowing: props.navigation.getParam("hideFollowing"),
          hideFollowers: props.navigation.getParam("hideFollowers"),
          hideAdvocates: props.navigation.getParam("hideAdvocates"),
          profileLinks: props.navigation.getParam("profileLinks")
            ? props.navigation.getParam("profileLinks")
            : {},
          postLinks: props.navigation.getParam("postLinks")
            ? props.navigation.getParam("postLinks")
            : {},
          profileColumns: props.navigation.getParam("profileColumns"),
        };

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.push("ViewCheering", {
      ExhibitUId: ExhibitUId,
      projectId: projectId,
      postId: postId,
      numberOfCheers: userData.numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ViewProfile", {
      userData: {
        ExhibitUId,
        projectId,
        fullname: userData.fullname,
        username: userData.username,
        jobTitle: userData.jobTitle,
        profileBiography: userData.profileBiography,
        profileProjects: userData.profileProjects,
        profilePictureBase64: userData.profilePictureBase64,
        numberOfFollowers: userData.numberOfFollowers,
        numberOfFollowing: userData.numberOfFollowing,
        numberOfAdvocates: userData.numberOfAdvocates,
        hideFollowing: userData.hideFollowing,
        hideFollowers: userData.hideFollowers,
        hideAdvocates: userData.hideAdvocates,
        profileLinks: userData.profileLinks,
        postLinks: userData.postLinks,
        profileColumns: userData.profileColumns,
      },
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
        caption={userData.caption}
        fullname={userData.fullname}
        profileImageSource={userData.profilePictureBase64}
        numberOfCheers={userData.numberOfCheers}
        numberOfComments={userData.numberOfComments}
        postId={postId}
        projectId={projectId}
        posterExhibitUId={ExhibitUId}
        links={userData.postLinks}
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
          viewProfileHandler();
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

export default FeedCommentsScreen;
