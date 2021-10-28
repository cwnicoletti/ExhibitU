import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FeedProfileHeader from "../../components/feed/FeedProfileHeader";
import ExhibitItem from "../../components/exhibitItems/ExhibitItem";
import useDidMountEffect from "../../helper/useDidMountEffect";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import SimpleLineIconsHeaderButton from "../../components/UI/header_buttons/SimpleLineIconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import {
  sendFollowNotification,
  followUser,
  unfollowUser,
} from "../../store/actions/user/user";

const FeedProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const following = useAppSelector((state) => state.user.following);
  const username = useAppSelector((state) => state.user.username);
  const localId = useAppSelector((state) => state.auth.userId);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(
    props.navigation.getParam("userData")
      ? props.navigation.getParam("userData")
      : {}
  );
  userData.profileLinks = userData.profileLinks ? userData.profileLinks : {};
  userData.exhibitLinks = userData.exhibitLinks ? userData.exhibitLinks : {};

  const [intialFollowing, setIntialFollowing] = useState([]);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);

  const [profileExhibitsState, setProfileExhibitsState] = useState(
    Object.values(userData.profileExhibits).sort(
      (first: string, second: string) => {
        return (
          second["exhibitDateCreated"]["_seconds"] -
          first["exhibitDateCreated"]["_seconds"]
        );
      }
    )
  );

  console.log(userData);

  const [isfollowing, setIsFollowing] = useState(
    userData.followers.includes(ExhibitUId) ? true : false
  );

  useEffect(() => {
    setNumberOfFollowing(userData.numberOfFollowing);
    setNumberOfFollowers(userData.numberOfFollowers);
    setIntialFollowing(following);
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

  const followUserHandler = useCallback(async () => {
    await setIsLoading(true);
    dispatch(
      sendFollowNotification(
        username,
        ExhibitUId,
        userData.exploredExhibitUId,
        profilePictureUrl
      )
    );
    await dispatch(
      await followUser(userData.exploredExhibitUId, ExhibitUId, localId)
    );
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    await index.search("").then((responses) => {
      responses.hits.forEach((hit) => {
        if (hit.objectID === userData.exploredExhibitUId) {
          userData.followers = [...userData.followers, ExhibitUId];
          userData.numberOfFollowers += 1;
          setUserData(userData);
        }
      });
    });
    await setIsFollowing(true);
    await setIsLoading(false);
  }, [setIsLoading, followUser, setIsFollowing, setUserData]);

  const unfollowUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unfollowUser(userData.exploredExhibitUId, ExhibitUId, localId)
    );
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    await index.search("").then((responses) => {
      responses.hits.forEach((hit) => {
        if (hit.objectID === userData.exploredExhibitUId) {
          userData.followers = userData.followers.filter(
            (userId) => userId !== ExhibitUId
          );
          userData.numberOfFollowers -= 1;
          setUserData(userData);
        }
      });
    });
    await setIsFollowing(false);
    await setIsLoading(false);
  }, [setIsLoading, unfollowUser, setIsFollowing, setUserData]);

  useEffect(() => {
    props.navigation.setParams({ ExhibitUId: ExhibitUId });
    props.navigation.setParams({
      exploredExhibitUId: userData.exploredExhibitUId,
    });
    props.navigation.setParams({ followFn: followUserHandler });
    props.navigation.setParams({ unfollowFn: unfollowUserHandler });
  }, []);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setProfileExhibitsState(
      Object.values(userData.profileExhibits).sort(
        (first: string, second: string) => {
          return (
            second["exhibitDateCreated"]["_seconds"] -
            first["exhibitDateCreated"]["_seconds"]
          );
        }
      )
    );
  }, [userData.profileExhibits]);

  useDidMountEffect(() => {
    if (ExhibitUId === userData.exploredExhibitUId) {
      if (intialFollowing.length < following.length) {
        setNumberOfFollowing((prevState) => prevState + 1);
      } else if (following.length < intialFollowing.length) {
        setNumberOfFollowing((prevState) => prevState - 1);
      }
    }
    setIntialFollowing(following);
  }, [following]);

  useDidMountEffect(() => {
    if (ExhibitUId !== userData.exploredExhibitUId) {
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

  const viewExhibitHandler = (exhibitId: string) => {
    props.navigation.navigate("ViewFeedProfileExhibit", {
      exhibitId,
      userData,
    });
  };

  const topHeader = () => {
    return (
      <FeedProfileHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "gray" : "#c9c9c9",
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
        fullname={userData.fullname}
        username={`@${userData.username}`}
        jobTitle={userData.jobTitle}
        numberOfFollowers={numberOfFollowers}
        numberOfFollowing={numberOfFollowing}
        numberOfExhibits={Object.keys(userData.profileExhibits).length}
        hideFollowing={userData.hideFollowing}
        hideFollowers={userData.hideFollowers}
        hideExhibits={userData.hideExhibits}
        links={userData.profileLinks}
        imgSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        description={userData.profileBiography}
        followersOnPress={() =>
          props.navigation.push("ViewFollowers", {
            ExhibitUId: userData.ExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("ViewFollowing", {
            ExhibitUId: userData.ExhibitUId,
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
        key={userData.profileColumns}
        ListHeaderComponent={topHeader()}
        numColumns={userData.profileColumns}
        renderItem={(itemData) => (
          <ExhibitItem
            image={
              itemData.item.exhibitCoverPhotoBase64
                ? itemData.item.exhibitCoverPhotoBase64
                : itemData.item.exhibitCoverPhotoUrl
            }
            title={itemData.item.exhibitTitle}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewExhibitHandler(itemData.item.exhibitId);
            }}
          />
        )}
      />
    </View>
  );
};

FeedProfileScreen.navigationOptions = (navData) => {
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

export default FeedProfileScreen;
