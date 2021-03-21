import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";

import ProjectPictures from "../../components/UI/ProjectPictures";
import FeedProjectHeader from "../../components/feed/FeedProjectHeader";
import FontAwesomeHeaderButton from "../../components/UI/FontAwesomeHeaderButton";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FeedProjectScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const currentProjectId = props.navigation.getParam("projectId");
  const showcaseId = useSelector((state) => state.user.showcaseId);
  const projectData = {
    showcaseId: props.navigation.getParam("showcaseId"),
    projectId: props.navigation.getParam("projectId"),
    fullname: props.navigation.getParam("fullname"),
    username: props.navigation.getParam("username"),
    jobTitle: props.navigation.getParam("jobTitle"),
    profileBiography: props.navigation.getParam("profileBiography"),
    profileProjects: props.navigation.getParam("profileProjects"),
    profilePictureUrl: props.navigation.getParam("profilePictureUrl"),
    numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
    numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
    numberOfAdvocates: props.navigation.getParam("numberOfAdvocates"),
    hideFollowing: props.navigation.getParam("hideFollowing"),
    hideFollowers: props.navigation.getParam("hideFollowers"),
    hideAdvocates: props.navigation.getParam("hideAdvocates"),
    profileLinks: props.navigation.getParam("profileLinks")
      ? props.navigation.getParam("profileLinks")
      : {},
    postLinks: props.navigation.getParam("postLinks")
      ? props.navigation.getParam("postLinks")
      : {},
  };

  const project = Object.values(projectData.profileProjects).find(
    (project) => project.projectId === currentProjectId
  );

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCommentsHandler = (
    showcaseId,
    projectId,
    postId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureUrl,
    postPhotoUrl,
    numberOfCheers,
    numberOfComments,
    caption,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    profileLinks,
    postLinks
  ) => {
    props.navigation.navigate("ViewComments", {
      showcaseId: showcaseId,
      projectId: projectId,
      postId: postId,
      fullname: fullname,
      username: username,
      jobTitle: jobTitle,
      profileBiography: profileBiography,
      profileProjects: profileProjects,
      profilePictureUrl: profilePictureUrl,
      postPhotoUrl: postPhotoUrl,
      numberOfCheers: numberOfCheers,
      numberOfComments: numberOfComments,
      caption: caption,
      numberOfFollowers: numberOfFollowers,
      numberOfFollowing: numberOfFollowing,
      numberOfAdvocates: numberOfAdvocates,
      hideFollowing: hideFollowing,
      hideFollowers: hideFollowers,
      hideAdvocates: hideAdvocates,
      profileLinks: profileLinks,
      postLinks: postLinks,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
    props.navigation.setParams({ android: android });
    props.navigation.setParams({ projectId: currentProjectId });
    props.navigation.setParams({ projectTitle: project.projectTitle });
  }, [darkModeValue, android, project.projectTitle, currentProjectId]);

  const topHeader = () => {
    return (
      <FeedProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={
          showcaseId === projectData.showcaseId
            ? project.projectCoverPhotoBase64
            : project.projectCoverPhotoUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={project.projectTitle}
        description={project.projectDescription}
        links={project.projectLinks}
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
        data={Object.values(project.projectPosts)}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={topHeader}
        numColumns={project.projectColumns}
        renderItem={(itemData) => (
          <ProjectPictures
            image={
              itemData.item.postPhotoBase64
                ? itemData.item.postPhotoBase64
                : itemData.item.postPhotoUrl
            }
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              width:
                project.projectColumns === 1
                  ? "100%"
                  : project.projectColumns === 2
                  ? "50%"
                  : project.projectColumns === 3
                  ? "33.33%"
                  : project.projectColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio: project.projectColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            imageContainer={styles.imageContainer}
            onSelect={() =>
              viewCommentsHandler(
                projectData.showcaseId,
                projectData.projectId,
                itemData.item.postId,
                projectData.fullname,
                projectData.username,
                projectData.jobTitle,
                projectData.profileBiography,
                projectData.profileProjects,
                projectData.profilePictureUrl,
                itemData.item.postPhotoUrl,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                projectData.numberOfFollowers,
                projectData.numberOfFollowing,
                projectData.numberOfAdvocates,
                projectData.hideFollowing,
                projectData.hideFollowers,
                projectData.hideAdvocates,
                projectData.profileLinks,
                projectData.postLinks
              )
            }
          />
        )}
      />
    </View>
  );
};

FeedProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");
  const projectId = navData.navigation.getParam("projectId");
  const projectTitle = navData.navigation.getParam("projectTitle");

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={FontAwesomeHeaderButton}>
        <Item
          title="Advocate"
          iconName={"handshake-o"}
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

export default FeedProjectScreen;
