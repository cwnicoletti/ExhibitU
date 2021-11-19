import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { NavigationEvents } from "react-navigation";
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExhibitItem from "../../components/UI_general/ExhibitItem";
import ProfileHeader from "../../components/screen_specific/profile/ProfileHeader";
import useDidMountEffect from "../../helper/useDidMountEffect";
import {
  changeProfileNumberOfColumns,
  offScreen,
  refreshProfile,
  showcaseProfile,
  returnFromShowcasing,
} from "../../store/actions/user/user";
import { useAppDispatch, useAppSelector } from "../../hooks";

const ProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingTwoColumns, setIsLoadingTwoColumns] = useState(false);
  const [isLoadingThreeColumns, setIsLoadingThreeColumns] = useState(false);
  const [isLoadingFourColumns, setIsLoadingFourColumns] = useState(false);
  const [hiddenComponent, setHiddenComponent] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);

  const profilePictureBase64 = useAppSelector(
    (state) => state.user.profilePictureBase64
  );
  const profileColumns = useAppSelector((state) => state.user.profileColumns);
  const resetScrollProfile = useAppSelector(
    (state) => state.user.resetScrollProfile
  );

  const userData = {
    ExhibitUId: useAppSelector((state) => state.user.ExhibitUId),
    fullname: useAppSelector((state) => state.user.fullname),
    username: useAppSelector((state) => state.user.username),
    jobTitle: useAppSelector((state) => state.user.jobTitle),
    profileBiography: useAppSelector((state) => state.user.profileBiography),
    profileLinks: useAppSelector((state) => state.user.profileLinks),
    profileExhibits: useAppSelector((state) => state.user.profileExhibits),
  };

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

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  let slideAnim = useRef(new Animated.Value(0)).current;

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 350,
      useNativeDriver: true,
    }).start(({ finished }) => (finished ? setHiddenComponent(true) : null));
  };

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const viewExhibitHandler = (exhibitId: string) => {
    dispatch(offScreen("Profile"));
    props.navigation.push("ViewProfileExhibit", {
      exhibitId,
    });
  };

  const refreshFeed = async () => {
    await setIsRefreshing(true);
    await dispatch(refreshProfile(localId));
    await setIsRefreshing(false);
  };

  const onPressChangeToColumnTwo = async () => {
    let postIds: string[] = [];
    for (const exhibitId of Object.keys(userData.profileExhibits)) {
      for (const postId of Object.keys(
        userData.profileExhibits[exhibitId].exhibitPosts
      )) {
        postIds.push(postId);
      }
    }

    await setIsLoadingTwoColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 2)
    );
    await setIsLoadingTwoColumns(false);
  };

  const onPressChangeToColumnThree = async () => {
    let postIds: string[] = [];
    for (const exhibitId of Object.keys(userData.profileExhibits)) {
      for (const postId of Object.keys(
        userData.profileExhibits[exhibitId].exhibitPosts
      )) {
        postIds.push(postId);
      }
    }

    await setIsLoadingThreeColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 3)
    );
    await setIsLoadingThreeColumns(false);
  };

  const onPressChangeToColumnFour = async () => {
    let postIds: string[] = [];
    for (const exhibitId of Object.keys(userData.profileExhibits)) {
      for (const postId of Object.keys(
        userData.profileExhibits[exhibitId].exhibitPosts
      )) {
        postIds.push(postId);
      }
    }

    await setIsLoadingFourColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 4)
    );
    await setIsLoadingFourColumns(false);
  };

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

  const profileFlatlist: any = useRef();
  useDidMountEffect(() => {
    profileFlatlist.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollProfile]);

  function getData(profileExhibitsState) {
    return profileExhibitsState;
  }

  function topHeader() {
    return (
      <ProfileHeader
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
        links={userData.profileLinks}
        imgSource={profilePictureBase64}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        description={userData.profileBiography}
        onAddNewExhibitPress={() => props.navigation.navigate("AddExhibit")}
        followersOnPress={() =>
          props.navigation.navigate("Followers", {
            exploredExhibitUId: userData.ExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.navigate("Following", {
            exploredExhibitUId: userData.ExhibitUId,
          })
        }
        changeColumnToTwo={onPressChangeToColumnTwo}
        isLoadingTwoColumns={isLoadingTwoColumns}
        columnTwoStyle={{
          borderColor:
            profileColumns === 2
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        changeColumnToThree={onPressChangeToColumnThree}
        isLoadingThreeColumns={isLoadingThreeColumns}
        columnThreeStyle={{
          borderColor:
            profileColumns === 3
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        changeColumnToFour={onPressChangeToColumnFour}
        columnFourStyle={{
          borderColor:
            profileColumns === 4
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingFourColumns={isLoadingFourColumns}
      />
    );
  }

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <NavigationEvents
        onWillFocus={async (payload) => {
          if (payload.lastState) {
            if (payload.lastState.routeName === "ShowcaseProfile") {
              dispatch(returnFromShowcasing());
              setHiddenComponent(false);
              slideAnim.setValue(100);
              slideUp();
            }
          }
        }}
      />
      <FlatList<Object | any>
        data={getData(profileExhibitsState)}
        keyExtractor={(item) => item.exhibitId}
        key={profileColumns}
        ListHeaderComponent={topHeader()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshFeed}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        ref={profileFlatlist}
        numColumns={profileColumns}
        renderItem={(itemData) => (
          <ExhibitItem
            image={itemData.item.exhibitCoverPhotoBase64}
            title={itemData.item.exhibitTitle}
            profileColumns={profileColumns}
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
      {!hiddenComponent ? (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <TouchableCmp
            style={{
              ...styles.showcaseContainer,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            onPress={() => {
              slideDown();
              dispatch(showcaseProfile());
              props.navigation.push("ShowcaseProfile");
            }}
          >
            <View
              style={{
                ...styles.showcaseButton,
              }}
            >
              <SimpleLineIcons
                name="trophy"
                size={24}
                color={darkModeValue ? "white" : "black"}
              />
              <Text
                style={{
                  ...styles.showcaseText,
                  color: darkModeValue ? "white" : "black",
                }}
              >
                Showcase exhibits
              </Text>
            </View>
          </TouchableCmp>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
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
  showcaseContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  showcaseButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  showcaseText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
