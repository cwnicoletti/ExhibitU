import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { SearchBar } from "react-native-elements";
import algoliasearch from "algoliasearch";

import HeaderButton from "../../components/UI/IoniconsHeaderButton";
import UserExploreCard from "../../components/explore/UserExploreCard";

const ExploreScreen = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const [returnedIndex, setReturnedIndex] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const client = algoliasearch(
    "EXC8LH5MAX",
    "2d8cedcaab4cb2b351e90679963fbd92"
  );
  const index = client.initIndex("users");

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (text) {
      return index.search(text).then((responses) => {
        console.log(responses.hits);
        setReturnedIndex(responses.hits);
      });
    } else {
      setReturnedIndex([]);
    }
  };

  const viewProjectHandler = (
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
    props.navigation.navigate("ExploreProfile", {
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(itemData) => (
          <UserExploreCard
            image={require("../../assets/me.png")}
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

ExploreScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View
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
      </View>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleLeftDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleRightDrawer();
          }}
        />
      </HeaderButtons>
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
    fontSize: 22,
  },
});

export default ExploreScreen;
