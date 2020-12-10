import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProjectPictures from "../../components/UI/ProjectPictures";
import ProjectHeader from "../../components/projects/ProjectHeader";
import MaterialHeaderButton from "../../components/UI/MaterialHeaderButton";

const ProjectScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);

  const currentProjectId = props.navigation.getParam("projectId");
  const profileProjects = useSelector((state) => state.user.profileProjects);

  const project = Object.values(profileProjects).find(
    (project) => project.projectId === currentProjectId
  );

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
    props.navigation.setParams({ android: android });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <ProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={{ uri: project.projectImageUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={project.projectTitle}
        description={project.projectDescription}
        onEditProfilePress={() =>
          props.navigation.navigate("EditProjectScreen", {
            projectId: currentProjectId,
            projectTitle: project.projectTitle,
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
        data={Object.values(project.projectPictures)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={topHeader}
        numColumns={2}
        renderItem={(itemData) => (
          <ProjectPictures
            image={itemData.item.pictureUrl}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            imageContainer={styles.imageContainer}
          />
        )}
      />
    </View>
  );
};

ProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");

  const android = navData.navigation.getParam("android");
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
    headerLeft: (props) => (
      <View>
        {android ? (
          <HeaderBackButton
            {...props}
            tintColor={darkModeValue ? "white" : "black"}
          />
        ) : (
          <HeaderBackButton {...props} />
        )}
      </View>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          title="Add"
          iconName={"add-a-photo"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.navigate("AddPicture");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  profileDescriptionStyle: {
    margin: 15,
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
  details: {
    height: 0,
  },
});

export default ProjectScreen;
