import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ExplorePostView from "../../components/explore/ExplorePostView";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";

const ExplorePictureScreen = (props) => {
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = props.navigation.getParam("ExhibitUId");
  const currentProjectId = props.navigation.getParam("projectId");
  const postId = props.navigation.getParam("postId");
  const fullname = props.navigation.getParam("fullname");
  const profilePictureUrl = props.navigation.getParam("profilePictureUrl");
  const postPhotoUrl = props.navigation.getParam("postPhotoUrl");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const exploredUserData = props.navigation.getParam("exploredUserData");
  const links = props.navigation.getParam("postLinks");

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.navigate("ExploreCheering", {
      ExhibitUId: ExhibitUId,
      projectId: currentProjectId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ExploreProfile", {
      ...exploredUserData,
      ExhibitUId: ExhibitUId,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android: android });
    props.navigation.setParams({ projectId: currentProjectId });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  return (
    <ScrollView
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <ExplorePostView
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        image={{ uri: postPhotoUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        caption={caption}
        fullname={fullname}
        profileImageSource={profilePictureUrl}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={links}
        showCheering={exploredUserData.showCheering}
        nameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        usernameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        projectContainer={{
          borderColor: darkModeValue ? "#616161" : "#e8e8e8",
          marginBottom: 10,
        }}
        titleContainer={{
          color: darkModeValue ? "white" : "black",
        }}
        threeDotsStyle={darkModeValue ? "white" : "black"}
        captionContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        titleStyle={{
          color: "white",
        }}
        nameTitleColors={["rgba(0,0,0,1)", "rgba(0,0,0,0.00)"]}
        projectTitleColors={["rgba(0,0,0,0.00)", "rgba(0,0,0,1)"]}
        pictureCheerContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        pictureCheerNumber={{
          color: darkModeValue ? "white" : "black",
        }}
        pictureCheerText={{
          color: darkModeValue ? "white" : "black",
        }}
        pictureCommentNumber={{
          color: darkModeValue ? "white" : "black",
        }}
        pictureTitleContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        pictureTitleStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        captionStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        arrowColor={"white"}
        onSelectCheering={() => {
          viewCheeringHandler();
        }}
        onSelectProfile={() => {
          viewProfileHandler();
        }}
      />
    </ScrollView>
  );
};

ExplorePictureScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");

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
    fontSize: 26,
  },
  details: {
    height: 0,
  },
});

export default ExplorePictureScreen;
