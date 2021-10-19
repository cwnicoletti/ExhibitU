import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { offScreen, refreshNotifications } from "../../store/actions/user/user";

import { AntDesign } from "@expo/vector-icons";

import NotificationCard from "../../components/notifications/NotificationCard";
import useDidMountEffect from "../../helper/useDidMountEffect";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const NotificationsScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const resetScrollNotifications = useAppSelector(
    (state) => state.user.resetScrollNotifications
  );
  const notifications = useAppSelector((state) => state.user.notifications);
  const [notificationsState, setNotificationsState] = useState(
    notifications.sort((first, second) => {
      return (
        second["notificationDateCreated"]["_seconds"] -
        first["notificationDateCreated"]["_seconds"]
      );
    })
  );

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const refreshNotificationPage = async () => {
    await setIsRefreshing(true);
    await dispatch(refreshNotifications(localId));
    await setIsRefreshing(false);
  };

  const viewProfileHandler = async (username, ExhibitUId) => {
    dispatch(offScreen("Notifications"));

    let userData = {};

    const algoliasearch = await require("algoliasearch");
    const client = await algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = await client.initIndex("users");
    await index.search(username).then((responses) => {
      for (const object of responses.hits) {
        if (object) {
          if (object.objectID === ExhibitUId) {
            userData.ExhibitUId = object.objectID;
            userData.profilePictureUrl = object.profilePictureUrl;
            userData.fullname = object.fullname;
            userData.username = object.username;
            userData.jobTitle = object.jobTitle;
            userData.profileBiography = object.profileBiography;
            userData.numberOfFollowers = object.numberOfFollowers;
            userData.numberOfFollowing = object.numberOfFollowing;
            userData.numberOfAdvocates = object.numberOfAdvocates;
            userData.hideFollowing = object.hideFollowing;
            userData.hideFollowers = object.hideFollowers;
            userData.hideExhibits = object.hideExhibits;
            userData.followers = object.followers;
            userData.following = object.following;
            userData.advocates = object.advocates;
            userData.profileExhibits = object.profileExhibits;
            userData.profileLinks = object.profileLinks;
            userData.profileColumns = object.profileColumns;
            userData.showCheering = object.showCheering;
          }
        }
      }
    });
    props.navigation.navigate("NotificationsProfile", {
      exploreData: {
        text: userData.username,
        exploredExhibitUId: userData.ExhibitUId,
        profilePictureUrl: userData.profilePictureUrl,
        fullname: userData.fullname,
        username: userData.username,
        jobTitle: userData.jobTitle,
        profileBiography: userData.profileBiography,
        numberOfFollowers: userData.numberOfFollowers,
        numberOfFollowing: userData.numberOfFollowing,
        numberOfAdvocates: userData.numberOfAdvocates,
        hideFollowing: userData.hideFollowing,
        hideFollowers: userData.hideFollowers,
        hideExhibits: userData.hideExhibits,
        followers: userData.followers,
        following: userData.following,
        advocates: userData.advocates,
        profileExhibits: userData.profileExhibits,
        profileLinks: userData.profileLinks,
        profileColumns: userData.profileColumns,
        showCheering: userData.showCheering,
      },
    });
  };

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setNotificationsState(
      notifications.sort((first, second) => {
        return (
          second["notificationDateCreated"]["_seconds"] -
          first["notificationDateCreated"]["_seconds"]
        );
      })
    );
  }, [notifications]);

  const flatlistNotifications = useRef();
  useDidMountEffect(() => {
    flatlistNotifications.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollNotifications]);

  const topHeader = () => {
    return (
      <View>
        {notificationsState.length === 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "grey", margin: 10, marginTop: 20 }}>
              No notifications
            </Text>
            <AntDesign
              name="exclamationcircle"
              size={24}
              color={"grey"}
              style={{ margin: 10 }}
            />
            <Text style={{ color: "grey", margin: 10 }}>
              When you get your first notification it'll appear here!
            </Text>
          </View>
        ) : null}
      </View>
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
        data={notificationsState}
        extraData={notificationsState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshNotificationPage()}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        ListFooterComponent={topHeader()}
        ref={flatlistNotifications}
        keyExtractor={(item) => item.notificationId}
        renderItem={(itemData) => (
          <NotificationCard
            image={itemData.item.profilePictureUrl}
            postImage={itemData.item.postImage}
            message={itemData.item.message}
            action={itemData.item.action}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            usernameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProfileHandler(
                itemData.item.username,
                itemData.item.ExhibitUId
              );
            }}
          />
        )}
      />
    </View>
  );
};

NotificationsScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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

export default NotificationsScreen;
