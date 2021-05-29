import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import FeedProfileHeader from "../../components/feed/FeedProfileHeader";
import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

const FeedProfileScreen = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  let userData = props.navigation.getParam("userData");
  userData.profileLinks = userData.profileLinks ? userData.profileLinks : {};
  userData.projectLinks = userData.projectLinks ? userData.projectLinks : {};

  userData =
    userData.ExhibitUId === ExhibitUId
      ? {
          ...userData,
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
          showResumeValue: useSelector((state) => state.user.showResumeValue),
          resumeLink: useSelector((state) => state.user.resumeLink),
          hideFollowing: useSelector((state) => state.user.hideFollowing),
          hideFollowers: useSelector((state) => state.user.hideFollowers),
          hideAdvocates: useSelector((state) => state.user.hideAdvocates),
        }
      : userData;

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

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
        resumeText={{
          color: darkModeValue ? "white" : "black",
        }}
        iconResumeStyle={darkModeValue ? "white" : "black"}
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
      <FlatList
        data={Object.values(userData.profileProjects)}
        keyExtractor={(item) => item.projectId}
        key={userData.profileColumns}
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

FeedProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
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

export default FeedProfileScreen;
