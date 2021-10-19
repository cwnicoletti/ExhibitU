import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import ExploreExhibitHeader from "../../components/explore/ExploreExhibitHeader";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import ExhibitPictures from "../../components/UI/ExhibitPictures";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const ExploreExhibitScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const [exploredUserDataLocal, setExploredUserDataLocal] = useState(
    props.navigation.getParam("exploredUserData")
      ? props.navigation.getParam("exploredUserData")
      : {}
  );

  const exploredExhibitData = {
    exhibitId: props.navigation.getParam("exhibitId"),
    exhibitTitle: props.navigation.getParam("exhibitTitle"),
    exhibitCoverPhotoUrl: props.navigation.getParam("exhibitCoverPhotoUrl"),
    exhibitDescription: props.navigation.getParam("exhibitDescription"),
    exhibitColumns: props.navigation.getParam("exhibitColumns"),
    exhibitPosts: props.navigation.getParam("exhibitPosts")
      ? props.navigation.getParam("exhibitPosts")
      : {},
    exhibitLinks: props.navigation.getParam("exhibitLinks")
      ? props.navigation.getParam("exhibitLinks")
      : {},
  };

  const [exhibitPostsState, setExhibitPostsState] = useState(
    Object.values(exploredExhibitData.exhibitPosts).sort(
      (first: string, second: string) => {
        return (
          second["postDateCreated"]["_seconds"] -
          first["postDateCreated"]["_seconds"]
        );
      }
    )
  );

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCommentsHandler = (
    ExhibitUId: string,
    postId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    profileExhibits: object,
    profilePictureUrl: string,
    postPhotoUrl: string,
    numberOfCheers: number,
    numberOfComments: number,
    caption: string,
    postLinks: object,
    postDateCreated: string
  ) => {
    props.navigation.push("ViewExploredProfileExhibitPicture", {
      ExhibitUId,
      exhibitId: exploredExhibitData.exhibitId,
      postId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileExhibits,
      profilePictureUrl,
      postPhotoUrl,
      numberOfCheers,
      numberOfComments,
      caption,
      exploredUserData: exploredUserDataLocal,
      postLinks,
      postDateCreated,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <ExploreExhibitHeader
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={{ uri: exploredExhibitData.exhibitCoverPhotoUrl }}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={exploredExhibitData.exhibitTitle}
        description={exploredExhibitData.exhibitDescription}
        links={exploredExhibitData.exhibitLinks}
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
      <FlatList<any>
        data={exhibitPostsState}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={topHeader()}
        numColumns={exploredExhibitData.exhibitColumns}
        renderItem={(itemData) => (
          <ExhibitPictures
            image={itemData.item.postPhotoUrl}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              width:
                exploredExhibitData.exhibitColumns === 1
                  ? "100%"
                  : exploredExhibitData.exhibitColumns === 2
                  ? "50%"
                  : exploredExhibitData.exhibitColumns === 3
                  ? "33.33%"
                  : exploredExhibitData.exhibitColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio:
                exploredExhibitData.exhibitColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() =>
              viewCommentsHandler(
                itemData.item.ExhibitUId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileExhibits,
                itemData.item.profilePictureUrl,
                itemData.item.postPhotoUrl,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.postLinks,
                itemData.item.postDateCreated._seconds
              )
            }
          />
        )}
      />
    </View>
  );
};

ExploreExhibitScreen.navigationOptions = (navData) => {
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

export default ExploreExhibitScreen;
