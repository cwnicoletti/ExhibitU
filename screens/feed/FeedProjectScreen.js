import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import FeedProjectHeader from "../../components/feed/FeedProjectHeader";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import useDidMountEffect from "../../helper/useDidMountEffect";
import ProjectPictures from "../../components/UI/ProjectPictures";

const FeedProjectScreen = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const projectId = props.navigation.getParam("projectId");
  let userData = props.navigation.getParam("userData");
  userData.projectLinks = userData.projectLinks ? userData.projectLinks : {};

  userData =
    userData.ExhibitUId === ExhibitUId
      ? {
          ...userData,
          profilePictureBase64: useSelector(
            (state) => state.user.profilePictureBase64
          )
            ? useSelector((state) => state.user.profilePictureBase64)
            : props.navigation.getParam("profilePictureUrl"),
          profileColumns: useSelector((state) => state.user.profileColumns),
          ExhibitUId: useSelector((state) => state.user.ExhibitUId),
          fullname: useSelector((state) => state.user.fullname),
          username: useSelector((state) => state.user.username),
          jobTitle: useSelector((state) => state.user.jobTitle),
          profileBiography: useSelector((state) => state.user.profileBiography),
          profileProjects: useSelector((state) => state.user.profileProjects)
            ? useSelector((state) => state.user.profileProjects)
            : props.navigation.getParam("profileProjects"),
          numberOfAdvocates: useSelector(
            (state) => state.user.numberOfAdvocates
          ),
          numberOfFollowers: useSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useSelector(
            (state) => state.user.numberOfFollowing
          ),
          hideFollowing: useSelector((state) => state.user.hideFollowing),
          hideFollowers: useSelector((state) => state.user.hideFollowers),
          hideAdvocates: useSelector((state) => state.user.hideAdvocates),
        }
      : userData;

  const project = Object.values(userData.profileProjects).find(
    (project) => project.projectId === projectId
  );

  const [projectPostsState, setProjectPostsState] = useState(
    Object.values(project.projectPosts).sort((first, second) => {
      return (
        second["postDateCreated"]["_seconds"] -
        first["postDateCreated"]["_seconds"]
      );
    })
  );

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCommentsHandler = (
    ExhibitUId,
    projectId,
    postId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    postPhoto,
    numberOfCheers,
    numberOfComments,
    caption,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    profileColumns,
    postLinks,
    postDateCreated
  ) => {
    props.navigation.navigate("ViewComments", {
      projectId,
      userData: {
        ExhibitUId,
        postId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        postPhoto,
        numberOfCheers,
        numberOfComments,
        caption,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideAdvocates,
        profileColumns,
        postLinks,
        profileProjects: userData.profileProjects,
        profilePictureBase64: userData.profilePictureBase64
          ? userData.profilePictureBase64
          : userData.profilePictureUrl,
        postDateCreated,
      },
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setProjectPostsState(
      Object.values(project.projectPosts).sort((first, second) => {
        return (
          second["postDateCreated"]["_seconds"] -
          first["postDateCreated"]["_seconds"]
        );
      })
    );
  }, [project.projectPosts]);

  const topHeader = () => {
    return (
      <FeedProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={
          project.projectCoverPhotoBase64
            ? project.projectCoverPhotoBase64
            : project.projectCoverPhotoUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={project.projectTitle}
        description={project.projectDescription}
        links={userData.projectLinks}
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
        data={projectPostsState}
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
                itemData.item.ExhibitUId,
                itemData.item.projectId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.postPhotoBase64
                  ? itemData.item.postPhotoBase64
                  : itemData.item.postPhotoUrl,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.profileColumns,
                userData.postLinks,
                itemData.item.postDateCreated._seconds
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
});

export default FeedProjectScreen;
