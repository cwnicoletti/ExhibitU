import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProfileHeader from "../../components/UI_general/ProfileHeader";
import ExhibitItem from "../../components/UI_general/ExhibitItem";
import {
  sendFollowNotification,
  followUser,
  unfollowUser,
} from "../../store/actions/user/user";
import useDidMountEffect from "../../helper/useDidMountEffect";

const NotificationsProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const username = useAppSelector((state) => state.user.username);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const following = useAppSelector((state) => state.user.following);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );
  const [intialFollowing, setIntialFollowing] = useState([]);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);

  const [exploredUserData, setExploredUserData] = useState(
    props.navigation.getParam("exploreData")
      ? props.navigation.getParam("exploreData")
      : {}
  );

  // Empty obj if user doesn't have any exhibits yet
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

  useEffect(() => {
    setNumberOfFollowing(exploredUserData.following.length);
    setNumberOfFollowers(exploredUserData.followers.length);
    setIntialFollowing(following);
  }, []);

  const followUserHandler = useCallback(async () => {
    await setIsLoading(true);
    dispatch(
      sendFollowNotification(
        username,
        ExhibitUId,
        exploredUserData.exploredExhibitUId,
        profilePictureUrl
      )
    );
    await dispatch(
      await followUser(exploredUserData.exploredExhibitUId, ExhibitUId, localId)
    );
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    await index.search("").then((responses) => {
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
    await setIsFollowing(true);
    await setIsLoading(false);
  }, [setIsLoading, followUser, setIsFollowing, setExploredUserData]);

  const unfollowUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unfollowUser(
        exploredUserData.exploredExhibitUId,
        ExhibitUId,
        localId
      )
    );
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    await index.search("").then((responses) => {
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
    await setIsFollowing(false);
    await setIsLoading(false);
  }, [setIsLoading, unfollowUser, setIsFollowing, setExploredUserData]);

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
    if (ExhibitUId === exploredUserData.exploredExhibitUId) {
      if (intialFollowing.length < following.length) {
        setNumberOfFollowing((prevState) => prevState + 1);
      } else if (following.length < intialFollowing.length) {
        setNumberOfFollowing((prevState) => prevState - 1);
      }
    }
    setIntialFollowing(following);
  }, [following]);

  useDidMountEffect(() => {
    if (ExhibitUId !== exploredUserData.exploredExhibitUId) {
      if (intialFollowing.length < following.length) {
        setNumberOfFollowers((prevState) => prevState + 1);
        setIsFollowing(true);
      } else {
        setNumberOfFollowers((prevState) => prevState - 1);
        setIsFollowing(false);
      }
    }
    setIntialFollowing(following);
  }, [following]);

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
      <ProfileHeader
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
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        fullname={exploredUserData.fullname}
        username={`@${exploredUserData.username}`}
        jobTitle={exploredUserData.jobTitle}
        imgSource={exploredUserData.profilePictureUrl}
        description={exploredUserData.profileBiography}
        numberOfFollowers={numberOfFollowers}
        numberOfFollowing={numberOfFollowing}
        numberOfExhibits={Object.keys(exploredUserData.profileExhibits).length}
        hideFollowing={exploredUserData.hideFollowing}
        hideFollowers={exploredUserData.hideFollowers}
        hideExhibits={exploredUserData.hideExhibits}
        ExhibitUId={exploredUserData.exploredExhibitUId}
        links={exploredUserData.profileLinks}
        followersOnPress={() =>
          props.navigation.push("NotificationsFollowers", {
            exploredExhibitUId: exploredUserData.exploredExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("NotificationsFollowing", {
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
            profileColumns={exploredUserData.profileColumns}
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
});

export default NotificationsProfileScreen;
