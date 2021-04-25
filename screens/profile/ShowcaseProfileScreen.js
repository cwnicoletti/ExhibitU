import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import ShowcaseHeader from "../../components/user/ShowcaseHeader";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

import { returnFromShowcasing } from "../../store/actions/user";

const ShowcaseProfileScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const trueUndefined = void 0;

  const profilePictureBase64 =
    props.navigation.getParam("ExhibitUId") === ExhibitUId ||
    props.navigation.getParam("profilePictureBase64") === trueUndefined
      ? useSelector((state) => state.user.profilePictureBase64)
      : props.navigation.getParam("profilePictureBase64");

  const profileColumns =
    props.navigation.getParam("ExhibitUId") === ExhibitUId ||
    props.navigation.getParam("profileColumns") === trueUndefined
      ? useSelector((state) => state.user.profileColumns)
      : props.navigation.getParam("profileColumns");

  const userData = {
    ExhibitUId:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("ExhibitUId") === trueUndefined
        ? useSelector((state) => state.user.ExhibitUId)
        : props.navigation.getParam("ExhibitUId"),
    fullname:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("fullname") === trueUndefined
        ? useSelector((state) => state.user.fullname)
        : props.navigation.getParam("fullname"),
    username:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("username") === trueUndefined
        ? useSelector((state) => state.user.username)
        : props.navigation.getParam("username"),
    jobTitle:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("jobTitle") === trueUndefined
        ? useSelector((state) => state.user.jobTitle)
        : props.navigation.getParam("jobTitle"),
    profileBiography:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("profileBiography") === trueUndefined
        ? useSelector((state) => state.user.profileBiography)
        : props.navigation.getParam("profileBiography"),
    profileLinks:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("profileLinks") === trueUndefined
        ? useSelector((state) => state.user.profileLinks)
        : props.navigation.getParam("profileLinks"),
    profileProjects:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("profileProjects") === trueUndefined
        ? useSelector((state) => state.user.profileProjects)
        : props.navigation.getParam("profileProjects"),
    numberOfAdvocates:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("numberOfAdvocates") === trueUndefined
        ? useSelector((state) => state.user.numberOfAdvocates)
        : props.navigation.getParam("numberOfAdvocates"),
    numberOfFollowers:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("numberOfFollowers") === trueUndefined
        ? useSelector((state) => state.user.numberOfFollowers)
        : props.navigation.getParam("numberOfFollowers"),
    numberOfFollowing:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("numberOfFollowing") === trueUndefined
        ? useSelector((state) => state.user.numberOfFollowing)
        : props.navigation.getParam("numberOfFollowing"),
    showResumeValue:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("showResumeValue") === trueUndefined
        ? useSelector((state) => state.user.showResumeValue)
        : props.navigation.getParam("showResumeValue"),
    resumeLink:
      props.navigation.getParam("ExhibitUId") === ExhibitUId ||
      props.navigation.getParam("resumeLink") === trueUndefined
        ? useSelector((state) => state.user.resumeLink)
        : props.navigation.getParam("resumeLink"),
  };

  useEffect(() => {
    props.navigation.setParams({ dispatch: dispatch });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (projectId) => {
    props.navigation.push("ShowcaseProject", {
      projectId,
      profileProjects: userData.profileProjects,
    });
  };

  const topHeader = () => {
    return (
      <ShowcaseHeader
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
        imgSource={profilePictureBase64}
        description={userData.profileBiography}
        links={userData.profileLinks}
        followingValue={userData.followingValue}
        followersValue={userData.followersValue}
        advocatesValue={userData.advocatesValue}
        showResumeValue={userData.showResumeValue}
        resumeLink={userData.resumeLink}
        numberOfFollowers={userData.numberOfFollowers}
        numberOfFollowing={userData.numberOfFollowing}
        numberOfAdvocates={userData.numberOfAdvocates}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        resumeText={{
          color: darkModeValue ? "white" : "black",
        }}
        iconResumeStyle={darkModeValue ? "white" : "black"}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        onAddNewProjectPress={() => props.navigation.navigate("AddProject")}
        followersOnPress={() =>
          props.navigation.push("Followers", {
            ExhibitUId: userData.ExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("Following", {
            ExhibitUId: userData.ExhibitUId,
          })
        }
        advocatesOnPress={() =>
          props.navigation.push("Advocates", {
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
      <FlatList
        data={Object.values(userData.profileProjects)}
        keyExtractor={(item) => item.projectId}
        ListHeaderComponent={topHeader}
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
    </View>
  );
};

ShowcaseProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const dispatch = navData.navigation.getParam("dispatch");

  return {
    gestureEnabled: false,
    headerTitle: () => (
      <View style={styles.logo}>
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
fontFamily: "CormorantUpright",
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Back"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            dispatch(returnFromShowcasing());
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
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

export default ShowcaseProfileScreen;
