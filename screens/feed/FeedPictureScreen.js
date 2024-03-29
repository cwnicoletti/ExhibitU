import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import FeedPostView from "../../components/screen_specific/feed/FeedPostView";

const FeedCommentsScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exhibitId = props.navigation.getParam("exhibitId");
  const userData = props.navigation.getParam("userData");
  const [cheering, setCheering] = useState(userData.cheering);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const [numberOfCheers, setNumberOfCheers] = useState(userData.numberOfCheers);
  userData.postLinks = userData.postLinks ? userData.postLinks : {};

  const viewCheeringHandler = () => {
    props.navigation.push("ViewCheering", {
      ExhibitUId: userData.ExhibitUId,
      exhibitId: exhibitId,
      postId: userData.postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ViewProfile", {
      userData: {
        exploredExhibitUId: userData.ExhibitUId,
        exhibitId: exhibitId,
        fullname: userData.fullname,
        username: userData.username,
        jobTitle: userData.jobTitle,
        profileBiography: userData.profileBiography,
        profileExhibits: userData.profileExhibits,
        profilePictureBase64: userData.profilePictureBase64,
        numberOfFollowers: userData.numberOfFollowers,
        numberOfFollowing: userData.numberOfFollowing,
        hideFollowing: userData.hideFollowing,
        hideFollowers: userData.hideFollowers,
        hideExhibits: userData.hideExhibits,
        postLinks: userData.postLinks,
        profileColumns: userData.profileColumns,
      },
    });
  };

  useEffect(() => {
    setIntialCheeredPosts(cheeredPosts);
    props.navigation.setParams({ exhibitId: exhibitId });
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
        jobTitle={userData.jobTitle}
        username={userData.username}
        profileImageSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        cheering={cheering}
        numberOfCheers={numberOfCheers}
        numberOfComments={userData.numberOfComments}
        postId={userData.postId}
        exhibitId={exhibitId}
        posterExhibitUId={userData.ExhibitUId}
        links={userData.postLinks}
        postDateCreated={userData.postDateCreated}
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
        threeDotsStyle={darkModeValue ? "white" : "black"}
        captionContainer={{
          backgroundColor: darkModeValue ? "black" : "white",
        }}
        dateContainer={{
          backgroundColor: darkModeValue ? "black" : "white",
        }}
        dateStyle={{
          color: "gray",
        }}
        titleStyle={{
          color: "white",
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
});

export default FeedCommentsScreen;
