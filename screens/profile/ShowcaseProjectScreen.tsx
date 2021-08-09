import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import ShowcaseProjectHeader from "../../components/projects/ShowcaseProjectHeader";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import useDidMountEffect from "../../helper/useDidMountEffect";
import ProjectPictures from "../../components/UI/ProjectPictures";

const ShowcaseProjectScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const currentProjectId = props.navigation.getParam("projectId");
  const userData = props.navigation.getParam("userData");
  const project = userData.profileProjects[currentProjectId];

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
    postId,
    postPhotoUrl,
    postPhotoBase64,
    numberOfCheers,
    numberOfComments,
    caption,
    postLinks,
    postDateCreated
  ) => {
    props.navigation.push("ShowcasePictureScreen", {
      projectId: currentProjectId,
      postId,
      postPhotoUrl,
      postPhotoBase64,
      numberOfCheers,
      numberOfComments,
      caption,
      postLinks,
      postDateCreated,
      userData,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android: android });
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
      <ShowcaseProjectHeader
        containerStyle={{
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
        links={project.projectLinks}
        description={project.projectDescription}
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
      <FlatList<Object | any>
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
            onSelect={() =>
              viewCommentsHandler(
                itemData.item.postId,
                itemData.item.postPhotoUrl,
                itemData.item.postPhotoBase64,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.postLinks,
                itemData.item.postDateCreated._seconds
              )
            }
          />
        )}
      />
    </View>
  );
};

ShowcaseProjectScreen.navigationOptions = (navData) => {
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

export default ShowcaseProjectScreen;
