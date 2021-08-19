import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import TutorialPrompt from "../../components/tutorial/TutorialPrompt";
import TutorialStart from "../../components/tutorial/TutorialStart";
import TutorialCreateExhibit from "../../components/tutorial/TutorialCreateExhibit";
import TutorialExploreExhibit from "../../components/tutorial/TutorialExploreExhibit";
import TutorialEnd from "../../components/tutorial/TutorialEnd";
import ProfileHeader from "../../components/user/ProfileHeader";
import useDidMountEffect from "../../helper/useDidMountEffect";
import {
  changeProfileNumberOfColumns,
  offScreen,
  refreshProfile,
  showcaseProfile,
} from "../../store/actions/user/user";
import { useAppDispatch, useAppSelector } from "../../hooks";

const ProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingTwoColumns, setIsLoadingTwoColumns] = useState(false);
  const [isLoadingThreeColumns, setIsLoadingThreeColumns] = useState(false);
  const [isLoadingFourColumns, setIsLoadingFourColumns] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialPrompt = useAppSelector((state) => state.user.tutorialPrompt);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);

  const profilePictureBase64 = useAppSelector(
    (state) => state.user.profilePictureBase64
  );
  const profileColumns = useAppSelector((state) => state.user.profileColumns);
  const resetScrollProfile = useAppSelector(
    (state) => state.user.resetScrollProfile
  );
  const showcasingProfile = useAppSelector(
    (state) => state.user.showcasingProfile
  );
  const [hiddenComponent, setHiddenComponent] = useState(false);

  const userData = {
    ExhibitUId: useAppSelector((state) => state.user.ExhibitUId),
    fullname: useAppSelector((state) => state.user.fullname),
    username: useAppSelector((state) => state.user.username),
    jobTitle: useAppSelector((state) => state.user.jobTitle),
    profileBiography: useAppSelector((state) => state.user.profileBiography),
    profileLinks: useAppSelector((state) => state.user.profileLinks),
    profileProjects: useAppSelector((state) => state.user.profileProjects),
  };

  const [profileProjectsState, setProfileProjectsState] = useState(
    Object.values(userData.profileProjects).sort(
      (first: string, second: string) => {
        return (
          second["projectDateCreated"]["_seconds"] -
          first["projectDateCreated"]["_seconds"]
        );
      }
    )
  );

  let postIds: string[] = [];
  for (const projectId of Object.keys(userData.profileProjects)) {
    for (const postId of Object.keys(
      userData.profileProjects[projectId].projectPosts
    )) {
      postIds.push(postId);
    }
  }

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

  const viewProjectHandler = (projectId: string) => {
    dispatch(offScreen("Profile"));
    props.navigation.push("ViewProfileProject", {
      projectId,
    });
  };

  const refreshFeed = async () => {
    await setIsRefreshing(true);
    await dispatch(refreshProfile(localId));
    await setIsRefreshing(false);
  };

  const onPressChangeToColumnTwo = async () => {
    await setIsLoadingTwoColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 2)
    );
    await setIsLoadingTwoColumns(false);
  };

  const onPressChangeToColumnThree = async () => {
    await setIsLoadingThreeColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 3)
    );
    await setIsLoadingThreeColumns(false);
  };

  const onPressChangeToColumnFour = async () => {
    await setIsLoadingFourColumns(true);
    await dispatch(
      changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 4)
    );
    await setIsLoadingFourColumns(false);
  };

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setProfileProjectsState(
      Object.values(userData.profileProjects).sort(
        (first: string, second: string) => {
          return (
            second["projectDateCreated"]["_seconds"] -
            first["projectDateCreated"]["_seconds"]
          );
        }
      )
    );
  }, [userData.profileProjects]);

  useDidMountEffect(() => {
    if (showcasingProfile === false) {
      slideAnim.setValue(100);
      setHiddenComponent(false);
      slideUp();
    }
  }, [showcasingProfile]);

  const profileFlatlist: any = useRef();
  useDidMountEffect(() => {
    profileFlatlist.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollProfile]);

  function getData(profileProjectsState) {
    return profileProjectsState;
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
        onAddNewProjectPress={() => props.navigation.navigate("AddProject")}
        followersOnPress={() =>
          props.navigation.navigate("Followers", {
            ExhibitUId: userData.ExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.navigate("Following", {
            ExhibitUId: userData.ExhibitUId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.navigate("Advocates", {
            ExhibitUId: userData.ExhibitUId,
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
      {tutorialPrompt ? (
        <TutorialPrompt ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      {tutorialing &&
      !tutorialPrompt &&
      (tutorialScreen === "Start" || tutorialScreen === "EditProfile") ? (
        <TutorialStart ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      {tutorialing &&
      !tutorialPrompt &&
      (tutorialScreen === "CreateExhibit" ||
        tutorialScreen === "ExhibitCreation") ? (
        <TutorialCreateExhibit ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      {tutorialing && !tutorialPrompt && tutorialScreen === "ExhibitView" ? (
        <TutorialExploreExhibit ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      {tutorialing &&
      !tutorialPrompt &&
      (tutorialScreen === "TutorialEnd" ||
        tutorialScreen === "ExploreProject") ? (
        <TutorialEnd ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <FlatList<Object | any>
        data={getData(profileProjectsState)}
        keyExtractor={(item) => item.projectId}
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
          <ProjectItem
            image={itemData.item.projectCoverPhotoBase64}
            title={itemData.item.projectTitle}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProjectHandler(itemData.item.projectId);
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
              ...styles.showcaseButton,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            onPress={() => {
              slideDown();
              dispatch(showcaseProfile());
              props.navigation.push("ShowcaseProfile");
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
  showcaseButton: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
  },
  showcaseText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
