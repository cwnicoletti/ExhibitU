import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProjectPictures from "../../components/UI/ProjectPictures";
import ProjectHeader from "../../components/projects/ProjectHeader";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { changeProjectNumberOfColumns } from "../../store/actions/user";

const ProjectScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const profileProjects = useSelector((state) => state.user.profileProjects);
  const currentProjectId = props.navigation.getParam("projectId");
  const project = profileProjects[currentProjectId];

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
    links
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
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android });
    props.navigation.setParams({ projectId: currentProjectId });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    props.navigation.setParams({ projectTitle: project.projectTitle });
    props.navigation.setParams({
      projectDescription: project.projectDescription,
    });
    props.navigation.setParams({
      projectCoverPhotoUrl: project.projectCoverPhotoUrl,
    });
    props.navigation.setParams({
      projectDateCreated: project.projectDateCreated,
    });
    props.navigation.setParams({
      projectLastUpdated: project.projectLastUpdated,
    });
    props.navigation.setParams({
      projectLinks: project.projectLinks,
    });
  }, [
    project.projectTitle,
    project.projectDescription,
    project.projectDateCreated,
    project.projectLastUpdated,
    project.projectLinks,
  ]);

  const topHeader = () => {
    return (
      <ProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={project.projectCoverPhotoBase64}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={project.projectTitle}
        description={project.projectDescription}
        links={project.projectLinks}
        onEditProfilePress={() =>
          props.navigation.navigate("EditProjectScreen", {
            projectId: currentProjectId,
            projectTitle: project.projectTitle,
            projectCoverPhotoUrl: project.projectCoverPhotoUrl,
            projectDescription: project.projectDescription,
            links: project.projectLinks,
          })
        }
        changeColumnToTwo={() => {
          dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              2
            )
          );
        }}
        columnTwoStyle={{
          borderColor:
            project.projectColumns === 2
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        changeColumnToThree={() => {
          dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              3
            )
          );
        }}
        columnThreeStyle={{
          borderColor:
            project.projectColumns === 3
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        changeColumnToFour={() => {
          dispatch(
            changeProjectNumberOfColumns(
              localId,
              ExhibitUId,
              currentProjectId,
              4
            )
          );
        }}
        columnFourStyle={{
          borderColor:
            project.projectColumns === 4
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
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
        key={project.projectColumns}
        numColumns={project.projectColumns}
        renderItem={(itemData) => (
          <ProjectPictures
            image={itemData.item.postPhotoBase64}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              width:
                project.projectColumns === 2
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
                itemData.item.profileProjects,
                itemData.item.profilePictureUrl,
                itemData.item.postPhotoUrl,
                itemData.item.postPhotoBase64,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.postLinks
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
  const projectDateCreatedParam = navData.navigation.getParam(
    "projectDateCreated"
  );
  const projectLastUpdatedParam = navData.navigation.getParam(
    "projectLastUpdated"
  );
  const projectDescriptionParam = navData.navigation.getParam(
    "projectDescription"
  );
  const projectLinksParam = navData.navigation.getParam("projectLinks");
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

export default ProjectScreen;
