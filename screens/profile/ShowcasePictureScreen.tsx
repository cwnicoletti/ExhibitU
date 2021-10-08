import React, { useEffect } from "react";
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
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import ShowcasePostView from "../../components/user/ShowcasePostView";

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

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

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
      numberOfAdvocates: userData.numberOfAdvocates,
      hideFollowing: userData.hideFollowing,
      hideFollowers: userData.hideFollowers,
      hideExhibits: userData.hideExhibits,
      followers: userData.followers,
      following: userData.following,
      advocates: userData.advocates,
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
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        image={postPhotoBase64 ? postPhotoBase64 : postPhotoUrl}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
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

ShowcasePictureScreen.navigationOptions = (navData) => {
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
});

export default ShowcasePictureScreen;
