import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import ExplorePostView from "../../components/explore/ExplorePostView";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import useDidMountEffect from "../../helper/useDidMountEffect";

const NotificationsPictureScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const exploredUserData = props.navigation.getParam("exploredUserData");
  const ExhibitUId = props.navigation.getParam("ExhibitUId");
  const currentExhibitId = props.navigation.getParam("exhibitId");
  const postId = props.navigation.getParam("postId");
  const fullname = props.navigation.getParam("fullname");
  const jobTitle = props.navigation.getParam("jobTitle");
  const username = props.navigation.getParam("username");
  const postPhotoUrl = props.navigation.getParam("postPhotoUrl");
  const [numberOfCheers, setNumberOfCheers] = useState(
    props.navigation.getParam("numberOfCheers")
  );
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const links = props.navigation.getParam("postLinks");
  const postDateCreated = props.navigation.getParam("postDateCreated");
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);

  const viewCheeringHandler = () => {
    props.navigation.navigate("ExploreCheering", {
      ExhibitUId: ExhibitUId,
      exhibitId: currentExhibitId,
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
    setIntialCheeredPosts(cheeredPosts);
  }, []);

  useEffect(() => {
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");
    index.search(exploredUserData.text).then((responses) => {
      for (const object of responses.hits) {
        if (object.objectID === exploredUserData.exploredExhibitUId) {
          setNumberOfCheers(
            object.profileExhibits[currentExhibitId].exhibitPosts[postId]
              .numberOfCheers
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    if (intialCheeredPosts.length < cheeredPosts.length) {
      setNumberOfCheers((prevState) => prevState + 1);
    } else {
      setNumberOfCheers((prevState) => prevState - 1);
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
      <ExplorePostView
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        image={{ uri: postPhotoUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        caption={caption}
        fullname={fullname}
        jobTitle={jobTitle}
        username={username}
        profileImageSource={exploredUserData.profilePictureUrl}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={links}
        postId={postId}
        exhibitId={currentExhibitId}
        posterExhibitUId={ExhibitUId}
        showCheering={exploredUserData.showCheering}
        postDateCreated={postDateCreated}
        nameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        usernameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        exhibitContainer={{
          borderColor: darkModeValue ? "#616161" : "#e8e8e8",
          marginBottom: 10,
        }}
        titleContainer={{
          color: darkModeValue ? "white" : "black",
        }}
        dateContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        threeDotsStyle={darkModeValue ? "white" : "black"}
        captionContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        titleStyle={{
          color: "white",
        }}
        dateStyle={{
          color: "gray",
        }}
        nameTitleColors={["rgba(0,0,0,1)", "rgba(0,0,0,0.00)"]}
        exhibitTitleColors={["rgba(0,0,0,0.00)", "rgba(0,0,0,1)"]}
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

NotificationsPictureScreen.navigationOptions = (navData) => {
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
});

export default NotificationsPictureScreen;
