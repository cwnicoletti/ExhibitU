import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FeedItem from "../../components/feed/FeedItem";
import useDidMountEffect from "../../helper/useDidMountEffect";
import * as Notifications from "expo-notifications";
import { getUserFeed, offScreen } from "../../store/actions/user";

const UserFeedScreen = (props) => {
  const dispatch = useDispatch();
  const styleTypes = ["dark-content", "light-content"];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [emptyFeed, setEmptyFeed] = useState(false);
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const localId = useSelector((state) => state.auth.userId);
  const userFeed = useSelector((state) => state.user.userFeed);
  const [userFeedState, setUserFeedState] = useState(
    Object.values(userFeed).sort((first, second) => {
      return (
        second["postDateCreated"]["_seconds"] -
        first["postDateCreated"]["_seconds"]
      );
    })
  );
  const profilePictureBase64 = useSelector(
    (state) => state.user.profilePictureBase64
  );
  const resetScrollFeed = useSelector((state) => state.user.resetScrollFeed);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (
    ExhibitUId,
    projectId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureBase64,
    profilePictureUrl,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    projectLinks,
    profileColumns,
    postDateCreated
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewFeedProject", {
      projectId,
      userData: {
        ExhibitUId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        profileProjects,
        profilePictureBase64,
        profilePictureUrl,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideAdvocates,
        projectLinks,
        profileColumns,
        postDateCreated,
      },
    });
  };

  const viewCheeringHandler = (
    ExhibitUId,
    projectId,
    postId,
    numberOfCheers
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewCheering", {
      ExhibitUId,
      projectId,
      postId,
      numberOfCheers,
    });
  };

  const viewProfileHandler = (
    ExhibitUId,
    fullname,
    username,
    jobTitle,
    profileBiography,
    profileProjects,
    profilePictureBase64,
    profilePictureUrl,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    profileLinks,
    projectLinks,
    profileColumns,
    postDateCreated
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewProfile", {
      userData: {
        ExhibitUId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        profileProjects,
        profilePictureBase64,
        profilePictureUrl,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideAdvocates,
        profileLinks,
        projectLinks,
        profileColumns,
        postDateCreated,
      },
    });
  };

  const setStatusBarStyle = (darkModeValue) => {
    if (darkModeValue === true) {
      return styleTypes[1];
    } else {
      return styleTypes[0];
    }
  };

  const refreshFeed = async () => {
    setIsRefreshing(true);
    await dispatch(getUserFeed(localId, ExhibitUId));
    setIsRefreshing(false);
  };

  // useEffect(() => {
  //   const registerForPushNotificationsAsync = async () => {
  //     let token;
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;

  //     if (Platform.OS === "android") {
  //       Notifications.setNotificationChannelAsync("default", {
  //         name: "default",
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: "#FF231F7C",
  //       });
  //     }

  //     return token;
  //   };

  //   registerForPushNotificationsAsync().then((token) => {
  //     if (token) {
  //       setExpoPushToken(token);
  //     } else {
  //       setExpoPushToken("");
  //     }
  //   });

  // }, []);

  useEffect(() => {
    if (Object.values(userFeed).length === 0) {
      setEmptyFeed(true);
    } else {
      setEmptyFeed(false);
    }
  }, [userFeed]);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setUserFeedState(
      Object.values(userFeed).sort((first, second) => {
        return (
          second["postDateCreated"]["_seconds"] -
          first["postDateCreated"]["_seconds"]
        );
      })
    );
  }, [userFeed]);

  const flatlistFeed = useRef();
  useDidMountEffect(() => {
    flatlistFeed.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollFeed]);

  const topHeader = () => {
    return (
      <View>
        {emptyFeed ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "grey", margin: 10, marginTop: 20 }}>
              No posts to show!
            </Text>
            <AntDesign
              name="exclamationcircle"
              size={24}
              color={"grey"}
              style={{ margin: 10 }}
            />
            <Text style={{ color: "grey", margin: 10 }}>
              Try following someone or posting something!
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
      <StatusBar barStyle={setStatusBarStyle(darkModeValue)} />
      <FlatList
        extraData={profilePictureBase64}
        data={userFeedState}
        ref={flatlistFeed}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshFeed}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        ListFooterComponent={topHeader}
        keyExtractor={(item) => item.postId}
        renderItem={(itemData) => (
          <FeedItem
            image={
              itemData.item.postPhotoBase64
                ? itemData.item.postPhotoBase64
                : itemData.item.postPhotoUrl
            }
            profileImageSource={
              itemData.item.profilePictureBase64
                ? itemData.item.profilePictureBase64
                : itemData.item.profilePictureUrl
            }
            projectTitle={itemData.item.projectTitle}
            caption={itemData.item.caption}
            numberOfCheers={itemData.item.numberOfCheers}
            numberOfComments={itemData.item.numberOfComments}
            projectId={itemData.item.projectId}
            postId={itemData.item.postId}
            posterExhibitUId={itemData.item.ExhibitUId}
            links={itemData.item.postLinks}
            fullname={itemData.item.fullname}
            postDateCreated={itemData.item.postDateCreated._seconds}
            nameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            usernameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            projectContainer={{
              borderColor: darkModeValue ? "#616161" : "#e8e8e8",
            }}
            titleContainer={{
              color: darkModeValue ? "white" : "black",
            }}
            threeDotsStyle={darkModeValue ? "white" : "black"}
            captionContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            dateContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            dateStyle={{
              color: "gray",
            }}
            titleStyle={{
              color: "white",
            }}
            profilePictureColors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]}
            projectTitleColors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            pictureCheerContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            pictureCheerNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            pictureCheerText={{
              color: darkModeValue ? "white" : "black",
            }}
            pictureCommentNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            pictureTitleContainer={{
              backgroundColor: darkModeValue ? "#121212" : "white",
            }}
            pictureTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            captionStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            arrowColor={"white"}
            onSelect={() => {
              viewProjectHandler(
                itemData.item.ExhibitUId,
                itemData.item.projectId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileProjects,
                itemData.item.profilePictureBase64,
                itemData.item.profilePictureUrl,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.projectLinks,
                itemData.item.profileColumns,
                itemData.item.postDateCreated._seconds
              );
            }}
            onSelectCheering={() => {
              viewCheeringHandler(
                itemData.item.ExhibitUId,
                itemData.item.projectId,
                itemData.item.postId,
                itemData.item.numberOfCheers
              );
            }}
            onSelectProfile={() => {
              viewProfileHandler(
                itemData.item.ExhibitUId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileProjects,
                itemData.item.profilePictureBase64,
                itemData.item.profilePictureUrl,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.profileLinks,
                itemData.item.projectLinks,
                itemData.item.profileColumns,
                itemData.item.postDateCreated._seconds
              );
            }}
          />
        )}
      />
    </View>
  );
};

UserFeedScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
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
    tabBarOptions: {
      activeTintColory: darkModeValue ? "white" : "black",
      inactiveTintColor: darkModeValue ? "#696969" : "#bfbfbf",
      tabStyle: {
        backgroundColor: darkModeValue ? "black" : "white",
      },
      style: {
        backgroundColor: darkModeValue ? "black" : "white",
      },
      showLabel: false,
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

export default UserFeedScreen;
