import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import FeedProfileHeader from "../../components/feed/FeedProfileHeader";
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import useDidMountEffect from "../../helper/useDidMountEffect";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const FeedProfileScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  let userData = props.navigation.getParam("userData");
  userData.profileLinks = userData.profileLinks ? userData.profileLinks : {};
  userData.projectLinks = userData.projectLinks ? userData.projectLinks : {};

  userData =
    userData.ExhibitUId === ExhibitUId
      ? {
          ...userData,
          profilePictureBase64: useAppSelector(
            (state) => state.user.profilePictureBase64
          )
            ? useAppSelector((state) => state.user.profilePictureBase64)
            : props.navigation.getParam("profilePictureUrl"),
          profileColumns: useAppSelector((state) => state.user.profileColumns),
          ExhibitUId: useAppSelector((state) => state.user.ExhibitUId),
          fullname: useAppSelector((state) => state.user.fullname),
          username: useAppSelector((state) => state.user.username),
          jobTitle: useAppSelector((state) => state.user.jobTitle),
          profileBiography: useAppSelector(
            (state) => state.user.profileBiography
          ),
          profileLinks: useAppSelector((state) => state.user.profileLinks),
          profileProjects: useAppSelector((state) => state.user.profileProjects)
            ? useAppSelector((state) => state.user.profileProjects)
            : props.navigation.getParam("profileProjects"),
          numberOfAdvocates: useAppSelector(
            (state) => state.user.numberOfAdvocates
          ),
          numberOfFollowers: useAppSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useAppSelector(
            (state) => state.user.numberOfFollowing
          ),
          hideFollowing: useAppSelector((state) => state.user.hideFollowing),
          hideFollowers: useAppSelector((state) => state.user.hideFollowers),
          hideAdvocates: useAppSelector((state) => state.user.hideAdvocates),
        }
      : userData;

  const [profileProjectsState, setProfileProjectsState] = useState(
    Object.values(userData.profileProjects).sort((first, second) => {
      return (
        second["projectDateCreated"]["_seconds"] -
        first["projectDateCreated"]["_seconds"]
      );
    })
  );

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
    props.navigation.navigate("ViewFeedProfileProject", {
      projectId,
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
        numberOfFollowers={userData.numberOfFollowers}
        numberOfFollowing={userData.numberOfFollowing}
        numberOfAdvocates={userData.numberOfAdvocates}
        hideFollowing={userData.hideFollowing}
        hideFollowers={userData.hideFollowers}
        hideAdvocates={userData.hideAdvocates}
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
        advocatesOnPress={() =>
          props.navigation.push("ViewAdvocates", {
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
        data={profileProjectsState}
        keyExtractor={(item) => item.projectId}
        key={userData.profileColumns}
        ListHeaderComponent={topHeader()}
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

FeedProfileScreen.navigationOptions = (navData) => {
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
