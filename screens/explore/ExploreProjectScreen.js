import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ExploreProjectHeader from "../../components/explore/ExploreProjectHeader";
import FontAwesomeHeaderButton from "../../components/UI/header_buttons/FontAwesomeHeaderButton";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import ProjectPictures from "../../components/UI/ProjectPictures";
import TutorialExploreProject from "../../components/tutorial/TutorialExploreProject";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { advocateForUser, unadvocateForUser } from "../../store/actions/user";

const ExploreProjectScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const cheeredPosts = useSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const [exploredUserDataLocal, setExploredUserDataLocal] = useState(
    props.navigation.getParam("exploredUserData")
      ? props.navigation.getParam("exploredUserData")
      : {}
  );
  const tutorialing = useSelector((state) => state.user.tutorialing);
  const tutorialScreen = useSelector((state) => state.user.tutorialScreen);

  const exploredProjectData = {
    projectId: props.navigation.getParam("projectId"),
    projectTitle: props.navigation.getParam("projectTitle"),
    projectCoverPhotoUrl: props.navigation.getParam("projectCoverPhotoUrl"),
    projectDescription: props.navigation.getParam("projectDescription"),
    projectColumns: props.navigation.getParam("projectColumns"),
    projectPosts: props.navigation.getParam("projectPosts")
      ? props.navigation.getParam("projectPosts")
      : {},
    projectLinks: props.navigation.getParam("projectLinks")
      ? props.navigation.getParam("projectLinks")
      : {},
  };

  exploredProjectData.projectId = exploredProjectData.projectId
    ? exploredProjectData.projectId
    : "";
  exploredProjectData.projectTitle = exploredProjectData.projectTitle
    ? exploredProjectData.projectTitle
    : "Sample Project";
  exploredProjectData.projectCoverPhotoUrl =
    exploredProjectData.projectCoverPhotoUrl
      ? exploredProjectData.projectCoverPhotoUrl
      : "https://res.cloudinary.com/showcase-79c28/image/upload/v1626117054/project_pic_ysb6uu.png";
  exploredProjectData.projectDescription =
    exploredProjectData.projectDescription
      ? exploredProjectData.projectDescription
      : "I've been working on a really cool web application!";
  exploredProjectData.projectColumns = exploredProjectData.projectColumns
    ? exploredProjectData.projectColumns
    : 2;
  exploredProjectData.projectPosts = exploredProjectData.projectPosts
    ? exploredProjectData.projectPosts
    : {
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
      };
  exploredProjectData.projectLinks = exploredProjectData.projectLinks
    ? exploredProjectData.projectLinks
    : {};

  exploredUserDataLocal.profileBiography =
    exploredUserDataLocal.profileBiography
      ? exploredUserDataLocal.profileBiography
      : "Yes, it's me, Elon Tusk.";
  exploredUserDataLocal.following = exploredUserDataLocal.following
    ? exploredUserDataLocal.following
    : [];
  exploredUserDataLocal.followers = exploredUserDataLocal.followers
    ? exploredUserDataLocal.followers
    : [];
  exploredUserDataLocal.advocates = exploredUserDataLocal.advocates
    ? exploredUserDataLocal.advocates
    : [];
  exploredUserDataLocal.fullname = exploredUserDataLocal.fullname
    ? exploredUserDataLocal.fullname
    : "Elon Tusk";
  exploredUserDataLocal.username = exploredUserDataLocal.username
    ? exploredUserDataLocal.username
    : "elontusk";
  exploredUserDataLocal.jobTitle = exploredUserDataLocal.jobTitle
    ? exploredUserDataLocal.jobTitle
    : "CEO of companies";
  exploredUserDataLocal.profilePictureUrl =
    exploredUserDataLocal.profilePictureUrl
      ? exploredUserDataLocal.profilePictureUrl
      : "";
  exploredUserDataLocal.hideFollowing = exploredUserDataLocal.hideFollowing
    ? exploredUserDataLocal.hideFollowing
    : false;
  exploredUserDataLocal.hideFollowers = exploredUserDataLocal.hideFollowers
    ? exploredUserDataLocal.hideFollowers
    : false;
  exploredUserDataLocal.hideAdvocates = exploredUserDataLocal.hideAdvocates
    ? exploredUserDataLocal.hideAdvocates
    : false;
  exploredUserDataLocal.profileLinks = exploredUserDataLocal.profileLinks
    ? exploredUserDataLocal.profileLinks
    : {};
  exploredUserDataLocal.profileColumns = exploredUserDataLocal.profileColumns
    ? exploredUserDataLocal.profileColumns
    : 2;
  exploredUserDataLocal.showCheering = exploredUserDataLocal.showCheering
    ? exploredUserDataLocal.showCheering
    : true;
  exploredUserDataLocal.numberOfFollowers =
    exploredUserDataLocal.numberOfFollowers
      ? exploredUserDataLocal.numberOfFollowers
      : 0;
  exploredUserDataLocal.numberOfFollowing =
    exploredUserDataLocal.numberOfFollowing
      ? exploredUserDataLocal.numberOfFollowing
      : 0;
  exploredUserDataLocal.numberOfAdvocates =
    exploredUserDataLocal.numberOfAdvocates
      ? exploredUserDataLocal.numberOfAdvocates
      : 0;

  const [projectPostsState, setProjectPostsState] = useState(
    Object.values(exploredProjectData.projectPosts).sort((first, second) => {
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

  const getExlusiveBothSetsDifference = (arr1, arr2) => {
    const difference = arr1
      .filter((x) => !arr2.includes(x))
      .concat(arr2.filter((x) => !arr1.includes(x)));
    return difference;
  };

  const [isAdvocating, setIsAdvocating] = useState(
    exploredUserDataLocal.advocates.includes(ExhibitUId) ? true : false
  );

  const advocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await advocateForUser(
        exploredUserDataLocal.exploredExhibitUId,
        ExhibitUId,
        localId,
        exploredProjectData.projectId
      )
    );
    setIsAdvocating(true);
    await setIsLoading(false);
  }, [setIsLoading, advocateForUser, setIsAdvocating]);

  const unadvocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unadvocateForUser(
        exploredUserDataLocal.exploredExhibitUId,
        ExhibitUId,
        localId,
        exploredProjectData.projectId
      )
    );
    setIsAdvocating(false);
    await setIsAdvocating(false);
    await setIsLoading(false);
  }, [setIsLoading, unadvocateForUser, setIsAdvocating]);

  const viewCommentsHandler = (
    ExhibitUId,
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
    postLinks,
    postDateCreated
  ) => {
    props.navigation.push("ViewExploredProfileProjectPicture", {
      ExhibitUId,
      projectId: exploredProjectData.projectId,
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
      exploredUserData: exploredUserDataLocal,
      postLinks,
      postDateCreated,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ ExhibitUId: ExhibitUId });
    props.navigation.setParams({
      exploredExhibitUId: exploredUserDataLocal.exploredExhibitUId,
    });
    props.navigation.setParams({ advocateFn: advocateUserHandler });
    props.navigation.setParams({ unadvocateFn: unadvocateUserHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    props.navigation.setParams({ isLoading: isLoading });
  }, [isLoading]);

  useEffect(() => {
    props.navigation.setParams({ isAdvocating: isAdvocating });
  }, [isAdvocating]);

  useEffect(() => {
    props.navigation.setParams({ exploreData: exploredUserDataLocal });
  }, [exploredUserDataLocal]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialCheeredPosts,
      cheeredPosts
    );
    const exploredUserDataNewState = exploredUserDataLocal;
    for (const projectId of Object.keys(
      exploredUserDataNewState.profileProjects
    )) {
      for (const postId of Object.keys(
        exploredUserDataNewState.profileProjects[projectId].projectPosts
      )) {
        if (postId === difference[0]) {
          if (intialCheeredPosts.length < cheeredPosts.length) {
            exploredUserDataNewState.profileProjects[projectId].projectPosts[
              postId
            ].numberOfCheers += 1;
            exploredUserDataNewState.profileProjects[projectId].projectPosts[
              postId
            ].cheering = [
              ...exploredUserDataNewState.profileProjects[projectId]
                .projectPosts[postId].cheering,
              ExhibitUId,
            ];
          } else {
            exploredUserDataNewState.profileProjects[projectId].projectPosts[
              postId
            ].numberOfCheers -= 1;
            exploredUserDataNewState.profileProjects[projectId].projectPosts[
              postId
            ].cheering = exploredUserDataNewState.profileProjects[
              projectId
            ].projectPosts[postId].cheering.filter(
              (userId) => userId !== ExhibitUId
            );
          }
        }
      }
    }
    setExploredUserDataLocal(exploredUserDataNewState);
    setIntialCheeredPosts(cheeredPosts);
  }, [cheeredPosts]);

  const topHeader = () => {
    return (
      <ExploreProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={{ uri: exploredProjectData.projectCoverPhotoUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={exploredProjectData.projectTitle}
        description={exploredProjectData.projectDescription}
        links={exploredProjectData.projectLinks}
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
      (tutorialScreen === "ExploreProfile" ||
        tutorialScreen === "ExploreProject" ||
        tutorialScreen === "TutorialEnd") ? (
        <TutorialExploreProject ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <FlatList
        data={projectPostsState}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={topHeader}
        numColumns={exploredProjectData.projectColumns}
        renderItem={(itemData) => (
          <ProjectPictures
            image={itemData.item.postPhotoUrl}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              width:
                exploredProjectData.projectColumns === 1
                  ? "100%"
                  : exploredProjectData.projectColumns === 2
                  ? "50%"
                  : exploredProjectData.projectColumns === 3
                  ? "33.33%"
                  : exploredProjectData.projectColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio:
                exploredProjectData.projectColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            imageContainer={styles.imageContainer}
            onSelect={() =>
              viewCommentsHandler(
                itemData.item.ExhibitUId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileProjects,
                itemData.item.profilePictureUrl,
                itemData.item.postPhotoUrl,
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

ExploreProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const ExhibitUId = navData.navigation.getParam("ExhibitUId");
  const exploredExhibitUId = navData.navigation.getParam("exploredExhibitUId");
  const isAdvocating = navData.navigation.getParam("isAdvocating");
  const isLoading = navData.navigation.getParam("isLoading");
  const advocateFn = navData.navigation.getParam("advocateFn");
  const unadvocateFn = navData.navigation.getParam("unadvocateFn");

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
    headerRight: () => (
      <View>
        {ExhibitUId !== exploredExhibitUId ? (
          <View>
            {!isAdvocating ? (
              <View>
                {!isLoading ? (
                  <HeaderButtons
                    HeaderButtonComponent={FontAwesomeHeaderButton}
                  >
                    <Item
                      title="Advocate"
                      iconName={"handshake-o"}
                      color={darkModeValue ? "white" : "black"}
                      onPress={advocateFn}
                    />
                  </HeaderButtons>
                ) : (
                  <View style={{ margin: 20 }}>
                    <ActivityIndicator
                      size="small"
                      color={darkModeValue ? "white" : "black"}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View>
                {!isLoading ? (
                  <HeaderButtons
                    HeaderButtonComponent={FontAwesomeHeaderButton}
                  >
                    <Item
                      title="Unadvocate"
                      iconName={"handshake-o"}
                      color={"red"}
                      onPress={unadvocateFn}
                    />
                  </HeaderButtons>
                ) : (
                  <View style={{ margin: 20 }}>
                    <ActivityIndicator
                      size="small"
                      color={darkModeValue ? "white" : "black"}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
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
    fontSize: 26,
  },
});

export default ExploreProjectScreen;
