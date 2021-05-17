import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import algoliasearch from "algoliasearch";
import { offScreen } from "../../store/actions/user";
import { EvilIcons, Feather } from "@expo/vector-icons";

import ExploreCard from "../../components/explore/ExploreCard";
import useDidMountEffect from "../../helper/useDidMountEffect";

const ExploreScreen = (props) => {
  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const [search, setSearch] = useState("");
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const resetScrollExplore = useSelector(
    (state) => state.user.resetScrollExplore
  );

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (text) {
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
    if (text) {
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
      showCheering,
    });
  };

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
