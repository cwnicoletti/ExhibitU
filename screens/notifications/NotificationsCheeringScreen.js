import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import algoliasearch from "algoliasearch";
import ExploreCard from "../../components/screen_specific/explore/ExploreCard";
import useDidMountEffect from "../../helper/useDidMountEffect";
import getExlusiveBothSetsDifference from "../../helper/getExlusiveBothSetsDifference";
import CustomSearchBar from "../../components/UI_general/CustomSearchBar";

const NotificationsCheeringScreen = (props) => {
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = props.navigation.getParam("ExhibitUId");
  const exhibitId = props.navigation.getParam("exhibitId");
  const postId = props.navigation.getParam("postId");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");
  const following = useAppSelector((state) => state.user.following);
  const [intialFollowing, setIntialFollowing] = useState([]);

  useEffect(() => {
    setIntialFollowing(following);
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    index.search("").then(async (responses) => {
      if (!Array.isArray(responses.hits) || !responses.hits.length) {
        setReturnedIndex([]);
      } else {
        const user = await index.getObject(ExhibitUId);
        const cheering =
          user.profileExhibits[exhibitId].exhibitPosts[postId].cheering;
        const filteredIndex = responses.hits.filter((object) =>
          cheering.includes(object.objectID)
        );
        setReturnedIndex(filteredIndex);
      }
    });
  }, []);

  const returnIndex = (text) => {
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    index.search(text).then(async (responses) => {
      if (!Array.isArray(responses.hits) || !responses.hits.length) {
        setReturnedIndex([]);
      } else {
        const user = await index.getObject(ExhibitUId);
        const cheering =
          user.profileExhibits[exhibitId].exhibitPosts[postId].cheering;
        const filteredIndex = responses.hits.filter((object) =>
          cheering.includes(object.objectID)
        );
        setReturnedIndex(filteredIndex);
      }
    });
  };

  const searchFilterFunction = (text) => {
    setSearch(text);
    returnIndex(text);
  };

  const refreshSearchIndex = (text) => {
    setIsRefreshing(true);
    returnIndex(text);
    setIsRefreshing(false);
  };

  const viewExhibitHandler = (
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
    exhibitLinks,
    profileColumns,
    showCheering
  ) => {
    props.navigation.push("NotificationsProfile", {
      exploreData: {
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
        exhibitLinks,
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
          if (object.objectID === ExhibitUId) {
            if (intialFollowing.length < following.length) {
              object.numberOfFollowing += 1;
              object.following = [...object.following, ExhibitUId];
            } else {
              object.numberOfFollowing -= 1;
              object.following = object.following.filter(
                (userId) => userId !== ExhibitUId
              );
            }
          }
        }
        return responses.hits;
      })
      .then(async (returnedHits) => {
        const user = await index.getObject(ExhibitUId);
        const filteredIndex = returnedHits.filter((object) =>
          user.followers.includes(object.objectID)
        );
        setReturnedIndex(filteredIndex);
      });
    setIntialFollowing(following);
  }, [following]);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            ...styles.numberOfCheersText,
            color: darkModeValue ? "white" : "black",
          }}
        >
          {numberOfCheers} cheering
        </Text>
      </View>
      <CustomSearchBar
        search={search}
        numberOfCheers={numberOfCheers}
        searchFilterFunction={searchFilterFunction}
      />
      <FlatList
        data={returnedIndex}
        onRefresh={() => refreshSearchIndex(search)}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshSearchIndex(search)}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        refreshing={isRefreshing}
        keyExtractor={(item) => item.objectID}
        renderItem={(itemData) => (
          <ExploreCard
            image={itemData.item.profilePictureUrl}
            fullname={itemData.item.fullname}
            username={itemData.item.username}
            jobTitle={itemData.item.jobTitle}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            jobTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            fullNameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewExhibitHandler(
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
                itemData.item.exhibitLinks,
                itemData.item.profileColumns,
                itemData.item.showCheering
              );
            }}
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

  numberOfCheersText: {
    margin: 20,
    marginBottom: 0,
    fontSize: 18,
  },
});

export default NotificationsCheeringScreen;
