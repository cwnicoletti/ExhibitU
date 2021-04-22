import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import ProfileHeader from "../../components/user/ProfileHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import { refreshProfile, offScreen } from "../../store/actions/user";
import useDidMountEffect from "../../components/helper/useDidMountEffect";

import { changeProfileNumberOfColumns } from "../../store/actions/user";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const DiamondCaseId = useSelector((state) => state.user.DiamondCaseId);
  const profilePictureBase64 = useSelector(
    (state) => state.user.profilePictureBase64
  );
  const profileColumns = useSelector((state) => state.user.profileColumns);
  const resetScrollProfile = useSelector(
    (state) => state.user.resetScrollProfile
  );

  const userData = {
    DiamondCaseId: useSelector((state) => state.user.DiamondCaseId),
    fullname: useSelector((state) => state.user.fullname),
    username: useSelector((state) => state.user.username),
    jobTitle: useSelector((state) => state.user.jobTitle),
    profileBiography: useSelector((state) => state.user.profileBiography),
    profileLinks: useSelector((state) => state.user.profileLinks),
    profileProjects: useSelector((state) => state.user.profileProjects),
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

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
        resumeText={{
          color: darkModeValue ? "white" : "black",
        }}
        iconResumeStyle={darkModeValue ? "white" : "black"}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        description={userData.profileBiography}
        onAddNewProjectPress={() => props.navigation.navigate("AddProject")}
        followersOnPress={() =>
          props.navigation.navigate("Followers", {
            DiamondCaseId: userData.DiamondCaseId,
          })
        }
        followingOnPress={() =>
          props.navigation.navigate("Following", {
            DiamondCaseId: userData.DiamondCaseId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.navigate("Advocates", {
            DiamondCaseId: userData.DiamondCaseId,
          })
        }
        changeColumnToTwo={() => {
          dispatch(changeProfileNumberOfColumns(localId, DiamondCaseId, 2));
        }}
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
        changeColumnToThree={() => {
          dispatch(changeProfileNumberOfColumns(localId, DiamondCaseId, 3));
        }}
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
        changeColumnToFour={() => {
          dispatch(changeProfileNumberOfColumns(localId, DiamondCaseId, 4));
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
        data={Object.values(userData.profileProjects)}
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
          Showcase profile
        </Text>
      </TouchableOpacity>
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
    fontSize: 22,
  },
});

export default ProfileScreen;
