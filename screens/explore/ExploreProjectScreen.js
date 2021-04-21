import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProjectPictures from "../../components/UI/ProjectPictures";
import ExploreProjectHeader from "../../components/explore/ExploreProjectHeader";
import FontAwesomeHeaderButton from "../../components/UI/FontAwesomeHeaderButton";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { advocateForUser, unadvocateForUser } from "../../store/actions/user";

const ExploreProjectScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const creatistId = useSelector((state) => state.user.creatistId);
  const exploredUserData = props.navigation.getParam("exploredUserData");

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

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const [isAdvocating, setIsAdvocating] = useState(
    exploredUserData.advocates.includes(creatistId) ? true : false
  );

  const advocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await advocateForUser(
        exploredUserData.exploredCreatistId,
        creatistId,
        localId,
        exploredProjectData.projectId
      )
    );
    await setIsAdvocating(true);
    await setIsLoading(false);
  }, [setIsLoading, advocateForUser, setIsAdvocating]);

  const unadvocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unadvocateForUser(
        exploredUserData.exploredCreatistId,
        creatistId,
        localId,
        exploredProjectData.projectId
      )
    );
    await setIsAdvocating(false);
    await setIsLoading(false);
  }, [setIsLoading, unadvocateForUser, setIsAdvocating]);

  const viewCommentsHandler = (
    creatistId,
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
    postLinks
  ) => {
    props.navigation.push("ViewExploredProfileProjectPicture", {
      creatistId,
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
      exploredUserData: exploredUserData,
      postLinks,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ creatistId: creatistId });
    props.navigation.setParams({
      exploredCreatistId: exploredUserData.exploredCreatistId,
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
      <FlatList
        data={Object.values(exploredProjectData.projectPosts)}
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
                itemData.item.creatistId,
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
                itemData.item.postLinks
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
  const creatistId = navData.navigation.getParam("creatistId");
  const exploredCreatistId = navData.navigation.getParam("exploredCreatistId");
  const isAdvocating = navData.navigation.getParam("isAdvocating");
  const isLoading = navData.navigation.getParam("isLoading");
  const advocateFn = navData.navigation.getParam("advocateFn");
  const unadvocateFn = navData.navigation.getParam("unadvocateFn");

  return {
    headerTitle: () => (
      <View style={styles.logo}>
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/creatist_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/creatist_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Creatist
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
        {creatistId !== exploredCreatistId ? (
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
    fontSize: 22,
  },
  details: {
    height: 0,
  },
});

export default ExploreProjectScreen;
