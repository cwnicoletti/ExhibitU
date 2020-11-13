import React, { useEffect } from "react";
import { Image, StyleSheet, FlatList, Alert, View, Text } from "react-native";
import { useSelector } from "react-redux";

import ProjectPictures from "../../components/projects/ProjectPictures";
import ProjectHeader from "../../components/projects/ProjectHeader";

const ProjectScreen = (props) => {
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);

  const projectId = props.navigation.getParam("projectId");

  const projects = useSelector((state) =>
    state.projects.userProjects.find((proj) => proj.id === projectId)
  );

  const listofProjects = useSelector((state) =>
    state.projects.userProjectItems.filter(
      (proj) => proj.projectPictureId === projectId
    )
  );
  console.log(listofProjects);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <ProjectHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={{ uri: projects.imageUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={projects.title}
        description={projects.description}
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
        data={listofProjects}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={topHeader}
        numColumns={2}
        renderItem={(itemData) => (
          <ProjectPictures
            image={itemData.item.imageUrl}
            title={itemData.item.title}
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
