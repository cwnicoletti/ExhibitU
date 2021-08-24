import React, { useCallback, useEffect } from "react";
import { LogBox, Platform, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import ProfileExhibitPostView from "../../components/user/ProfileExhibitPostView";
import { uploadRemovePost } from "../../store/actions/user/user";

const PictureScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const profileExhibits = useAppSelector((state) => state.user.profileExhibits);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );
  const profilePictureBase64 = useAppSelector(
    (state) => state.user.profilePictureBase64
  );
  const ExhibitUId = props.navigation.getParam("ExhibitUId");
  const exhibitId = props.navigation.getParam("exhibitId");
  const postId = props.navigation.getParam("postId");
  const fullname = props.navigation.getParam("fullname");
  const username = props.navigation.getParam("username");
  const jobTitle = props.navigation.getParam("jobTitle");
  const profileBiography = props.navigation.getParam("profileBiography");
  const postPhotoBase64 = props.navigation.getParam("postPhotoBase64");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const numberOfComments = props.navigation.getParam("numberOfComments");
  const caption = props.navigation.getParam("caption");
  const postDateCreated = props.navigation.getParam("postDateCreated");
  const links = props.navigation.getParam("links")
    ? props.navigation.getParam("links")
    : {};

  let android: boolean = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCheeringHandler = () => {
    props.navigation.push("CheeringScreen", {
      ExhibitUId: ExhibitUId,
      exhibitId: exhibitId,
      postId: postId,
      numberOfCheers: numberOfCheers,
    });
  };

  const viewProfileHandler = (
    ExhibitUId: string,
    exhibitId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    profileExhibits: object,
    profilePictureUrl: string
  ) => {
    props.navigation.push("ExhibitUProfile", {
      ExhibitUId,
      exhibitId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileExhibits,
      profilePictureUrl,
    });
  };

  const deleteHandler = useCallback(async () => {
    dispatch(uploadRemovePost(ExhibitUId, localId, exhibitId, postId));

    props.navigation.navigate("ViewProfileExhibit", {
      exhibitId: exhibitId,
    });
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ android: android });
    props.navigation.setParams({ deleteFn: deleteHandler });
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
      <ProfileExhibitPostView
        image={postPhotoBase64}
        descriptionStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        caption={caption}
        profileImageSource={profilePictureBase64}
        numberOfCheers={numberOfCheers}
        numberOfComments={numberOfComments}
        links={links}
        postId={postId}
        exhibitId={exhibitId}
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
        dateContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
        }}
        dateStyle={{
          color: "gray",
        }}
        threeDotsStyle={darkModeValue ? "white" : "black"}
        captionContainer={{
          backgroundColor: darkModeValue ? "#121212" : "white",
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
          viewProfileHandler(
            ExhibitUId,
            exhibitId,
            fullname,
            username,
            jobTitle,
            profileBiography,
            profileExhibits,
            profilePictureUrl
          );
        }}
      />
    </ScrollView>
  );
};

PictureScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");
  const deleteFn = navData.navigation.getParam("deleteFn");

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {android ? (
          <Item
            title="Trash"
            iconName={"md-trash"}
            color="red"
            onPress={deleteFn}
          />
        ) : (
          <Item
            title="Trash"
            iconName={"ios-trash"}
            color="red"
            onPress={deleteFn}
          />
        )}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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

export default PictureScreen;
