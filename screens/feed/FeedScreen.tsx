import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FeedItem from "../../components/screen_specific/feed/FeedItem";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { getUserFeed, offScreen } from "../../store/actions/user/user";

const FeedScreen = (props) => {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const localId = useAppSelector((state) => state.auth.userId);
  const userFeed = useAppSelector((state) => state.user.userFeed);
  const [userFeedState, setUserFeedState] = useState(
    Object.values(userFeed).sort((first: string, second: string) => {
      return (
        second["postDateCreated"]["_seconds"] -
        first["postDateCreated"]["_seconds"]
      );
    })
  );
  const profilePictureBase64 = useAppSelector(
    (state) => state.user.profilePictureBase64
  );
  const resetScrollFeed = useAppSelector((state) => state.user.resetScrollFeed);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const viewExhibitHandler = (
    ExhibitUId: string,
    exhibitId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    profileExhibits: object,
    profilePictureBase64: string,
    profilePictureUrl: string,
    numberOfFollowers: number,
    numberOfFollowing: number,
    hideFollowing: boolean,
    hideFollowers: boolean,
    hideExhibits: boolean,
    exhibitLinks: object,
    profileColumns: number,
    postDateCreated: string
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewFeedExhibit", {
      exhibitId,
      userData: {
        ExhibitUId,
        fullname,
        username,
        jobTitle,
        profileBiography,
        profileExhibits,
        profilePictureBase64,
        profilePictureUrl,
        numberOfFollowers,
        numberOfFollowing,
        hideFollowing,
        hideFollowers,
        hideExhibits,
        exhibitLinks,
        profileColumns,
        postDateCreated,
      },
    });
  };

  const viewCheeringHandler = (
    ExhibitUId: string,
    exhibitId: string,
    postId: string,
    numberOfCheers: number
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewCheering", {
      ExhibitUId,
      exhibitId,
      postId,
      numberOfCheers,
    });
  };

  const viewProfileHandler = (
    ExhibitUId: string,
    fullname: string,
    username: string,
    jobTitle: string,
    profileBiography: string,
    profileExhibits: object,
    profilePictureUrl: string,
    followers: string[],
    following: string[],
    numberOfFollowers: number,
    numberOfFollowing: number,
    hideFollowing: boolean,
    hideFollowers: boolean,
    hideExhibits: boolean,
    profileLinks: object,
    profileColumns: number,
    showCheering: boolean
  ) => {
    dispatch(offScreen("Feed"));
    props.navigation.navigate("ViewProfile", {
      userData: {
        exploredExhibitUId: ExhibitUId,
        profilePictureUrl,
        fullname,
        username,
        jobTitle,
        profileBiography,
        numberOfFollowers,
        numberOfFollowing,
        hideFollowing,
        hideFollowers,
        hideExhibits,
        followers,
        following,
        profileExhibits,
        profileLinks,
        profileColumns,
        showCheering,
      },
    });
  };

  const refreshFeed = async () => {
    setIsRefreshing(true);
    await dispatch(getUserFeed(localId, ExhibitUId));
    setIsRefreshing(false);
  };

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setUserFeedState(
      Object.values(userFeed).sort((first: string, second: string) => {
        return (
          second["postDateCreated"]["_seconds"] -
          first["postDateCreated"]["_seconds"]
        );
      })
    );
  }, [userFeed]);

  const flatlistFeed: any = useRef();
  useDidMountEffect(() => {
    flatlistFeed.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollFeed]);

  const topHeader = () => {
    return (
      <View>
        {Object.values(userFeed).length === 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "grey", margin: 10, marginTop: 20 }}>
              No posts to show!
            </Text>
            <AntDesign
              name="exclamationcircle"
              size={24}
              color={"grey"}
              style={{ margin: 10 }}
            />
            <Text style={{ color: "grey", margin: 10 }}>
              Try following someone or posting something!
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "#000000" : "white",
      }}
    >
      <Animated.View
        style={{
          opacity: fadeInAnim,
        }}
      >
        <FlatList<any>
          data={userFeedState}
          extraData={profilePictureBase64}
          ref={flatlistFeed}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshFeed}
              tintColor={darkModeValue ? "white" : "black"}
            />
          }
          ListFooterComponent={topHeader()}
          keyExtractor={(item) => item.postId}
          renderItem={(itemData) => (
            <FeedItem
              image={
                itemData.item.postPhotoBase64
                  ? itemData.item.postPhotoBase64
                  : itemData.item.postPhotoUrl
              }
              postUrl={itemData.item.postPhotoUrl}
              profileImageSource={itemData.item.profilePictureUrl}
              exhibitTitle={itemData.item.exhibitTitle}
              caption={itemData.item.caption}
              cheering={itemData.item.cheering}
              numberOfCheers={itemData.item.numberOfCheers}
              numberOfComments={itemData.item.numberOfComments}
              exhibitId={itemData.item.exhibitId}
              postId={itemData.item.postId}
              posterExhibitUId={itemData.item.ExhibitUId}
              links={itemData.item.postLinks}
              fullname={itemData.item.fullname}
              username={itemData.item.username}
              jobTitle={itemData.item.jobTitle}
              postDateCreated={itemData.item.postDateCreated._seconds}
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
              nameContainer={{
                backgroundColor: darkModeValue ? "black" : "white",
              }}
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
              profilePictureColors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
              exhibitTitleColors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              arrowColor={"white"}
              onSelect={() => {
                viewExhibitHandler(
                  itemData.item.ExhibitUId,
                  itemData.item.exhibitId,
                  itemData.item.fullname,
                  itemData.item.username,
                  itemData.item.jobTitle,
                  itemData.item.profileBiography,
                  itemData.item.profileExhibits,
                  itemData.item.profilePictureBase64,
                  itemData.item.profilePictureUrl,
                  itemData.item.numberOfFollowers,
                  itemData.item.numberOfFollowing,
                  itemData.item.hideFollowing,
                  itemData.item.hideFollowers,
                  itemData.item.hideExhibits,
                  itemData.item.exhibitLinks,
                  itemData.item.profileColumns,
                  itemData.item.postDateCreated._seconds
                );
              }}
              onSelectCheering={() => {
                viewCheeringHandler(
                  itemData.item.ExhibitUId,
                  itemData.item.exhibitId,
                  itemData.item.postId,
                  itemData.item.numberOfCheers
                );
              }}
              onSelectProfile={() => {
                viewProfileHandler(
                  itemData.item.ExhibitUId,
                  itemData.item.fullname,
                  itemData.item.username,
                  itemData.item.jobTitle,
                  itemData.item.profileBiography,
                  itemData.item.profileExhibits,
                  itemData.item.profilePictureUrl,
                  itemData.item.followers,
                  itemData.item.following,
                  itemData.item.numberOfFollowers,
                  itemData.item.numberOfFollowing,
                  itemData.item.hideFollowing,
                  itemData.item.hideFollowers,
                  itemData.item.hideExhibits,
                  itemData.item.profileLinks,
                  itemData.item.profileColumns,
                  itemData.item.showCheering
                );
              }}
            />
          )}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default FeedScreen;
