import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExploreCard from "../../components/screen_specific/explore/ExploreCard";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import { offScreen } from "../../store/actions/user/user";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomSearchBar from "../../components/UI_general/CustomSearchBar";

const ExploreScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const [search, setSearch] = useState("");
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const following = useAppSelector((state) => state.user.following);
  const [intialFollowing, setIntialFollowing] = useState([]);
  const resetScrollExplore = useAppSelector(
    (state) => state.user.resetScrollExplore
  );

  useEffect(() => {
    setIntialFollowing(following);
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
    hideFollowing,
    hideFollowers,
    hideExhibits,
    followers,
    following,
    profileExhibits,
    profileLinks,
    profileColumns,
    showCheering
  ) => {
    dispatch(offScreen("Explore"));
    props.navigation.navigate("ExploreProfile", {
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
      index
        .search(search)
        .then((responses) => {
          for (const object of responses.hits) {
            if (object.objectID === ExhibitUId) {
              if (intialFollowing.length < following.length) {
                object.numberOfFollowing += 1;
              } else {
                object.numberOfFollowing -= 1;
              }
            }
            if (difference[0]?.length) {
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
          }
          return responses.hits;
        })
        .then((returnedHits) => {
          setReturnedIndex(returnedHits);
        });
    }
    setIntialFollowing(following);
  }, [following]);

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
      <CustomSearchBar
        search={search}
        searchFilterFunction={searchFilterFunction}
      />
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
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideExhibits,
                itemData.item.followers,
                itemData.item.following,
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ExploreScreen;
