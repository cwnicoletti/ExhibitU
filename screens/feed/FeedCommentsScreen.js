import React, { useEffect, useState } from "react";
import {
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import FeedPostView from "../../components/feed/FeedPostView";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";

const FeedCommentsScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const projectId = props.navigation.getParam("projectId");
  const userData = props.navigation.getParam("userData");
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const [numberOfCheers, setNumberOfCheers] = useState(userData.numberOfCheers);
  userData.postLinks = userData.postLinks ? userData.postLinks : {};

  useEffect(() => {
    setIntialCheeredPosts(cheeredPosts);
  }, []);

  const viewCheeringHandler = () => {
    props.navigation.push("ViewCheering", {
      ExhibitUId: userData.ExhibitUId,
      projectId: projectId,
      postId: userData.postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ViewProfile", {
      userData: {
        ExhibitUId: userData.ExhibitUId,
        projectId: projectId,
        fullname: userData.fullname,
        username: userData.username,
        jobTitle: userData.jobTitle,
        profileBiography: userData.profileBiography,
        profileProjects: userData.profileProjects,
        profilePictureBase64: userData.profilePictureBase64,
        numberOfFollowers: userData.numberOfFollowers,
        numberOfFollowing: userData.numberOfFollowing,
        numberOfAdvocates: userData.numberOfAdvocates,
        hideFollowing: userData.hideFollowing,
        hideFollowers: userData.hideFollowers,
        hideAdvocates: userData.hideAdvocates,
        postLinks: userData.postLinks,
        profileColumns: userData.profileColumns,
      },
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ projectId: projectId });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialCheeredPosts,
      cheeredPosts
    );
    if (userData.postId === difference[0]) {
      if (intialCheeredPosts.length < cheeredPosts.length) {
        setNumberOfCheers((prevState) => prevState + 1);
      } else {
        setNumberOfCheers((prevState) => prevState - 1);
      }
    }
    setIntialCheeredPosts(cheeredPosts);
  }, [cheeredPosts]);

  return (
    <ScrollView
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FeedPostView
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        image={userData.postPhoto}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        caption={userData.caption}
        fullname={userData.fullname}
        profileImageSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        numberOfCheers={numberOfCheers}
        numberOfComments={userData.numberOfComments}
        postId={userData.postId}
        projectId={projectId}
        posterExhibitUId={userData.ExhibitUId}
        links={userData.postLinks}
        postDateCreated={userData.postDateCreated}
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
        dateContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        dateStyle={{
          color: "gray",
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

FeedCommentsScreen.navigationOptions = (navData) => {
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
});

export default FeedCommentsScreen;
