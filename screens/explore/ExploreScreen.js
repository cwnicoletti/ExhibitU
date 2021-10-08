import { EvilIcons, Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExploreCard from "../../components/explore/ExploreCard";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import TutorialExploreScreen from "../../components/tutorial/TutorialExploreScreen";
import { offScreen } from "../../store/actions/user/user";
import { FontAwesome5 } from "@expo/vector-icons";

const ExploreScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const [search, setSearch] = useState("");
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const advocating = useAppSelector((state) => state.user.advocating);
  const [intialAdvocating, setIntialAdvocating] = useState([]);
  const following = useAppSelector((state) => state.user.following);
  const [intialFollowing, setIntialFollowing] = useState([]);
  const cheeredPosts = useAppSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const resetScrollExplore = useAppSelector(
    (state) => state.user.resetScrollExplore
  );
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);

  useEffect(() => {
    setIntialAdvocating(advocating);
    setIntialFollowing(following);
    setIntialCheeredPosts(cheeredPosts);
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (!/^ *$/.test(text)) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");

      index.search(text).then((responses) => {
        setReturnedIndex(responses.hits);
      });
    } else {
      setReturnedIndex([]);
    }
  };

  const refreshSearchIndex = (text) => {
    setIsRefreshing(true);
    setSearch(text);
    if (!/^ *$/.test(text)) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");

      index.search(text).then((responses) => {
        setReturnedIndex(responses.hits);
      });
    } else {
      setReturnedIndex([]);
    }
    setIsRefreshing(false);
  };

  const viewProfileHandler = (
    text,
    ExhibitUId,
    profilePictureUrl,
    fullname,
    username,
    jobTitle,
    profileBiography,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    hideFollowing,
    hideFollowers,
    hideExhibits,
    followers,
    following,
    advocates,
    profileExhibits,
    profileLinks,
    profileColumns,
    showCheering
  ) => {
    dispatch(offScreen("Explore"));
    props.navigation.push("ExploreProfile", {
      exploreData: {
        text,
        exploredExhibitUId: ExhibitUId,
        profilePictureUrl,
        fullname,
        username,
        jobTitle,
        profileBiography,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideExhibits,
        followers,
        following,
        advocates,
        profileExhibits,
        profileLinks,
        profileColumns,
        showCheering,
      },
    });
  };

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialAdvocating,
      advocating
    );
    if (search) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");
      index.search(search).then((responses) => {
        for (const object of responses.hits) {
          if (object.objectID === difference[0]) {
            if (intialAdvocating.length < advocating.length) {
              object.numberOfAdvocates += 1;
              object.advocates = [...object.advocates, ExhibitUId];
            } else {
              object.numberOfAdvocates -= 1;
              object.advocates = object.advocates.filter(
                (userId) => userId !== ExhibitUId
              );
            }
          }
        }
        setReturnedIndex(responses.hits);
      });
    }
    setIntialAdvocating(advocating);
  }, [advocating]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialFollowing,
      following
    );
    if (search) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");
      index.search(search).then((responses) => {
        for (const object of responses.hits) {
          if (object.objectID === difference[0]) {
            if (intialFollowing.length < following.length) {
              object.numberOfFollowers += 1;
              object.followers = [...object.followers, ExhibitUId];
            } else {
              object.numberOfFollowers -= 1;
              object.followers = object.followers.filter(
                (userId) => userId !== ExhibitUId
              );
            }
          }
        }
        setReturnedIndex(responses.hits);
      });
    }
    setIntialFollowing(following);
  }, [following]);

  useDidMountEffect(() => {
    const difference = getExlusiveBothSetsDifference(
      intialCheeredPosts,
      cheeredPosts
    );
    if (search) {
      const algoliasearch = require("algoliasearch");
      const client = algoliasearch(
        "EXC8LH5MAX",
        "2d8cedcaab4cb2b351e90679963fbd92"
      );
      const index = client.initIndex("users");
      index.search(search).then((responses) => {
        for (const object of responses.hits) {
          if (object) {
            if (object.profileExhibits) {
              for (const exhibitId of Object.keys(object.profileExhibits)) {
                if (object.profileExhibits[exhibitId].exhibitPosts) {
                  for (const postId of Object.keys(
                    object.profileExhibits[exhibitId].exhibitPosts
                  )) {
                    if (postId === difference[0]) {
                      if (intialCheeredPosts.length < cheeredPosts.length) {
                        object.profileExhibits[exhibitId].exhibitPosts[
                          postId
                        ].numberOfCheers += 1;
                        object.profileExhibits[exhibitId].exhibitPosts[
                          postId
                        ].cheering = [
                          ...object.profileExhibits[exhibitId].exhibitPosts[
                            postId
                          ].cheering,
                          ExhibitUId,
                        ];
                      } else {
                        object.profileExhibits[exhibitId].exhibitPosts[
                          postId
                        ].numberOfCheers -= 1;
                        object.profileExhibits[exhibitId].exhibitPosts[
                          postId
                        ].cheering = object.profileExhibits[
                          exhibitId
                        ].exhibitPosts[postId].cheering.filter(
                          (userId) => userId !== ExhibitUId
                        );
                      }
                    }
                  }
                }
              }
            }
          }
        }
        setReturnedIndex(responses.hits);
      });
    }
    setIntialCheeredPosts(cheeredPosts);
  }, [cheeredPosts]);

  const flatlistExplore = useRef();
  useDidMountEffect(() => {
    flatlistExplore.current.scrollToOffset({ animated: true, offset: 0 });
  }, [resetScrollExplore]);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      {tutorialing &&
      (tutorialScreen === "ExploreScreen" ||
        tutorialScreen === "FeedView" ||
        tutorialScreen === "ExploreProfile") ? (
        <TutorialExploreScreen ExhibitUId={ExhibitUId} localId={localId} />
      ) : null}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ alignItems: "center" }}>
          <SearchBar
            containerStyle={{
              backgroundColor: 'darkModeValue ? "black" : "white"',
              margin: 5,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              width: "80%",
            }}
            inputContainerStyle={{
              height: 30,
              backgroundColor: darkModeValue ? "black" : "white",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
            searchIcon={
              <EvilIcons
                name="search"
                size={24}
                color={darkModeValue ? "white" : "black"}
              />
            }
            clearIcon={
              search ? (
                <Feather
                  name="x"
                  size={24}
                  color={darkModeValue ? "white" : "black"}
                  onPress={() => {
                    searchFilterFunction("");
                  }}
                />
              ) : null
            }
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={() => {
              searchFilterFunction("");
            }}
            placeholder="Search..."
            value={search}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        extraData={returnedIndex}
        data={returnedIndex}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshSearchIndex(search)}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        ref={flatlistExplore}
        keyExtractor={(item) => item.objectID}
        renderItem={(itemData) => (
          <ExploreCard
            image={itemData.item.profilePictureUrl}
            fullname={itemData.item.fullname}
            jobTitle={itemData.item.jobTitle}
            username={itemData.item.username}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            fullNameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            jobTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProfileHandler(
                search,
                itemData.item.objectID,
                itemData.item.profilePictureUrl,
                itemData.item.fullname,
                itemData.item.username,
                itemData.item.jobTitle,
                itemData.item.profileBiography,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideExhibits,
                itemData.item.followers,
                itemData.item.following,
                itemData.item.advocates,
                itemData.item.profileExhibits,
                itemData.item.profileLinks,
                itemData.item.profileColumns,
                itemData.item.showCheering
              );
            }}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          Searches powered by Algolia
        </Text>
        <FontAwesome5 name="algolia" size={24} color={"grey"} />
      </View>
    </View>
  );
};

ExploreScreen.navigationOptions = (navData) => {
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

export default ExploreScreen;
