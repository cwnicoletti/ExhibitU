import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";

import ProjectPictures from "../../components/UI/ProjectPictures";
import FeedProjectHeader from "../../components/feed/FeedProjectHeader";
import FontAwesomeHeaderButton from "../../components/UI/FontAwesomeHeaderButton";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FeedProjectScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const feedExhibitUId = props.navigation.getParam("feedExhibitUId");
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const currentProjectId = props.navigation.getParam("projectId");
  const profilePictureBase64 = props.navigation.getParam(
    "profilePictureBase64"
  );
  const profileProjects = props.navigation.getParam("profileProjects");

  const project = Object.values(profileProjects).find(
    (project) => project.projectId === currentProjectId
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
    profileProjects,
    profilePictureBase64,
    postPhotoBase64,
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
    profileColumns,
    postLinks
  ) => {
    props.navigation.navigate("ViewComments", {
      ExhibitUId,
      projectId,
      postId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileProjects,
      profilePictureBase64,
      postPhotoBase64,
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
      profileColumns,
      postLinks,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ ExhibitUId: ExhibitUId });
    props.navigation.setParams({ feedExhibitUId: feedExhibitUId });
    props.navigation.setParams({ android });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <FeedProjectHeader
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
            image={itemData.item.postPhotoBase64}
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
                profileProjects,
                profilePictureBase64,
                itemData.item.postPhotoBase64,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.profileLinks,
                itemData.item.profileColumns,
                itemData.item.postLinks
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
  const ExhibitUId = navData.navigation.getParam("ExhibitUId");
  const feedExhibitUId = navData.navigation.getParam("feedExhibitUId");
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
    headerRight: () => (
      <View>
        {ExhibitUId !== feedExhibitUId ? (
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
        ) : null}
      </View>
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
