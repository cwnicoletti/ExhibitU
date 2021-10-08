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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import { useAppSelector } from "../../hooks";
import ExploreAdvocatesCard from "../../components/explore/ExploreAdvocatesCard";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";

const ExploreAdvocatesScreen = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [exhibits, setExhibits] = useState({});
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const exploredExhibitUId = props.navigation.getParam("exploredExhibitUId");

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    index.search("").then((responses) => {
      const advocates = responses.hits.find(
        (object) => object.objectID === exploredExhibitUId
      ).advocates;
      const exhibits = responses.hits.find(
        (object) => object.objectID === exploredExhibitUId
      ).profileExhibits;
      setExhibits(exhibits);
      const filteredIndex = responses.hits.filter((object) =>
        advocates.includes(object.objectID)
      );
      setReturnedIndex(filteredIndex);
    });
  }, []);

  const returnIndex = (text) => {
    const client = algoliasearch(
      "EXC8LH5MAX",
      "2d8cedcaab4cb2b351e90679963fbd92"
    );
    const index = client.initIndex("users");

    index.search(text).then((responses) => {
      const advocates = responses.hits.find(
        (object) => object.objectID === exploredExhibitUId
      ).advocates;
      const exhibits = responses.hits.find(
        (object) => object.objectID === exploredExhibitUId
      ).profileExhibits;
      setExhibits(exhibits);
      const filteredIndex = responses.hits.filter((object) =>
        advocates.includes(object.objectID)
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
        numberOfAdvocates,
        hideFollowing,
        hideFollowers,
        hideExhibits,
        followers,
        following,
        advocates,
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
          <ExploreAdvocatesCard
            image={itemData.item.profilePictureUrl}
            fullname={itemData.item.fullname}
            jobTitle={itemData.item.jobTitle}
            username={itemData.item.username}
            exhibits={exhibits}
            exhibitsAdvocating={itemData.item.exhibitsAdvocating}
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
            advocatingTitleStyle={{
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

ExploreAdvocatesScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <MainHeaderTitle darkModeValue={darkModeValue} titleName={"Advocates"} />
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

export default ExploreAdvocatesScreen;
