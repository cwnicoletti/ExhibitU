import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppSelector } from "../../hooks";
import FeedExhibitHeader from "../../components/feed/FeedExhibitHeader";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import useDidMountEffect from "../../helper/useDidMountEffect";
import ExhibitPictures from "../../components/UI/ExhibitPictures";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";

const FeedExhibitScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exhibitId = props.navigation.getParam("exhibitId");
  let userData = props.navigation.getParam("userData");
  userData.exhibitLinks = userData.exhibitLinks ? userData.exhibitLinks : {};

  userData =
    userData.ExhibitUId === ExhibitUId
      ? {
          ...userData,
          profilePictureBase64: useAppSelector(
            (state) => state.user.profilePictureBase64
          )
            ? useAppSelector((state) => state.user.profilePictureBase64)
            : props.navigation.getParam("profilePictureUrl"),
          profileColumns: useAppSelector((state) => state.user.profileColumns),
          ExhibitUId: useAppSelector((state) => state.user.ExhibitUId),
          fullname: useAppSelector((state) => state.user.fullname),
          username: useAppSelector((state) => state.user.username),
          jobTitle: useAppSelector((state) => state.user.jobTitle),
          profileBiography: useAppSelector(
            (state) => state.user.profileBiography
          ),
          profileExhibits: useAppSelector((state) => state.user.profileExhibits)
            ? useAppSelector((state) => state.user.profileExhibits)
            : props.navigation.getParam("profileExhibits"),
          numberOfAdvocates: useAppSelector(
            (state) => state.user.numberOfAdvocates
          ),
          numberOfFollowers: useAppSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useAppSelector(
            (state) => state.user.numberOfFollowing
          ),
          hideFollowing: useAppSelector((state) => state.user.hideFollowing),
          hideFollowers: useAppSelector((state) => state.user.hideFollowers),
          hideExhibits: useAppSelector((state) => state.user.hideExhibits),
        }
      : userData;

  const exhibit: object | any = Object.values(userData.profileExhibits).find(
    (exhibit: string | any) => exhibit.exhibitId === exhibitId
  );

  const [exhibitPostsState, setExhibitPostsState] = useState(
    Object.values(exhibit.exhibitPosts).sort(
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

  const viewPictureHandler = (
    ExhibitUId: string,
    exhibitId: string,
    postId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    postPhoto: string,
    numberOfCheers: number,
    numberOfComments: number,
    caption: string,
    numberOfFollowers: number,
    numberOfFollowing: number,
    numberOfAdvocates: number,
    hideFollowing: boolean,
    hideFollowers: boolean,
    hideExhibits: boolean,
    profileColumns: number,
    postLinks: object,
    postDateCreated: string
  ) => {
    props.navigation.navigate("ViewFeedPicture", {
      exhibitId,
      userData: {
        ExhibitUId,
        postId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        postPhoto,
        numberOfCheers,
        numberOfComments,
        caption,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideExhibits,
        profileColumns,
        postLinks,
        profileExhibits: userData.profileExhibits,
        profilePictureBase64: userData.profilePictureBase64
          ? userData.profilePictureBase64
          : userData.profilePictureUrl,
        postDateCreated,
      },
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setExhibitPostsState(
      Object.values(exhibit.exhibitPosts).sort(
        (first: string, second: string) => {
          return (
            second["postDateCreated"]["_seconds"] -
            first["postDateCreated"]["_seconds"]
          );
        }
      )
    );
  }, [exhibit.exhibitPosts]);

  const topHeader = () => {
    return (
      <FeedExhibitHeader
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={
          exhibit.exhibitCoverPhotoBase64
            ? exhibit.exhibitCoverPhotoBase64
            : exhibit.exhibitCoverPhotoUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={exhibit.exhibitTitle}
        description={exhibit.exhibitDescription}
        links={userData.exhibitLinks}
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
        numColumns={exhibit.exhibitColumns}
        renderItem={(itemData) => (
          <ExhibitPictures
            image={
              itemData.item.postPhotoBase64
                ? itemData.item.postPhotoBase64
                : itemData.item.postPhotoUrl
            }
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              width:
                exhibit.exhibitColumns === 1
                  ? "100%"
                  : exhibit.exhibitColumns === 2
                  ? "50%"
                  : exhibit.exhibitColumns === 3
                  ? "33.33%"
                  : exhibit.exhibitColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio: exhibit.exhibitColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() =>
              viewPictureHandler(
                itemData.item.ExhibitUId,
                itemData.item.exhibitId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.postPhotoBase64
                  ? itemData.item.postPhotoBase64
                  : itemData.item.postPhotoUrl,
                itemData.item.numberOfCheers,
                itemData.item.numberOfComments,
                itemData.item.caption,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideExhibits,
                itemData.item.profileColumns,
                userData.postLinks,
                itemData.item.postDateCreated._seconds
              )
            }
          />
        )}
      />
    </View>
  );
};

FeedExhibitScreen.navigationOptions = (navData) => {
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

export default FeedExhibitScreen;
