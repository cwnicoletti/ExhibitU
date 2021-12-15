import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks";
import algoliasearch from "algoliasearch";
import ExploreCard from "../../components/screen_specific/explore/ExploreCard";
import CustomSearchBar from "../../components/UI_general/CustomSearchBar";

const FeedFollowersScreen = (props) => {
  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const exploredExhibitUId = props.navigation.getParam("exploredExhibitUId");

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    index.search("").then(async (responses) => {
      const user = await index.getObject(exploredExhibitUId);
      const filteredIndex = responses.hits.filter((object) =>
        user.followers.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
  }, []);

  const returnIndex = (text) => {
    index.search(text).then(async (responses) => {
      const user = await index.getObject(exploredExhibitUId);
      const filteredIndex = responses.hits.filter((object) =>
        user.followers.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
  };

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (!/^ *$/.test(text)) {
      index.search(text).then(async (responses) => {
        if (!Array.isArray(responses.hits) || !responses.hits.length) {
          setReturnedIndex([]);
        } else {
          const user = await index.getObject(exploredExhibitUId);
          const filteredIndex = responses.hits.filter((object) =>
            user.followers.includes(object.objectID)
          );
          setReturnedIndex(filteredIndex);
        }
      });
    } else {
      index.search("").then(async (responses) => {
        if (!Array.isArray(responses.hits) || !responses.hits.length) {
          setReturnedIndex([]);
        } else {
          const user = await index.getObject(exploredExhibitUId);
          const filteredIndex = responses.hits.filter((object) =>
            user.followers.includes(object.objectID)
          );
          setReturnedIndex(filteredIndex);
        }
      });
    }
  };

  const refreshSearchIndex = (text) => {
    setIsRefreshing(true);
    returnIndex(text);
    setIsRefreshing(false);
  };

  const viewProfileHandler = (
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
    props.navigation.push("ViewProfile", {
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
              viewProfileHandler(
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default FeedFollowersScreen;
