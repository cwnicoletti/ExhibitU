import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import ShowcasePostView from "../../components/screen_specific/profile/ShowcasePostView";

const ShowcasePictureScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const userData = props.navigation.getParam("userData");

  const postId = props.navigation.getParam("postId");
  const exhibitId = props.navigation.getParam("exhibitId");
  const postPhotoUrl = props.navigation.getParam("postPhotoUrl");
  const postPhotoBase64 = props.navigation.getParam("postPhotoBase64");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const postDateCreated = props.navigation.getParam("postDateCreated");
  const postLinks = props.navigation.getParam("postLinks")
    ? props.navigation.getParam("postLinks")
    : {};

  const viewCheeringHandler = () => {
    props.navigation.push("CheeringScreen", {
      ExhibitUId: userData.ExhibitUId,
      exhibitId: exhibitId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = () => {
    props.navigation.push("ShowcaseProfile", {
      ExhibitUId: userData.ExhibitUId,
      profilePictureUrl: userData.profilePictureUrl,
      fullname: userData.fullname,
      username: userData.username,
      jobTitle: userData.jobTitle,
      profileBiography: userData.profileBiography,
      numberOfFollowers: userData.numberOfFollowers,
      numberOfFollowing: userData.numberOfFollowing,
      hideFollowing: userData.hideFollowing,
      hideFollowers: userData.hideFollowers,
      hideExhibits: userData.hideExhibits,
      followers: userData.followers,
      following: userData.following,
      profileExhibits: userData.profileExhibits,
      profileLinks: userData.profileLinks,
      exhibitLinks: userData.exhibitLinks,
      profileColumns: userData.profileColumns,
      showCheering: userData.showCheering,
    });
  };

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
      <ShowcasePostView
        image={postPhotoBase64 ? postPhotoBase64 : postPhotoUrl}
        caption={caption}
        profileImageSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        fullname={userData.fullname}
        username={userData.username}
        jobTitle={userData.jobTitle}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={postLinks}
        postDateCreated={postDateCreated}
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        nameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        usernameStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        exhibitContainer={{
          borderColor: darkModeValue ? "#616161" : "#e8e8e8",
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
        nameTitleColors={["rgba(0,0,0,1)", "rgba(0,0,0,0.00)"]}
        exhibitTitleColors={["rgba(0,0,0,0.00)", "rgba(0,0,0,1)"]}
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

export default ShowcasePictureScreen;
