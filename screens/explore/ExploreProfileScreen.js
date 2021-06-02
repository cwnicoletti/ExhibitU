import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ExploreProfileHeader from "../../components/explore/ExploreProfileHeader";
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import SimpleLineIconsHeaderButton from "../../components/UI/SimpleLineIconsHeaderButton";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { followUser, unfollowUser } from "../../store/actions/user";

const ExploreProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const projectsAdvocating = useSelector(
    (state) => state.user.projectsAdvocating
  );
  const [exploredUserData, setExploredUserData] = useState(
    props.navigation.getParam("exploreData")
  );

  // Empty dict if user doesn't have any projects yet
  exploredUserData.profileProjects = exploredUserData.profileProjects
    ? exploredUserData.profileProjects
    : {};

  const [isfollowing, setIsFollowing] = useState(
    exploredUserData.followers.includes(ExhibitUId) ? true : false
  );
  const [isAdvocating, setIsAdvocating] = useState(
    exploredUserData.advocates.includes(ExhibitUId) ? true : false
  );

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const followUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await followUser(exploredUserData.exploredExhibitUId, ExhibitUId, localId)
    );
    if (exploredUserData.text) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");

      await index.search(exploredUserData.text).then((responses) => {
        responses.hits.forEach((hit) => {
          if (hit.objectID === exploredUserData.exploredExhibitUId) {
            exploredUserData.followers = [
              ...exploredUserData.followers,
              ExhibitUId,
            ];
            exploredUserData.numberOfFollowers += 1;
            setExploredUserData(exploredUserData);
          }
        });
      });
    }
    await setIsFollowing(true);
    await setIsLoading(false);
  }, [setIsLoading, followUser, setIsFollowing]);

  const unfollowUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unfollowUser(
        exploredUserData.exploredExhibitUId,
        ExhibitUId,
        localId
      )
    );
    if (exploredUserData.text) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");

      await index.search(exploredUserData.text).then((responses) => {
        responses.hits.forEach((hit) => {
          if (hit.objectID === exploredUserData.exploredExhibitUId) {
            exploredUserData.followers = exploredUserData.followers.filter(
              (userId) => userId !== ExhibitUId
            );
            exploredUserData.numberOfFollowers -= 1;
            setExploredUserData(exploredUserData);
          }
        });
      });
    }
    await setIsFollowing(false);
    await setIsLoading(false);
  }, [setIsLoading, unfollowUser, setIsFollowing]);

  const refreshProfile = () => {
    setIsRefreshing(true);
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    index.search(exploredUserData.text).then((responses) => {
      responses.hits.forEach((hit) => {
        if (hit.objectID === exploredUserData.exploredExhibitUId) {
          const exploredUserDataNewState = exploredUserData;
          exploredUserDataNewState.profileProjects = hit.profileProjects;
          exploredUserDataNewState.profileBiography = hit.profileBiography;
          exploredUserDataNewState.following = hit.following;
          exploredUserDataNewState.followers = hit.followers;
          exploredUserDataNewState.advocates = hit.advocates;
          exploredUserDataNewState.fullname = hit.fullname;
          exploredUserDataNewState.username = hit.username;
          exploredUserDataNewState.jobTitle = hit.jobTitle;
          exploredUserDataNewState.profilePictureUrl = hit.profilePictureUrl;
          exploredUserDataNewState.hideFollowing = hit.hideFollowing;
          exploredUserDataNewState.hideFollowers = hit.hideFollowers;
          exploredUserDataNewState.hideAdvocates = hit.hideAdvocates;
          exploredUserDataNewState.profileLinks = hit.profileLinks;
          exploredUserDataNewState.projectLinks = hit.projectLinks;
          exploredUserDataNewState.profileColumns = hit.profileColumns;
          exploredUserDataNewState.showResume = hit.showResume;
          exploredUserDataNewState.resumeLinkUrl = hit.resumeLinkUrl;
          exploredUserDataNewState.showCheering = hit.showCheering;
          exploredUserDataNewState.numberOfFollowers = hit.numberOfFollowers;
          exploredUserDataNewState.numberOfFollowing = hit.numberOfFollowing;
          exploredUserDataNewState.numberOfAdvocates = hit.numberOfAdvocates;
          setExploredUserData(exploredUserDataNewState);
        }
      });
    });
    setIsRefreshing(false);
  };

  useEffect(() => {
    props.navigation.setParams({ ExhibitUId: ExhibitUId });
    props.navigation.setParams({
      exploredExhibitUId: exploredUserData.exploredExhibitUId,
    });
    props.navigation.setParams({ followFn: followUserHandler });
    props.navigation.setParams({ unfollowFn: unfollowUserHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    props.navigation.setParams({ isLoading: isLoading });
  }, [isLoading]);

  useEffect(() => {
    props.navigation.setParams({ isfollowing: isfollowing });
  }, [isfollowing]);

  useDidMountEffect(() => {
    if (isAdvocating) {
      const exploredUserDataNewState = exploredUserData;
      exploredUserDataNewState.advocates =
        exploredUserDataNewState.advocates.filter(
          (user) => user !== ExhibitUId
        );
      exploredUserDataNewState.numberOfAdvocates -= 1;
      setIsAdvocating(false);
      setExploredUserData(exploredUserDataNewState);
    } else {
      const exploredUserDataNewState = exploredUserData;
      exploredUserDataNewState.advocates = [
        ...exploredUserDataNewState.advocates,
        ExhibitUId,
      ];
      exploredUserDataNewState.numberOfAdvocates += 1;
      setIsAdvocating(true);
      setExploredUserData(exploredUserDataNewState);
    }
  }, [projectsAdvocating]);

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
      projectTitle,
      projectCoverPhotoUrl,
      projectDescription,
      projectPictures,
      projectLinks,
      projectPosts,
      projectId,
      projectColumns,
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
        numberOfFollowers={exploredUserData.numberOfFollowers}
        numberOfFollowing={exploredUserData.numberOfFollowing}
        numberOfAdvocates={exploredUserData.numberOfAdvocates}
        hideFollowing={exploredUserData.hideFollowing}
        hideFollowers={exploredUserData.hideFollowers}
        hideAdvocates={exploredUserData.hideAdvocates}
        ExhibitUId={exploredUserData.exploredExhibitUId}
        links={exploredUserData.profileLinks}
        followersOnPress={() =>
          props.navigation.push("ExploreFollowers", {
            ExhibitUId: exploredUserData.exploredExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("ExploreFollowing", {
            ExhibitUId: exploredUserData.exploredExhibitUId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.push("ExploreAdvocates", {
            exploredExhibitUId: exploredUserData.exploredExhibitUId,
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
  const ExhibitUId = navData.navigation.getParam("ExhibitUId");
  const exploredExhibitUId = navData.navigation.getParam("exploredExhibitUId");
  const followFn = navData.navigation.getParam("followFn");
  const unfollowFn = navData.navigation.getParam("unfollowFn");
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
    fontSize: 26,
  },
});

export default ExploreProfileScreen;
