import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { offScreen, refreshNotifications } from "../../store/actions/user/user";
import getNotificationPermissions from "../../helper/getNotificationPermissions";
import { setToken } from "../../store/actions/user/user";

import NotificationCard from "../../components/notifications/NotificationCard";
import useDidMountEffect from "../../helper/useDidMountEffect";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const ExploreScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const resetScrollNotifications = useAppSelector(
    (state) => state.user.resetScrollNotifications
  );
  const notifications = useAppSelector((state) => state.user.notifications);

  const uploadToken = async () => {
    const tokenValue = await getNotificationPermissions();

    if (tokenValue !== false) {
      dispatch(setToken(localId, tokenValue));
    }
  };

  useEffect(() => {
    uploadToken();
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const refreshNotificationPage = async () => {
    await setIsRefreshing(true);
    await dispatch(refreshNotifications(localId));
    await setIsRefreshing(false);
  };

  const viewProfileHandler = (
    ExhibitUId,
    profilePictureUrl,
    fullname,
    username,
    jobTitle,
    resumeLinkUrl,
    profileBiography,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    showResume,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    followers,
    following,
    advocates,
    profileExhibits,
    profileLinks,
    exhibitLinks,
    profileColumns,
    showCheering
  ) => {
    dispatch(offScreen("Notifications"));
    props.navigation.push("NotificationsProfile", {
      ExhibitUId,
      profilePictureUrl,
      fullname,
      username,
      jobTitle,
      resumeLinkUrl,
      profileBiography,
      numberOfFollowers,
      numberOfFollowing,
      numberOfAdvocates,
      showResume,
      hideFollowing,
      hideFollowers,
      hideAdvocates,
      followers,
      following,
      advocates,
      profileExhibits,
      profileLinks,
      exhibitLinks,
      profileColumns,
      showCheering,
    });
  };

  const flatlistNotifications = useRef();
  useDidMountEffect(() => {
    flatlistNotifications.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollNotifications]);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FlatList
        data={notifications}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshNotificationPage()}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        ref={flatlistNotifications}
        keyExtractor={(item) => item.notificationId}
        renderItem={(itemData) => (
          <NotificationCard
            image={itemData.item.profilePictureUrl}
            postImage={itemData.item.postImage}
            username={itemData.item.username}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            usernameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProfileHandler(
                itemData.item.objectID,
                itemData.item.profilePictureUrl,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.resumeLinkUrl,
                itemData.item.profileBiography,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.showResume,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.followers,
                itemData.item.following,
                itemData.item.advocates,
                itemData.item.profileExhibits,
                itemData.item.profileLinks,
                itemData.item.exhibitLinks,
                itemData.item.profileColumns,
                itemData.item.showCheering
              );
            }}
          />
        )}
      />
    </View>
  );
};

ExploreScreen.navigationOptions = (navData) => {
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

export default ExploreScreen;
