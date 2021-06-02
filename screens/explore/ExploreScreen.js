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
import { useDispatch, useSelector } from "react-redux";
import ExploreCard from "../../components/explore/ExploreCard";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { offScreen } from "../../store/actions/user";

const ExploreScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const [search, setSearch] = useState("");
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const advocating = useSelector((state) => state.user.advocating);
  const [intialAdvocating, setIntialAdvocating] = useState([]);
  const following = useSelector((state) => state.user.following);
  const [intialFollowing, setIntialFollowing] = useState([]);
  const cheeredPosts = useSelector((state) => state.user.cheeredPosts);
  const [intialCheeredPosts, setIntialCheeredPosts] = useState([]);
  const resetScrollExplore = useSelector(
    (state) => state.user.resetScrollExplore
  );

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
    resumeLinkUrl,
    profileBiography,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    showResume,
    hideFollowing,
    hideFollowers,
    hideAdvocates,
    followers,
    following,
    advocates,
    profileProjects,
    profileLinks,
    projectLinks,
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
        resumeLinkUrl,
        profileBiography,
        numberOfFollowers,
        numberOfFollowing,
        numberOfAdvocates,
        showResume,
        hideFollowing,
        hideFollowers,
        hideAdvocates,
        followers,
        following,
        advocates,
        profileProjects,
        profileLinks,
        projectLinks,
        profileColumns,
        showCheering,
      },
    });
  };

  const getExlusiveBothSetsDifference = (arr1, arr2) => {
    const difference = arr1
      .filter((x) => !arr2.includes(x))
      .concat(arr2.filter((x) => !arr1.includes(x)));
    return difference;
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
          for (const projectId of Object.keys(object.profileProjects)) {
            for (const postId of Object.keys(
              object.profileProjects[projectId].projectPosts
            )) {
              if (postId === difference[0]) {
                if (intialCheeredPosts.length < cheeredPosts.length) {
                  console.log("HIT");
                  object.profileProjects[projectId].projectPosts[
                    postId
                  ].numberOfCheers += 1;
                  object.profileProjects[projectId].projectPosts[
                    postId
                  ].cheering = [
                    ...object.profileProjects[projectId].projectPosts[postId]
                      .cheering,
                    ExhibitUId,
                  ];
                } else {
                  object.profileProjects[projectId].projectPosts[
                    postId
                  ].numberOfCheers -= 1;
                  object.profileProjects[projectId].projectPosts[
                    postId
                  ].cheering = object.profileProjects[projectId].projectPosts[
                    postId
                  ].cheering.filter((userId) => userId !== ExhibitUId);
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
            searchIcon={<EvilIcons name="search" size={24} color="white" />}
            clearIcon={
              search ? (
                <Feather
                  name="x"
                  size={24}
                  color="white"
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
            projectContainer={{
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
                itemData.item.resumeLinkUrl,
                itemData.item.profileBiography,
                itemData.item.numberOfFollowers,
                itemData.item.numberOfFollowing,
                itemData.item.numberOfAdvocates,
                itemData.item.showResume,
                itemData.item.hideFollowing,
                itemData.item.hideFollowers,
                itemData.item.hideAdvocates,
                itemData.item.followers,
                itemData.item.following,
                itemData.item.advocates,
                itemData.item.profileProjects,
                itemData.item.profileLinks,
                itemData.item.projectLinks,
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

ExploreScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
            fontFamily: "CormorantUpright",
          }}
        >
          ExhibitU
        </Text>
      </View>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
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
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 26,
  },
});

export default ExploreScreen;
