import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import ExplorePostView from "../../components/screen_specific/explore/ExplorePostView";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";

const ExplorePictureScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exploredUserData = props.navigation.getParam("exploredUserData");
  const currentExhibitId = props.navigation.getParam("exhibitId");
  const postId = props.navigation.getParam("postId");
  const fullname = props.navigation.getParam("fullname");
  const username = props.navigation.getParam("username");
  const [cheering, setCheering] = useState([]);
  const postPhotoUrl = props.navigation.getParam("postPhotoUrl");
  const [numberOfCheers, setNumberOfCheers] = useState(0);
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const links = props.navigation.getParam("postLinks");
  const postDateCreated = props.navigation.getParam("postDateCreated");
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);

  const viewCheeringHandler = () => {
    props.navigation.push("ExploreCheering", {
      ExhibitUId: exploredUserData.exploredExhibitUId,
      exhibitId: currentExhibitId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ExploreProfile", {
      ...exploredUserData,
      ExhibitUId: exploredUserData.exploredExhibitUId,
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
          setCheering(
            object.profileExhibits[currentExhibitId].exhibitPosts[postId]
              .cheering
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialCheeredPosts,
      cheeredPosts
    );
    if (postId === difference[0]) {
      if (intialCheeredPosts.length < cheeredPosts.length) {
        setNumberOfCheers((prevState) => prevState + 1);
        setCheering([...cheering, ExhibitUId]);
      } else {
        setNumberOfCheers((prevState) => prevState - 1);
        setCheering(cheering.filter((id) => id !== ExhibitUId));
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
        jobTitle={exploredUserData.jobTitle}
        username={username}
        profileImageSource={exploredUserData.profilePictureUrl}
        cheering={cheering}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={links}
        postId={postId}
        exhibitId={currentExhibitId}
        posterExhibitUId={exploredUserData.exploredExhibitUId}
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
          backgroundColor: darkModeValue ? "black" : "white",
        }}
        threeDotsStyle={darkModeValue ? "white" : "black"}
        captionContainer={{
          backgroundColor: darkModeValue ? "black" : "white",
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
          backgroundColor: darkModeValue ? "black" : "white",
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
          backgroundColor: darkModeValue ? "black" : "white",
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

export default ExplorePictureScreen;
