import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import algoliasearch from "algoliasearch";

import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ExploreCard from "../../components/explore/ExploreCard";

const CheeringScreen = (props) => {
  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const showcaseId = props.navigation.getParam("showcaseId");
  const projectId = props.navigation.getParam("projectId");
  const postId = props.navigation.getParam("postId");
  const numberOfCheers = props.navigation.getParam("numberOfCheers");

  useEffect(() => {
    index.search("").then((responses) => {
      const cheering = responses.hits.find(
        (object) => object.objectID === showcaseId
      ).profileProjects[projectId].projectPosts[postId].cheering;
      const filteredIndex = responses.hits.filter((object) =>
        cheering.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const returnIndex = (text) => {
    index.search(text).then((responses) => {
      const cheering = responses.hits.find(
        (object) => object.objectID === showcaseId
      ).profileProjects[projectId].projectPosts[postId].cheering;
      const filteredIndex = responses.hits.filter((object) =>
        cheering.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
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

  const viewProjectHandler = (
    showcaseId,
    profilePictureUrl,
    fullname,
    username,
    jobTitle,
    resumeLinkUrl,
    profileBiography,
    numberOfFollowers,
    numberOfFollowing,
    numberOfAdvocates,
    showResumeValue,
    followers,
    following,
    advocates,
    profileProjects
  ) => {
    props.navigation.push("ViewProfile", {
      showcaseId: showcaseId,
      profilePictureUrl: profilePictureUrl,
      fullname: fullname,
      username: username,
      jobTitle: jobTitle,
      resumeLinkUrl: resumeLinkUrl,
      profileBiography: profileBiography,
      numberOfFollowers: numberOfFollowers,
      numberOfFollowing: numberOfFollowing,
      numberOfAdvocates: numberOfAdvocates,
      showResumeValue: showResumeValue,
      followers: followers,
      following: following,
      advocates: advocates,
      profileProjects: profileProjects,
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
          <Text style={{ marginTop: 10 }}>{numberOfCheers} Cheering</Text>
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
            searchIcon={{ size: 24 }}
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
        onRefresh={() => refreshSearchIndex(search)}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.objectID}
        renderItem={(itemData) => (
          <ExploreCard
            image={
              itemData.item.profilePictureUrl
                ? { uri: itemData.item.profilePictureUrl }
                : {
                    uri:
                      "https://res.cloudinary.com/showcase-79c28/image/upload/v1608714145/white-profile-icon-24_r0veeu.png",
                  }
            }
            fullname={itemData.item.fullname}
            username={itemData.item.username}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            fullNameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewProjectHandler(
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
                itemData.item.showResumeValue,
                itemData.item.followers,
                itemData.item.following,
                itemData.item.advocates,
                itemData.item.profileProjects
              );
            }}
          />
        )}
      />
    </View>
  );
};

CheeringScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Showcase
        </Text>
      </SafeAreaView>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
    headerLeft: (props) => (
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
    fontSize: 22,
  },
});

export default CheeringScreen;