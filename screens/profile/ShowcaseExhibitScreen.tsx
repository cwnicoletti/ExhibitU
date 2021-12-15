import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks";
import useDidMountEffect from "../../helper/useDidMountEffect";
import ExhibitPictures from "../../components/UI_general/ExhibitPictures";
import ExhibitHeader from "../../components/UI_general/ExhibitHeader";

const ShowcaseExhibitScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const currentExhibitId: string = props.navigation.getParam("exhibitId");
  const userData = props.navigation.getParam("userData");
  const exhibit = userData.profileExhibits[currentExhibitId];

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

  let android: boolean = null;
  if (Platform.OS === "android") {
    android = true;
  }

  const viewPictureHandler = (
    postId: string,
    postPhotoUrl: string,
    postPhotoBase64: string,
    numberOfCheers: number,
    numberOfComments: number,
    caption: string,
    postLinks: object,
    postDateCreated: string
  ) => {
    props.navigation.push("ShowcasePictureScreen", {
      exhibitId: currentExhibitId,
      postId,
      postPhotoUrl,
      postPhotoBase64,
      numberOfCheers,
      numberOfComments,
      caption,
      postLinks,
      postDateCreated,
      userData,
    });
  };

  useEffect(() => {
    props.navigation.setParams({ android: android });
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
        links={exhibit.exhibitLinks}
        description={exhibit.exhibitDescription}
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
                itemData.item.postId,
                itemData.item.postPhotoUrl,
                itemData.item.postPhotoBase64,
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

export default ShowcaseExhibitScreen;
