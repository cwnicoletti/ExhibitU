import { EvilIcons, Feather } from "@expo/vector-icons";
import algoliasearch from "algoliasearch";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useAppSelector } from "../../hooks";
import ExploreCard from "../../components/explore/ExploreCard";

const ExploreFollowersScreen = (props) => {
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

  const viewExhibitHandler = (
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
    exhibitLinks,
    profileColumns,
    showCheering
  ) => {
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

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
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
              setReturnedIndex(
                index.search("").then((responses) => {
                  const filteredIndex = responses.hits.filter((object) =>
                    followers.includes(object.objectID)
                  );
                  setReturnedIndex(filteredIndex);
                })
              );
            }}
            placeholder="Search..."
            value={search}
          />
        </View>
      </TouchableWithoutFeedback>
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
  text: {
    padding: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});

export default ExploreFollowersScreen;
