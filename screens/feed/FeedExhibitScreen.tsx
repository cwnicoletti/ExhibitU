import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks";
import useDidMountEffect from "../../helper/useDidMountEffect";
import ExhibitPictures from "../../components/UI_general/ExhibitPictures";
import ExhibitHeader from "../../components/UI_general/ExhibitHeader";

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
    postId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    postPhoto: string,
    numberOfCheers: number,
    numberOfComments: number,
    caption: string,
    cheering: string,
    numberOfFollowers: number,
    numberOfFollowing: number,
    hideFollowing: boolean,
    hideFollowers: boolean,
    hideExhibits: boolean,
    profileColumns: number,
    postLinks: object,
    postDateCreated: string
  ) => {
    props.navigation.push("ViewFeedPicture", {
      exhibitId,
      userData: {
        ExhibitUId,
        postId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        postPhoto,
        cheering,
        numberOfCheers,
        numberOfComments,
        caption,
        numberOfFollowers,
        numberOfFollowing,
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
      <ExhibitHeader
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
                itemData.item.cheering,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  
  profileDescriptionStyle: {
    margin: 15,
  },
});

export default FeedExhibitScreen;
