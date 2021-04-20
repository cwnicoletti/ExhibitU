import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import FeedProfileHeader from "../../components/feed/FeedProfileHeader";

const FeedProfileScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const userData = {
    showcaseId: props.navigation.getParam("showcaseId"),
    projectId: props.navigation.getParam("projectId"),
    fullname: props.navigation.getParam("fullname"),
    username: props.navigation.getParam("username"),
    jobTitle: props.navigation.getParam("jobTitle"),
    profileBiography: props.navigation.getParam("profileBiography"),
    profilePictureBase64: props.navigation.getParam("profilePictureBase64"),
    numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
    numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
    numberOfAdvocates: props.navigation.getParam("numberOfAdvocates"),
    hideFollowing: props.navigation.getParam("hideFollowing"),
    hideFollowers: props.navigation.getParam("hideFollowers"),
    hideAdvocates: props.navigation.getParam("hideAdvocates"),
    profileProjects: props.navigation.getParam("profileProjects")
      ? props.navigation.getParam("profileProjects")
      : {},
    profileLinks: props.navigation.getParam("profileLinks")
      ? props.navigation.getParam("profileLinks")
      : {},
    postLinks: props.navigation.getParam("postLinks")
      ? props.navigation.getParam("postLinks")
      : {},
    profileColumns: props.navigation.getParam("profileColumns"),
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (
    showcaseId,
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
    postLinks
  ) => {
    props.navigation.navigate("ViewFeedProfileProject", {
      showcaseId,
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
    });
  };

  const topHeader = () => {
    return (
      <FeedProfileHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "gray" : "#c9c9c9",
        }}
        usernameStyle={{
          ...styles.profileUsernameStyle,
          color: darkModeValue ? "white" : "black",
        }}
        fullnameStyle={{
          ...styles.profileTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        jobTitleStyle={{
          ...styles.profileJobTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        fullname={userData.fullname}
        username={`@${userData.username}`}
        jobTitle={userData.jobTitle}
        numberOfFollowers={userData.numberOfFollowers}
        numberOfFollowing={userData.numberOfFollowing}
        numberOfAdvocates={userData.numberOfAdvocates}
        hideFollowing={userData.hideFollowing}
        hideFollowers={userData.hideFollowers}
        hideAdvocates={userData.hideAdvocates}
        links={userData.profileLinks}
        imgSource={userData.profilePictureBase64}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        resumeText={{
          color: darkModeValue ? "white" : "black",
        }}
        iconResumeStyle={darkModeValue ? "white" : "black"}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        description={userData.profileBiography}
        onAddNewProjectPress={() => props.navigation.navigate("AddProject")}
        followersOnPress={() =>
          props.navigation.navigate("ViewFollowers", {
            showcaseId: userData.showcaseId,
          })
        }
        followingOnPress={() =>
          props.navigation.navigate("ViewFollowing", {
            showcaseId: userData.showcaseId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.navigate("ViewAdvocates", {
            showcaseId: userData.showcaseId,
          })
        }
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
        data={Object.values(userData.profileProjects)}
        keyExtractor={(item) => item.projectId}
        key={userData.profileColumns}
        ListHeaderComponent={topHeader}
        numColumns={userData.profileColumns}
        renderItem={(itemData) => (
          <ProjectItem
            image={itemData.item.projectCoverPhotoBase64}
            title={itemData.item.projectTitle}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProjectHandler(
                userData.showcaseId,
                itemData.item.projectId,
                userData.fullname,
                userData.username,
                userData.jobTitle,
                userData.profileBiography,
                userData.profileProjects,
                userData.profilePictureBase64,
                userData.numberOfFollowers,
                userData.numberOfFollowing,
                userData.numberOfAdvocates,
                userData.hideFollowing,
                userData.hideFollowers,
                userData.hideAdvocates,
                userData.profileLinks,
                userData.postLinks
              );
            }}
          />
        )}
      />
    </View>
  );
};

FeedProfileScreen.navigationOptions = (navData) => {
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
    justifyContent: "space-between",
  },
  profileTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 5,
  },
  profileJobTitleStyle: {
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 5,
  },
  profileUsernameStyle: {
    fontSize: 18,
    paddingTop: 5,
  },
  profileDescriptionStyle: {
    padding: 20,
  },
  profileContainerStyle: {
    justifyContent: "flex-start",
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

export default FeedProfileScreen;
