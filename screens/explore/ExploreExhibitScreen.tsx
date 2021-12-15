import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks";
import ExhibitPictures from "../../components/UI_general/ExhibitPictures";
import ExhibitHeader from "../../components/UI_general/ExhibitHeader";

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
    cheering: string[],
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
      cheering,
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
      <ExhibitHeader
        imgSource={exploredExhibitData.exhibitCoverPhotoUrl}
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

export default ExploreExhibitScreen;
