import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import TutorialPrompt from "../../components/tutorial/TutorialPrompt";
import TutorialStart from "../../components/tutorial/TutorialStart";
import ProfileHeader from "../../components/user/ProfileHeader";
import useDidMountEffect from "../../helper/useDidMountEffect";
import {
  changeProfileNumberOfColumns,
  offScreen,
  refreshProfile,
  showcaseProfile,
} from "../../store/actions/user";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingTwoColumns, setIsLoadingTwoColumns] = useState(false);
  const [isLoadingThreeColumns, setIsLoadingThreeColumns] = useState(false);
  const [isLoadingFourColumns, setIsLoadingFourColumns] = useState(false);
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const tutorialing = useSelector((state) => state.user.tutorialing);
  const tutorialPrompt = useSelector((state) => state.user.tutorialPrompt);
  const tutorialScreen = useSelector((state) => state.user.tutorialScreen);

  const profilePictureBase64 = useSelector(
    (state) => state.user.profilePictureBase64
  );
  const profileColumns = useSelector((state) => state.user.profileColumns);
  const resetScrollProfile = useSelector(
    (state) => state.user.resetScrollProfile
  );
  const showcasingProfile = useSelector(
    (state) => state.user.showcasingProfile
  );
  const [hiddenComponent, setHiddenComponent] = useState(false);

  const userData = {
    ExhibitUId: useSelector((state) => state.user.ExhibitUId),
    fullname: useSelector((state) => state.user.fullname),
    username: useSelector((state) => state.user.username),
    jobTitle: useSelector((state) => state.user.jobTitle),
    profileBiography: useSelector((state) => state.user.profileBiography),
    profileLinks: useSelector((state) => state.user.profileLinks),
    profileProjects: useSelector((state) => state.user.profileProjects),
  };
  const [profileProjectsState, setProfileProjectsState] = useState(
    Object.values(userData.profileProjects).sort((first, second) => {
      return (
        second["projectDateCreated"]["_seconds"] -
        first["projectDateCreated"]["_seconds"]
      );
    })
  );

  let postIds = [];
  for (const projectId of Object.keys(userData.profileProjects)) {
    for (const postId of Object.keys(
      userData.profileProjects[projectId].projectPosts
    )) {
      postIds.push(postId);
    }
  }

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
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

  const viewProjectHandler = (projectId) => {
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

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setProfileProjectsState(
      Object.values(userData.profileProjects).sort((first, second) => {
        return (
          second["projectDateCreated"]["_seconds"] -
          first["projectDateCreated"]["_seconds"]
        );
      })
    );
  }, [userData.profileProjects]);

  useDidMountEffect(() => {
    if (showcasingProfile === false) {
      slideAnim.setValue(100);
      setHiddenComponent(false);
      slideUp();
    }
  }, [showcasingProfile]);

  const profileFlatlist = useRef();
  useDidMountEffect(() => {
    profileFlatlist.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollProfile]);

  const topHeader = () => {
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
        changeColumnToTwo={async () => {
          await setIsLoadingTwoColumns(true);
          await dispatch(
            changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 2)
          );
          await setIsLoadingTwoColumns(false);
        }}
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
        changeColumnToThree={async () => {
          await setIsLoadingThreeColumns(true);
          await dispatch(
            changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 3)
          );
          await setIsLoadingThreeColumns(false);
        }}
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
        changeColumnToFour={async () => {
          await setIsLoadingFourColumns(true);
          await dispatch(
            changeProfileNumberOfColumns(localId, ExhibitUId, postIds, 4)
          );
          await setIsLoadingFourColumns(false);
        }}
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
  };

  return (
    <View
      style={{
        ...styles.screen,
        justifyContent: "center",
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      {tutorialPrompt ? (
        <TutorialPrompt ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      {tutorialing && !tutorialPrompt && tutorialScreen === "Start" ? (
        <TutorialStart ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <FlatList
        data={profileProjectsState}
        keyExtractor={(item) => item.projectId}
        key={profileColumns}
        ListHeaderComponent={topHeader}
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
          <TouchableOpacity
            style={{
              margin: 10,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              flexDirection: "row",
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
                color: darkModeValue ? "white" : "black",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Showcase exhibits
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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

export default ProfileScreen;
