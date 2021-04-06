import React, { useEffect, useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import algoliasearch from "algoliasearch";

import useDidMountEffect from "../../components/helper/useDidMountEffect";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import SimpleLineIconsHeaderButton from "../../components/UI/SimpleLineIconsHeaderButton";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ExploreProfileHeader from "../../components/explore/ExploreProfileHeader";

import { followUser, unfollowUser } from "../../store/actions/user";

const ExploreProfileScreen = (props) => {
  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const dispatch = useDispatch();

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const showcaseId = useSelector((state) => state.user.showcaseId);
  const following = useSelector((state) => state.user.following);
  const projectsAdvocating = useSelector(
    (state) => state.user.projectsAdvocating
  );

  const [exploredUserData, setExploredUserData] = useState({
    text: props.navigation.getParam("text"),
    exploredShowcaseId: props.navigation.getParam("showcaseId"),
    profilePictureUrl: props.navigation.getParam("profilePictureUrl"),
    fullname: props.navigation.getParam("fullname"),
    username: props.navigation.getParam("username"),
    jobTitle: props.navigation.getParam("jobTitle"),
    resumeLinkUrl: props.navigation.getParam("resumeLinkUrl"),
    profileBiography: props.navigation.getParam("profileBiography"),
    numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
    numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
    numberOfAdvocates: props.navigation.getParam("numberOfAdvocates"),
    showResume: props.navigation.getParam("showResume"),
    showCheering: props.navigation.getParam("showCheering"),
    hideFollowing: props.navigation.getParam("hideFollowing"),
    hideFollowers: props.navigation.getParam("hideFollowers"),
    hideAdvocates: props.navigation.getParam("hideAdvocates"),
    followers: props.navigation.getParam("followers"),
    following: props.navigation.getParam("following"),
    advocates: props.navigation.getParam("advocates")
      ? props.navigation.getParam("advocates")
      : {},
    profileLinks: props.navigation.getParam("profileLinks"),
    profileProjects: props.navigation.getParam("profileProjects")
      ? props.navigation.getParam("profileProjects")
      : {},
    profileColumns: props.navigation.getParam("profileColumns"),
  });

  const [isfollowing, setIsFollowing] = useState(
    exploredUserData.followers.includes(showcaseId) ? true : false
  );
  const [numberOfFollowersLocal, setNumberOfFollowersLocal] = useState(
    exploredUserData.numberOfFollowers
  );
  const [numberOfFollowingLocal, setNumberOfFollowingLocal] = useState(
    exploredUserData.numberOfFollowing
  );
  const [numberOfAdvocatesLocal, setNumberOfAdvocatesLocal] = useState(
    exploredUserData.numberOfAdvocates
  );

  useEffect(() => {
    if (exploredUserData.text) {
      index.search(exploredUserData.text).then((responses) => {
        responses.hits.forEach((hit) => {
          if (hit.objectID === exploredUserData.exploredShowcaseId) {
            setNumberOfAdvocatesLocal(hit.numberOfAdvocates);
            const exploredUserDataPrevState = exploredUserData;
            exploredUserDataPrevState.numberOfAdvocates = hit.numberOfAdvocates;
            exploredUserDataPrevState.advocates = hit.advocates;
            setExploredUserData(exploredUserDataPrevState);
          }
        });
      });
    }
  }, [projectsAdvocating]);

  useEffect(() => {
    if (exploredUserData.text) {
      index.search(exploredUserData.text).then((responses) => {
        responses.hits.forEach((hit) => {
          if (hit.objectID === exploredUserData.exploredShowcaseId) {
            setNumberOfFollowersLocal(hit.numberOfFollowers);
            if (hit.followers.includes(showcaseId)) {
              setIsFollowing(true);
            } else {
              setIsFollowing(false);
            }
          }
        });
      });
    }
  }, [following]);

  const followUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await followUser(exploredUserData.exploredShowcaseId, showcaseId, localId)
    );
    await setIsFollowing(true);
    await setIsLoading(false);
  }, [setIsLoading, followUser, setIsFollowing]);

  const unfollowUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unfollowUser(
        exploredUserData.exploredShowcaseId,
        showcaseId,
        localId
      )
    );
    await setIsFollowing(false);
    await setIsLoading(false);
  }, [setIsLoading, unfollowUser, setIsFollowing]);

  const refreshProfile = () => {
    setIsRefreshing(true);
    index.search(exploredUserData.text).then((responses) => {
      responses.hits.forEach((hit) => {
        if (hit.objectID === exploredUserData.exploredShowcaseId) {
          const exploredUserDataPrevState = exploredUserData;
          exploredUserDataPrevState.profileProjects = hit.profileProjects;
          exploredUserDataPrevState.following = hit.following;
          exploredUserDataPrevState.followers = hit.followers;
          exploredUserDataPrevState.advocates = hit.advocates;
          exploredUserDataPrevState.fullname = hit.fullname;
          exploredUserDataPrevState.username = hit.username;
          exploredUserDataPrevState.jobTitle = hit.jobTitle;
          exploredUserDataPrevState.profilePictureUrl = hit.profilePictureUrl;
          exploredUserDataPrevState.hideFollowing = hit.hideFollowing;
          exploredUserDataPrevState.hideFollowers = hit.hideFollowers;
          exploredUserDataPrevState.hideAdvocates = hit.hideAdvocates;
          exploredUserDataPrevState.profileLinks = hit.profileLinks;
          exploredUserDataPrevState.profileColumns = hit.profileColumns;
          exploredUserDataPrevState.showResume = hit.showResume;
          exploredUserDataPrevState.resumeLinkUrl = hit.resumeLinkUrl;
          exploredUserDataPrevState.showCheering = hit.showCheering;
          setNumberOfFollowersLocal(hit.numberOfFollowers);
          setNumberOfFollowingLocal(hit.numberOfFollowing);
          setNumberOfAdvocatesLocal(hit.numberOfAdvocates);
          setExploredUserData(exploredUserDataPrevState);
        }
      });
    });
    setIsRefreshing(false);
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
    props.navigation.setParams({ isfollowing: isfollowing });
    props.navigation.setParams({ isLoading: isLoading });
    props.navigation.setParams({ showcaseId: showcaseId });
    props.navigation.setParams({
      exploredShowcaseId: exploredUserData.exploredShowcaseId,
    });
    props.navigation.setParams({ followFn: followUserHandler });
    props.navigation.setParams({ unfollowFn: unfollowUserHandler });
  }, [
    darkModeValue,
    isLoading,
    isfollowing,
    followUserHandler,
    unfollowUserHandler,
  ]);

  const viewProjectHandler = (
    projectTitle,
    projectCoverPhotoUrl,
    projectDescription,
    projectPictures,
    projectLinks,
    projectPosts,
    projectId,
    projectColumns
  ) => {
    props.navigation.push("ViewExploredProfileProject", {
      projectTitle: projectTitle,
      projectCoverPhotoUrl: projectCoverPhotoUrl,
      projectDescription: projectDescription,
      projectPictures: projectPictures,
      projectLinks: projectLinks,
      projectPosts: projectPosts,
      projectId: projectId,
      projectColumns: projectColumns,
      exploredUserData: exploredUserData,
    });
  };

  const topHeader = () => {
    return (
      <ExploreProfileHeader
        containerStyle={{
          ...styles.profileContainerStyle,
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
        fullname={exploredUserData.fullname}
        username={`@${exploredUserData.username}`}
        jobTitle={exploredUserData.jobTitle}
        imgSource={exploredUserData.profilePictureUrl}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        resumeText={{
          color: darkModeValue ? "white" : "black",
        }}
        iconResumeStyle={darkModeValue ? "white" : "black"}
        description={exploredUserData.profileBiography}
        numberOfFollowers={numberOfFollowersLocal}
        numberOfFollowing={numberOfFollowingLocal}
        numberOfAdvocates={numberOfAdvocatesLocal}
        hideFollowing={exploredUserData.hideFollowing}
        hideFollowers={exploredUserData.hideFollowers}
        hideAdvocates={exploredUserData.hideAdvocates}
        showcaseId={exploredUserData.exploredShowcaseId}
        links={exploredUserData.profileLinks}
        followersOnPress={() =>
          props.navigation.navigate("ExploreFollowers", {
            showcaseId: exploredUserData.exploredShowcaseId,
          })
        }
        followingOnPress={() =>
          props.navigation.navigate("ExploreFollowing", {
            showcaseId: exploredUserData.exploredShowcaseId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.navigate("ExploreAdvocates", {
            exploredShowcaseId: exploredUserData.exploredShowcaseId,
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
        data={Object.values(exploredUserData.profileProjects)}
        keyExtractor={(item) => item.projectId}
        ListHeaderComponent={topHeader}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshProfile()}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        numColumns={exploredUserData.profileColumns}
        renderItem={(itemData) => (
          <ProjectItem
            image={itemData.item.projectCoverPhotoUrl}
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
                itemData.item.projectTitle,
                itemData.item.projectCoverPhotoUrl,
                itemData.item.projectDescription,
                itemData.item.projectPictures,
                itemData.item.projectLinks,
                itemData.item.projectPosts,
                itemData.item.projectId,
                itemData.item.projectColumns
              );
            }}
          />
        )}
      />
    </View>
  );
};

ExploreProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const isfollowing = navData.navigation.getParam("isfollowing");
  const isLoading = navData.navigation.getParam("isLoading");
  const showcaseId = navData.navigation.getParam("showcaseId");
  const exploredShowcaseId = navData.navigation.getParam("exploredShowcaseId");
  const followFn = navData.navigation.getParam("followFn");
  const unfollowFn = navData.navigation.getParam("unfollowFn");
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
      <View>
        {showcaseId !== exploredShowcaseId ? (
          <View>
            {!isfollowing ? (
              <View>
                {!isLoading ? (
                  <HeaderButtons
                    HeaderButtonComponent={SimpleLineIconsHeaderButton}
                  >
                    <Item
                      title="Follow"
                      iconName={"user-follow"}
                      color={darkModeValue ? "white" : "black"}
                      onPress={followFn}
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
                    HeaderButtonComponent={SimpleLineIconsHeaderButton}
                  >
                    <Item
                      title="Follow"
                      iconName={"user-follow"}
                      color={"red"}
                      onPress={unfollowFn}
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
    paddingBottom: 20,
  },
  profileContainerStyle: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
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

export default ExploreProfileScreen;
