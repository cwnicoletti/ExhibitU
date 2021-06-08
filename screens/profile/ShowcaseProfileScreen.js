import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import ShowcaseHeader from "../../components/user/ShowcaseHeader";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { returnFromShowcasing } from "../../store/actions/user";

const ShowcaseProfileScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);

  const userData =
    props.navigation.getParam("ExhibitUId") === ExhibitUId ||
    props.navigation.getParam("ExhibitUId") === void 0
      ? {
          profilePictureBase64: useSelector(
            (state) => state.user.profilePictureBase64
          )
            ? useSelector((state) => state.user.profilePictureBase64)
            : props.navigation.getParam("profilePictureUrl"),
          profileColumns: useSelector((state) => state.user.profileColumns),
          ExhibitUId: useSelector((state) => state.user.ExhibitUId),
          fullname: useSelector((state) => state.user.fullname),
          username: useSelector((state) => state.user.username),
          jobTitle: useSelector((state) => state.user.jobTitle),
          profileBiography: useSelector((state) => state.user.profileBiography),
          profileLinks: useSelector((state) => state.user.profileLinks),
          profileProjects: useSelector((state) => state.user.profileProjects)
            ? useSelector((state) => state.user.profileProjects)
            : props.navigation.getParam("profileProjects"),
          numberOfAdvocates: useSelector(
            (state) => state.user.numberOfAdvocates
          ),
          numberOfFollowers: useSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useSelector(
            (state) => state.user.numberOfFollowing
          ),
          hideFollowing: useSelector((state) => state.user.hideFollowing),
          hideFollowers: useSelector((state) => state.user.hideFollowers),
          hideAdvocates: useSelector((state) => state.user.hideAdvocates),
        }
      : {
          profilePictureUrl: props.navigation.getParam("profilePictureUrl"),
          profileColumns: props.navigation.getParam("profileColumns"),
          ExhibitUId: props.navigation.getParam("ExhibitUId"),
          fullname: props.navigation.getParam("fullname"),
          username: props.navigation.getParam("username"),
          jobTitle: props.navigation.getParam("jobTitle"),
          profileBiography: props.navigation.getParam("profileBiography"),
          profileLinks: props.navigation.getParam("profileLinks"),
          profileProjects: props.navigation.getParam("profileProjects"),
          numberOfAdvocates: props.navigation.getParam("numberOfAdvocates"),
          numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
          numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
          hideFollowing: props.navigation.getParam("hideFollowing"),
          hideFollowers: props.navigation.getParam("hideFollowers"),
          hideAdvocates: props.navigation.getParam("hideAdvocates"),
        };

  const [profileProjectsState, setProfileProjectsState] = useState(
    Object.values(userData.profileProjects).sort((first, second) => {
      return (
        second["projectDateCreated"]["_seconds"] -
        first["projectDateCreated"]["_seconds"]
      );
    })
  );

  useEffect(() => {
    props.navigation.setParams({ dispatch: dispatch });
  }, []);

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

  const viewProjectHandler = (projectId) => {
    props.navigation.push("ShowcaseProject", {
      projectId,
      userData,
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
        imgSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        description={userData.profileBiography}
        links={userData.profileLinks}
        followingValue={userData.hideFollowing}
        followersValue={userData.hideFollowers}
        advocatesValue={userData.hideAdvocates}
        numberOfFollowers={userData.numberOfFollowers}
        numberOfFollowing={userData.numberOfFollowing}
        numberOfAdvocates={userData.numberOfAdvocates}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
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
        data={profileProjectsState}
        keyExtractor={(item) => item.projectId}
        ListHeaderComponent={topHeader}
        numColumns={userData.profileColumns}
        renderItem={(itemData) => (
          <ProjectItem
            image={
              itemData.item.projectCoverPhotoBase64
                ? itemData.item.projectCoverPhotoBase64
                : itemData.item.projectCoverPhotoUrl
            }
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
