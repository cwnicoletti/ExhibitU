import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProjectItem from "../../components/projectItems/ProfileProjectItem";
import HeaderButton from "../../components/UI/IoniconsHeaderButton";
import ProfileHeader from "../../components/user/ProfileHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const showcaseLocalValue = useSelector(
    (state) => state.switches.showcaseLocalMode
  );

  const userData = {
    fullname: useSelector((state) => state.user.fullname),
    username: useSelector((state) => state.user.username),
    jobTitle: useSelector((state) => state.user.jobTitle),
    profileBiography: useSelector((state) => state.user.profileBiography),
    profileProjects: useSelector((state) => state.user.profileProjects),
  };

  console.log(userData.profileProjects);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewProjectHandler = (projectId) => {
    console.log(projectId);
    props.navigation.navigate("ViewProfileProject", {
      projectId: projectId,
    });
  };

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
        titleStyle={{
          ...styles.profileTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        jobTitleStyle={{
          ...styles.profileJobTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={userData.fullname}
        username={`@${userData.username}`}
        jobTitle={userData.jobTitle}
        imgSource={require("../../assets/me.png")}
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
        followersOnPress={() => props.navigation.navigate("Followers")}
        followingOnPress={() => props.navigation.navigate("Following")}
        advocatesOnPress={() => props.navigation.navigate("Advocates")}
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
        keyExtractor={(item) => item.id}
        ListHeaderComponent={topHeader}
        numColumns={2}
        renderItem={(itemData) => (
          <ProjectItem
            image={itemData.item.projectImageUrl}
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
      {!showcaseLocalValue ? (
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
        >
          <MaterialCommunityIcons
            name="glassdoor"
            size={24}
            color={darkModeValue ? "white" : "black"}
          />
          <Text
            style={{
              color: darkModeValue ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            Showcase profile
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Showcase
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
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleLeftDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleRightDrawer();
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
    paddingBottom: 20,
  },
  profileContainerStyle: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
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
