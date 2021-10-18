import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExploreProfileHeader from "../../components/explore/ExploreProfileHeader";
import ExhibitItem from "../../components/exhibitItems/ExhibitItem";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import SimpleLineIconsHeaderButton from "../../components/UI/header_buttons/SimpleLineIconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import TutorialExploreProfile from "../../components/tutorial/TutorialExploreProfile";
import { followUser, unfollowUser } from "../../store/actions/user/user";

const NotificationsProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);

  const [exploredUserData, setExploredUserData] = useState(
    props.navigation.getParam("exploreData")
      ? props.navigation.getParam("exploreData")
      : {}
  );
  // Empty dict if user doesn't have any exhibits yet
  exploredUserData.profileExhibits = exploredUserData.profileExhibits
    ? exploredUserData.profileExhibits
    : {};

  const profileExhibitsState = Object.values(
    exploredUserData.profileExhibits
  ).sort((first: string, second: string) => {
    return (
      second["exhibitDateCreated"]["_seconds"] -
      first["exhibitDateCreated"]["_seconds"]
    );
  });

  const [isfollowing, setIsFollowing] = useState(
    exploredUserData.followers.includes(ExhibitUId) ? true : false
  );

  let android: boolean = null;
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
          exploredUserDataNewState.profileExhibits = hit.profileExhibits;
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
          exploredUserDataNewState.hideExhibits = hit.hideExhibits;
          exploredUserDataNewState.profileLinks = hit.profileLinks;
          exploredUserDataNewState.profileColumns = hit.profileColumns;
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


  const viewExhibitHandler = (
    exhibitTitle: string,
    exhibitCoverPhotoUrl: string,
    exhibitDescription: string,
    exhibitPictures,
    exhibitLinks: object,
    exhibitPosts: object,
    exhibitId: string,
    exhibitColumns: number
  ) => {
    props.navigation.push("ViewNotificationsProfileExhibit", {
      exhibitTitle,
      exhibitCoverPhotoUrl,
      exhibitDescription,
      exhibitPictures,
      exhibitLinks,
      exhibitPosts,
      exhibitId,
      exhibitColumns,
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
        description={exploredUserData.profileBiography}
        numberOfFollowers={exploredUserData.numberOfFollowers}
        numberOfFollowing={exploredUserData.numberOfFollowing}
        numberOfExhibits={Object.keys(exploredUserData.profileExhibits).length}
        hideFollowing={exploredUserData.hideFollowing}
        hideFollowers={exploredUserData.hideFollowers}
        hideExhibits={exploredUserData.hideExhibits}
        ExhibitUId={exploredUserData.exploredExhibitUId}
        links={exploredUserData.profileLinks}
        followersOnPress={() =>
          props.navigation.push("NotificationsFollowers", {
            ExhibitUId: exploredUserData.exploredExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("NotificationsFollowing", {
            ExhibitUId: exploredUserData.exploredExhibitUId,
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
      {tutorialing &&
      (tutorialScreen === "ExploreProfile" ||
        tutorialScreen === "ExploreExhibit") ? (
        <TutorialExploreProfile ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <FlatList<any>
        data={profileExhibitsState}
        keyExtractor={(item) => item.exhibitId}
        ListHeaderComponent={topHeader()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshProfile()}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        numColumns={exploredUserData.profileColumns}
        renderItem={(itemData) => (
          <ExhibitItem
            image={itemData.item.exhibitCoverPhotoUrl}
            title={itemData.item.exhibitTitle}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewExhibitHandler(
                itemData.item.exhibitTitle,
                itemData.item.exhibitCoverPhotoUrl,
                itemData.item.exhibitDescription,
                itemData.item.exhibitPictures,
                itemData.item.exhibitLinks,
                itemData.item.exhibitPosts,
                itemData.item.exhibitId,
                itemData.item.exhibitColumns
              );
            }}
          />
        )}
      />
    </View>
  );
};

NotificationsProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const isfollowing = navData.navigation.getParam("isfollowing");
  const isLoading = navData.navigation.getParam("isLoading");
  const ExhibitUId = navData.navigation.getParam("ExhibitUId");
  const exploredExhibitUId = navData.navigation.getParam("exploredExhibitUId");
  const followFn = navData.navigation.getParam("followFn");
  const unfollowFn = navData.navigation.getParam("unfollowFn");
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
          title="Add"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.pop();
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
                      iconName={"user-unfollow"}
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
    padding: 20,
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
});

export default NotificationsProfileScreen;
