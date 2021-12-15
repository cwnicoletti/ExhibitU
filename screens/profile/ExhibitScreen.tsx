import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExhibitHeader from "../../components/screen_specific/profile/ProfileExhibitHeader";
import ExhibitPictures from "../../components/UI_general/ExhibitPictures";
import { changeExhibitNumberOfColumns } from "../../store/actions/user/user";

const ExhibitScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoadingTwoColumns, setIsLoadingTwoColumns] = useState(false);
  const [isLoadingThreeColumns, setIsLoadingThreeColumns] = useState(false);
  const [isLoadingFourColumns, setIsLoadingFourColumns] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const profileExhibits = useAppSelector((state) => state.user.profileExhibits);
  const currentExhibitId = props.navigation.getParam("exhibitId");
  const currentExhibit = profileExhibits[currentExhibitId];

  const exhibitPostsState = Object.values(currentExhibit.exhibitPosts).sort(
    (first: string, second: string) => {
      return (
        second["postDateCreated"]["_seconds"] -
        first["postDateCreated"]["_seconds"]
      );
    }
  );

  const postIds = Object.keys(currentExhibit.exhibitPosts);

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewCommentsHandler = (
    ExhibitUId: string,
    exhibitId: string,
    postId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    profileExhibits: object,
    profilePictureUrl: string,
    postPhotoUrl: string,
    postPhotoBase64: string,
    cheering: string[],
    numberOfCheers: number,
    numberOfComments: number,
    caption: string,
    links: object,
    postDateCreated: string
  ) => {
    props.navigation.push("PictureScreen", {
      ExhibitUId,
      exhibitId,
      postId,
      fullname,
      username,
      jobTitle,
      profileBiography,
      profileExhibits,
      profilePictureUrl,
      postPhotoUrl,
      postPhotoBase64,
      cheering,
      numberOfCheers,
      numberOfComments,
      caption,
      links,
      postDateCreated,
    });
  };

  useEffect(() => {
    props.navigation.setParams({
      exhibitId: currentExhibitId,
      exhibitTitle: currentExhibit.exhibitTitle,
      exhibitDescription: currentExhibit.exhibitDescription,
      exhibitCoverPhotoUrl: currentExhibit.exhibitCoverPhotoUrl,
      exhibitDateCreated: currentExhibit.exhibitDateCreated,
      exhibitLastUpdated: currentExhibit.exhibitLastUpdated,
      exhibitLinks: currentExhibit.exhibitLinks,
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const topHeader = () => {
    return (
      <ExhibitHeader
        containerStyle={{
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
        imgSource={
          currentExhibit.exhibitCoverPhotoBase64
            ? currentExhibit.exhibitCoverPhotoBase64
            : currentExhibit.exhibitCoverPhotoUrl
        }
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        title={currentExhibit.exhibitTitle}
        description={currentExhibit.exhibitDescription}
        links={currentExhibit.exhibitLinks}
        onEditProfilePress={() =>
          props.navigation.navigate("EditExhibitScreen", {
            exhibitId: currentExhibitId,
            exhibitTitle: currentExhibit.exhibitTitle,
            exhibitDescription: currentExhibit.exhibitDescription,
            exhibitCoverPhotoId: currentExhibit.exhibitCoverPhotoId,
            exhibitCoverPhotoUrl: currentExhibit.exhibitCoverPhotoUrl,
            links: currentExhibit.exhibitLinks,
          })
        }
        changeColumnToTwo={async () => {
          await setIsLoadingTwoColumns(true);
          await dispatch(
            changeExhibitNumberOfColumns(
              localId,
              ExhibitUId,
              currentExhibitId,
              postIds,
              2
            )
          );
          await setIsLoadingTwoColumns(false);
        }}
        columnTwoStyle={{
          borderColor:
            currentExhibit.exhibitColumns === 2
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingTwoColumns={isLoadingTwoColumns}
        changeColumnToThree={async () => {
          await setIsLoadingThreeColumns(true);
          await dispatch(
            changeExhibitNumberOfColumns(
              localId,
              ExhibitUId,
              currentExhibitId,
              postIds,
              3
            )
          );
          await setIsLoadingThreeColumns(false);
        }}
        columnThreeStyle={{
          borderColor:
            currentExhibit.exhibitColumns === 3
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingThreeColumns={isLoadingThreeColumns}
        changeColumnToFour={async () => {
          await setIsLoadingFourColumns(true);
          await dispatch(
            changeExhibitNumberOfColumns(
              localId,
              ExhibitUId,
              currentExhibitId,
              postIds,
              4
            )
          );
          await setIsLoadingFourColumns(false);
        }}
        columnFourStyle={{
          borderColor:
            currentExhibit.exhibitColumns === 4
              ? darkModeValue
                ? "#c9c9c9"
                : "#3d3d3d"
              : darkModeValue
              ? "gray"
              : "#c9c9c9",
        }}
        isLoadingFourColumns={isLoadingFourColumns}
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
      <FlatList<Object | any>
        data={exhibitPostsState}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={topHeader()}
        key={currentExhibit.exhibitColumns}
        numColumns={currentExhibit.exhibitColumns}
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
                currentExhibit.exhibitColumns === 2
                  ? "50%"
                  : currentExhibit.exhibitColumns === 3
                  ? "33.33%"
                  : currentExhibit.exhibitColumns === 4
                  ? "25%"
                  : "25%",
              aspectRatio: currentExhibit.exhibitColumns === 1 ? null : 3 / 3,
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() =>
              viewCommentsHandler(
                itemData.item.ExhibitUId,
                itemData.item.exhibitId,
                itemData.item.postId,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.profileExhibits,
                itemData.item.profilePictureUrl,
                itemData.item.postPhotoUrl,
                itemData.item.postPhotoBase64,
                itemData.item.cheering,
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  
  profileDescriptionStyle: {
    margin: 15,
  },
});

export default ExhibitScreen;
