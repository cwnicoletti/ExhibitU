import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProjectHeader from "../../components/projects/ProjectHeader";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import ProjectPictures from "../../components/UI/ProjectPictures";
import TutorialExhibitView from "../../components/tutorial/TutorialExhibitView";
import { changeProjectNumberOfColumns } from "../../store/actions/user";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const ProjectScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoadingTwoColumns, setIsLoadingTwoColumns] = useState(false);
  const [isLoadingThreeColumns, setIsLoadingThreeColumns] = useState(false);
  const [isLoadingFourColumns, setIsLoadingFourColumns] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const profileProjects = useAppSelector((state) => state.user.profileProjects);
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);
  const currentProjectId = props.navigation.getParam("projectId");
  const currentProject = profileProjects[currentProjectId]
    ? profileProjects[currentProjectId]
    : {
        projectPosts: {
          ["randomId121334h"]: {
            ExhibitUId: ExhibitUId,
            projectId: "randomId121334",
            postId: "randomId121334h",
            fullname: "test",
            username: "test",
            jobTitle: "test",
            profileBiography: "test",
            profileProjects: {},
            profilePictureUrl: "test",
            postPhotoUrl:
              "https://camo.githubusercontent.com/9aea0a68fd10f943a82ce8a434f6c126296568fdf17d0cc914d40a4feb4a9f10/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f706572736f6e616c757365313233342f696d6167652f75706c6f61642f76313631373231353939392f436f43726561746f727765626170705f6c7a716e696e2e706e67",
            postPhotoBase64: "",
            numberOfCheers: 0,
            numberOfComments: 0,
            caption: "Sample post",
            postLinks: {},
            postDateCreated: {
              _seconds: 7654757,
              _minutes: 7654757,
            },
          },
        },
        projectTitle: "Sample Exhibit",
        projectDescription:
          "I've been working on a really cool web application!",
        projectCoverPhotoUrl:
          "https://res.cloudinary.com/showcase-79c28/image/upload/v1626117054/project_pic_ysb6uu.png",
        projectCoverPhotoBase64: "",
        projectDateCreated: {
          _seconds: 7654757,
          _minutes: 7654757,
        },
        projectLastUpdated: {
          _seconds: 7654757,
          _minutes: 7654757,
        },
        projectLinks: {},
        projectColumns: 2,
      };
  const [projectPostsState, setProjectPostsState] = useState(
    Object.values(currentProject.projectPosts).sort((first, second) => {
      return (
        second["postDateCreated"]["_seconds"] -
        first["postDateCreated"]["_seconds"]
      );
    })
  );

  const postIds = Object.keys(currentProject.projectPosts);

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
    profileProjects,
    profilePictureUrl,
    postPhotoUrl,
    postPhotoBase64,
    numberOfCheers,
    numberOfComments,
    caption,
    links,
    postDateCreated
  ) => {
    props.navigation.push("PictureScreen", {
      ExhibitUId,
      projectId,
      postId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileProjects,
      profilePictureUrl,
      postPhotoUrl,
      postPhotoBase64,
      numberOfCheers,
      numberOfComments,
      caption,
      links,
      postDateCreated,
    });
  };

  useEffect(() => {
    props.navigation.setParams({
      projectId: currentProjectId,
      projectTitle: currentProject.projectTitle,
      projectDescription: currentProject.projectDescription,
      projectCoverPhotoUrl: currentProject.projectCoverPhotoUrl,
      projectDateCreated: currentProject.projectDateCreated,
      projectLastUpdated: currentProject.projectLastUpdated,
      projectLinks: currentProject.projectLinks,
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <ProjectHeader
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={
          currentProject.projectCoverPhotoBase64
            ? currentProject.projectCoverPhotoBase64
            : currentProject.projectCoverPhotoUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={currentProject.projectTitle}
        description={currentProject.projectDescription}
        links={currentProject.projectLinks}
        onEditProfilePress={() =>
          props.navigation.navigate("EditProjectScreen", {
            projectId: currentProjectId,
            projectTitle: currentProject.projectTitle,
            projectDescription: currentProject.projectDescription,
            projectCoverPhotoId: currentProject.projectCoverPhotoId,
            projectCoverPhotoUrl: currentProject.projectCoverPhotoUrl,
            links: currentProject.projectLinks,
          })
        }
        changeColumnToTwo={async () => {
          await setIsLoadingTwoColumns(true);
          await dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              postIds,
              2
            )
          );
          await setIsLoadingTwoColumns(false);
        }}
        columnTwoStyle={{
          borderColor:
            currentProject.projectColumns === 2
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingTwoColumns={isLoadingTwoColumns}
        changeColumnToThree={async () => {
          await setIsLoadingThreeColumns(true);
          await dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              postIds,
              3
            )
          );
          await setIsLoadingThreeColumns(false);
        }}
        columnThreeStyle={{
          borderColor:
            currentProject.projectColumns === 3
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingThreeColumns={isLoadingThreeColumns}
        changeColumnToFour={async () => {
          await setIsLoadingFourColumns(true);
          await dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              postIds,
              4
            )
          );
          await setIsLoadingFourColumns(false);
        }}
        columnFourStyle={{
          borderColor:
            currentProject.projectColumns === 4
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingFourColumns={isLoadingFourColumns}
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
      {tutorialing &&
      (tutorialScreen === "ExhibitView" ||
        tutorialScreen === "PostCreation") ? (
        <TutorialExhibitView ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <FlatList<Object | any>
        data={projectPostsState}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={topHeader}
        key={currentProject.projectColumns}
        numColumns={currentProject.projectColumns}
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
                currentProject.projectColumns === 2
                  ? "50%"
                  : currentProject.projectColumns === 3
                  ? "33.33%"
                  : currentProject.projectColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio: currentProject.projectColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() =>
              viewCommentsHandler(
                itemData.item.ExhibitUId,
                itemData.item.projectId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileProjects,
                itemData.item.profilePictureUrl,
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

ProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const projectIdParam = navData.navigation.getParam("projectId");
  const projectTitleParam = navData.navigation.getParam("projectTitle");
  const projectCoverPhotoUrlParam = navData.navigation.getParam(
    "projectCoverPhotoUrl"
  );
  const projectDateCreatedParam =
    navData.navigation.getParam("projectDateCreated");
  const projectLastUpdatedParam =
    navData.navigation.getParam("projectLastUpdated");
  const projectDescriptionParam =
    navData.navigation.getParam("projectDescription");
  const projectLinksParam = navData.navigation.getParam("projectLinks");

  return {
    headerTitle: () => (
      <MainHeaderTitle
        darkModeValue={darkModeValue}
        fontFamily={"CormorantUpright"}
        titleName={"ExhibitU"}
      />
    ),
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Back"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Add"
          iconName={"ios-add"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.navigate("AddPicture", {
              projectId: projectIdParam,
              projectTitle: projectTitleParam,
              projectCoverPhotoUrl: projectCoverPhotoUrlParam,
              projectDateCreated: projectDateCreatedParam,
              projectLastUpdated: projectLastUpdatedParam,
              projectDescription: projectDescriptionParam,
              projectLinks: projectLinksParam,
            });
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
});

export default ProjectScreen;
