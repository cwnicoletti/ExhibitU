import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExploreExhibitHeader from "../../components/explore/ExploreExhibitHeader";
import FontAwesomeHeaderButton from "../../components/UI/header_buttons/FontAwesomeHeaderButton";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import ExhibitPictures from "../../components/UI/ExhibitPictures";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import TutorialExploreExhibit from "../../components/tutorial/TutorialExploreExhibit";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import {
  advocateForUser,
  unadvocateForUser,
} from "../../store/actions/user/user";

const NotificationsExhibitScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const [exploredUserDataLocal, setExploredUserDataLocal] = useState(
    props.navigation.getParam("exploredUserData")
      ? props.navigation.getParam("exploredUserData")
      : {}
  );
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);

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

  exploredExhibitData.exhibitId = exploredExhibitData.exhibitId
    ? exploredExhibitData.exhibitId
    : "";
  exploredExhibitData.exhibitTitle = exploredExhibitData.exhibitTitle
    ? exploredExhibitData.exhibitTitle
    : "Sample Exhibit";
  exploredExhibitData.exhibitCoverPhotoUrl =
    exploredExhibitData.exhibitCoverPhotoUrl
      ? exploredExhibitData.exhibitCoverPhotoUrl
      : "https://res.cloudinary.com/showcase-79c28/image/upload/v1626117054/exhibit_pic_ysb6uu.png";
  exploredExhibitData.exhibitDescription =
    exploredExhibitData.exhibitDescription
      ? exploredExhibitData.exhibitDescription
      : "I've been working on a really cool web application!";
  exploredExhibitData.exhibitColumns = exploredExhibitData.exhibitColumns
    ? exploredExhibitData.exhibitColumns
    : 2;
  exploredExhibitData.exhibitPosts = exploredExhibitData.exhibitPosts
    ? exploredExhibitData.exhibitPosts
    : {
        ["randomId121334h"]: {
          ExhibitUId: ExhibitUId,
          exhibitId: "randomId121334",
          postId: "randomId121334h",
          fullname: "test",
          username: "test",
          jobTitle: "test",
          profileBiography: "test",
          profileExhibits: {},
          profilePictureUrl: "test",
          postPhotoUrl:
            "https://camo.githubusercontent.com/9aea0a68fd10f943a82ce8a434f6c126296568fdf17d0cc914d40a4feb4a9f10/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f706572736f6e616c757365313233342f696d6167652f75706c6f61642f76313631373231353939392f436f43726561746f727765626170705f6c7a716e696e2e706e67",
          postPhotoBase64: "",
          numberOfCheers: 0,
          numberOfComments: 0,
          caption: "Sample post",
          postLinks: {},
          postDateCreated: {
            _seconds: 7654757,
            _minutes: 7654757,
          },
        },
      };
  exploredExhibitData.exhibitLinks = exploredExhibitData.exhibitLinks
    ? exploredExhibitData.exhibitLinks
    : {};

  exploredUserDataLocal.profileBiography =
    exploredUserDataLocal.profileBiography
      ? exploredUserDataLocal.profileBiography
      : "Yes, it's me, Elon Tusk.";
  exploredUserDataLocal.following = exploredUserDataLocal.following
    ? exploredUserDataLocal.following
    : [];
  exploredUserDataLocal.followers = exploredUserDataLocal.followers
    ? exploredUserDataLocal.followers
    : [];
  exploredUserDataLocal.advocates = exploredUserDataLocal.advocates
    ? exploredUserDataLocal.advocates
    : [];
  exploredUserDataLocal.fullname = exploredUserDataLocal.fullname
    ? exploredUserDataLocal.fullname
    : "Elon Tusk";
  exploredUserDataLocal.username = exploredUserDataLocal.username
    ? exploredUserDataLocal.username
    : "elontusk";
  exploredUserDataLocal.jobTitle = exploredUserDataLocal.jobTitle
    ? exploredUserDataLocal.jobTitle
    : "CEO of companies";
  exploredUserDataLocal.profilePictureUrl =
    exploredUserDataLocal.profilePictureUrl
      ? exploredUserDataLocal.profilePictureUrl
      : "";
  exploredUserDataLocal.hideFollowing = exploredUserDataLocal.hideFollowing
    ? exploredUserDataLocal.hideFollowing
    : false;
  exploredUserDataLocal.hideFollowers = exploredUserDataLocal.hideFollowers
    ? exploredUserDataLocal.hideFollowers
    : false;
  exploredUserDataLocal.hideExhibits = exploredUserDataLocal.hideExhibits
    ? exploredUserDataLocal.hideExhibits
    : false;
  exploredUserDataLocal.profileLinks = exploredUserDataLocal.profileLinks
    ? exploredUserDataLocal.profileLinks
    : {};
  exploredUserDataLocal.profileColumns = exploredUserDataLocal.profileColumns
    ? exploredUserDataLocal.profileColumns
    : 2;
  exploredUserDataLocal.showCheering = exploredUserDataLocal.showCheering
    ? exploredUserDataLocal.showCheering
    : true;
  exploredUserDataLocal.numberOfFollowers =
    exploredUserDataLocal.numberOfFollowers
      ? exploredUserDataLocal.numberOfFollowers
      : 0;
  exploredUserDataLocal.numberOfFollowing =
    exploredUserDataLocal.numberOfFollowing
      ? exploredUserDataLocal.numberOfFollowing
      : 0;
  exploredUserDataLocal.numberOfAdvocates =
    exploredUserDataLocal.numberOfAdvocates
      ? exploredUserDataLocal.numberOfAdvocates
      : 0;

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

  const [isAdvocating, setIsAdvocating] = useState(
    exploredUserDataLocal.advocates.includes(ExhibitUId) ? true : false
  );

  const advocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await advocateForUser(
        exploredUserDataLocal.exploredExhibitUId,
        ExhibitUId,
        localId,
        exploredExhibitData.exhibitId
      )
    );
    setIsAdvocating(true);
    await setIsLoading(false);
  }, [setIsLoading, advocateForUser, setIsAdvocating]);

  const unadvocateUserHandler = useCallback(async () => {
    await setIsLoading(true);
    await dispatch(
      await unadvocateForUser(
        exploredUserDataLocal.exploredExhibitUId,
        ExhibitUId,
        localId,
        exploredExhibitData.exhibitId
      )
    );
    setIsAdvocating(false);
    await setIsAdvocating(false);
    await setIsLoading(false);
  }, [setIsLoading, unadvocateForUser, setIsAdvocating]);

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
    props.navigation.setParams({ ExhibitUId: ExhibitUId });
    props.navigation.setParams({
      exploredExhibitUId: exploredUserDataLocal.exploredExhibitUId,
    });
    props.navigation.setParams({ advocateFn: advocateUserHandler });
    props.navigation.setParams({ unadvocateFn: unadvocateUserHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    props.navigation.setParams({ isLoading: isLoading });
  }, [isLoading]);

  useEffect(() => {
    props.navigation.setParams({ isAdvocating: isAdvocating });
  }, [isAdvocating]);

  useEffect(() => {
    props.navigation.setParams({ exploreData: exploredUserDataLocal });
  }, [exploredUserDataLocal]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialCheeredPosts,
      cheeredPosts
    );
    const exploredUserDataNewState = exploredUserDataLocal;
    for (const exhibitId of Object.keys(
      exploredUserDataNewState.profileExhibits
    )) {
      for (const postId of Object.keys(
        exploredUserDataNewState.profileExhibits[exhibitId].exhibitPosts
      )) {
        if (postId === difference[0]) {
          if (intialCheeredPosts.length < cheeredPosts.length) {
            exploredUserDataNewState.profileExhibits[exhibitId].exhibitPosts[
              postId
            ].numberOfCheers += 1;
            exploredUserDataNewState.profileExhibits[exhibitId].exhibitPosts[
              postId
            ].cheering = [
              ...exploredUserDataNewState.profileExhibits[exhibitId]
                .exhibitPosts[postId].cheering,
              ExhibitUId,
            ];
          } else {
            exploredUserDataNewState.profileExhibits[exhibitId].exhibitPosts[
              postId
            ].numberOfCheers -= 1;
            exploredUserDataNewState.profileExhibits[exhibitId].exhibitPosts[
              postId
            ].cheering = exploredUserDataNewState.profileExhibits[
              exhibitId
            ].exhibitPosts[postId].cheering.filter(
              (userId) => userId !== ExhibitUId
            );
          }
        }
      }
    }
    setExploredUserDataLocal(exploredUserDataNewState);
    setIntialCheeredPosts(cheeredPosts);
  }, [cheeredPosts]);

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
      {tutorialing &&
      (tutorialScreen === "ExploreProfile" ||
        tutorialScreen === "ExploreExhibit" ||
        tutorialScreen === "TutorialEnd") ? (
        <TutorialExploreExhibit ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
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

NotificationsExhibitScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const ExhibitUId = navData.navigation.getParam("ExhibitUId");
  const exploredExhibitUId = navData.navigation.getParam("exploredExhibitUId");
  const isAdvocating = navData.navigation.getParam("isAdvocating");
  const isLoading = navData.navigation.getParam("isLoading");
  const advocateFn = navData.navigation.getParam("advocateFn");
  const unadvocateFn = navData.navigation.getParam("unadvocateFn");

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
      <View>
        {ExhibitUId !== exploredExhibitUId ? (
          <View>
            {!isAdvocating ? (
              <View>
                {!isLoading ? (
                  <HeaderButtons
                    HeaderButtonComponent={FontAwesomeHeaderButton}
                  >
                    <Item
                      title="Advocate"
                      iconName={"handshake-o"}
                      color={darkModeValue ? "white" : "black"}
                      onPress={advocateFn}
                    />
                  </HeaderButtons>
                ) : (
                  <View style={{ margin: 20 }}>
                    <ActivityIndicator
                      size="small"
                      color={darkModeValue ? "white" : "black"}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View>
                {!isLoading ? (
                  <HeaderButtons
                    HeaderButtonComponent={FontAwesomeHeaderButton}
                  >
                    <Item
                      title="Unadvocate"
                      iconName={"handshake-o"}
                      color={"red"}
                      onPress={unadvocateFn}
                    />
                  </HeaderButtons>
                ) : (
                  <View style={{ margin: 20 }}>
                    <ActivityIndicator
                      size="small"
                      color={darkModeValue ? "white" : "black"}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        ) : null}
      </View>
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

export default NotificationsExhibitScreen;